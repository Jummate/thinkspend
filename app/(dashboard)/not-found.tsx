import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export default function DashboardNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <FileQuestion className="h-8 w-8 text-primary" />
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground">Page not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
      </div>

      <Link
        href={ROUTES.DASHBOARD}
        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-dark"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}