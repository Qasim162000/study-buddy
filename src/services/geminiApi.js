export const callGeminiAPI = async (prompt, schema = null, images = []) => {
  const parts = [{ text: prompt }];
  images.forEach(image => {
    if (image.data && image.mimeType) {
      parts.push({
        inlineData: {
          mimeType: image.mimeType,
          data: image.data
        }
      });
    }
  });

  const payload = {
    contents: [{ role: "user", parts: parts }]
  };

  if (schema) {
    payload.generationConfig = {
      responseMimeType: "application/json",
      responseSchema: schema
    };
  }

  // Use environment variable for API key
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Gemini API Key is not configured. Please set REACT_APP_GEMINI_API_KEY in your .env file.");
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`API error: ${response.status} ${response.statusText} - ${errorData.error.message}`);
  }

  const result = await response.json();

  if (result.candidates && result.candidates.length > 0 &&
      result.candidates[0].content && result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0) {
    const text = result.candidates[0].content.parts[0].text;
    if (schema) {
      return JSON.parse(text);
    }
    return text;
  } else {
    throw new Error("No content received from API.");
  }
}; 