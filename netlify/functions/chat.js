exports.handler = async (event) => {
    try {
      const { message } = JSON.parse(event.body);
  
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: "You are Marvin, a friendly Orlando concierge who helps people find amazing food, fun, and culture." },
            { role: "user", content: message }
          ],
          max_tokens: 500,
          temperature: 0.7
        }),
      });
  
      const data = await response.json();
  
      console.log("🔍 OpenAI response:", JSON.stringify(data, null, 2));
  
      const reply = data?.choices?.[0]?.message?.content;
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: reply || "🧠 Marvin had a brain fart. No real answer came back."
        })
      };
  
    } catch (err) {
      console.error("❌ Serverless function error:", err);
  
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "🔥 Marvin crashed. The tech gods are displeased." })
      };
    }
  };
  