import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import { create } from "zustand";
import { openAIService } from "../services/api/openai";
import { questionsStorage } from "../services/storage/questionsStorage";
import { Question, QuestionStore } from "../types";
import { isBase64DataUri, isFileUri } from "../utils/fileutils";


const ITEMS_PER_PAGE = Platform.OS === 'android' ? 5 : 8;

export const useQuestionsStore = create<QuestionStore>((set, get) => ({
  questions: [],
  favorites: [],
  currentPage: 0,
  hasMore: true,
  isLoading: false,

  addQuestion: async (questionData) => {
    try {
      const newQuestion: Question = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: questionData.text,
        image: questionData.image,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (newQuestion.image) {
        if (isFileUri(newQuestion.image)) {
          await FileSystem.getInfoAsync(newQuestion.image);
        }
      }

      await questionsStorage.saveQuestion(newQuestion);

      set((state) => ({
        questions: [newQuestion, ...state.questions],
      }));

      return newQuestion;
    } catch (error) {
      console.error("Erro ao adicionar pergunta:", error);
      throw error;
    }
  },

  updateQuestion: async (id, updates) => {
    try {
      const currentQuestions = get().questions;
      const questionIndex = currentQuestions.findIndex((q) => q.id === id);

      if (questionIndex === -1) return;

      const updatedQuestion = {
        ...currentQuestions[questionIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      if (updates.image) {
        if (isFileUri(updates.image)) {
          await FileSystem.getInfoAsync(updates.image);
        }
      }

      await questionsStorage.updateQuestion(updatedQuestion);

      set((state) => ({
        questions: state.questions.map((q) =>
          q.id === id ? updatedQuestion : q
        ),
      }));

      if ("isFavorite" in updates) {
        get().getFavoriteQuestions();
      }
    } catch (error) {
      console.error("Erro ao atualizar pergunta:", error);
      throw error;
    }
  },

  deleteQuestion: async (id) => {
    try {
      const question = get().questions.find((q) => q.id === id);
      
      if (question?.image && isFileUri(question.image)) {
        try {
          const fileInfo = await FileSystem.getInfoAsync(question.image);
          if (fileInfo.exists) {
            await FileSystem.deleteAsync(question.image);
          }
        } catch (error) {
          console.error('Erro ao deletar imagem:', error);
        }
      }

      await questionsStorage.deleteQuestion(id);

      set((state) => ({
        questions: state.questions.filter((q) => q.id !== id),
      }));

      get().getFavoriteQuestions();
    } catch (error) {
      console.error("Erro ao deletar pergunta:", error);
      throw error;
    }
  },

  toggleFavorite: async (id) => {
    try {
      const question = get().questions.find((q) => q.id === id);
      if (!question) return;

      const updatedQuestion = {
        ...question,
        isFavorite: !question.isFavorite,
        updatedAt: new Date().toISOString(),
      };

      await questionsStorage.updateQuestion(updatedQuestion);

      set((state) => ({
        questions: state.questions.map((q) =>
          q.id === id ? updatedQuestion : q
        ),
      }));
      get().getFavoriteQuestions();
    } catch (error) {
      console.error("Erro ao alternar favorito:", error);
      throw error;
    }
  },

  loadQuestions: async (reset = false) => {
    try {
      set({ isLoading: true });

      const questions = await questionsStorage.getQuestions();
      const startIndex = reset ? 0 : get().currentPage * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedQuestions = questions.slice(0, endIndex);
      const hasMore = endIndex < questions.length;

      set((state) => ({
        questions: reset ? paginatedQuestions : [...state.questions, ...paginatedQuestions.slice(state.questions.length)],
        currentPage: reset ? 1 : state.currentPage + 1,
        hasMore,
        isLoading: false,
      }));

      get().getFavoriteQuestions();
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  loadMoreQuestions: async () => {
    const { hasMore, isLoading } = get();
    if (!hasMore || isLoading) return;
    await get().loadQuestions();
  },

  getFavoriteQuestions: () => {
    const questions = get().questions;
    const favorites = questions.filter((q) => q.isFavorite);
    set({ favorites });
    return favorites;
  },

  getAnswer: async (id) => {
    try {
      const question = get().questions.find((q) => q.id === id);
      if (!question || question.answer) return;

      let response;
      if (question.image) {
        if (isBase64DataUri(question.image)) {
          response = await openAIService.analyzeImage(question.image, question.text);
        } else if (isFileUri(question.image)) {
          const base64 = await FileSystem.readAsStringAsync(question.image, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const base64Data = isBase64DataUri(base64) 
            ? base64 
            : `data:image/jpeg;base64,${base64}`;
          response = await openAIService.analyzeImage(base64Data, question.text);
        } else {
          response = await openAIService.askQuestion(question.text);
        }
      } else {
        response = await openAIService.askQuestion(question.text);
      }

      if (!response) {
        throw new Error('Falha ao obter resposta do OpenAI');
      }

      const answer = response.choices[0].message.content;
      await get().updateQuestion(id, { answer });
    } catch (error) {
      console.error("Erro ao obter resposta:", error);
      throw error;
    }
  },
}));
