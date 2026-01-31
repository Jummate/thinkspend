import React, { forwardRef, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  styles?: string;
  type?: "email" | "password" | "text" | "date";
  id?: string;
  placeholder?: string;
  error: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>; // Add this to accept all input props

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ styles, type = "text", id, placeholder, error, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    if (type !== "password") {
      return (
        <div className="flex relative items-center w-full bg-white">
          <input
            ref={ref}
            type={type}
            id={id}
            placeholder={placeholder}
            className={clsx(
              "border p-2 rounded-lg flex-1 placeholder:text-muted-foreground transition-colors",
              error
                ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
                : "border-muted-foreground/30",
              styles
            )}
            {...rest} // Spread the rest of the props (including register props)
          />
        </div>
      );
    }

    return (
      <div className="flex relative items-center w-full bg-white">
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          id={id}
          placeholder={placeholder}
          className={clsx(
            "border p-2 rounded-lg flex-1 placeholder:text-muted-foreground transition-colors",
            error
              ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
              : "border-muted-foreground/30",
            // : "border-primary",
            styles
          )}
          //   className={clsx(
          //     "border border-primary p-2 rounded-lg flex-1 placeholder:text-muted-foreground",
          //     styles
          //   )}
          {...rest} // Spread the rest of the props
        />
        {showPassword ? (
          <button
            type="button"
            className="absolute right-0"
            title="Hide Password"
            onClick={() => setShowPassword(false)}
          >
            <EyeOff className="pr-2" />
          </button>
        ) : (
          <button
            type="button"
            className="absolute right-0"
            title="Show Password"
            onClick={() => setShowPassword(true)}
          >
            <Eye className="pr-2" />
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
