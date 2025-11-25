import { GoogleGenAI, Type } from "@google/genai";
import { NewsArticle, TrendingMetric } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNewsContent = async (): Promise<NewsArticle[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 4 realistic, breaking news articles relevant to Brazil (or world major events). One should be about weather/climate. Return a JSON array.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              category: { type: Type.STRING },
              title: { type: Type.STRING },
              summary: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              location: { type: Type.STRING },
              timestamp: { type: Type.STRING },
              isBreaking: { type: Type.BOOLEAN }
            },
            required: ["id", "category", "title", "summary", "location", "timestamp"]
          }
        }
      }
    });

    const data = JSON.parse(response.text || "[]");
    
    // Add placeholder images since Gemini text generation doesn't provide real hosted image URLs
    return data.map((item: any, index: number) => ({
      ...item,
      imageUrl: index === 0 
        ? `https://picsum.photos/800/450?random=${index}` // Main hero image
        : `https://picsum.photos/400/225?random=${index}`
    }));
  } catch (error) {
    console.error("Error generating news:", error);
    return [];
  }
};

export const generateTrendingMetrics = async (): Promise<TrendingMetric[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate 5 trending news topics in Brazil with imaginary view counts and growth percentages. JSON format.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              topic: { type: Type.STRING },
              views: { type: Type.NUMBER },
              growth: { type: Type.NUMBER }
            },
            required: ["topic", "views", "growth"]
          }
        }
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error metrics:", error);
    return [];
  }
};