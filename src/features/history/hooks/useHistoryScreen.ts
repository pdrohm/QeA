import { useQuestionsStore } from '@/src/stores/questionsStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export function useHistoryScreen() {
    const { questions, loadQuestions } = useQuestionsStore();

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                await loadQuestions();
            };
            loadData();
        }, [loadQuestions])
    );

    return {
        questions,
    }
}