"use client";

import React, { forwardRef, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  styles?: string;
  type?: "email" | "password" | "text" | "date";
  id?: string;
  placeholder?: string;
  error?: boolean;
  /**
   * "default" gives a primary focus ring; "danger" gives a danger focus
   * ring without the error treatment (no red border, no tinted
   * background). Used by the delete-account "type DELETE" input, where
   * the danger color is intentional, not a validation state.
   */
  variant?: "default" | "danger";
  containerStyles?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      styles,
      containerStyles,
      type = "text",
      id,
      placeholder,
      error,
      variant = "default",
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const borderAndRing = error
      ? "border-danger bg-danger/10 focus:outline-none focus:ring-1 focus:ring-danger"
      : variant === "danger"
        ? "border-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-danger"
        : "border-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-primary";

    if (type !== "password") {
      return (
        <div
          className={clsx(
            "flex relative items-center w-full min-w-0",
            containerStyles,
          )}
        >
          <input
            ref={ref}
            type={type}
            id={id}
            placeholder={placeholder}
            className={clsx(
              "border rounded-lg p-2 flex-1 min-w-0 placeholder:text-muted-foreground transition-colors",
              borderAndRing,
              styles,
            )}
            {...rest}
          />
        </div>
      );
    }

    return (
      <div
        className={clsx(
          "flex relative items-center w-full min-w-0",
          containerStyles,
        )}
      >
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          className={clsx(
            "border rounded-lg p-2 pr-9 flex-1 min-w-0 placeholder:text-muted-foreground transition-colors",
            borderAndRing,
            styles,
          )}
          {...rest}
        />
        {showPassword ? (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            title="Hide Password"
            onClick={() => setShowPassword(false)}
          >
            <EyeOff className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            title="Show Password"
            onClick={() => setShowPassword(true)}
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;