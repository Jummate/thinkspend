"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useUser } from "@/lib/hooks/useUser";
import { currencyMapping } from "@/lib/types/profile";
import { useSearch } from "../_lib/useSearch";
import SearchResultsList from "./SearchResultsList";

function DesktopSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { profile } = useUser();
  const { query, setQuery, status, expenseResults, shortcutResults, clear } =
    useSearch();

  const currencySymbol = profile ? currencyMapping[profile.currency] : "";

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = () => {
    setIsOpen(false);
    clear();
  };

  return (
    <div className="relative w-xs" ref={containerRef}>
      <div className="flex items-center rounded-full bg-secondary px-3 transition-all focus-within:bg-card focus-within:ring-2 focus-within:ring-primary">
        <Search size={16} className="text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsOpen(false);
          }}
          placeholder="Search transactions, insights"
          className="flex-1 border-none bg-transparent px-2 py-2 text-sm outline-none focus:outline-none focus:ring-0"
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-border bg-card shadow-lg">
          <SearchResultsList
            status={status}
            query={query}
            expenseResults={expenseResults}
            shortcutResults={shortcutResults}
            currencySymbol={currencySymbol}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
}

export default DesktopSearch;