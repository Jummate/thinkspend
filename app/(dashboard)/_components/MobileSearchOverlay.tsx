"use client";

import { ArrowLeft, Search } from "lucide-react";
import { useUser } from "@/lib/hooks/useUser";
import { currencyMapping } from "@/lib/types/profile";
import { useSearch } from "../_lib/useSearch";
import SearchResultsList from "./SearchResultsList";

interface MobileSearchOverlayProps {
  onClose: () => void;
}

function MobileSearchOverlay({ onClose }: MobileSearchOverlayProps) {
  const { profile } = useUser();
  const { query, setQuery, status, expenseResults, shortcutResults, clear } =
    useSearch();

  const currencySymbol = profile ? currencyMapping[profile.currency] : "";

  const handleSelect = () => {
    clear();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-card md:hidden">
      <div className="flex items-center gap-3 border-b border-border p-4">
        <button type="button" aria-label="Close search" onClick={onClose}>
          <ArrowLeft className="text-foreground" />
        </button>
        <div className="flex flex-1 items-center rounded-full bg-secondary px-3">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
            }}
            placeholder="Search transactions, insights"
            className="flex-1 border-none bg-transparent px-2 py-2 text-sm outline-none focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SearchResultsList
          status={status}
          query={query}
          expenseResults={expenseResults}
          shortcutResults={shortcutResults}
          currencySymbol={currencySymbol}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}

export default MobileSearchOverlay;