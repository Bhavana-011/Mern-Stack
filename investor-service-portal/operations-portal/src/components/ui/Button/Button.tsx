import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

function Button({
  children,
  loading = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        w-full
        rounded-lg
        bg-blue-600
        px-4
        py-3
        font-medium
        text-white
        transition-colors
        hover:bg-blue-700
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button;