import { ErrorCodes } from "../errors/error-codes";
import { ExpenseCategory, ParsedExpense } from "../types/expense";
import chat from "./mistral.service";

const validCategories: ExpenseCategory[] = [
  "Food & Drinks",
  "Transport",
  "Groceries",
  "Bills",
  "Shopping",
  "Other",
];

function buildPrompt(naturalInput: string): string {
  const today = new Date().toISOString().split("T")[0];

  return `Extract expense information from the following text and return ONLY a valid JSON object.

Rules:
- amount: Extract the numeric value (convert to number, no currency symbols)
- category: Must be one of: "Food & Drinks", "Transport", "Groceries", "Bills", "Shopping", "Other"
- description: A clear description of the expense
- date: Format as YYYY-MM-DD. If no date is mentioned, use "${today}"

Categories guide:
- "Food & Drinks": Restaurants, cafes, coffee, meals, snacks
- "Transport": Uber, taxi, bus, train, fuel, parking
- "Groceries": Supermarket, food shopping, household items
- "Bills": Utilities, subscriptions, rent, phone, internet
- "Shopping": Clothes, electronics, general purchases
- "Other": Anything that doesn't fit above

Text to parse: "${naturalInput}"

Return format:
{
  "amount": 5.00,
  "category": "Food & Drinks",
  "description": "Coffee at Starbucks",
  "date": "2024-01-03"
}`;
}

function validateParsedData(data: any): ParsedExpense {
  if (typeof data.amount !== "number" || data.amount <= 0) {
    throw new Error("AI returned invalid amount");
  }

  if (!validCategories.includes(data.category)) {
    console.warn(
      `AI returned invalid category: ${data.category}, defaulting to 'Other'`
    );
    data.category = "Other";
  }

  if (typeof data.description !== "string" || data.description.trim() === "") {
    throw new Error("AI returned invalid description");
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(data.date)) {
    throw new Error("AI returned invalid date format");
  }

  return data as ParsedExpense;
}

export default async function parseExpense(
  naturalInput: string
): Promise<ParsedExpense> {
  if (!naturalInput.trim()) {
    throw new Error(ErrorCodes.EMPTY_INPUT.code);
  }

  if (naturalInput.length > 500) {
    throw new Error(ErrorCodes.INVALID_INPUT.code);
  }

  try {
    const prompt = buildPrompt(naturalInput);
    const response = await chat(prompt);
    const parsed = JSON.parse(response);

    return validateParsedData(parsed);
  } catch (error: any) {
    console.error("Expense parsing failed:", error);

    if (error.message in ErrorCodes) {
      throw error;
    }

    if (error.message.startsWith("Invalid")) {
      throw new Error(ErrorCodes.INVALID_INPUT.code);
    }

    throw new Error(ErrorCodes.UNKNOWN_ERROR.code);
  }
}
