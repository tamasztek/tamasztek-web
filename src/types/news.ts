export interface NewsImage {
  url: string;
  altText: string | null;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string | null;
  image: NewsImage | null;
}

export interface NewsWebDto {
  id: string;
  title: string;
  description: string;
  publishedDate: string;
  featured: boolean;
  coverImage: NewsImage | null;
}

export interface HomeWebResponse {
  featuredNews: NewsWebDto[];
}
