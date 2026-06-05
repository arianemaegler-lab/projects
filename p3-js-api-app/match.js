const API_URL = `https://gemini.googleapis.com/v1/models/gemini-2.5-pro-preview:generateContent?key=${process.env.GEMINI_API_KEY}`;

export default async (request, context) => {
  try {
    // Reject non-POST requests
    if (request.method !== "POST")
      return Response.json({ error: "Method not allowed" }, { status: 405 });

    // Check the API key is configured
    if (!process.env.GEMINI_API_KEY)
      return Response.json({ error: "API key not configured" }, { status: 500 });

    // Parse and validate the prompt
    const { prompt } = await request.json();
    if (typeof prompt !== "string" || !prompt.trim())
      return Response.json({ error: "Bad request" }, { status: 400 });

    // Call Gemini
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      // Log the real error server-side; return a safe message to the browser
      console.error(`Gemini error (${response.status}):`, await response.text());
      return Response.json(
        { error: "Something went wrong. Please try again." },
        { status: response.status },
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Function error:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
};