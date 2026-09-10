"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import Input from "@/components/ui/Input";
import {
  changePasswordSchema,
  ChangePasswordFormData,
} from "@/lib/validations/settings";
import { changePassword } from "@/lib/services/settings.service";
import { supabase } from "@/lib/supabase/client";
import { showError, showSuccess } from "@/lib/ui/toast";
import { SettingsSection, Field, SaveButton } from "./SettingsFormElements";
import { passwordRequirements } from "@/lib/validations/passwordRequirements";

function PasswordSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched",
  });

  const requirementsText = passwordRequirements
  .map((r) => r.label.toLowerCase())
  .join(", ");

  const onPasswordSave = async (data: ChangePasswordFormData) => {
    try {
      await changePassword(supabase, data.newPassword);
      reset();
      showSuccess("Password changed successfully");
    } catch {
      showError("Failed to change password. Please try again.");
    }
  };

  return (
    <SettingsSection
      icon={Lock}
      title="Change Password"
    description={`Choose a strong password with ${requirementsText}.`}
    >
      <form
        onSubmit={handleSubmit(onPasswordSave)}
        className="flex flex-col gap-4"
      >
        <Field label="New Password" error={errors.newPassword?.message}>
          <Input
            id="newPassword"
            type="password"
            placeholder="New password"
            error={!!errors.newPassword}
            styles="rounded-lg px-3 py-2.5 text-sm"
            {...register("newPassword")}
          />
        </Field>
        <Field
          label="Confirm Password"
          error={errors.confirmPassword?.message}
        >
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            error={!!errors.confirmPassword}
            styles="rounded-lg px-3 py-2.5 text-sm"
            {...register("confirmPassword")}
          />
        </Field>
        <SaveButton isSubmitting={isSubmitting} />
      </form>
    </SettingsSection>
  );
}

export default PasswordSection;