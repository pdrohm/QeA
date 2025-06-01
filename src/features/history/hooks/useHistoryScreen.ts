import { useSelectionMode } from '@/src/hooks/useSelectionMode';
import { useQuestionsStore } from '@/src/stores/questionsStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export function useHistoryScreen() {
    const { 
        questions, 
        loadQuestions, 
        deleteQuestion, 
        toggleFavorite,
        isLoading,
        hasMore,
        loadMoreQuestions
    } = useQuestionsStore();

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                await loadQuestions(true);
            };
            loadData();
        }, [loadQuestions])
    );

    const {
        selectedItems,
        isSelectionMode,
        toggleSelection,
        toggleSelectionMode,
        selectAll,
        handleBulkAction,
    } = useSelectionMode({
        items: questions,
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
        questions,
        selectedItems,
        isSelectionMode,
        toggleSelection,
        toggleSelectionMode,
        selectAll,
        handleBulkDelete,
        handleBulkFavorite,
        isLoading,
        hasMore,
        loadMoreQuestions,
    }
}