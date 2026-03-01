import { NextResponse } from "next/server";
import { AppError } from "./app-error";
import { createErrorResponse } from "./error-codes";

export function handleRouteError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status }
    );
  }

  const fallback = createErrorResponse("UNKNOWN_ERROR");

  return NextResponse.json(
    { error: fallback.error, code: fallback.code },
    { status: fallback.status }
  );
}