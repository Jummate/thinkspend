import Skeleton from "@/components/ui/Skeleton";

function ExpensesListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Toolbar row 1: search + total */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-10 w-full sm:w-64" />
        <div className="flex flex-col items-end gap-1">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      {/* Toolbar row 2: filter + sort + viewtoggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-10 w-20" />
      </div>

      {/* "Showing N of M" line */}
      <Skeleton className="h-3 w-40" />

      {/* List container */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3"
            style={{
              borderBottom: i < 4 ? "1px solid var(--border)" : "none",
            }}
          >
            <Skeleton className="h-12 w-12 shrink-0 rounded-lg" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-40 max-w-full" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-16 rounded-md" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-5 w-20 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpensesListSkeleton;