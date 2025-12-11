import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[#3C8C80] text-white hover:bg-[#2d6b62] focus:ring-[#3C8C80]",
      secondary:
        "bg-white text-[#3C8C80] border-2 border-[#3C8C80] hover:bg-[#F2F7F5] focus:ring-[#3C8C80]",
      accent:
        "bg-[#E6B84C] text-[#2A2A2A] hover:bg-[#d4a43d] focus:ring-[#E6B84C]",
      outline:
        "border-2 border-[#E4E4E4] text-[#2A2A2A] hover:border-[#3C8C80] hover:text-[#3C8C80] focus:ring-[#3C8C80]",
      ghost:
        "text-[#3C8C80] hover:bg-[#F2F7F5] focus:ring-[#3C8C80]",
    };

    const sizes = {
      sm: "px-4 py-2 text-base",
      md: "px-6 py-3 text-lg",
      lg: "px-8 py-4 text-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Načítava sa...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };



