import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const cdnTunnelUrl = process.env.CDN_TUNNEL_URL;

    if (!cdnTunnelUrl) {
      return NextResponse.json(
        { error: "CDN_TUNNEL_URL environment variable is not set." },
        { status: 500 }
      );
    }

    const segments = request.nextUrl.pathname.split("/");
    // console.log(segments);
    const fileId = segments[2];
    const file = segments[3];

    if (!fileId || !file) {
      return NextResponse.json(
        { error: "Missing fileId or file in URL." },
        { status: 400 }
      );
    }

    const base = cdnTunnelUrl.replace(/\/+$/, "");
    const targetUrl = new URL(`${base}/cdn/${fileId}/${file}`);
    targetUrl.search = request.nextUrl.search;

    const cdnResponse = await fetch(targetUrl.toString(), {
      cache: "no-store",
      headers: request.headers,
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
