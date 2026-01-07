// src/app/[user]/projects/page.tsx
import { auth } from "@/lib/auth";
import { PortfolioControls } from "@/components/PortfolioControls";
import { getUserProjects } from "@/data/projects/service";
import { Header } from "@/components/Header";
import type {
  UserProjectsResult,
  GetUserProjectsParams,
} from "@/data/projects/types";
import { Projects } from "@/components/Projects";
import { prisma } from "@/data/prisma/client";
import type { HeaderData } from "@/components/types";

type Params = { user: string };
type Props = { params: Promise<Params> };

export default async function PortfolioPage({ params }: Props) {
  const { user: username } = await params;
  const session = await auth();
  const isOwner = session?.user?.username === username;

  // Fetch user profile for header
  const userProfile = await prisma.users.findUnique({
    where: { username },
    select: {
      name: true,
      title: true,
      bio: true,
      description: true,
      techStack: true,
      resumeUrl: true,
      githubUrl: true,
      linkedinUrl: true,
    },
  });

  const result = await getUserProjects({
    username,
    opts: { onlyVisible: true },
  } as GetUserProjectsParams);

  if (!result || !userProfile) {
    return (
      <main>
        <h1>User {username}</h1>
        <p>No projects found.</p>
      </main>
    );
  }

  console.log("######: ", result);

  const { projects, tools, links } = result as UserProjectsResult;

  const headerData: HeaderData = {
    name: userProfile.name,
    title: userProfile.title || "Developer",
    bio: userProfile.bio || "",
    description: userProfile.description || "",
    techAndTools: userProfile.techStack || [],
    resumeDownloadLink: userProfile.resumeUrl,
    githubUrl: userProfile.githubUrl,
    linkedinUrl: userProfile.linkedinUrl,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PortfolioControls username={username} isOwner={!!isOwner} />
      <header className="relative overflow-hidden">
        <Header headerData={headerData} />
      </header>

      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12">
        <Projects projects={projects} tools={tools} links={links} />
      </main>
    </div>
  );
}

