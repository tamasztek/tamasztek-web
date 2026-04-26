export interface AlbumImage {
  url: string;
  altText: string | null;
}

export interface AlbumSummary {
  publicId: string;
  name: string;
  coverImage: AlbumImage | null;
  imageCount: number;
}

export interface AlbumDetail {
  publicId: string;
  name: string;
  coverImage: AlbumImage | null;
  images: AlbumImage[];
}
