import * as FileSystem from "expo-file-system";
import { create } from "zustand";
import { openAIService } from "../services/api/openai";
import { questionsStorage } from "../services/storage/questionsStorage";
import { Question, QuestionStore } from "../types";

const isFileUri = (uri: string) => uri.startsWith('file://');
const isBase64DataUri = (uri: string) => uri.startsWith('data:image/');

export const useQuestionsStore = create<QuestionStore>((set, get) => ({
  questions: [],
  favorites: [],

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

  loadQuestions: async () => {
    try {
      const questions = await questionsStorage.getQuestions();
      
      const verifiedQuestions = await Promise.all(
        questions.map(async (question) => {
          if (question.image) {
            if (isFileUri(question.image)) {
              const fileInfo = await FileSystem.getInfoAsync(question.image);
              if (!fileInfo.exists) {
                return { ...question, image: undefined };
              }
            }
          }
          return question;
        })
      );

      set({ questions: verifiedQuestions });
      get().getFavoriteQuestions();
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
      throw error;
    }
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
          const base64Data = base64.startsWith('data:image/') 
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
