import { TechAndTools } from "@/components/ui/TechAndTools";
import { DownloadButton } from "@/components/ui/DownloadButton";
import type { HeaderData } from "./types";

interface HeaderProps {
    headerData: HeaderData;
}

export function Header({ headerData }: HeaderProps) {
    return (
        <>
            <div
                className="absolute inset-0 opacity-50"
                style={{ background: "var(--gradient-hero)" }}
            />
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Content */}
            <div className="relative container max-w-6xl mx-auto px-4 py-20 md:py-28">
                <div className="text-center space-y-6 animate-fade-up">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                        {headerData.name}<br />
                    </h1>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/50 border border-border/50 glow mb-4">
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
                            className="lucide lucide-terminal h-8 w-8 text-primary"
                        >
                            <polyline points="4 17 10 11 4 5" />
                            <line x1="12" x2="20" y1="19" y2="19" />
                        </svg>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient tracking-tight">
                        {headerData.title}<br />
                        <span className="text-white">{headerData.bio}</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        {headerData.description}
                    </p>

                    {headerData.techAndTools.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 max-w-3xl mx-auto">
                            {headerData.techAndTools.map((elem: string, idx: number) => <TechAndTools key={idx} title={elem} />)}
                        </div>
                    )}

                    {/* Social Links */}
                    {(headerData.githubUrl || headerData.linkedinUrl) && (
                        <div className="flex items-center justify-center gap-4 pt-2">
                            {headerData.githubUrl && (
                                <a
                                    href={headerData.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-secondary/50 border border-border/50 hover:bg-secondary hover:border-primary/50 transition-colors"
                                    title="GitHub"
                                >
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            )}
                            {headerData.linkedinUrl && (
                                <a
                                    href={headerData.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-secondary/50 border border-border/50 hover:bg-secondary hover:border-primary/50 transition-colors"
                                    title="LinkedIn"
                                >
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}

                    {headerData.resumeDownloadLink && (
                        <div className="pt-6">
                            <DownloadButton title="Download Resume" resumeLink={headerData.resumeDownloadLink || ""} resumeDownloadName={`${headerData.name.toLocaleLowerCase().replace(" ", "-")}-resume.pdf`} />
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent"></div>
        </>
    );
}

