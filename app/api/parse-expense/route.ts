import { NextRequest, NextResponse } from "next/server";
import parseExpenseWithAI from "@/lib/services/expense-parser.service";
import { handleRouteError } from "@/lib/errors/route-error-handler";

export async function POST(request: NextRequest) {
  try {
    const { naturalInput } = await request.json();

    const parsedExpense = await parseExpenseWithAI(naturalInput);

    return NextResponse.json({
      success: true,
      data: parsedExpense,
    });
  } catch (error: unknown) {
    console.error("Parse expense API error:", error);
    return handleRouteError(error);
  }
}
