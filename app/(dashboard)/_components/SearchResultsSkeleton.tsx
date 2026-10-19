import Skeleton from "@/components/ui/Skeleton";

function SearchResultsSkeleton() {
  return (
    <div className="flex flex-col" aria-busy="true">
      <span className="sr-only" role="status">
        Searching
      </span>

      {/* Section label placeholder */}
      <div className="px-4 pb-2 pt-3">
        <Skeleton className="h-3 w-16" />
      </div>

      {/* 3 result rows — each mimics ExpenseRow / ShortcutRow */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-2.5">
          <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <Skeleton className="h-4 w-40 max-w-full" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-4 w-16 shrink-0" />
        </div>
      ))}

      {/* Footer hint row — same height as the real Esc hint */}
      <div className="border-t border-border px-4 py-2.5">
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

export default SearchResultsSkeleton;