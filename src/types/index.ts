export interface Question {
  id: string;
  text: string;
  answer?: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionStore {
  questions: Question[];
  addQuestion: (question: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>) => void;
  updateQuestion: (id: string, question: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}
