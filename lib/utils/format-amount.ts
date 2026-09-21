export function formatAmountToString(amount: number) {
  const hasFraction = amount % 1 !== 0;
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  });
}


/**
 * Converts a formatted amount string ("15,500", "25.50") to a number.
 *
 * Expects validated input — all call sites run the value through Zod
 * (expenseDataSchema / currencyBudgetSchema) before reaching here. An
 * unvalidated value like "" or "abc" returns NaN, which surfaces as a
 * database error on insert rather than silently producing 0 — the
 * failure is loud on purpose.
 */
export function formatAmountToNumber(amountInString: string) {
  return parseFloat(amountInString.replace(/,/g, ""));
}

export function sumAmounts(amounts: number[]): number {
  const totalMinorUnits = amounts.reduce(
    (sum, amount) => sum + Math.round(amount * 100),
    0,
  );
  return totalMinorUnits / 100;
}
