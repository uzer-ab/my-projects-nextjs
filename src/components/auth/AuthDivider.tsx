type AuthDividerProps = {
    text?: string;
};

export function AuthDivider({ text = "or continue with" }: AuthDividerProps) {
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-card text-muted-foreground">{text}</span>
            </div>
        </div>
    );
}
