export type Project = {
  name: string;
  tagline: string;
  description: string;
  period?: string;
  imageUrl?: string;
  tags: string[];
  bullets: string[];
  urls: {
    repo?: string;
    liveDemo?: string;
  };
  featured?: boolean;
};

export type Projects = Project[];
