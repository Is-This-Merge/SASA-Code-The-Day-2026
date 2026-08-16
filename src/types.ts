export type MoodType = 
  | 'HAPPY' 
  | 'GRATEFUL' 
  | 'CALM' 
  | 'NOSTALGIC' 
  | 'INSPIRED' 
  | 'AWE' 
  | 'QUIET' 
  | 'MORNING' 
  | 'CONNECTED' 
  | 'PEACEFUL';

export interface Reflection {
  id: string;
  author?: string;
  text: string;
  date: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export interface MomentItem {
  id: string;
  title: string;
  date: string; // e.g. "OCT 12, 2023" or "2023-10-12"
  rawDate: string; // ISO date for sorting
  time?: string;
  location?: string;
  weather?: string;
  moods: MoodType[];
  primaryMood?: MoodType;
  story: string;
  secondaryStory?: string;
  images: string[];
  secondaryImage?: string;
  isPolaroidFrame?: boolean;
  isQuoteCard?: boolean;
  quoteText?: string;
  likes: number;
  isLiked?: boolean;
  comments: Comment[];
  reflections: Reflection[];
}

export interface UserProfile {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  location: string;
  memberSince: string;
  streakDays: number;
  totalMoments: number;
  placesVisited: number;
}
