export interface ProjectImage {
  url: string;
  altText: string | null;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
  location: string | null;
  participantCount: number | null;
  volunteerCount: number | null;
  coverImage: ProjectImage | null;
  occasionCount: number;
  albumPublicId: string | null;
}

export interface PageResponse<T> {
  items: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}
