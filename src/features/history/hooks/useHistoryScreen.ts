import { useQuestionsStore } from '@/src/stores/questionsStore';
import { useEffect } from 'react';

export function useHistoryScreen() {
    const { questions, loadQuestions } = useQuestionsStore();

    useEffect(() => {
      loadQuestions();
    }, [loadQuestions]);

    return {
        questions,
    }
}