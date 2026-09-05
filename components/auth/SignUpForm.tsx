"use client";

import Link from "next/link";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/lib/validations/auth";
import { ROUTES } from "@/lib/routes";

interface SignUpFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  error?: string | null;
}

const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
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
        <div className="flex flex-col flex-1 min-w-0 gap-2">
          <label
            htmlFor="firstName"
            className="self-start"
          >
            First Name <sup className="text-danger">*</sup>
          </label>
          <Input
            type="text"
            id="firstName"
            styles="rounded-lg"
            containerStyles="bg-secondary"
            placeholder="Yakub"
            error={!!errors.firstName}
            {...register("firstName")}
          />
          {errors.firstName && (
            <span className="text-danger text-sm">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col flex-1 min-w-0 gap-2">
          <label
            htmlFor="lastName"
            className="self-start"
          >
            Last Name <sup className="text-danger">*</sup>
          </label>
          <Input
            type="text"
            id="lastName"
            styles="rounded-lg"
            containerStyles="bg-secondary"
            placeholder="Jumat"
            error={!!errors.lastName}
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className="text-danger text-sm">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 w-full">
        <label
          htmlFor="email"
          className="self-start"
        >
          Email <sup className="text-danger">*</sup>
        </label>
        <Input
          type="email"
          id="email"
          styles="rounded-lg"
          containerStyles="bg-secondary"
          placeholder="name@gmail.com"
          error={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <span className="text-danger text-sm">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 w-full">
        <label
          htmlFor="password"
          className="self-start"
        >
          Password <sup className="text-danger">*</sup>
        </label>
        <Input
          type="password"
          id="password"
          styles="rounded-lg"
          containerStyles="bg-secondary"
          placeholder="Enter your password"
          error={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <span className="text-danger text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 w-full">
        <label
          htmlFor="confirmPassword"
          className="self-start"
        >
          Confirm Password <sup className="text-danger">*</sup>
        </label>
        <Input
          type="password"
          id="confirmPassword"
          styles="rounded-lg"
          containerStyles="bg-secondary"
          placeholder="Re-enter your password"
          error={!!errors.confirmPassword}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="text-danger text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

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
        <span className="self-start text-danger text-sm">
          {errors.consent.message}
        </span>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || !hasConsented}
        styles="font-bold flex items-center justify-center gap-4 shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creating account..." : "Sign up"}
      </Button>
    </form>
  );
};

export default SignUpForm;