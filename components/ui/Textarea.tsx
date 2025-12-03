import { TextareaHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#2A2A2A] mb-2">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-4 py-3 text-lg border border-[#E4E4E4] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C8C80] focus:border-transparent resize-none",
            error && "border-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };

