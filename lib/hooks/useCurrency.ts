"use client";

import { useUser } from "@/lib/hooks/useUser";
import { DEFAULT_CURRENCY, type CurrencyCode } from "@/lib/config/currencies";


export function useCurrency(): CurrencyCode {
  const { profile } = useUser();
  return profile?.currency ?? DEFAULT_CURRENCY;
}