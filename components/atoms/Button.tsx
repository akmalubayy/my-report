import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                disabled={isLoading || props.disabled}
                className={cn(
                    "inline-flex items-center justify-center rounded-xl font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
                    {
                        // Variants
                        "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/40": variant === "primary",
                        "bg-slate-100 text-slate-700 hover:bg-slate-200": variant === "secondary",
                        "bg-red-50 text-red-600 hover:bg-red-100": variant === "danger",
                        "bg-transparent text-slate-500 hover:bg-slate-50": variant === "ghost",
                        "border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900":
                            variant === "outline",

                        // Sizes
                        "px-3 py-1.5 text-xs": size === "sm",
                        "px-5 py-2.5 text-sm": size === "md",
                        "px-8 py-4 text-lg": size === "lg",
                    },
                    className
                )}
                {...props}
            >
                {isLoading && (
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                )}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
