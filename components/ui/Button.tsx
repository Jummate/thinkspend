import clsx from "clsx";
import React, { ReactNode } from "react";

type ButtonProps = {
  type?: "submit" | "button";
  onClick?: () => void;
  children: ReactNode;
  styles?: string;
  disabled?: boolean;
};

const Button = ({
  type = "button",
  styles,
  children,
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "bg-primary/90 text-white w-full rounded-lg p-2 cursor-pointer hover:bg-primary",
        styles
      )}
    >
      {children}
    </button>
  );
};

export default Button;
