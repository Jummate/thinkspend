"use client";

import Link from "next/link";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordFormData, forgotPasswordSchema } from "@/lib/validations/auth";
import { ROUTES } from "@/lib/routes";
import { Send } from "lucide-react";

interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  error?: string | null;
}

const ForgotPasswordForm = ({ onSubmit }: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  return (
    <div className="w-full">
      <form
        className="flex flex-col items-center justify-center w-full gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >


        <Link
          href={ROUTES.LOGIN}
          className="self-start text-xs text-primary cursor-pointer hover:underline"
        >
          ← Back to log in
        </Link>

        <FormInput
          id="email"
          label="Email"
          required
          type="email"
          placeholder="name@gmail.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          styles="font-bold flex items-center justify-center gap-4 shadow-xl"
        >
          {isSubmitting ? "Sending..." : "Send reset link"}
          {!isSubmitting && <Send />}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;