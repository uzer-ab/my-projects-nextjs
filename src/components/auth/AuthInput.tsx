import { InputHTMLAttributes } from "react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    rightLabel?: React.ReactNode;
};

export function AuthInput({ label, rightLabel, id, ...props }: AuthInputProps) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label htmlFor={id} className="text-sm font-medium text-foreground">
                    {label}
                </label>
                {rightLabel}
            </div>
            <input
                id={id}
                {...props}
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
            />
        </div>
    );
}
