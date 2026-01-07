import type { LinksMap, ProjectDTO, ToolsMap } from "@/data/projects/types"
import { Project } from "./ui/ProjectCard"
import type { ProjectType } from "@/data/projects/types"

type ProjectsProps = {
    projects: ProjectDTO,
    tools: ToolsMap,
    links: LinksMap
}

export function Projects(props: ProjectsProps) {
    const { projects, tools, links } = props
    const projectsList = Object.values(projects);
    return (
        <section className="py-20 px-4">
            <div className="container max-w-6xl mx-auto">
                <div className="text-center mb-16 animate-fade-up">
                    <p className="text-primary font-mono text-sm mb-3 tracking-wider">
            // MY WORK
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A collection of projects I've built, ranging from full-stack
                        applications to developer tools.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    {projectsList.map((project: ProjectType, idx: number) =>
                        <Project key={idx} project={project} tools={tools} links={links} />
                    )}
                </div>

                <div className="text-center mt-12 animate-fade-up" style={{ animationDelay: '600ms' }}>
                    <a
                        href="https://github.com/uzer-ab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 font-mono text-sm"
                    >
                        View more on GitHub <span className="text-primary">→</span>
                    </a>
                </div>
            </div>
        </section>
    )
}
