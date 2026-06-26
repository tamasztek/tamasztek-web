import type { Project, PageResponse } from "../types/project";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// A projekt-lista tabonkénti szűréssel: "current" = aktuális (jövőbeli is),
// "completed" = megvalósult. A szűrés és lapozás szerver oldalon történik.
export type ProjectFilter = "current" | "completed";

export async function fetchProjects(
  page: number,
  filter: ProjectFilter,
  size = 5
): Promise<PageResponse<Project>> {
  const res = await fetch(
    `${API_BASE}/web/projects?page=${page}&size=${size}&filter=${filter}`
  );
  if (!res.ok) throw new Error("Nem sikerült betölteni a projekteket");
  return res.json();
}
