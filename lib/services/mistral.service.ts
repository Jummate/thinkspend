import { ErrorCodes } from "../errors/error-codes";
import { MistralResponse } from "../types/expense";

const BASE_URL = "https://api.mistral.ai/v1";
const MISTRAL_MODEL = "devstral-2512";

const API_KEY = process.env.MISTRAL_API_KEY;

export default async function chat(
  prompt: string,
  model: string = MISTRAL_MODEL
): Promise<string> {
  if (!API_KEY) {
    // throw new Error("API key is required");
    console.error("CRITICAL: Mistral API key is not configured");
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
      console.log(`Mistral API error: ${error.message || response.statusText}`);
      throw new Error(ErrorCodes.AI_SERVICE_ERROR.code);
    }

    const data: MistralResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Mistral API call failed:", error);

    if (error instanceof Error && error.message in ErrorCodes) {
      throw error;
    }

    throw new Error(ErrorCodes.AI_SERVICE_ERROR.code);
  }
}
