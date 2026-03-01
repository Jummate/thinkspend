// import { AppError } from "../errors/app-error";
// import { ErrorCodes } from "../errors/error-codes";
// import { ExpenseCategory, ParsedExpense } from "../types/expense";
// import { generateExpenseAnalysis } from "./ai.service";

// const validCategories: ExpenseCategory[] = [
//   "Food & Drinks",
//   "Transport",
//   "Groceries",
//   "Bills",
//   "Shopping",
//   "Other",
// ];

// function buildPrompt(naturalInput: string): string {
//   const today = new Date().toISOString().split("T")[0];

//   return `Extract expense information from the following text and return ONLY a valid JSON object.

// Rules:
// - amount: Extract the numeric value (convert to number, no currency symbols)
// - currency: Detect currency from symbols, codes, or names. Always return ISO code (NGN/USD/EUR/GBP). Default to "NGN" if unclear.
// - category: Must be one of: "Food & Drinks", "Transport", "Groceries", "Bills", "Shopping", "Other"
// - description: A clear description of the expense
// - date: Format as YYYY-MM-DD. If no date is mentioned, use "${today}"

// Currency detection (return ISO code):
// - Symbols: ₦ or # → "NGN", $ → "USD", € → "EUR", £ → "GBP"
// - ISO codes: NGN → "NGN", USD → "USD", EUR → "EUR", GBP → "GBP"
// - Names: "naira" → "NGN", "dollars" → "USD", "euros" → "EUR", "pounds" → "GBP"
// - No currency mentioned → "NGN" (default)

// Examples:
// - "Lunch ₦1000" or "Lunch #1000" or "Lunch 1000 naira" or "Lunch NGN1000" → currency: "NGN"
// - "Coffee $5" or "Coffee 5 dollars" or "Coffee USD 5" → currency: "USD"
// - "Groceries €50" or "Groceries 50 euros" or "Groceries EUR 50" → currency: "EUR"
// - "Taxi £20" or "Taxi 20 pounds" or "Taxi GBP 20" → currency: "GBP"
// - "Bought groceries 5000" (no currency) → currency: "NGN"

// Categories guide:
// - "Food & Drinks": Restaurants, cafes, coffee, meals, snacks
// - "Transport": Uber, taxi, bus, train, fuel, parking
// - "Groceries": Supermarket, food shopping, household items
// - "Bills": Utilities, subscriptions, rent, phone, internet
// - "Shopping": Clothes, electronics, general purchases
// - "Other": Anything that doesn't fit above

// Text to parse: "${naturalInput}"

// Return format:
// {
//   "amount": 5.00,
//   "currency": "NGN",
//   "category": "Food & Drinks",
//   "description": "Coffee at Starbucks",
//   "date": "2024-01-03"
// }`;
// }

// function validateParsedData(data: any): ParsedExpense {
//   if (typeof data.amount !== "number" || data.amount <= 0) {
//     // throw new Error("AI returned invalid amount");
//     throw new AppError("INVALID_INPUT");
//   }

//   if (!validCategories.includes(data.category)) {
//     console.warn(
//       `AI returned invalid category: ${data.category}, defaulting to 'Other'`,
//     );
//     data.category = "Other";
//   }

//   if (typeof data.description !== "string" || data.description.trim() === "") {
//     // throw new Error("AI returned invalid description");
//     throw new AppError("INVALID_INPUT");
//   }

//   const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
//   if (!dateRegex.test(data.date)) {
//     // throw new Error("AI returned invalid date format");
//     throw new AppError("INVALID_INPUT");
//   }

//   return data as ParsedExpense;
// }

// export default async function parseExpenseWithAI(
//   naturalInput: string,
// ): Promise<ParsedExpense> {
//   if (!naturalInput.trim()) {
//     // throw new Error(ErrorCodes.EMPTY_INPUT.code);
//     throw new AppError("EMPTY_INPUT");
//   }

//   if (naturalInput.length > 500) {
//     // throw new Error(ErrorCodes.INVALID_INPUT.code);
//     throw new AppError("INVALID_INPUT");
//   }

//   try {
//     const prompt = buildPrompt(naturalInput);
//     const response = await generateExpenseAnalysis(prompt);
//     const parsed = JSON.parse(response);

//     return validateParsedData(parsed);
//   } catch (error: any) {
//     console.error("Expense parsing failed:", error);

//     // if (error.message in ErrorCodes) {
//     //   throw error;
//     // }

//       if (error instanceof AppError) {
//       throw error;
//     }

//     // if (error.message.startsWith("Invalid")) {
//     //   // throw new Error(ErrorCodes.INVALID_INPUT.code);
//     //   throw new AppError("INVALID_INPUT");
//     // }

//     throw new AppError("UNKNOWN_ERROR");
//     // throw new Error(ErrorCodes.UNKNOWN_ERROR.code);
//   }
// }

// lib/services/expense-parser.service.ts

import { AppError } from "@/lib/errors/app-error";
import { ErrorCodes } from "@/lib/errors/error-codes";
import {
  ParsedExpense,
  MistralResponse,
  ExpenseCategory,
} from "../types/expense";
import { generateExpenseAnalysis } from "./ai.service";

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
- amount: Extract numeric value (convert to number)
- currency: Detect and return ISO code (NGN/USD/EUR/GBP). Default NGN
- category: Must be one of: "Food & Drinks", "Transport", "Groceries", "Bills", "Shopping", "Other"
- description: Non-empty string
- date: YYYY-MM-DD, default "${today}"

Text to parse: "${naturalInput}"`;
}

function validateParsedData(data: any): ParsedExpense {
  if (typeof data.amount !== "number" || data.amount <= 0) {
    throw new AppError("INVALID_DATA", "AI returned invalid amount");
  }

  if (!validCategories.includes(data.category)) {
    console.warn(`Invalid category "${data.category}", defaulting to "Other"`);
    data.category = "Other";
  }

  if (typeof data.description !== "string" || data.description.trim() === "") {
    throw new AppError("INVALID_DATA", "AI returned invalid description");
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(data.date)) {
    throw new AppError("INVALID_DATA", "AI returned invalid date format");
  }

  return data as ParsedExpense;
}

export default async function parseExpenseWithAI(
  naturalInput: string,
): Promise<ParsedExpense> {
  if (!naturalInput?.trim()) throw new AppError("EMPTY_INPUT");
  if (naturalInput.length > 500) throw new AppError("INVALID_INPUT");

  try {
    const prompt = buildPrompt(naturalInput);
    const response = await generateExpenseAnalysis(prompt);
    const parsed = JSON.parse(response);

    return validateParsedData(parsed);
  } catch (error: any) {
    console.error("Expense parsing failed:", error);

    // Preserve AppError thrown inside service or AI
    if (error instanceof AppError) throw error;

    // Wrap unknown errors as AI_SERVICE_ERROR
    throw new AppError(
      "AI_SERVICE_ERROR",
      error?.message || "AI parsing failed",
    );
  }
}
