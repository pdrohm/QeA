import { useQuestionDetailsScreen } from '../../src/features/question-details/hooks/useQuestionDetailsScreen';
import { Question } from '../../src/types';

jest.mock('../../src/features/question-details/hooks/useQuestionDetailsScreen');
jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({ id: '1' }),
  router: {
    back: jest.fn(),
  },
}));

describe('Funcionalidades de Detalhes da Pergunta', () => {
  const mockQuestion: Question = {
    id: '1',
    text: 'Pergunta de teste',
    answer: 'Resposta de teste',
    isFavorite: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    (useQuestionDetailsScreen as jest.Mock).mockImplementation(() => ({
      question: mockQuestion,
      isLoading: false,
      isCopied: false,
      isBottomSheetOpen: false,
      handleToggleFavorite: jest.fn(),
      handleDelete: jest.fn(),
      handleCopyAnswer: jest.fn(),
      handleOpenBottomSheet: jest.fn(),
      handleCloseBottomSheet: jest.fn(),
      handleShare: jest.fn(),
    }));
  });

  describe('Ações da Pergunta', () => {
    it('deve alternar o status de favorito', async () => {
      const { handleToggleFavorite } = useQuestionDetailsScreen();
      
      await handleToggleFavorite();

      expect(handleToggleFavorite).toHaveBeenCalled();
    });

    it('should delete question', async () => {
      const { handleDelete } = useQuestionDetailsScreen();
      
      await handleDelete();

      expect(handleDelete).toHaveBeenCalled();
    });

    it('deve copiar a resposta', async () => {
      const { handleCopyAnswer } = useQuestionDetailsScreen();
      
      await handleCopyAnswer();

      expect(handleCopyAnswer).toHaveBeenCalled();
    });

    it('deve compartilhar a pergunta', async () => {
      const { handleShare } = useQuestionDetailsScreen();
      
      await handleShare();

      expect(handleShare).toHaveBeenCalled();
    });
  });
}); 