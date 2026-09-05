"use client";

import Link from "next/link";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/lib/validations/auth";
import { ROUTES } from "@/lib/routes";

interface SignUpFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  error?: string | null;
}

const   SignUpForm = ({ onSubmit }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const hasConsented = watch("consent");

  return (
    <form
      className="flex flex-col items-center justify-center w-full gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex-1 min-w-0">
          <FormInput
            id="firstName"
            label="First Name"
            required
            placeholder="Yakub"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
        </div>

        <div className="flex-1 min-w-0">
          <FormInput
            id="lastName"
            label="Last Name"
            required
            placeholder="Jumat"
            error={errors.lastName?.message}
            {...register("lastName")}
          />
        </div>
      </div>

      <FormInput
        id="email"
        label="Email"
        required
        type="email"
        placeholder="name@gmail.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <FormInput
        id="password"
        label="Password"
        required
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password")}
      />

      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        required
        type="password"
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <label className="flex w-full items-start gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-primary"
          {...register("consent")}
        />
        <span className="text-sm leading-relaxed text-muted-foreground">
          I&apos;ve read and agree to the{" "}
          <Link
            href={ROUTES.TERMS}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={ROUTES.PRIVACY}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-primary hover:underline"
          >
            Privacy Policy
          </Link>
        </span>
      </label>
      {errors.consent && (
        <span className="self-start text-danger text-xs">
          {errors.consent.message}
        </span>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || !hasConsented}
        styles="font-bold flex items-center justify-center gap-4 shadow-xl"
      >
        {isSubmitting ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  );
};

export default SignUpForm;