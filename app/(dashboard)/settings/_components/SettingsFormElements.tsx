import type { ElementType, ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import FieldLabel from "@/components/ui/FieldLabel";

export function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: ElementType;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-1 flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2">
          <Icon size={18} className="text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <p className="mb-6 ml-11 text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel>{label}</FieldLabel>
      {children}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}

export function SaveButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      fullWidth={false}
      styles="self-start flex items-center gap-2 font-semibold text-sm px-5 py-2"
    >
      <CheckCircle2 size={15} />
      {isSubmitting ? "Saving..." : "Save Changes"}
    </Button>
  );
}