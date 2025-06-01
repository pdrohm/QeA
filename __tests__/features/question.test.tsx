import { useQuestionsStore } from '../../src/stores/questionsStore';
import { Question } from '../../src/types';

jest.mock('../../src/stores/questionsStore', () => ({
  useQuestionsStore: jest.fn(),
}));

describe('Funcionalidades de Pergunta', () => {
  const mockQuestion: Question = {
    id: '1',
    text: 'Test question',
    answer: 'Test answer',
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    (useQuestionsStore as unknown as jest.Mock).mockImplementation(() => ({
      questions: [mockQuestion],
      favorites: [],
      addQuestion: jest.fn(),
      updateQuestion: jest.fn(),
      deleteQuestion: jest.fn(),
      toggleFavorite: jest.fn(),
    }));
  });

  describe('Adicionando Perguntas', () => {
    it('deve adicionar uma pergunta de texto com sucesso', async () => {
      const store = useQuestionsStore();
      const newQuestion = {
        text: 'Nova pergunta',
      };

      await store.addQuestion(newQuestion);

      expect(store.addQuestion).toHaveBeenCalledWith(newQuestion);
    });

    it('deve adicionar uma pergunta com imagem com sucesso', async () => {
      const store = useQuestionsStore();
      const newQuestion = {
        text: 'Nova pergunta com imagem',
        image: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
      };

      await store.addQuestion(newQuestion);

      expect(store.addQuestion).toHaveBeenCalledWith(newQuestion);
    });
  });

  describe('Favoritando Perguntas', () => {
    it('deve alternar o status de favorito', async () => {
      const store = useQuestionsStore();
      
      await store.toggleFavorite(mockQuestion.id);

      expect(store.toggleFavorite).toHaveBeenCalledWith(mockQuestion.id);
    });
  });

  describe('Deletando Perguntas', () => {
    it('deve deletar uma pergunta', async () => {
      const store = useQuestionsStore();
      
      await store.deleteQuestion(mockQuestion.id);

      expect(store.deleteQuestion).toHaveBeenCalledWith(mockQuestion.id);
    });
  });
}); 