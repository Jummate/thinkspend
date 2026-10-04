"use client";

import { formatExpenseTimestamp } from "@/lib/utils/date";

interface AddedTimestampProps {
  /** Postgres timestamptz, e.g. "2026-08-27T16:12:00.000Z" */
  iso: string;
}


export default function AddedTimestamp({ iso }: AddedTimestampProps) {
  return <>{formatExpenseTimestamp(iso)}</>;
}