import { create } from "zustand";
import { openAIService } from "../services/api/openai";
import { questionsStorage } from "../services/storage/questionsStorage";
import { Question, QuestionStore } from "../types";

export const useQuestionsStore = create<QuestionStore>((set, get) => ({
  questions: [],
  favorites: [],

  addQuestion: async (questionData) => {
    try {
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: questionData.text,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

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
      set({ questions });
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

      const response = await openAIService.askQuestion(question.text);
      const answer = response.choices[0].message.content;

      await get().updateQuestion(id, { answer });
    } catch (error) {
      console.error("Erro ao obter resposta:", error);
      throw error;
    }
  },
}));
