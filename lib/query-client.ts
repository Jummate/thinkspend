// lib/query-client.ts
import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,      // data stays "fresh" for 30s — no background refetch
        gcTime: 5 * 60 * 1000,      // inactive queries garbage-collected after 5min
        retry: 2,                    // retry twice on failure (default is 3)
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
        refetchOnWindowFocus: false, // App Router handles focus better than this
      },
      mutations: {
        retry: 0,                    // mutations don't retry — correct default
      },
    },
  });
}