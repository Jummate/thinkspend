export const currencyMapping = {
  NGN: "₦",
  USD: "$",
} as const;

export type CurrencyCode = keyof typeof currencyMapping;

export interface Profile {
  firstName: string;
  lastName: string;
  currency: CurrencyCode;
}