import { ErrorCodes } from "./error-codes";

export class AppError extends Error {
  public readonly code: keyof typeof ErrorCodes;
  public readonly status: number;

  constructor(code: keyof typeof ErrorCodes, message?: string) {
    super(message || ErrorCodes[code].message);
    this.code = code;
    this.status = ErrorCodes[code].status;
  }
}
