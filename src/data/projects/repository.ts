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

  async findByUsername(username: string, show = true) {
    const rows = await prisma.$queryRaw<RawRow[]>`
    SELECT
      p.id          AS project_id,
      p.name        AS project_name,
      p.description AS project_description,
      p.show        AS project_show,
      p.created_at  AS project_created_at,
      p.username    AS project_username,

      u.id          AS user_id,
      u.username    AS user_username,
      u.name        AS user_name,

      t.id          AS tool_id,
      t.project_id  AS tool_project_id,
      t.name        AS tool_name,

      pl.id         AS link_id,
      pl.project_id AS link_project_id,
      pl.title      AS link_title,
      pl.url        AS link_url

    FROM projects p
    JOIN users u ON u.username = p.username
    LEFT JOIN tools t ON t.project_id = p.id
    LEFT JOIN project_links pl ON pl.project_id = p.id
    WHERE u.username = ${username} AND p.show = ${show}
    ORDER BY p.created_at DESC
  `;

    if (rows.length === 0) {
      return null;
    }

    const first = rows[0];

    const user = {
      id: first.user_id,
      username: first.user_username,
      name: first.user_name,
    };

    const projects: ProjectDTO = {};
    const tools: ToolsMap = {};
    const links: LinksMap = {};

    const projectToolAndLinksMap: Record<
      number,
      { tools: number[]; links: number[] }
    > = {};

    for (const r of rows) {
      if (!projectToolAndLinksMap[r.project_id]) {
        projectToolAndLinksMap[r.project_id] = { tools: [], links: [] };
      }
      const entry = projectToolAndLinksMap[r.project_id];

      // tools
      if (r.tool_id != null) {
        if (!tools[r.tool_id]) {
          tools[r.tool_id] = {
            id: r.tool_id,
            name: r.tool_name!,
          };
        }
        if (!entry.tools.includes(r.tool_id)) {
          entry.tools.push(r.tool_id);
        }
      }

      // links
      if (r.link_id != null) {
        if (!links[r.link_id]) {
          links[r.link_id] = {
            id: r.link_id,
            title: r.link_title!,
            url: r.link_url!,
          };
        }
        if (!entry.links.includes(r.link_id)) {
          entry.links.push(r.link_id);
        }
      }
    }

    for (const r of rows) {
      const existing = projects[r.project_id];

      if (!existing) {
        const toolIds = projectToolAndLinksMap[r.project_id].tools;
        const linkIds = projectToolAndLinksMap[r.project_id].links;

        projects[r.project_id] = {
          id: r.project_id,
          name: r.project_name,
          description: r.project_description,
          show: r.project_show,
          createdAt: r.project_created_at,
          tools: toolIds ? Array.from(toolIds) : [],
          links: linkIds ? Array.from(linkIds) : [],
        };
      }
    }

    return { user, projects, tools, links } as UserProjectsResult;
  }
}

// singleton instance
export const projectsRepository = new ProjectsRepository();
