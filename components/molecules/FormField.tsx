import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Input } from "../atoms/Input";
import { cn } from "@/lib/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    textarea?: boolean;
}

// Helper specific for Textarea props since we are combining them
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean;
}

const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
    ({ label, textarea, className, ...props }, ref) => {
        return (
            <div className="w-full">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    {label}
                </label>
                {textarea ? (
                    <textarea
                        ref={ref as any}
                        className={cn(
                            "w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all min-h-[80px]",
                            className
                        )}
                        {...(props as any)}
                    />
                ) : (
                    <Input ref={ref as any} className={className} {...props} />
                )}
            </div>
        );
    }
);
FormField.displayName = "FormField";

export { FormField };
