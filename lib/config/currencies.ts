
export const DEFAULT_CURRENCY: CurrencyCode = "NGN";

export const CURRENCIES = [
  { code: "NGN", symbol: "₦", label: "Nigerian Naira (NGN)" },
  { code: "USD", symbol: "$", label: "US Dollar (USD)" },
  { code: "EUR", symbol: "€", label: "Euro (EUR)" },
  { code: "GBP", symbol: "£", label: "British Pound (GBP)" },
] as const;

export type CurrencyCode = (typeof CURRENCIES)[number]["code"];


export const currencyMapping = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c.symbol]),
) as Record<CurrencyCode, string>;


export function getCurrencySymbol(code: string): string {
  return currencyMapping[code as CurrencyCode] ?? code;
}

export const CURRENCY_OPTIONS = CURRENCIES.map((c) => ({
  value: c.code,
  label: `${c.symbol} ${c.label}`,
}));