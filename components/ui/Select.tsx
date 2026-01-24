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
            "border rounded-lg p-2 bg-white px-3 w-full outline-none transition-colors appearance-none cursor-pointer",
            "focus:shadow-sm focus:ring-1",
            error
              ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-500"
              : "border-muted-foreground/30 focus:ring-primary",
            styles
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