import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text } from "../../../theme/components";
import theme from "../../../theme/theme";

interface QuestionBottomSheetProps {
  isFavorite: boolean;
  isOpen: boolean;
  onClose: () => void;
  onShare: () => void;
  onCopyAnswer: () => void;
  onToggleFavorite: () => void;
  onDelete: () => void;
}

export function QuestionBottomSheet({
  isFavorite,
  isOpen,
  onClose,
  onShare,
  onCopyAnswer,
  onToggleFavorite,
  onDelete,
}: QuestionBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, [onClose]);

  const handleOptionPress = useCallback((callback: () => void) => {
    callback();
    onClose();
  }, [onClose]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={["25%"]}
      enablePanDownToClose
      onChange={handleSheetChanges}
      backgroundStyle={{
        backgroundColor: theme.colors.cardBackground,
      }}
    >
      <BottomSheetView>
        <Box padding="l" gap="m">
          <TouchableOpacity onPress={() => handleOptionPress(onShare)}>
            <Box flexDirection="row" alignItems="center" gap="m">
              <Ionicons name="share-outline" size={24} color={theme.colors.textSecondary} />
              <Text variant="body">Compartilhar</Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOptionPress(onCopyAnswer)}>
            <Box flexDirection="row" alignItems="center" gap="m">
              <Ionicons name="copy-outline" size={24} color={theme.colors.textSecondary} />
              <Text variant="body">Copiar resposta</Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOptionPress(onToggleFavorite)}>
            <Box flexDirection="row" alignItems="center" gap="m">
              <Ionicons 
                name={isFavorite ? "star" : "star-outline"} 
                size={24} 
                color={isFavorite ? theme.colors.primary : theme.colors.textSecondary} 
              />
              <Text variant="body">
                {isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              </Text>
            </Box>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleOptionPress(onDelete)}>
            <Box flexDirection="row" alignItems="center" gap="m">
              <Ionicons name="trash-outline" size={24} color={theme.colors.textSecondary} />
              <Text variant="body">Excluir pergunta</Text>
            </Box>
          </TouchableOpacity>
        </Box>
      </BottomSheetView>
    </BottomSheet>
  );
} 