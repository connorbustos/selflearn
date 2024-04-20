export async function POST(request: Request) {
  try {
    const data = await request.json();
    const response = await fetch(
      "https://api.replicate.com/v1/models/meta/meta-llama-3-70b-instruct/predictions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REPLICATE_API_KEY}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const result = await response.json();
    let get_url = result.urls?.get; // Use optional chaining to ensure get exists
    console.log("GET:", get_url);
    if (!get_url) {
      throw new Error("No GET URL found in the response.");
    }

    // Polling logic
    let output, outputResponse;
    const maxAttempts = 500;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      outputResponse = await fetch(get_url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REPLICATE_API_KEY}`,
        },
      });
      if (outputResponse.ok) {
        output = await outputResponse.json();
        get_url = output.urls?.get;
        console.log(attempt, output);
        if (output.status === "succeeded" || output.status === "completed") {
          // Stop polling when the output is ready
          break;
        }
      } else {
        throw new Error(
          `Failed to fetch result: status ${outputResponse.status}`
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Max attempts reached
    if (
      !output ||
      (output.status !== "succeeded" && output.status !== "completed")
    ) {
      throw new Error("Output was not ready after maximum attempts");
    }

    return new Response(JSON.stringify(output), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
