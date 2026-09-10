import Link from "next/link";
import { ArrowRight, Pause } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import AuthCardHeader from "@/components/auth/AuthCardHeader";
import { currencyMapping } from "@/lib/types/profile";
import StatusIcon from "../ui/StatusIcon";

type Snapshot = {
  expensesLogged: number;
  monthlyBudget: number;
  currency: keyof typeof currencyMapping;
};

type PausedAccountCardProps = {
  pausedAt: string;
  snapshot?: Snapshot;
  onReactivate: () => void;
  reactivating?: boolean;
  deleteHref: string;
};

function formatPausedSince(pausedAt: string): string {
  const date = new Date(pausedAt);
  const dateLabel = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const daysAgo = Math.max(
    0,
    Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)),
  );
  const daysAgoLabel =
    daysAgo === 0 ? "today" : daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;

  return `Paused on ${dateLabel} · ${daysAgoLabel}`;
}

function PausedAccountCard({
  pausedAt,
  snapshot,
  onReactivate,
  reactivating = false,
  deleteHref,
}: PausedAccountCardProps) {
  return (
    <AuthCard>
      <AuthCardHeader
        icon={<StatusIcon icon={Pause} variant="warning" />}
        title="Welcome back"
        subtitle="Your account is paused."
        meta={
          <p className="mt-1 text-[11.5px] text-muted-foreground/70">
            {formatPausedSince(pausedAt)}
          </p>
        }
      />

      <div className="px-8 pb-9">
        {snapshot && (
          <div className="mb-5 rounded-xl border border-border bg-secondary p-4">
            <p className="mb-2.5 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground/80">
              Everything&apos;s exactly as you left it
            </p>
            <div className="flex items-center justify-between py-1.5 text-sm">
              <span className="text-muted-foreground">Expenses logged</span>
              <span className="font-mono text-[12.5px] font-bold text-foreground">
                {snapshot.expensesLogged}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 text-sm">
              <span className="text-muted-foreground">Monthly budget</span>
              <span className="font-mono text-[12.5px] font-bold text-foreground">
                {currencyMapping[snapshot.currency]}
                {snapshot.monthlyBudget.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-1.5 text-sm">
              <span className="text-muted-foreground">Currency</span>
              <span className="font-mono text-[12.5px] font-bold text-foreground">
                {snapshot.currency}
              </span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onReactivate}
          disabled={reactivating}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-[14.5px] font-extrabold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {reactivating ? "Reactivating..." : "Reactivate my account"}
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="mt-4 text-center text-xs text-muted-foreground/80">
          Not ready to come back?{" "}
          <Link href={deleteHref} className="font-bold text-danger hover:underline">
            Delete my account instead
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}

export default PausedAccountCard;