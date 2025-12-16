// src/app/[user]/projects/page.tsx
import { getUserProjects } from "@/data/projects/service";
import type {
  UserProjectsResult,
  GetUserProjectsParams,
} from "@/data/projects/types";

type Params = { user: string };
type Props = { params: Promise<Params> };

export default async function ProjectsPage({ params }: Props) {
  const { user: username } = await params;

  const result = await getUserProjects({
    username,
    opts: { onlyVisible: true },
  } as GetUserProjectsParams);

  if (!result) {
    return (
      <main>
        <h1>User {username}</h1>
        <p>No projects found.</p>
      </main>
    );
  }

  const { user, projects, tools, links } = result as UserProjectsResult;
  console.log({ user, projects, tools, links });
  return (
    <main>
      <h1>User {user.name ?? user.username} projects</h1>
      <ul>
        {Object.values(projects).map((p) => (
          <li key={p.id}>
            {p.name} - {p.tools}
          </li>
        ))}
      </ul>
    </main>
  );
}
