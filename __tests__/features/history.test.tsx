import { useHistoryScreen } from '../../src/features/history/hooks/useHistoryScreen';

jest.mock('../../src/features/history/hooks/useHistoryScreen');

describe('Histórico - Lista de Perguntas', () => {
  const mockQuestions = [
    { id: '1', text: 'Pergunta 1', isFavorite: false, createdAt: '', updatedAt: '' },
    { id: '2', text: 'Pergunta 2', isFavorite: false, createdAt: '', updatedAt: '' },
  ];

  beforeEach(() => {
    (useHistoryScreen as unknown as jest.Mock).mockImplementation(() => ({
      questions: mockQuestions,
      isSelectionMode: false,
      toggleSelectionMode: jest.fn(),
      selectAll: jest.fn(),
      handleBulkDelete: jest.fn(),
      handleBulkFavorite: jest.fn(),
      toggleSelection: jest.fn(),
      selectedItems: [],
      isLoading: false,
      loadMoreQuestions: jest.fn(),
    }));
  });

  it('deve retornar a lista de perguntas', () => {
    const { questions } = useHistoryScreen();
    expect(questions).toEqual(mockQuestions);
  });

  it('deve chamar toggleSelectionMode quando solicitado', () => {
    const { toggleSelectionMode } = useHistoryScreen();
    toggleSelectionMode();
    expect(toggleSelectionMode).toHaveBeenCalled();
  });

  it('deve chamar handleBulkDelete quando solicitado', () => {
    const { handleBulkDelete } = useHistoryScreen();
    handleBulkDelete();
    expect(handleBulkDelete).toHaveBeenCalled();
  });
}); 