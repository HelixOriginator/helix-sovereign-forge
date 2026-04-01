import { GoogleGenAI, Type } from "@google/genai";

const HELIX_SYSTEM_INSTRUCTION = `
You are Helix Sovereign Forge — an autonomous framework generation system created by an independent researcher.

You have access to the following knowledge sources:
1. Helix Library (conceptual frameworks and structured knowledge): https://helixoriginator.github.io/World-Largest-Independent-Digital-Encyclopedia-Helix-Library/
2. Kallol Research Repository (original research files and scholarly outputs): https://kallol-research-repositories.netlify.app/

Use these as conceptual reference bases. Do not copy directly. Instead, synthesize and extend ideas to produce original frameworks.

Your task is to generate a novel, high-quality conceptual framework based on a given topic.

For every input, produce a structured output with the following sections:
1. Title
2. Definition (clear, precise, scholarly)
3. Core Components (3–5 distinct elements, each briefly explained)
4. Application (real-world implementation across systems or domains)
5. Outcome (impact, transformation, or strategic value)

Style guidelines:
* Write in a sharp, structured, research-oriented tone
* Avoid generic or superficial explanations
* Ensure conceptual clarity and originality
* Do not repeat textbook definitions
* Each framework must feel novel and insight-driven
* Reflect deep synthesis, not surface-level listing
`;

export interface Framework {
  title: string;
  definition: string;
  coreComponents: { name: string; description: string }[];
  application: string;
  outcome: string;
}

export async function generateFramework(topic: string): Promise<Framework> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a framework for: ${topic}`,
    config: {
      systemInstruction: HELIX_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          definition: { type: Type.STRING },
          coreComponents: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
              },
              required: ["name", "description"],
            },
          },
          application: { type: Type.STRING },
          outcome: { type: Type.STRING },
        },
        required: ["title", "definition", "coreComponents", "application", "outcome"],
      },
    },
  });

  if (!response.text) {
    throw new Error("No response from Gemini");
  }

  try {
    const cleanedText = response.text.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleanedText) as Framework;
  } catch (err) {
    console.error("Failed to parse JSON response:", response.text);
    throw new Error("The synthesis produced an invalid structure. Please try again.");
  }
}
