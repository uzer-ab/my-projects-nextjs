export type RawRow = {
  // projects
  project_id: number;
  project_name: string;
  project_description: string;
  project_show: boolean;
  project_created_at: Date;
  project_tool_id: number | null;
  project_user_id: number;

  // users
  user_id: number;
  user_username: string;
  user_name: string | null;

  // tools
  tool_id: number | null;
  tool_name: string | null;
  tool_type: string | null;

  // links
  link_id: number | null;
  link_project_id: number | null;
  link_title: string | null;
  link_url: string;
};

export type GetUserProjectOrThrowType = {
  username: string;
  projectId: number;
};

export type GetUserProjectsOptions = {
  onlyVisible?: boolean;
};

export type GetUserProjectsParams = {
  username: string;
  opts?: GetUserProjectsOptions;
};

// src/data/projects/types.ts
export type ProjectType = {
  id: number;
  name: string;
  description: string;
  show: boolean;
  createdAt: Date;
  tools: number[];
  links: number[];
};

export type ProjectDTO = Record<number, ProjectType>;

export type UserDTO = {
  id: number;
  username: string;
  name: string | null;
};

export type ToolsMap = Record<
  number,
  { id: number; name: string; type: string }
>;
export type LinksMap = Record<
  number,
  { id: number; title: string; url: string }
>;

export type UserProjectsResult = {
  user: UserDTO;
  projects: ProjectDTO;
  tools: ToolsMap;
  links: LinksMap;
};
