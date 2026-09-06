"use client";

import { Check } from "lucide-react";
import { passwordRequirements } from "@/lib/validations/passwordRequirements";

interface PasswordRequirementsChecklistProps {
  password: string;
}

function PasswordRequirementsChecklist({
  password,
}: PasswordRequirementsChecklistProps) {
  return (
    <ul className="flex flex-col gap-1.5">
      {passwordRequirements.map((requirement) => {
        const met = requirement.test(password || "");
        return (
          <li
            key={requirement.id}
            className={`flex items-center gap-2 text-sm ${
              met ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                met
                  ? "border-primary bg-primary text-white"
                  : "border-muted-foreground/40"
              }`}
            >
              {met && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            {requirement.label}
          </li>
        );
      })}
    </ul>
  );
}

export default PasswordRequirementsChecklist;