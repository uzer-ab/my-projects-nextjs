type TechAndToolsProps = {
    title: string
}

export function TechAndTools(props: TechAndToolsProps) {
    const { title } = props;
    return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50 text-sm font-mono text-muted-foreground">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-code-xml h-3.5 w-3.5 text-primary"
            >
                <path d="m18 16 4-4-4-4" />
                <path d="m6 8-4 4 4 4" />
                <path d="m14.5 4-5 16" />
            </svg>
            {title}
        </span>
    )
}