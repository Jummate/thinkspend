"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import PasswordRequirementsChecklist from "./PasswordRequirementsChecklist";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/lib/validations/auth";

interface ResetPasswordFormProps {
  email: string;
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
}

const ResetPasswordForm = ({ email, onSubmit }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const password = watch("password") || "";

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <p className="-mt-2 text-center text-[13.5px] leading-relaxed text-muted-foreground">
        For <span className="font-bold text-foreground">{email}</span>.
        Make it something you haven&apos;t used before.
      </p>

      <form
        className="flex w-full flex-col items-center justify-center gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          id="password"
          label="New Password"
          required
          type="password"
          placeholder="Enter a new password"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="-mt-2 w-full">
          <PasswordRequirementsChecklist password={password} />
        </div>

        <FormInput
          id="confirmPassword"
          label="Confirm New Password"
          required
          type="password"
          placeholder="Re-enter your new password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          styles="font-bold flex items-center justify-center gap-4 shadow-xl"
        >
          {isSubmitting ? (
            "Resetting..."
          ) : (
            <>
              Reset Password <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;