import { Question } from '../../types';
import { STORAGE_KEYS } from '../api/config';
import { storage } from './storage';

export const questionsStorage = {
  async saveQuestions(questions: Question[]): Promise<void> {
    try {
      await storage.setItem(STORAGE_KEYS.QUESTIONS, questions);
    } catch (error) {
      console.error('Erro ao salvar perguntas:', error);
      throw new Error('Erro ao salvar perguntas');
    }
  },

  async getQuestions(): Promise<Question[]> {
    try {
      const questions = await storage.getItem<Question[]>(STORAGE_KEYS.QUESTIONS);
      return questions || [];
    } catch (error) {
      console.error('Erro ao buscar perguntas:', error);
      throw new Error('Falha ao buscar perguntas');
    }
  },

  async saveQuestion(question: Question): Promise<void> {
    try {
      const questions = await this.getQuestions();
      questions.unshift(question);
      await this.saveQuestions(questions);
    } catch (error) {
      console.error('Erro ao salvar pergunta:', error);
      throw new Error('Falha ao salvar pergunta');
    }
  },

  async updateQuestion(updatedQuestion: Question): Promise<void> {
    try {
      const questions = await this.getQuestions();
      const index = questions.findIndex(q => q.id === updatedQuestion.id);
      if (index !== -1) {
        questions[index] = updatedQuestion;
        await this.saveQuestions(questions);
      }
    } catch (error) {
      console.error('Erro ao atualizar pergunta:', error);
      throw new Error('Falha ao atualizar pergunta');
    }
  },

  async deleteQuestion(id: string): Promise<void> {
    try {
      const questions = await this.getQuestions();
      const filteredQuestions = questions.filter(q => q.id !== id);
      await this.saveQuestions(filteredQuestions);
    } catch (error) {
      console.error('Erro ao deletar pergunta:', error);
      throw new Error('Falha ao deletar pergunta');
    }
  },
}; 