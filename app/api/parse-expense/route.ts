// app/api/parse-expense/route.ts

import { NextRequest, NextResponse } from "next/server";
import parseExpense from "@/lib/services/expense-parser.service";
import { createErrorResponse, ErrorCodes } from "@/lib/errors/error-codes";

export async function POST(request: NextRequest) {
  try {
    // Get API key from environment
    const apiKey = process.env.MISTRAL_API_KEY;
    if (!apiKey) {
      //   return NextResponse.json(
      //     { error: "API configuration error" },
      //     { status: 500 }
      //   );

      console.error("CRITICAL: Mistral API key not configured");

      // Return generic error to user
      const errorResponse = createErrorResponse("SERVICE_UNAVAILABLE");
      return NextResponse.json(
        { error: errorResponse.error, code: errorResponse.code },
        { status: errorResponse.status }
      );
    }

    // Parse request body
    const { naturalInput } = await request.json();

    if (!naturalInput || naturalInput.trim() === "") {
      const errorResponse = createErrorResponse("EMPTY_INPUT");
      return NextResponse.json(
        { error: errorResponse.error, code: errorResponse.code },
        { status: errorResponse.status }
      );
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

    if (error.message in ErrorCodes) {
      const errorResponse = createErrorResponse(
        error.message as keyof typeof ErrorCodes
      );
      return NextResponse.json(
        { error: errorResponse.error, code: errorResponse.code },
        { status: errorResponse.status }
      );
    }

    // ========================================
    // CATCH-ALL: Unknown error
    // ========================================
    const errorResponse = createErrorResponse("UNKNOWN_ERROR");
    return NextResponse.json(
      { error: errorResponse.error, code: errorResponse.code },
      { status: errorResponse.status }
    );

    // return NextResponse.json(
    //   {
    //     error: error.message || "Failed to parse expense",
    //     success: false,
    //   },
    //   { status: 500 }
    // );
  }
}
