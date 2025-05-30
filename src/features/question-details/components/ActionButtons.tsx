import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Box } from "../../../theme/components";
import theme from "../../../theme/theme";

interface ActionButtonsProps {
  isFavorite: boolean;
  hasAnswer: boolean;
  isCopied: boolean;
  onToggleFavorite: () => void;
  onCopyAnswer: () => void;
  onDelete: () => void;
  onOpenBottomSheet: () => void;
}

export function ActionButtons({
  isFavorite,
  hasAnswer,
  isCopied,
  onToggleFavorite,
  onCopyAnswer,
  onDelete,
  onOpenBottomSheet,
}: ActionButtonsProps) {
  return (
    <Box
      flexDirection="row"
      width="100%"
      justifyContent="center"
      gap="l"
      marginTop="s"
    >
      <TouchableOpacity onPress={onToggleFavorite}>
        <Box
          backgroundColor="cardBackground"
          padding="m"
          borderRadius="m"
          alignItems="center"
          justifyContent="center"
        >
          <Ionicons
            name={isFavorite ? "star" : "star-outline"}
            size={24}
            color={
              isFavorite
                ? theme.colors.primary
                : theme.colors.textSecondary
            }
          />
        </Box>
      </TouchableOpacity>

      {hasAnswer && (
        <TouchableOpacity onPress={onCopyAnswer}>
          <Box
            backgroundColor="cardBackground"
            padding="m"
            borderRadius="m"
            alignItems="center"
            justifyContent="center"
          >
            <Ionicons
              name={isCopied ? "checkmark" : "copy-outline"}
              size={24}
              color={
                isCopied ? theme.colors.primary : theme.colors.textSecondary
              }
            />
          </Box>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onDelete}>
        <Box
          backgroundColor="cardBackground"
          padding="m"
          borderRadius="m"
          alignItems="center"
          justifyContent="center"
        >
          <Ionicons
            name="trash-outline"
            size={24}
            color={theme.colors.textSecondary}
          />
        </Box>
      </TouchableOpacity>

      <TouchableOpacity onPress={onOpenBottomSheet}>
        <Box
          backgroundColor="cardBackground"
          padding="m"
          borderRadius="m"
          alignItems="center"
          justifyContent="center"
        >
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={theme.colors.textSecondary}
          />
        </Box>
      </TouchableOpacity>
    </Box>
  );
} 