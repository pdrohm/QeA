import { useSpeechRecognition } from "@/src/hooks/useSpeechRecognition";
import { openAIService } from "@/src/services/api/openai";
import { questionsStorage } from "@/src/services/storage/questionsStorage";
import theme from "@/src/theme/theme";
import { Question } from "@/src/types";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
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

interface Message {
  role: "user" | "assistant";
  content: string;
}

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
  const [messages, setMessages] = useState<Message[]>([]);
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
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permissão necessária",
          "Precisamos de permissão para acessar sua galeria de imagens."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
        base64: true,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        setSelectedImage(selectedImage.uri);
        setQuestion("Analise esta imagem e me diga o que você vê.");
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Erro",
        "Não foi possível selecionar a imagem. Por favor, tente novamente."
      );
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

  const processImage = async (imageUri: string): Promise<string> => {
    if (imageUri.startsWith("data:image")) {
      return imageUri;
    }

    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/jpeg;base64,${base64}`;
  };

  const saveQuestionToStorage = async (
    userMessage: Message,
    answer: string
  ) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: userMessage.content,
      answer,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await questionsStorage.saveQuestion(newQuestion);
    router.push(`/question/${newQuestion.id}`);
  };

  const createMessages = (
    question: string,
    answer: string,
    hasImage: boolean
  ): Message[] => {
    const userMessage: Message = {
      role: "user",
      content: hasImage
        ? `[Imagem]\n${
            question.trim() || "Analise esta imagem e me diga o que você vê."
          }`
        : question.trim(),
    };
    const assistantMessage: Message = { role: "assistant", content: answer };
    return [userMessage, assistantMessage];
  };

  const getQuestionResponse = async (
    question: string,
    imageBase64?: string
  ) => {
    if (imageBase64) {
      return await openAIService.analyzeImage(
        imageBase64,
        question.trim() || "Analise esta imagem e me diga o que você vê."
      );
    }
    return await openAIService.askQuestion(question.trim());
  };

  const handleSubmit = async () => {
    if ((!question.trim() && !selectedImage) || isLoading) return;

    setIsLoading(true);
    let imageBase64 = "";

    try {
      if (selectedImage) {
        try {
          imageBase64 = await processImage(selectedImage);
        } catch (error) {
          console.error("Error processing image:", error);
          Alert.alert(
            "Erro",
            "Não foi possível processar a imagem. Por favor, tente novamente."
          );
          return;
        }
      }

      const response = await getQuestionResponse(question, imageBase64);
      const answer = response.choices[0].message.content;

      const messages = createMessages(question, answer, !!selectedImage);
      setMessages(messages);

      await saveQuestionToStorage(messages[0], answer);

      setQuestion("");
      setSelectedImage(undefined);
    } catch (error) {
      console.error("Error in chat:", error);
      Alert.alert(
        "Erro",
        "Não foi possível processar sua pergunta. Por favor, tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    question,
    isLoading,
    messages,
    isListening,
    speechStatus,
    selectedImage,
    handleSubmit,
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
