import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const researchMarket = async (keyword: string) => {
  const model = "gemini-3.1-pro-preview"; // Using pro for deeper analysis
  
  const prompt = `
    You are an elite AI Market Research Agent and Startup Strategist.
    Perform a deep structured analysis for the following keyword/industry/problem: "${keyword}"
    
    Follow these steps exactly and return the response in the specified JSON format:
    
    1. Market Analysis: TAM, SAM, SOM (in currency or units), Growth trends, Target audience, Competitors, Gap analysis.
    2. Pain Points: Top 3 real problems with ratings (1-10) for Urgency, Willingness to Pay, and Market Size Potential.
    3. Best Opportunity: Choose one, justify why it can reach ₹1Cr+ revenue fastest.
    4. Startup Ideas: 2-3 AI Agent/SaaS ideas with description, target users, USP, monetization, and difficulty.
    5. Execution Plan: MVP features, Tech stack, AI tools, 30-day timeline, GTM strategy.
    
    Return ONLY a JSON object matching this schema:
    {
      "marketAnalysis": {
        "tam": string,
        "sam": string,
        "som": string,
        "growthTrends": string[],
        "targetAudience": string[],
        "competitors": { "name": string, "strengths": string, "weaknesses": string }[],
        "gapAnalysis": string
      },
      "painPoints": {
        "problem": string,
        "urgency": number,
        "willingnessToPay": number,
        "marketSizePotential": number,
        "description": string
      }[],
      "bestOpportunity": {
        "title": string,
        "justification": string
      },
      "startupIdeas": {
        "name": string,
        "description": string,
        "targetUsers": string,
        "usp": string,
        "monetization": string,
        "difficulty": "Low" | "Medium" | "High"
      }[],
      "executionPlan": {
        "mvpFeatures": string[],
        "techStack": string[],
        "aiTools": string[],
        "timeline": { "day": string, "task": string }[],
        "gtmStrategy": string[]
      }
    }
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          marketAnalysis: {
            type: Type.OBJECT,
            properties: {
              tam: { type: Type.STRING },
              sam: { type: Type.STRING },
              som: { type: Type.STRING },
              growthTrends: { type: Type.ARRAY, items: { type: Type.STRING } },
              targetAudience: { type: Type.ARRAY, items: { type: Type.STRING } },
              competitors: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    strengths: { type: Type.STRING },
                    weaknesses: { type: Type.STRING }
                  }
                }
              },
              gapAnalysis: { type: Type.STRING }
            }
          },
          painPoints: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                problem: { type: Type.STRING },
                urgency: { type: Type.NUMBER },
                willingnessToPay: { type: Type.NUMBER },
                marketSizePotential: { type: Type.NUMBER },
                description: { type: Type.STRING }
              }
            }
          },
          bestOpportunity: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              justification: { type: Type.STRING }
            }
          },
          startupIdeas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                targetUsers: { type: Type.STRING },
                usp: { type: Type.STRING },
                monetization: { type: Type.STRING },
                difficulty: { type: Type.STRING }
              }
            }
          },
          executionPlan: {
            type: Type.OBJECT,
            properties: {
              mvpFeatures: { type: Type.ARRAY, items: { type: Type.STRING } },
              techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
              aiTools: { type: Type.ARRAY, items: { type: Type.STRING } },
              timeline: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING },
                    task: { type: Type.STRING }
                  }
                }
              },
              gtmStrategy: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || "{}");
};
