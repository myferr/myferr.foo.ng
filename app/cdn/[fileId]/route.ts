export async function GET(request: any, { params }: any) {
  try {
    const { fileId } = params;
    const cdnTunnelUrl = process.env.CDN_TUNNEL_URL;

    if (!cdnTunnelUrl) {
      return new Response(
        JSON.stringify({
          error: "CDN_TUNNEL_URL environment variable is not set.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const cdnFileUrl = `${cdnTunnelUrl}/files/${fileId}`;

    const cdnResponse = await fetch(cdnFileUrl, { cache: "no-store" });

    if (!cdnResponse.ok) {
      const errorText = await cdnResponse.text();
      return new Response(
        JSON.stringify({ error: `File not found on CDN.`, details: errorText }),
        {
          status: cdnResponse.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const contentType =
      cdnResponse.headers.get("content-type") || "application/octet-stream";

    return new Response(cdnResponse.body, {
      status: cdnResponse.status,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error: Error | any) {
    console.error("Proxy Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
