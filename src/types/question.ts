export interface Question {
  id: string;
  text: string;
  answer?: string;
  image?: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  status?: 'pending' | 'completed';
} 