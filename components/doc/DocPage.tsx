import React from "react";
import { AlertTriangle } from "lucide-react";
import DocNav from "@/components/layout/DocNav";

type TocItem = {
  id: string;
  label: string;
};

type DocPageProps = {
  title: string;
  lastUpdated: string;
  disclaimer: React.ReactNode;
  toc: TocItem[];
  children: React.ReactNode;
};

function DocPage({
  title,
  lastUpdated,
  disclaimer,
  toc,
  children,
}: DocPageProps) {
  return (
    <>
      <DocNav />

      <div className="mx-auto max-w-[760px] px-7">
        <div className="py-14 pb-8">
          <h1 className="text-[34px] font-black tracking-tight text-foreground">
            {title}
          </h1>
          <div className="mt-3.5 flex gap-3.5 text-[13px] text-muted-foreground/80">
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        <div className="mb-9 flex gap-3 rounded-xl border border-category-food/30 bg-category-food/10 p-4">
          <AlertTriangle className="mt-0.5 h-[19px] w-[19px] shrink-0 text-category-food" />
          <div className="text-[13.5px] leading-relaxed text-foreground">
            {disclaimer}
          </div>
        </div>

        <nav className="mt-6 rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-muted-foreground/80">
            Contents
          </h3>
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block py-1.5 text-[13.5px] font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="pb-16">{children}</div>
      </div>

      <footer className="border-t border-border py-7 text-center text-[12.5px] text-muted-foreground/80">
        ThinkSpend · {title} · Last updated {lastUpdated}
      </footer>
    </>
  );
}

export default DocPage;
