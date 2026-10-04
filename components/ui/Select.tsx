import React, { forwardRef } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

type SelectOption = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type SelectProps = {
  styles?: string;
  id?: string;
  placeholder?: string;
  error?: boolean;
  options: SelectOption[];
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ styles, id, placeholder, error, options, ...rest }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          id={id}
       className={clsx(
  "border rounded-lg p-2 px-3 w-full min-w-0 outline-none transition-colors appearance-none cursor-pointer",
  "focus:shadow-sm focus:ring-1",
  error
    ? "border-danger bg-danger/10 focus:border-danger focus:ring-danger"
    : "border-muted-foreground/30 focus:ring-primary",
  "disabled:cursor-not-allowed disabled:bg-secondary disabled:text-muted-foreground disabled:opacity-60 disabled:focus:ring-0",
  styles,
)}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown 
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" 
          size={16}
        />
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;