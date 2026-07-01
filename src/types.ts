export interface RoomStyle {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface RoomType {
  id: string;
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  roomType: string;
  style: string;
  beforeImage: string;
  afterImage: string;
  date: string;
  prompt: string;
  colorPalette: string;
  lighting: string;
}

export interface UserProfile {
  name: string;
  email: string;
  credits: number;
  maxCredits: number;
  avatarUrl: string;
  isPro: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  content: string;
  rating: number;
  designStyle: string;
}

export interface DesignConfig {
  roomType: string;
  styleId: string;
  colorPaletteId: string;
  lightingId: string;
  customPrompt: string;
  uploadedImage: string | null;
  uploadedImageName: string | null;
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[]; // hex codes
  description: string;
}

export interface LightingPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
}
