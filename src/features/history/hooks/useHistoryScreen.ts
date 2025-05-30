import { questionsStorage } from '@/src/services/storage/questionsStorage';
import { Question } from '@/src/types';
import { useEffect, useState } from 'react';

export function useHistoryScreen() {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
      loadQuestions();
    }, []);
  
    const loadQuestions = async () => {
      try {
        const loadedQuestions = await questionsStorage.getQuestions();
        setQuestions(loadedQuestions);
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    };

    return {
        questions,
    }

}