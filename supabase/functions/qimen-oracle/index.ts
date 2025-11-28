import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, mode, timestamp, location } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Casting QMDJ chart for question:", question);
    console.log("Mode:", mode);
    console.log("Timestamp:", timestamp);

    const systemPrompt = `You are a master of Qimen Dun Jia (奇门遁甲), the ancient Chinese strategic oracle system. 
    
    Generate a Qimen Dun Jia reading based on the question asked. The chart should include:
    
    1. The 9 Palaces (arranged as Luo Shu magic square):
       - Palace 4 (SE), Palace 9 (S), Palace 2 (SW)
       - Palace 3 (E), Palace 5 (Center), Palace 7 (W)
       - Palace 8 (NE), Palace 1 (N), Palace 6 (NW)
    
    2. Each palace contains:
       - Deity (神): Chief (值符), Serpent (螣蛇), Moon (太陰), Six Harmony (六合), Hook (勾陳), Zhu Que (朱雀), Nine Earth (九地), Nine Heaven (九天)
       - Star (星): Tian Peng (天蓬), Tian Ren (天任), Tian Chong (天沖), Tian Fu (天輔), Tian Qin (天禽), Tian Xin (天心), Tian Zhu (天柱), Tian Ying (天英)
       - Door (門): Open (開), Rest (休), Life (生), Harm (傷), Delusion (杜), View (景), Death (死), Fear (驚)
       - Element: Water, Fire, Wood, Metal, Earth
    
    3. Key analysis points:
       - Day Palace (where the querent's energy is)
       - Hour Palace (where the outcome energy is)
       - Answer Palace (the focal point for the question)
       - Any special formations (Fu Yin, Fan Yin, etc.)
    
    Return a JSON object with this EXACT structure (no markdown):
    {
      "palaces": [
        {
          "position": 1,
          "direction": "N",
          "element": "Water",
          "deity": "Nine Earth",
          "deityMeaning": "Hidden resources, patience",
          "star": "Tian Peng",
          "starMeaning": "Ambition, strategy",
          "door": "Rest",
          "doorMeaning": "Recuperation, planning",
          "isAnswerPalace": false,
          "isDayPalace": false,
          "isHourPalace": false,
          "isVoid": false,
          "strength": "strong"
        }
      ],
      "verdict": "<Favorable | Challenging | Wait>",
      "verdictExplanation": "<brief mystical explanation of the overall reading>",
      "answerPalaceNumber": <1-9>,
      "tacticalAdvice": "<specific directional and timing advice>",
      "bestDirection": "<N|NE|E|SE|S|SW|W|NW>",
      "bestHour": "<specific time recommendation>",
      "specialFormation": "<name of any special formation or null>",
      "specialFormationMeaning": "<explanation if formation exists>",
      "deepInsight": "<profound strategic wisdom for the querent>"
    }
    
    Make the reading mystical yet practical, focusing on actionable strategic advice.`;

    const userPrompt = `Cast a Qimen Dun Jia chart for the following:

    Mode: ${mode === "divination" ? "Divination (Forecasting)" : "Selection (Date/Direction Picking)"}
    Question: ${question}
    Time of Inquiry: ${timestamp || new Date().toISOString()}
    ${location ? `Location: ${location}` : ""}

    Provide a complete QMDJ reading with all 9 palaces populated and strategic interpretation.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    console.log("Raw AI response:", content);

    let oracleResult;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      oracleResult = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      // Return a fallback result
      oracleResult = generateFallbackReading();
    }

    return new Response(JSON.stringify(oracleResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in qimen-oracle function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function generateFallbackReading() {
  const elements = ["Water", "Fire", "Wood", "Metal", "Earth"];
  const deities = ["Chief", "Serpent", "Moon", "Six Harmony", "Hook", "Zhu Que", "Nine Earth", "Nine Heaven"];
  const stars = ["Tian Peng", "Tian Ren", "Tian Chong", "Tian Fu", "Tian Qin", "Tian Xin", "Tian Zhu", "Tian Ying"];
  const doors = ["Open", "Rest", "Life", "Harm", "Delusion", "View", "Death", "Fear"];
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "Center"];
  
  const palaces = [
    { position: 4, direction: "SE", element: "Wood" },
    { position: 9, direction: "S", element: "Fire" },
    { position: 2, direction: "SW", element: "Earth" },
    { position: 3, direction: "E", element: "Wood" },
    { position: 5, direction: "Center", element: "Earth" },
    { position: 7, direction: "W", element: "Metal" },
    { position: 8, direction: "NE", element: "Earth" },
    { position: 1, direction: "N", element: "Water" },
    { position: 6, direction: "NW", element: "Metal" },
  ].map((p, i) => ({
    ...p,
    deity: deities[i % deities.length],
    deityMeaning: "Spiritual guidance awaits",
    star: stars[i % stars.length],
    starMeaning: "Celestial timing is favorable",
    door: doors[i % doors.length],
    doorMeaning: "The path is opening",
    isAnswerPalace: i === 4,
    isDayPalace: i === 2,
    isHourPalace: i === 6,
    isVoid: false,
    strength: "balanced"
  }));

  return {
    palaces,
    verdict: "Favorable",
    verdictExplanation: "The cosmic energies align to support thoughtful action. The Open Door presents itself in a strong position.",
    answerPalaceNumber: 5,
    tacticalAdvice: "Approach from the Southeast direction. The morning hours (9-11 AM) carry the most auspicious energy.",
    bestDirection: "SE",
    bestHour: "9:00 AM - 11:00 AM",
    specialFormation: null,
    specialFormationMeaning: null,
    deepInsight: "Like water finding its path through stone, persistence combined with flexibility will guide you to success."
  };
}
