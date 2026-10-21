export const budgetKeys = {
  all: ["budgets"] as const,
  forMonth: (userId: string, month: number, year: number) =>
    [...budgetKeys.all, userId, year, month] as const,
};