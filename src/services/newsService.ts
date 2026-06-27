import type { HomeWebResponse, NewsItem, NewsWebDto } from "../types/news";
import type { PageResponse } from "../types/project";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function mapNews(dto: NewsWebDto): NewsItem {
  return {
    id: dto.id,
    title: dto.title,
    content: dto.description,
    date: dto.publishedDate ? dto.publishedDate.replaceAll("-", ".") + "." : null,
    image: dto.coverImage,
  };
}

export async function fetchFeaturedNews(): Promise<NewsItem[]> {
  const res = await fetch(`${API_BASE}/web/home`);
  if (!res.ok) throw new Error("Nem sikerült betölteni a híreket");
  const data: HomeWebResponse = await res.json();
  return data.featuredNews.map(mapNews);
}

// A dedikált hírek oldal (/hirek) lapozott listája: minden hír (kiemelt és
// normál) megjelenési dátum szerint csökkenő sorrendben.
export async function fetchNews(
  page: number,
  size = 10
): Promise<PageResponse<NewsItem>> {
  const res = await fetch(`${API_BASE}/web/news?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Nem sikerült betölteni a híreket");
  const data: PageResponse<NewsWebDto> = await res.json();
  return { ...data, items: data.items.map(mapNews) };
}
