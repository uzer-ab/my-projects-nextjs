import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { prisma } from "@/data/prisma/client";

type Params = { user: string; id: string };
type Props = { params: Promise<Params> };

export default async function EditProjectPage({ params }: Props) {
    const session = await auth();
    const { user, id } = await params;

    if (!session?.user?.username || session.user.username !== user) {
        redirect("/auth/login");
    }

    const projectId = parseInt(id);
    if (isNaN(projectId)) {
        redirect(`/${user}/dashboard`);
    }

    const project = await prisma.projects.findUnique({
        where: { id: projectId },
        include: {
            tool: true,
            link: true,
            images: true,
        },
    });

    if (!project) {
        redirect(`/${user}/dashboard`);
    }

    // Transform data to match form interface
    const formattedProject = {
        id: project.id,
        name: project.name,
        description: project.description || "",
        show: project.show || true,
        tools: project.tool.map(t => ({ name: t.name, type: t.type || "tool", description: t.description || "" })),
        links: project.link.map(l => ({ title: l.title, url: l.url })),
        images: project.images.map(i => ({ url: i.url, alt: i.alt || "" })),
    };

    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4">
                <ProjectForm initialData={formattedProject} username={session.user.username} />
            </div>
        </div>
    );
}
