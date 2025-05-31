import { useSelectionMode } from '@/src/hooks/useSelectionMode';
import { useQuestionsStore } from '@/src/stores/questionsStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

export function useHistoryScreen() {
    const { questions, loadQuestions, deleteQuestion, toggleFavorite } = useQuestionsStore();

    useFocusEffect(
        useCallback(() => {
            const loadData = async () => {
                await loadQuestions();
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
        handleBulkAction: handleBulkFavorite,
    } = useSelectionMode({
        items: questions,
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
        items: questions,
        onBulkAction: async (ids) => {
            for (const id of ids) {
                await deleteQuestion(id);
            }
        },
        getId: (item) => item.id,
    });

    return {
        questions,
        selectedItems,
        isSelectionMode,
        toggleSelection,
        toggleSelectionMode,
        selectAll,
        handleBulkDelete,
        handleBulkFavorite,
    }
}