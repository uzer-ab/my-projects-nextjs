import { TechAndTools } from "@/components/ui/TechAndTools";
import { DownloadButton } from "@/components/ui/DownloadButton";
import type { HeaderData } from "./types";

export function Header() {
    const headerData: HeaderData = {
        name: "Uzair Ahmed",
        title: "Software Developer",
        bio: "Building things for the web",
        description: "Full-stack developer passionate about creating elegant solutions and meaningful digital experiences.",
        techAndTools: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "CicleCI", "AWS-Lambda"],
        resumeDownloadLink: "src/data/resumes/uzera.pdf"
    }

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

                    <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                        {headerData.techAndTools.map((elem: string, idx: number) => <TechAndTools key={idx} title={elem} />)}
                    </div>

                    <div className="pt-6">
                        <DownloadButton title="Download Resume" resumeLink={headerData.resumeDownloadLink || ""} resumeDownloadName={`${headerData.name.toLocaleLowerCase().replace(" ", "-")}-resume.pdf`} />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent"></div>
        </>
    );
}
