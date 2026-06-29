export interface PosterSkill {
  code: string;
  description: string;
  imageUrl?: string;
}

export interface PosterMeta {
  subject: string;
  phase: string;
  year: string;
  theme: string;
  brand: string;
  /** Optional header mascot image (defaults to the Solvie number mascot). */
  mascot?: string;
}

export interface FooterData {
  brand: string;
}
