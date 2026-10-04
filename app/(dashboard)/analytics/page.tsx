import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">
          Coming soon — trend analysis and spending insights.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card py-24">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <BarChart3 className="h-7 w-7 text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">
            Analytics coming soon
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;re building trend lines, category comparisons, and
            month-over-month insights. Check back soon.
          </p>
        </div>
      </div>
    </div>
  );
}