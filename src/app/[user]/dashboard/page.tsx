import { auth } from "@/lib/auth";
import { prisma } from "@/data/prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
    DashboardTabs,
    ProfileTab,
    AboutTab,
    TechStackTab,
    PortfolioTab,
    ResumeTab,
} from "@/components/dashboard";

// Tab icons
const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
);

const InfoIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
    </svg>
);

const CodeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
);

const FolderIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
);

const FileIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
);

export default async function Dashboard() {
    const session = await auth();

    if (!session?.user?.username) {
        redirect("/auth/login");
    }

    const user = await prisma.users.findUnique({
        where: { username: session.user.username },
        select: {
            name: true,
            username: true,
            title: true,
            bio: true,
            description: true,
            techStack: true,
            resumeUrl: true,
            githubUrl: true,
            linkedinUrl: true,
        },
    });

    if (!user) {
        redirect("/auth/login");
    }

    const tabs = [
        { id: "profile", label: "Profile", icon: UserIcon },
        { id: "about", label: "About Me", icon: InfoIcon },
        { id: "tech", label: "Tech Stack", icon: CodeIcon },
        { id: "portfolio", label: "Portfolio", icon: FolderIcon },
        { id: "resume", label: "Resume", icon: FileIcon },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Background */}
            <div className="fixed inset-0 -z-10">
                <div
                    className="absolute inset-0 opacity-30"
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
            </div>

            {/* Content */}
            <div className="container max-w-5xl mx-auto px-4 py-12">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Manage your profile and portfolio settings
                        </p>
                    </div>
                    <Link
                        href={`/${user.username}/portfolio`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium text-sm"
                    >
                        <span>View Portfolio</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
                            <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        </svg>
                    </Link>
                </div>

                <DashboardTabs tabs={tabs} defaultTab="profile">
                    <ProfileTab
                        initialData={{
                            name: user.name,
                            username: user.username,
                        }}
                    />
                    <AboutTab
                        initialData={{
                            title: user.title || "",
                            bio: user.bio || "",
                            description: user.description || "",
                            githubUrl: user.githubUrl || "",
                            linkedinUrl: user.linkedinUrl || "",
                        }}
                    />
                    <TechStackTab
                        initialData={user.techStack || []}
                    />
                    <PortfolioTab
                        username={user.username}
                    />
                    <ResumeTab
                        initialData={{
                            resumeUrl: user.resumeUrl,
                        }}
                    />
                </DashboardTabs>
            </div>
        </div>
    );
}