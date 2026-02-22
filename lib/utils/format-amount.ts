export function formatAmountToString(amount: number) {
  return amount.toLocaleString();
}

export function formatAmountToNumber(amountInString: string) {
  return parseFloat(amountInString.replace(",", ""));
}
