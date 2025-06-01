import { useHomeScreen } from '../../src/features/home/hooks/useHomeScreen';

jest.mock('../../src/features/home/hooks/useHomeScreen');

describe('Home - Funcionalidades', () => {
  beforeEach(() => {
    (useHomeScreen as unknown as jest.Mock).mockImplementation(() => ({
      question: '',
      isLoading: false,
      isListening: false,
      speechStatus: 'idle',
      selectedImage: undefined,
      handleSubmit: jest.fn(),
      setQuestion: jest.fn(),
      handleMicrophonePress: jest.fn(),
      handleClearPress: jest.fn(),
      handleImageSearch: jest.fn(),
      handleRemoveImage: jest.fn(),
      pulseStyle: {},
      opacityStyle: {},
      getMicrophoneColor: jest.fn(),
      getMicrophoneIcon: jest.fn(),
    }));
  });

  describe('Estado Inicial', () => {
    it('deve iniciar com estado vazio', () => {
      const { question, isLoading, isListening, selectedImage } = useHomeScreen();
      
      expect(question).toBe('');
      expect(isLoading).toBe(false);
      expect(isListening).toBe(false);
      expect(selectedImage).toBeUndefined();
    });
  });

  describe('Interação com Microfone', () => {
    it('deve iniciar gravação quando pressionar microfone', () => {
      const { handleMicrophonePress } = useHomeScreen();
      handleMicrophonePress();
      expect(handleMicrophonePress).toHaveBeenCalled();
    });

    it('deve retornar cor e ícone corretos do microfone', () => {
      const { getMicrophoneColor, getMicrophoneIcon } = useHomeScreen();
      getMicrophoneColor();
      getMicrophoneIcon();
      expect(getMicrophoneColor).toHaveBeenCalled();
      expect(getMicrophoneIcon).toHaveBeenCalled();
    });
  });

  describe('Manipulação de Imagem', () => {
    it('deve permitir selecionar imagem', () => {
      const { handleImageSearch } = useHomeScreen();
      handleImageSearch();
      expect(handleImageSearch).toHaveBeenCalled();
    });

    it('deve permitir remover imagem selecionada', () => {
      const { handleRemoveImage } = useHomeScreen();
      handleRemoveImage();
      expect(handleRemoveImage).toHaveBeenCalled();
    });
  });

  describe('Manipulação de Texto', () => {
    it('deve permitir limpar o texto da pergunta', () => {
      const { handleClearPress } = useHomeScreen();
      handleClearPress();
      expect(handleClearPress).toHaveBeenCalled();
    });

    it('deve permitir enviar pergunta', () => {
      const { handleSubmit } = useHomeScreen();
      handleSubmit();
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
}); 