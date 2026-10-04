"use client";

import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";
import { ROUTES } from "@/lib/routes";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  return (
    <div className="w-full">
      <form
        className="flex flex-col items-center justify-center w-full gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <Link
          href={ROUTES.FORGOT_PASSWORD}
          className="self-end -mt-3 text-xs text-primary cursor-pointer hover:underline"
        >
          Forgot Password?
        </Link>

        <Button
          type="submit"
          disabled={isSubmitting}
          styles="font-bold flex items-center justify-center gap-4 shadow-xl"
        >
          {isSubmitting ? "Logging in..." : "Log In"} <LogIn size={20} />
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;