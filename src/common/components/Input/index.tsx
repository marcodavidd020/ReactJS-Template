import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Componente Input reutilizable con soporte para íconos, mensajes de error y texto de ayuda
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = "",
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseInputClasses =
      "bg-gray-700 text-gray-200 border rounded-lg focus:ring-2 focus:border-transparent focus:outline-none transition";

    // Error classes
    const errorClasses = error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-600 focus:ring-blue-500";

    // Width classes
    const widthClasses = fullWidth ? "w-full" : "";

    // Padding classes based on icons
    const paddingClasses = leftIcon
      ? "pl-10"
      : props.type === "password"
      ? "pr-10"
      : "";

    // Combined classes
    const combinedClasses = `${baseInputClasses} ${errorClasses} ${widthClasses} ${paddingClasses} px-4 py-2.5 ${className}`;

    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}

          <input ref={ref} className={combinedClasses} {...props} />

          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
