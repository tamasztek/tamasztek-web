import type { Project, PageResponse } from "../types/project";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchProjects(
  page: number,
  size = 5
): Promise<PageResponse<Project>> {
  const res = await fetch(
    `${API_BASE}/web/projects?page=${page}&size=${size}`
  );
  if (!res.ok) throw new Error("Nem sikerült betölteni a projekteket");
  return res.json();
}
