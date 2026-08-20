export default async (request) => {
  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const { topic, count } = await request.json();

    const safeTopic = String(topic || "").trim().slice(0, 200);
    const safeCount = Math.min(Math.max(Number(count) || 1, 1), 20);

    if (!safeTopic) {
      return Response.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const prompt = `Create exactly ${safeCount} presentation slides about "${safeTopic}".

Each slide must have:
- A short title
- Exactly 3 concise bullet points
- The format "Slide 1: Title" followed by three bullets`;

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      `gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini request failed:", response.status);
      return Response.json(
        { error: "Generation request failed" },
        { status: response.status }
      );
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return Response.json(
        { error: "No content returned" },
        { status: 502 }
      );
    }

    return Response.json({ text });
  } catch (error) {
    console.error("Function error:", error);
    return Response.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
};