import { Box, Button } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import { Ionicons } from '@expo/vector-icons';

interface SelectionHeaderProps {
  onSelectAll: () => void;
  onBulkFavorite: () => void;
  onBulkDelete: () => void;
  selectedCount: number;
}

export function SelectionHeader({
  onSelectAll,
  onBulkFavorite,
  onBulkDelete,
  selectedCount,
}: SelectionHeaderProps) {
  return (
    <Box flexDirection="row" justifyContent="space-between" marginBottom="m">
      <Button 
        variant="secondary" 
        onPress={onSelectAll}
        title="Selecionar Todos"
      />
      <Box flexDirection="row" gap="s">
        <Button 
          variant="secondary" 
          onPress={onBulkFavorite}
          title="Favoritar"
          disabled={selectedCount === 0}
          icon={<Ionicons name="star-outline" size={24} color={theme.colors.textPrimary} />}
        />
        <Button 
          variant="danger" 
          onPress={onBulkDelete}
          title="Excluir"
          disabled={selectedCount === 0}
          icon={<Ionicons name="trash-outline" size={24} color={theme.colors.textPrimary} />}
        />
      </Box>
    </Box>
  );
} 