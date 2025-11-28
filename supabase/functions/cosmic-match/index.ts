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
    const { userA, userB } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing cosmic compatibility for:", userA.name, "and", userB.name);

    const systemPrompt = `You are a cosmic compatibility analyst specializing in Bazi (Four Pillars) and Western Synastry. 
    
    Analyze the compatibility between two people based on their birth data. Consider:
    
    BAZI ANALYSIS:
    - Day Master compatibility between the two
    - Elemental balance (Wood, Fire, Earth, Metal, Water)
    - Missing elements that the other person provides
    - Earthly Branch clashes vs combinations
    
    WESTERN SYNASTRY:
    - Sun/Moon aspects
    - Venus/Mars interplay for romantic compatibility
    - Saturn aspects for karmic connections
    
    Return a JSON object with this EXACT structure (no markdown, just JSON):
    {
      "resonanceScore": <number 0-100>,
      "connectionType": "<one of: Twin Flame, Soulmate, Karmic Teacher, Divine Complement>",
      "connectionDescription": "<brief mystical description of this connection type>",
      "elementalAlchemy": {
        "userAElement": "<primary element>",
        "userBElement": "<primary element>",
        "alchemyDescription": "<how their elements interact, e.g. 'Your Fire warms their Water'>"
      },
      "theGift": "<what userA gives to userB>",
      "theLesson": "<what userB teaches userA>",
      "theFriction": "<where they might clash>",
      "harmonyAreas": ["<area1>", "<area2>", "<area3>"],
      "growthAreas": ["<area1>", "<area2>"]
    }`;

    const userPrompt = `Analyze the cosmic compatibility between:

    Person A (The Seeker):
    - Name: ${userA.name}
    - Birth Date: ${userA.birthDate}
    - Birth Time: ${userA.birthTime || "Unknown"}
    - Location: ${userA.birthLocation || "Unknown"}

    Person B (The Partner):
    - Name: ${userB.name}
    - Birth Date: ${userB.birthDate}
    - Birth Time: ${userB.birthTime || "Unknown"}
    - Location: ${userB.birthLocation || "Unknown"}

    Provide a mystical but insightful analysis in the specified JSON format.`;

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

    // Parse the JSON from the response
    let matchResult;
    try {
      // Try to extract JSON from markdown code blocks if present
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      matchResult = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      // Return a fallback result
      matchResult = {
        resonanceScore: 75,
        connectionType: "Soulmate",
        connectionDescription: "A deep soul connection that transcends time and space.",
        elementalAlchemy: {
          userAElement: "Fire",
          userBElement: "Water",
          alchemyDescription: "Your Fire creates steam with their Water, generating transformative energy."
        },
        theGift: "Passion and inspiration that ignites their creative spirit.",
        theLesson: "Emotional depth and intuitive wisdom.",
        theFriction: "Intensity of emotions may occasionally overwhelm.",
        harmonyAreas: ["Communication", "Shared Values", "Emotional Connection"],
        growthAreas: ["Patience", "Compromise"]
      };
    }

    return new Response(JSON.stringify(matchResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in cosmic-match function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
