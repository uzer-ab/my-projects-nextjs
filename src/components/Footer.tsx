export function Footer() {
    return (
        <div className="container max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <p className="font-mono">&lt;/&gt; by
                    <a href="https://github.com/uzer-ab" target="_blank"
                        rel="noopener noreferrer" className="hover:text-primary transition-colors"> Uzair</a>
                </p>
                <div className="flex items-center gap-6">
                    <a href="https://github.com/uzer-ab" target="_blank"
                        rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
                    <a href="https://www.linkedin.com/in/uzera/" target="_blank"
                        rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
                </div>
            </div>
        </div>
    )
}