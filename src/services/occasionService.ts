import type { Occasion } from "../types/occasion";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Egy projekt összes alkalma az accordion-listához (eseménydátum szerint csökkenő).
export async function fetchProjectOccasions(
  projectPublicId: string
): Promise<Occasion[]> {
  const res = await fetch(
    `${API_BASE}/web/projects/${projectPublicId}/occasions`
  );
  if (!res.ok) throw new Error("Nem sikerült betölteni az alkalmakat.");
  return res.json();
}
