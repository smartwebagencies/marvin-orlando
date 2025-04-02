exports.handler = async (event) => {
    const { message } = JSON.parse(event.body);
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are Marvin, a friendly Orlando concierge who helps people find amazing food, fun, and local gems." },
          { role: "user", content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });
  
    const data = await response.json();
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices?.[0]?.message?.content || "Hmm... I've got nothing right now.",
      }),
    };
  };
  