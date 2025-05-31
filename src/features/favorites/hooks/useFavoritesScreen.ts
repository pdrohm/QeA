import { useSelectionMode } from '@/src/hooks/useSelectionMode';
import { useQuestionsStore } from '@/src/stores/questionsStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export function useFavoritesScreen() {
    const { 
        favorites, 
        getFavoriteQuestions, 
        toggleFavorite, 
        deleteQuestion,
        isLoading,
        loadMoreQuestions
    } = useQuestionsStore();

    useFocusEffect(
        useCallback(() => {
            getFavoriteQuestions();
        }, [getFavoriteQuestions])
    );

    const handleToggleFavorite = useCallback(async (id: string, e: any) => {
        e.stopPropagation();
        await toggleFavorite(id);
    }, [toggleFavorite]);

    const {
        selectedItems,
        isSelectionMode,
        toggleSelection,
        toggleSelectionMode,
        selectAll,
        handleBulkAction: handleBulkFavorite,
    } = useSelectionMode({
        items: favorites,
        onBulkAction: async (ids) => {
            for (const id of ids) {
                await toggleFavorite(id);
            }
        },
        getId: (item) => item.id,
    });

    const {
        handleBulkAction: handleBulkDelete,
    } = useSelectionMode({
        items: favorites,
        onBulkAction: async (ids) => {
            for (const id of ids) {
                await deleteQuestion(id);
            }
        },
        getId: (item) => item.id,
    });

    return {
        favorites,
        selectedItems,
        isSelectionMode,
        toggleSelection,
        toggleSelectionMode,
        selectAll,
        handleBulkDelete,
        handleBulkFavorite,
        handleToggleFavorite,
        isLoading,
        loadMoreQuestions,
    }
}