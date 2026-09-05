interface FormLabelProps {
  htmlFor: string;
  label: string;
  required?: boolean;
  className?: string;
}

export default function FormLabel({
  htmlFor,
  label,
  required = false,
  className = "",
}: FormLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`self-start text-sm ${className}`}
    >
      {label}
      {required && <sup className="text-danger">*</sup>}
    </label>
  );
}