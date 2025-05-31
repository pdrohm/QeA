import { useState } from 'react';

interface UseSelectionModeProps<T> {
  items: T[];
  onBulkAction: (ids: string[]) => Promise<void>;
  getId: (item: T) => string;
}

export function useSelectionMode<T>({ items, onBulkAction, getId }: UseSelectionModeProps<T>) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(prev => !prev);
    setSelectedItems([]);
  };

  const selectAll = () => {
    setSelectedItems(items.map(getId));
  };

  const handleBulkAction = async () => {
    await onBulkAction(selectedItems);
    setSelectedItems([]);
    setIsSelectionMode(false);
  };

  return {
    selectedItems,
    isSelectionMode,
    toggleSelection,
    toggleSelectionMode,
    selectAll,
    handleBulkAction,
  };
} 