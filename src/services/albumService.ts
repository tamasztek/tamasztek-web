import type { AlbumSummary, AlbumDetail } from "../types/album";
import type { PageResponse } from "../types/project";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchAlbums(
  page: number,
  size = 20
): Promise<PageResponse<AlbumSummary>> {
  const res = await fetch(`${API_BASE}/web/albums?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Nem sikerült betölteni az albumokat");
  return res.json();
}

export async function fetchAlbum(publicId: string): Promise<AlbumDetail> {
  const res = await fetch(`${API_BASE}/web/albums/${publicId}`);
  if (!res.ok) throw new Error("Nem sikerült betölteni az albumot");
  return res.json();
}
