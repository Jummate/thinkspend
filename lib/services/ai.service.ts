import { ErrorCodes } from "../errors/error-codes";
import { MistralResponse } from "../types/expense";

const BASE_URL = "https://api.mistral.ai/v1";
const DEFAULT_MODEL = "devstral-2512";
const API_KEY = process.env.MISTRAL_API_KEY;

export async function generateExpenseAnalysis(prompt: string): Promise<string> {
  return callMistral(prompt);
}

async function callMistral(
  prompt: string,
  model: string = DEFAULT_MODEL,
): Promise<string> {
  if (!API_KEY) {
    console.error("CRITICAL: AI API key not configured");
    throw new Error(ErrorCodes.SERVICE_UNAVAILABLE.code);
  }

  try {
    const response = await fetch(`${BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.1,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(
        `AI provider returned non-OK response: ${error.message || response.statusText}`,
      );
      throw new Error(ErrorCodes.AI_SERVICE_ERROR.code);
    }

    const data: MistralResponse = await response.json();

    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI call failed:", error);
    if (error instanceof Error && error.message in ErrorCodes) {
      throw error;
    }

    throw new Error(ErrorCodes.AI_SERVICE_ERROR.code);
  }
}
