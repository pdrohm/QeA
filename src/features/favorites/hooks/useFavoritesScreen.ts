import { useQuestionsStore } from '@/src/stores/questionsStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';

export function useFavoritesScreen() {
    const { favorites, getFavoriteQuestions, toggleFavorite } = useQuestionsStore();

    useFocusEffect(
        useCallback(() => {
            getFavoriteQuestions();
        }, [getFavoriteQuestions])
    );

    const handleToggleFavorite = useCallback(async (id: string, e: any) => {
        e.stopPropagation();
        await toggleFavorite(id);
    }, [toggleFavorite]);

    const sortedFavorites = useMemo(() => {
        return [...favorites].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [favorites]);

    return {
        favorites: sortedFavorites,
        handleToggleFavorite,
    }
}