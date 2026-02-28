export async function parseExpense(naturalInput: string) {
  const response = await fetch("/api/parse-expense", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ naturalInput }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Parsing failed");
  }

  return result;
}
