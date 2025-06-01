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
        handleBulkAction,
    } = useSelectionMode({
        items: favorites,
        onBulkAction: async () => {
            return;
        },
        getId: (item) => item.id,
    });

    const handleBulkFavorite = async () => {
        for (const id of selectedItems) {
            await toggleFavorite(id);
        }
        handleBulkAction();
    };

    const handleBulkDelete = async () => {
        for (const id of selectedItems) {
            await deleteQuestion(id);
        }
        handleBulkAction();
    };

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