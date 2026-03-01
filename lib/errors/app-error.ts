// // lib/errors/app-error.ts

// import { ErrorCodes } from "./error-codes";

// export class AppError extends Error {
//   public readonly code: keyof typeof ErrorCodes;
//   public readonly status: number;

//   constructor(code: keyof typeof ErrorCodes) {
//     super(ErrorCodes[code].message);
//     this.code = code;
//     this.status = ErrorCodes[code].status;
//   }
// }

// lib/errors/app-error.ts
import { ErrorCodes } from "./error-codes";

export class AppError extends Error {
  public readonly code: keyof typeof ErrorCodes;
  public readonly status: number;

  constructor(code: keyof typeof ErrorCodes, message?: string) {
    super(message || ErrorCodes[code].message); // Use default message if custom not provided
    this.code = code;
    this.status = ErrorCodes[code].status; // <- this is the key mapping
  }
}
