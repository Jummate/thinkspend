import type { CurrencyCode } from "@/lib/config/currencies";
export interface Profile {
  firstName: string;
  lastName: string;
  currency: CurrencyCode;
}