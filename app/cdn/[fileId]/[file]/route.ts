import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fileId: string; file: string }> }
): Promise<NextResponse> {
  try {
    const { fileId, file } = await params;
    const cdnTunnelUrl = process.env.CDN_TUNNEL_URL;
    if (!cdnTunnelUrl) {
      return NextResponse.json(
        { error: "CDN_TUNNEL_URL environment variable is not set." },
        { status: 500 }
      );
    }

    const encodedFile = encodeURIComponent(file);
    const filePath = `${fileId}/${encodedFile}`;
    const base = cdnTunnelUrl.replace(/\/+$/, "");
    const targetUrl = new URL(`${base}/${filePath}`);
    targetUrl.search = request.nextUrl.search; // preserve incoming query string

    const cdnResponse = await fetch(targetUrl.toString(), {
      cache: "no-store",
      headers: request.headers, // forward original headers
    });

    if (!cdnResponse.ok) {
      const details = await cdnResponse.text();
      return NextResponse.json(
        {
          error: `CDN responded with status: ${cdnResponse.status}`,
          details,
        },
        { status: cdnResponse.status }
      );
    }

    // Mirror status, headers, and body from CDN
    const proxied = new NextResponse(cdnResponse.body, {
      status: cdnResponse.status,
      statusText: cdnResponse.statusText,
    });
    cdnResponse.headers.forEach((value, key) => {
      proxied.headers.set(key, value);
    });

    return proxied;
  } catch (err: unknown) {
    console.error("Proxy Error:", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

