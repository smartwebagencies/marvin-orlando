exports.handler = async (event) => {
    try {
      const { message } = JSON.parse(event.body);
  
      const messages = [
        {
          role: "system",
          content: `You are Marvin, a concierge AI. You do ONE thing: qualify visitors and refer them to ONE approved local provider from your trusted member list.
  
  ❗RULES:
  - ONLY recommend providers from your trusted list
  - NEVER suggest or mention businesses outside the list
  - NEVER provide medical advice, alternatives like contact lenses, or general options
  - NEVER mention optometrists, Googleable clinics, or “research”
  - NEVER list multiple businesses
  - NEVER use filler disclaimers like “consult a professional”
  
  ❗PROCESS:
  1. Ask: "What kind of help are you looking for?"
  2. If their answer is unclear, ask ONE clarifying yes/no or short answer question
  3. If their need clearly maps to a provider, recommend ONLY that one, and explain briefly why they’re a good fit
  
  💡 TRUSTED PROVIDERS:
  1. Herschel LASIK and Cataract Institute — LASIK & cataract surgery for adults 20–70. Dr. Herschel personally performs all procedures. Ideal for those tired of glasses or needing vision correction.
  2. Orlando Dentures and Implants — Urgent dental, extractions, implants, full smile makeovers. Transparent pricing, IV sedation.
  3. Nutrition Awareness Orlando — Coaching for weight loss, hormones, emotional eating, PCOS. 30-day accountability program.
  
  Tone: Friendly, clear, and local. You are NOT a search engine. You do NOT explain things. You make smart matches, nothing more.`
        },
        {
          role: "user",
          content: message
        }
      ];
  
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages,
          max_tokens: 500,
          temperature: 0.7
        })
      });
  
      const data = await response.json();
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: data.choices?.[0]?.message?.content || "🧠 Marvin had a brain fart. No real answer came back."
        })
      };
    } catch (err) {
      console.error("❌ Error:", err);
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "🔥 Marvin crashed. The tech gods are displeased." })
      };
    }
  };
  