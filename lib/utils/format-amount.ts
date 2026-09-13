export function formatAmountToString(amount: number) {
  const hasFraction = amount % 1 !== 0;
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: hasFraction ? 2 : 0,
    maximumFractionDigits: hasFraction ? 2 : 0,
  });
}


export function formatAmountToNumber(amountInString: string) {
  const parsed = parseFloat(amountInString.replace(/,/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function sumAmounts(amounts: number[]): number {
  const totalMinorUnits = amounts.reduce(
    (sum, amount) => sum + Math.round(amount * 100),
    0,
  );
  return totalMinorUnits / 100;
}
