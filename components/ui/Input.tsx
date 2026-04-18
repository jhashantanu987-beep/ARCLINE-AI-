import React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, icon, ...props }, ref) => {
    return (
      <div className="w-full relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "flex w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 backdrop-blur-md transition-all duration-300",
            "focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:bg-white/10",
            "disabled:cursor-not-allowed disabled:opacity-50",
            icon && "pl-11",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500 mt-1 absolute -bottom-5 left-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
