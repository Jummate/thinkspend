// components/ui/FormInput.tsx

import { forwardRef } from "react";
import Input from "./Input";
import FormLabel from "./FormLabel";

interface FormInputProps extends Omit<React.ComponentProps<typeof Input>, 'error'> {
  label: string;
  required?: boolean;
  error?: string;
  id: string;
  labelClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ 
    label, 
    required = false, 
    error, 
    id, 
    labelClassName,
    containerClassName,
    errorClassName,
    ...props 
  }, ref) => {
    return (
      <div className={`flex flex-col gap-2 w-full ${containerClassName || ''}`}>
        <FormLabel 
          htmlFor={id} 
          label={label} 
          required={required} 
          className={labelClassName}
        />
        <Input
          ref={ref}
          id={id}
          error={!!error}
          styles="text-sm"
          {...props}
        />
        {error && (
          <span className={`text-danger text-xs ${errorClassName || ''}`}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;