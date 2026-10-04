import Link from "next/link";
import { Clock } from "lucide-react";
import AuthCard from "./AuthCard";
import AuthCardHeader from "./AuthCardHeader";
import { ROUTES } from "@/lib/routes";
import StatusIcon from "../ui/StatusIcon";

function ExpiredLinkCard() {
  return (
    <AuthCard>
      <AuthCardHeader
        icon={<StatusIcon icon={Clock} variant="warning" />}
        title="This link has expired"
      />

      <div className="flex flex-col items-center gap-5 px-8 pb-9">
        <p className="-mt-2 text-center text-[13.5px] leading-relaxed text-muted-foreground">
          Password reset links are only valid for 1 hour, and this one&apos;s
          past that. No harm done — your password hasn&apos;t changed. Just
          request a fresh link.
        </p>

        <Link
          href={ROUTES.FORGOT_PASSWORD}
          className="flex w-full items-center justify-center rounded-lg bg-primary/90 p-2 font-bold text-white transition-colors hover:bg-primary"
        >
          Request a new link
        </Link>

        <p className="text-sm text-muted-foreground">
          Remembered your password?{" "}
          <Link
            href={ROUTES.LOGIN}
            className="font-bold text-primary hover:underline"
          >
            Back to log in
          </Link>
        </p>
      </div>
    </AuthCard>
  );
}

export default ExpiredLinkCard;