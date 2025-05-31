import { Box, Text } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import { Question } from '@/src/types';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

interface QuestionItemProps {
  item: Question;
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onPress: () => void;
  onToggleFavorite?: (id: string, e: any) => void;
  showFavoriteButton?: boolean;
}

export function QuestionItem({
  item,
  isSelectionMode = false,
  isSelected = false,
  onPress,
  onToggleFavorite,
  showFavoriteButton = false,
}: QuestionItemProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        backgroundColor="cardBackground"
        padding="m"
        marginBottom="s"
        borderRadius="m"
        flexDirection="row"
        alignItems="center"
        borderRightWidth={item.isFavorite ? 12 : 0}
        borderRightColor="primary"
      >
        {isSelectionMode && (
          <Box marginRight="s">
            <Ionicons 
              name={isSelected ? "checkbox" : "square-outline"} 
              size={24} 
              color={theme.colors.textPrimary} 
            />
          </Box>
        )}
        <Box flex={1}>
          <Text variant="body" color="textPrimary" marginBottom="xs">
            {item.text}
          </Text>
          <Text variant="caption" color="textSecondary">
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </Box>
        {showFavoriteButton && onToggleFavorite && (
          <TouchableOpacity
            onPress={(e) => onToggleFavorite(item.id, e)}
            style={{ marginLeft: theme.spacing.m }}
          >
            <Ionicons
              name={item.isFavorite ? "star" : "star-outline"}
              size={24}
              color={item.isFavorite ? theme.colors.primary : theme.colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </Box>
    </TouchableOpacity>
  );
} 