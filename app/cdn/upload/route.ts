import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
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

    // Parse the multipart/form-data from the incoming request.
    const formData = await request.formData();

    // Forward the formData directly to the CDN's upload endpoint.
    const cdnResponse = await fetch(`${cdnTunnelUrl}/upload`, {
      method: "POST",
      body: formData,
      // The 'Content-Type' header is not set here. The browser will automatically
      // set it to 'multipart/form-data' with the correct boundary.
    });

    // Check if the CDN response was successful.
    if (!cdnResponse.ok) {
      const errorText = await cdnResponse.text();
      console.error("Error from CDN:", cdnResponse.status, errorText);
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

    // If successful, parse the JSON response from the CDN and return it.
    const responseBody = await cdnResponse.json();
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
