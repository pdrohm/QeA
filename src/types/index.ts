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
  currentPage: number;
  hasMore: boolean;
  isLoading: boolean;
  addQuestion: (question: Omit<Question, 'id' | 'createdAt' | 'updatedAt' | 'isFavorite'>) => Promise<Question>;
  updateQuestion: (id: string, question: Partial<Question>) => Promise<void>;
  deleteQuestion: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  loadQuestions: (reset?: boolean) => Promise<void>;
  loadMoreQuestions: () => Promise<void>;
  getAnswer: (id: string) => Promise<void>;
  getFavoriteQuestions: () => Question[];
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}
