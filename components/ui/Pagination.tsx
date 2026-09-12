"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number; // 1-indexed
  totalPages: number;
  onPageChange: (page: number) => void;
}

// How many page numbers to show on each side of the current page.
const SIBLING_COUNT = 1;


function buildPageItems(
  page: number,
  totalPages: number,
): (number | "ellipsis")[] {
  // Number of slots if we render every page: page numbers + 2 sibling
  // slots on each side + the current page + 2 boundary pages.
  const maxWithoutEllipsis = SIBLING_COUNT * 2 + 5;

  if (totalPages <= maxWithoutEllipsis) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(page - SIBLING_COUNT, 1);
  const rightSibling = Math.min(page + SIBLING_COUNT, totalPages);

  // Whether an ellipsis is needed between the first page and the left
  // edge of the window.
  const showLeftEllipsis = leftSibling > 2;
  // Whether an ellipsis is needed between the right edge of the window
  // and the last page.
  const showRightEllipsis = rightSibling < totalPages - 1;

  const items: (number | "ellipsis")[] = [];

  // First page — only pinned if the window doesn't already include it.
  if (!showLeftEllipsis) {
    for (let i = 1; i < leftSibling; i++) items.push(i);
  } else {
    items.push(1, "ellipsis");
  }

  for (let i = leftSibling; i <= rightSibling; i++) items.push(i);

  if (!showRightEllipsis) {
    for (let i = rightSibling + 1; i <= totalPages; i++) items.push(i);
  } else {
    items.push("ellipsis", totalPages);
  }

  return items;
}

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  // Nothing to paginate — render nothing rather than a lone disabled
  // button pair.
  if (totalPages <= 1) return null;

  const items = buildPageItems(page, totalPages);
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  // Mobile keeps a larger tap target (h-11 = 44px, matching the
  // Apple/Google touch-target guideline) since there are only three
  // controls to fit. The sm+ variant reverts to h-9, which is fine
  // with a mouse.
  const navButtonClass =
    "flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-card";

  const pageButtonClass = (isActive: boolean) =>
    `flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition-colors ${
      isActive
        ? "border-primary bg-primary text-primary-foreground"
        : "border-border bg-card text-foreground hover:bg-secondary"
    }`;

  return (
    <>
      {/* Mobile (< sm): prev / "Page X of Y" / next. At narrow widths
          the windowed numbered bar would overflow — and there is no
          room to offer meaningful page-jumping anyway. Same philosophy
          as the toolbar's mobile compression. */}
      <nav
        aria-label="Pagination"
        className="flex items-center justify-center gap-2 sm:hidden"
      >
        <button
          type="button"
          aria-label="Previous page"
          disabled={isFirst}
          onClick={() => onPageChange(page - 1)}
          className={navButtonClass}
        >
          <ChevronLeft size={18} />
        </button>

        <span className="min-w-[7rem] text-center text-sm font-medium text-foreground">
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          aria-label="Next page"
          disabled={isLast}
          onClick={() => onPageChange(page + 1)}
          className={navButtonClass}
        >
          <ChevronRight size={18} />
        </button>
      </nav>

      {/* sm+: full windowed numbered pagination. */}
      <nav
        aria-label="Pagination"
        className="hidden items-center justify-center gap-1.5 sm:flex"
      >
        <button
          type="button"
          aria-label="Previous page"
          disabled={isFirst}
          onClick={() => onPageChange(page - 1)}
          className={navButtonClass}
        >
          <ChevronLeft size={16} />
        </button>

        {items.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden
              className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`Page ${item}`}
              aria-current={item === page ? "page" : undefined}
              onClick={() => onPageChange(item)}
              className={pageButtonClass(item === page)}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="Next page"
          disabled={isLast}
          onClick={() => onPageChange(page + 1)}
          className={navButtonClass}
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </>
  );
}

export default Pagination;