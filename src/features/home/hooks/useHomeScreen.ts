import { openAIService } from '@/src/services/api/openai';
import { questionsStorage } from '@/src/services/storage/questionsStorage';

import { Question } from '@/src/types';
import { router } from 'expo-router';
import { useState } from 'react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};
export function useHomeScreen() {
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
  
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
      } finally {
        setIsLoading(false);
      }
    };
return {
    question,
    isLoading,
    messages,
    handleSubmit,
    setQuestion,
}
}