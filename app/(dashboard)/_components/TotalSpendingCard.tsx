import { CreditCard, TrendingDown, TrendingUp } from "lucide-react";
import { formatAmountToString } from "@/lib/utils/format-amount";
import StatCard from "./StatCard";

interface TotalSpendingCardProps {
  currencySymbol: string;
  totalSpending: number;
  spendingChangePercent: number;
  monthLabel: string;
}

function TotalSpendingCard({
  currencySymbol,
  totalSpending,
  spendingChangePercent,
  monthLabel,
}: TotalSpendingCardProps) {
  const isDecrease = spendingChangePercent <= 0;

  return (
    <StatCard
      label={`Total Spending (${monthLabel})`}
      icon={CreditCard}
      iconClass="bg-category-other/15 text-category-other"
    >
      <h2 className="mb-1 text-4xl font-bold text-foreground">
        {currencySymbol}
        {formatAmountToString(parseFloat(totalSpending.toFixed(2)))}
      </h2>
      <div
        className={`flex items-center gap-1 ${isDecrease ? "text-primary" : "text-danger"}`}
      >
        {isDecrease ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
        <span className="text-sm font-semibold">
          {Math.abs(spendingChangePercent)}% from last month
        </span>
      </div>
    </StatCard>
  );
}

export default TotalSpendingCard;