// lib/errors/error-codes.ts

export const ErrorCodes = {
  // User errors (4xx)
  INVALID_INPUT: {
    code: "INVALID_INPUT",
    status: 400,
    message: "Please check your input and try again",
  },
  EMPTY_INPUT: {
    code: "EMPTY_INPUT",
    status: 400,
    message: "Please enter an expense to parse",
  },
  PARSE_FAILED: {
    code: "PARSE_FAILED",
    status: 400,
    message: "Couldn't understand your input. Try: 'Coffee #5000'",
  },

  // Server errors (5xx)
  SERVICE_UNAVAILABLE: {
    code: "SERVICE_UNAVAILABLE",
    status: 503,
    message: "Our service is temporarily unavailable. Please try again later.",
  },
  AI_SERVICE_ERROR: {
    code: "AI_SERVICE_ERROR",
    status: 503,
    message: "We're having trouble processing your request right now.",
  },
  UNKNOWN_ERROR: {
    code: "UNKNOWN_ERROR",
    status: 500,
    message: "Something went wrong. Please try again.",
  },
} as const;

// Helper function to create error responses
export function createErrorResponse(errorCode: keyof typeof ErrorCodes) {
  const error = ErrorCodes[errorCode];
  return {
    error: error.message,
    code: error.code,
    status: error.status,
  };
}
