"use client";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/validations/auth";


interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  error?: string | null; // Auth error from parent
}

const LoginForm = ({error, onSubmit}:LoginFormProps) => {
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
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    <form
      className="flex flex-col items-center justify-center w-full gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-1 flex-col gap-2 w-full">
        <label
          htmlFor="email"
          className="self-start"
        >
          Email <sup className="text-red-600">*</sup>
        </label>
        <Input
          type="email"
          id="email"
          placeholder="name@gmail.com"
          error={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-600 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 w-full">
        <label
          htmlFor="password"
          className="self-start"
        >
          Password <sup className="text-red-600">*</sup>
        </label>
        <Input
          type="password"
          id="password"
          placeholder="Enter your password"
          error={!!errors.password}
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-600 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <Link
        href="/forgot-password"
        className="self-end -mt-3 text-sm text-primary cursor-pointer hover:underline"
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
