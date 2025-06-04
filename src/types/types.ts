export type Tour = {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  rating: number;
  language: string;
  difficulty: string;
  price: string;
  distance: string;
  category: string;
  audioUrl?: string;
  coordinates?: { lat: number; lng: number };
  fullDescription?: string;
  highlights?: string[];
};