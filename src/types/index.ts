export interface Question {
  id: string;
  text: string;
  answer?: string;
  image?: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionStore {
  questions: Question[];
  favorites: Question[];
  addQuestion: (question: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>) => Promise<Question>;
  updateQuestion: (id: string, question: Partial<Question>) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  loadQuestions: () => Promise<void>;
  getAnswer: (id: string) => Promise<void>;
  getFavoriteQuestions: () => Question[];
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}
