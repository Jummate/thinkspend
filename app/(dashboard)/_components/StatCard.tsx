import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface StatCardProps {
  label: string;
  icon: LucideIcon;
  /** Full literal Tailwind class string, e.g. "bg-category-other/15 text-category-other" */
  iconClass: string;
  children: ReactNode;
}

function StatCard({ label, icon: Icon, iconClass, children }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6">
      <div
        className="absolute left-0 right-0 top-0 h-[3px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--border) 0 8px, transparent 8px 14px)",
        }}
      />
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <div className={`rounded-lg p-2 ${iconClass}`}>
          <Icon size={20} />
        </div>
      </div>
      {children}
    </div>
  );
}

export default StatCard;
