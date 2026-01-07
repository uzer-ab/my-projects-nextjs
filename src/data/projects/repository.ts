// src/data/projects/repository.ts
import { prisma } from "@/data/prisma/client";
import type {
  RawRow,
  UserProjectsResult,
  ProjectDTO,
  ToolsMap,
  LinksMap,
} from "./types";
export class ProjectsRepository {
  async findById(id: number) {
    return prisma.projects.findUnique({
      where: { id },
    });
  }

  async findByUsername(username: string, onlyVisible = true) {
    const where: any = {
      username: username,
    };

    if (onlyVisible) {
      where.show = true;
    }

    const projectsData = await prisma.projects.findMany({
      where,
      include: {
        user: true,
        tool: true,
        link: true,
      },
      orderBy: { created_at: "desc" },
    });

    if (projectsData.length === 0) {
      return null;
    }

    const firstProject = projectsData[0];
    const user = {
      id: firstProject.user.id,
      username: firstProject.user.username,
      name: firstProject.user.name,
    };

    const projects: ProjectDTO = {};
    const tools: ToolsMap = {};
    const links: LinksMap = {};

    for (const p of projectsData) {
      const toolIds: number[] = [];
      const linkIds: number[] = [];

      // Process tools
      for (const t of p.tool) {
        if (!tools[t.id]) {
          tools[t.id] = {
            id: t.id,
            name: t.name,
            type: t.type,
          };
        }
        toolIds.push(t.id);
      }

      // Process links
      for (const l of p.link) {
        if (!links[l.id]) {
          links[l.id] = {
            id: l.id,
            title: l.title,
            url: l.url,
          };
        }
        linkIds.push(l.id);
      }

      projects[p.id] = {
        id: p.id,
        name: p.name,
        description: p.description,
        show: p.show,
        createdAt: p.created_at,
        tools: toolIds,
        links: linkIds,
      };
    }

    return { user, projects, tools, links } as UserProjectsResult;
  }
}

// singleton instance
export const projectsRepository = new ProjectsRepository();
