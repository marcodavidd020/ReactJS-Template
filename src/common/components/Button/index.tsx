import React, { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Componente Button reutilizable con diferentes variantes, tamaños y estados.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  // Base classes
  const baseClasses =
    "font-medium rounded-lg transition-all duration-200 flex items-center justify-center";

  // Size classes
  const sizeClasses = {
    sm: "py-1.5 px-3 text-sm",
    md: "py-2.5 px-4 text-base",
    lg: "py-3 px-5 text-lg",
  };

  // Variant classes
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/20 hover:opacity-95 transform hover:-translate-y-0.5",
    secondary: "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white",
    outline:
      "bg-transparent border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white",
    text: "bg-transparent text-gray-300 hover:text-white hover:bg-gray-800/50",
  };

  // Width class
  const widthClass = fullWidth ? "w-full" : "";

  // Disabled class
  const disabledClass =
    disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  // Combined classes
  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`;

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}

      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
