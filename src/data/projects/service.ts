// src/data/projects/service.ts
import { projectsRepository } from "./repository";
import type {
  GetUserProjectOrThrowType,
  GetUserProjectsParams,
  UserProjectsResult,
} from "./types";

export async function getUserProjects({
  username,
  opts,
}: GetUserProjectsParams): Promise<UserProjectsResult | null> {
  if (!username) {
    throw new Error("Invalid user id");
  }

  return projectsRepository.findByUsername(username, opts?.onlyVisible);
}

export async function getUserProjectOrThrow({
  username,
  projectId,
}: GetUserProjectOrThrowType) {
  const project = await projectsRepository.findById(projectId);

  if (!project || project.username !== username) {
    throw new Error("Project not found or does not belong to user");
  }

  return project;
}
