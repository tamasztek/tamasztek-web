export interface NewsImage {
  url: string;
  altText: string | null;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string | null;
  image: NewsImage;
}
