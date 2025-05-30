import { useSpeechRecognition } from '@/src/hooks/useSpeechRecognition';
import { openAIService } from '@/src/services/api/openai';
import { questionsStorage } from '@/src/services/storage/questionsStorage';
import theme from '@/src/theme/theme';
import { Question } from '@/src/types';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type SpeechStatus = 'idle' | 'listening' | 'processing' | 'error';

export function useHomeScreen() {
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [speechStatus, setSpeechStatus] = useState<SpeechStatus>('idle');
    const { isListening, transcript, startListening, stopListening, isSimulator } = useSpeechRecognition();
  
    useEffect(() => {
      if (transcript && !isListening) {
        setQuestion(transcript);
        setSpeechStatus('idle');
      }
    }, [transcript, isListening]);

    useEffect(() => {
      if (isSimulator) {
        Alert.alert(
          'Aviso',
          'O reconhecimento de fala pode não funcionar corretamente no simulador. Por favor, teste em um dispositivo físico.'
        );
      }
    }, [isSimulator]);

    const handleMicrophonePress = async () => {
      try {
        if (isListening) {
          setSpeechStatus('processing');
          await stopListening();
        } else {
          setSpeechStatus('listening');
          await startListening();
        }
      } catch (error) {
        console.error('Erro ao controlar o microfone:', error);
        setSpeechStatus('error');
        Alert.alert(
          'Erro',
          'Não foi possível acessar o microfone. Verifique as permissões do aplicativo.'
        );
      }
    };


    const handleSubmit = async () => {
      if (!question.trim() || isLoading) return;
  
      setIsLoading(true);
      const userMessage: Message = { role: 'user', content: question.trim() };
      setMessages([userMessage]);
  
      try {
        const response = await openAIService.askQuestion(question.trim());
        const answer = response.choices[0].message.content;
        
        const assistantMessage: Message = { role: 'assistant', content: answer };
        setMessages([userMessage, assistantMessage]);
        
        const newQuestion: Question = {
          id: Date.now().toString(),
          text: question.trim(),
          answer,
          isFavorite: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
  
        await questionsStorage.saveQuestion(newQuestion);
        router.push(`/question/${newQuestion.id}`);
        
        setQuestion('');
      } catch (error) {
        console.error('Error in chat:', error);
        Alert.alert(
          'Erro',
          'Não foi possível processar sua pergunta. Por favor, tente novamente.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    const pulseAnim = useSharedValue(1);
    const opacityAnim = useSharedValue(1);
  
    useEffect(() => {
      if (isListening) {
        pulseAnim.value = withRepeat(
          withSequence(
            withTiming(1.3, { duration: 800, easing: Easing.inOut(Easing.ease) }),
            withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
          ),
          -1
        );
  
        opacityAnim.value = withRepeat(
          withSequence(
            withTiming(0.6, { duration: 800, easing: Easing.inOut(Easing.ease) }),
            withTiming(0.2, { duration: 800, easing: Easing.inOut(Easing.ease) })
          ),
          -1
        );
      } else {
        pulseAnim.value = withTiming(1);
        opacityAnim.value = withTiming(1);
      }
    }, [isListening]);

    const pulseStyle = useAnimatedStyle(() => ({
      transform: [{ scale: pulseAnim.value }],
    }));

    const opacityStyle = useAnimatedStyle(() => ({
      opacity: opacityAnim.value,
    }));
  
    const getMicrophoneColor = () => {
      switch (speechStatus) {
        case 'listening':
          return theme.colors.error;
        case 'processing':
          return theme.colors.primary;
        case 'error':
          return theme.colors.error;
        default:
          return theme.colors.primary;
      }
    };
  
    const getMicrophoneIcon = () => {
      switch (speechStatus) {
        case 'listening':
          return 'microphone';
        case 'processing':
          return 'microphone';
        case 'error':
          return 'microphone-off';
        default:
          return 'microphone';
      }
    };

    const handleClearPress = () => {
      setQuestion('');
    };

    return {
      question,
      isLoading,
      messages,
      isListening,
      speechStatus,
      handleSubmit,
      setQuestion,
      handleMicrophonePress,
      handleClearPress,
      isSimulator,
      pulseAnim,
      opacityAnim,
      pulseStyle,
      opacityStyle,
      getMicrophoneColor,
      getMicrophoneIcon,
    };
}