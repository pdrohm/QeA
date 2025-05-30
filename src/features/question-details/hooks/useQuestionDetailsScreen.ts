import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { questionsStorage } from "../../../services/storage/questionsStorage";
import { useQuestionsStore } from "../../../stores/questionsStore";
import { Question } from "../../../types";

export function useQuestionDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const { toggleFavorite, deleteQuestion } = useQuestionsStore();

  const loadQuestion = useCallback(async () => {
    try {
      const questions = await questionsStorage.getQuestions();
      const foundQuestion = questions.find((q) => q.id === id);
      setQuestion(foundQuestion || null);
    } catch (error) {
      console.error("Error loading question:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadQuestion();
  }, [loadQuestion]);

  const handleToggleFavorite = async () => {
    if (!question) return;

    setQuestion((prev: Question | null) =>
      prev
        ? {
            ...prev,
            isFavorite: !prev.isFavorite,
          }
        : null
    );

    try {
      await toggleFavorite(question.id);
    } catch (error) {
      setQuestion((prev: Question | null) =>
        prev
          ? {
              ...prev,
              isFavorite: !prev.isFavorite,
            }
          : null
      );
      console.error("Error toggling favorite:", error);
    }
  };

  const handleDelete = async () => {
    if (!question) return;
    await deleteQuestion(question.id);
    router.back();
  };

  const handleCopyAnswer = async () => {
    if (!question?.answer) return;

    try {
      await Clipboard.setStringAsync(question.answer);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  return {
    question,
    isLoading,
    isCopied,
    handleToggleFavorite,
    handleDelete,
    handleCopyAnswer,
  };
}
