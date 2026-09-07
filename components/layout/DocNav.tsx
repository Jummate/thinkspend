import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function DocNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[820px] items-center justify-between px-7 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg bg-primary text-[13px] font-bold text-primary-foreground">
            TS
          </span>
          <span className="text-[15px] font-extrabold text-foreground">
            ThinkSpend
          </span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to home
        </Link>
      </div>
    </header>
  );
}

export default DocNav;