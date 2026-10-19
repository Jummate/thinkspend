import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

/**
 * A grey, pulsing placeholder. Compose it with width/height classes to
 * mimic the shape of whatever content is loading.
 *
 * No variants baked in — callers control shape entirely via className.
 */
function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      aria-hidden="true"
    />
  );
}

export default Skeleton;