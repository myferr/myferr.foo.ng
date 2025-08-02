export async function GET(request: any) {
  try {
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

    const cdnResponse = await fetch(cdnTunnelUrl, {
      cache: "no-store",
    });

    if (!cdnResponse.ok) {
      const errorText = await cdnResponse.text();
      return new Response(
        JSON.stringify({
          error: `CDN responded with status: ${cdnResponse.status}`,
          details: errorText,
        }),
        {
          status: cdnResponse.status,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Parse the JSON response from the CDN.
    const responseBody = await cdnResponse.json();

    // Return the JSON response.
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
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
