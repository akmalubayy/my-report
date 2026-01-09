import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "primary" | "secondary" | "outline";
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant = "primary", children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "px-2 py-1 text-[10px] font-bold rounded-md uppercase inline-flex items-center",
                    {
                        "bg-blue-50 text-blue-600": variant === "primary",
                        "bg-slate-100 text-slate-500": variant === "secondary",
                        "border border-slate-200 text-slate-500": variant === "outline",
                    },
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Badge.displayName = "Badge";

export { Badge };
