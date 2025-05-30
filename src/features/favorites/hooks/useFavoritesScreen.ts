import { useQuestionsStore } from '@/src/stores/questionsStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export function useFavoritesScreen() {
    const { favorites, getFavoriteQuestions } = useQuestionsStore();

    useFocusEffect(
        useCallback(() => {
            getFavoriteQuestions();
        }, [getFavoriteQuestions])
    );

    return {
        favorites,
    }
}