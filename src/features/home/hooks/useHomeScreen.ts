import { useImageHandler } from '@/src/hooks/useImageHandler';
import { useSpeechRecognition } from "@/src/hooks/useSpeechRecognition";
import { openAIService } from "@/src/services/api/openai";
import { questionsStorage } from "@/src/services/storage/questionsStorage";
import theme from "@/src/theme/theme";
import { Question } from '@/src/types/question';
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type SpeechStatus = "idle" | "listening" | "processing" | "error";

const ANIMATION_CONFIG = {
  duration: 800,
  easing: Easing.inOut(Easing.ease),
  scale: {
    min: 1,
    max: 1.3,
  },
  opacity: {
    min: 0.2,
    max: 0.6,
  },
};

export function useHomeScreen() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>("idle");
  const [selectedImage, setSelectedImage] = useState<string | undefined>();

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSimulator,
  } = useSpeechRecognition();

  const pulseAnim = useSharedValue(1);
  const opacityAnim = useSharedValue(1);

  const { pickImage, saveImage } = useImageHandler();

  useEffect(() => {
    if (transcript && !isListening) {
      setQuestion(transcript);
      setSpeechStatus("idle");
    }
  }, [transcript, isListening]);

  useEffect(() => {
    if (isSimulator) {
      Alert.alert(
        "Aviso",
        "O reconhecimento de fala pode não funcionar corretamente no simulador. Por favor, teste em um dispositivo físico."
      );
    }
  }, [isSimulator]);

  useEffect(() => {
    if (isListening) {
      startListeningAnimation();
    } else {
      stopListeningAnimation();
    }
  }, [isListening]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseAnim.value }],
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacityAnim.value,
  }));

  const startListeningAnimation = () => {
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(ANIMATION_CONFIG.scale.max, {
          duration: ANIMATION_CONFIG.duration,
          easing: ANIMATION_CONFIG.easing,
        }),
        withTiming(ANIMATION_CONFIG.scale.min, {
          duration: ANIMATION_CONFIG.duration,
          easing: ANIMATION_CONFIG.easing,
        })
      ),
      -1
    );

    opacityAnim.value = withRepeat(
      withSequence(
        withTiming(ANIMATION_CONFIG.opacity.max, {
          duration: ANIMATION_CONFIG.duration,
          easing: ANIMATION_CONFIG.easing,
        }),
        withTiming(ANIMATION_CONFIG.opacity.min, {
          duration: ANIMATION_CONFIG.duration,
          easing: ANIMATION_CONFIG.easing,
        })
      ),
      -1
    );
  };

  const stopListeningAnimation = () => {
    pulseAnim.value = withTiming(1);
    opacityAnim.value = withTiming(1);
  };

  const getMicrophoneColor = () => {
    if (isLoading) {
      return theme.colors.gray;
    }

    switch (speechStatus) {
      case "listening":
      case "error":
        return theme.colors.error;
      case "processing":
        return theme.colors.primary;
      default:
        return theme.colors.primary;
    }
  };

  const getMicrophoneIcon = () => {
    return speechStatus === "error" ? "microphone-off" : "microphone";
  };

  const handleImageSearch = async () => {
    try {
      const imageInfo = await pickImage();
      if (!imageInfo) return;

      const savedImagePath = await saveImage(imageInfo);
      if (!savedImagePath) {
        throw new Error('Falha ao salvar imagem');
      }

      setSelectedImage(savedImagePath);
    } catch (error) {
      console.error('Erro ao processar imagem:', error);
      Alert.alert('Erro', 'Falha ao processar imagem. Por favor, tente novamente.');
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(undefined);
    setQuestion("");
  };

  const handleMicrophonePress = async () => {
    try {
      if (isListening) {
        setSpeechStatus("processing");
        await stopListening();
      } else {
        setSpeechStatus("listening");
        await startListening();
      }
    } catch (error) {
      console.error("Erro ao controlar o microfone:", error);
      setSpeechStatus("error");
      Alert.alert(
        "Erro",
        "Não foi possível acessar o microfone. Verifique as permissões do aplicativo."
      );
    }
  };


  const saveQuestionToStorage = async (question: Question) => {
    await questionsStorage.saveQuestion(question);
    router.push(`/question/${question.id}`);
  };

  const getQuestionResponse = async (question: Question) => {
    try {
      if (question.image) {
        const base64 = await FileSystem.readAsStringAsync(question.image, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const base64Data = `data:image/jpeg;base64,${base64}`;
        const response = await openAIService.analyzeImage(
          base64Data,
          question.text
        );
        
        if (!response || !response.choices || !response.choices[0]?.message?.content) {
          throw new Error('Resposta inválida do OpenAI');
        }
        
        return response;
      }
      return await openAIService.askQuestion(question.text);
    } catch (error) {
      console.error('Erro ao obter resposta da pergunta:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    try {
      if (!question.trim() && !selectedImage) return;

      setIsLoading(true);

      const newQuestion: Question = {
        id: Date.now().toString(),
        text: question.trim() || "Analise esta imagem e me diga o que você vê.",
        image: selectedImage,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isFavorite: false,
        status: 'pending',
      };

      const response = await getQuestionResponse(newQuestion);
      if (!response || !response.choices || !response.choices[0]?.message?.content) {
        throw new Error('Falha ao obter resposta do OpenAI');
      }

      const updatedQuestion: Question = {
        ...newQuestion,
        answer: response.choices[0].message.content,
        status: 'completed',
      };

      await saveQuestionToStorage(updatedQuestion);
      setQuestion('');
      setSelectedImage(undefined);

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      Alert.alert('Erro', 'Falha ao enviar mensagem. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    question,
    isLoading,
    isListening,
    speechStatus,
    selectedImage,
    handleSubmit: handleSendMessage,
    setQuestion,
    handleMicrophonePress,
    handleClearPress: () => setQuestion(""),
    handleImageSearch,
    handleRemoveImage,
    isSimulator,
    pulseAnim,
    opacityAnim,
    pulseStyle,
    opacityStyle,
    getMicrophoneColor,
    getMicrophoneIcon,
  };
}
