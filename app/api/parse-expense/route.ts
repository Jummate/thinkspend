// app/api/parse-expense/route.ts

import { NextRequest, NextResponse } from "next/server";
import parseExpense from "@/lib/services/expense-parser.service";

export async function POST(request: NextRequest) {
  try {
    // Get API key from environment
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API configuration error" },
        { status: 500 }
      );
    }

    // Parse request body
    const { naturalInput } = await request.json();

    if (!naturalInput || naturalInput.trim() === "") {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    // Initialize service and parse
    // const parserService = parseExpense(naturalInput);
    const parsedExpense = await parseExpense(naturalInput);

    // Return parsed data
    return NextResponse.json({
      success: true,
      data: parsedExpense,
    });
  } catch (error: any) {
    console.error("Parse expense API error:", error);

    return NextResponse.json(
      {
        error: error.message || "Failed to parse expense",
        success: false,
      },
      { status: 500 }
    );
  }
}
