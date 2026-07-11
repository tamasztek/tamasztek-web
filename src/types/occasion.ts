import type { ProjectImage } from "./project";

export interface Occasion {
  id: string;
  eventDate: string;
  description: string | null;
  participantCount: number | null;
  volunteerCount: number | null;
  coverImage: ProjectImage | null;
  albumPublicId: string | null;
}
