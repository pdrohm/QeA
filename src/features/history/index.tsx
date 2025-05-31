import { QuestionItem } from "@/src/components/QuestionItem";
import { SelectionHeader } from "@/src/components/SelectionHeader";
import { Box, Text } from "@/src/theme/components";
import theme from "@/src/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHistoryScreen } from "./hooks/useHistoryScreen";

export default function HistoryScreen() {
  const { questions, isSelectionMode, toggleSelectionMode, selectAll, handleBulkDelete, handleBulkFavorite, toggleSelection, selectedItems } = useHistoryScreen();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.mainBackground }}
      edges={["left", "right"]}
    >
      <Box flex={1} padding="m">
        <Box flexDirection="row" justifyContent="space-between" alignItems="center" marginBottom="l">
          <Text variant="header">Histórico</Text>
          <TouchableOpacity onPress={toggleSelectionMode}>
            <Ionicons 
              name={isSelectionMode ? "close" : "checkbox-outline"} 
              size={24} 
              color={theme.colors.textPrimary} 
            />
          </TouchableOpacity>
        </Box>

        {isSelectionMode && (
          <SelectionHeader
            onSelectAll={selectAll}
            onBulkFavorite={handleBulkFavorite}
            onBulkDelete={handleBulkDelete}
            selectedCount={selectedItems.length}
          />
        )}

        <FlatList
          data={questions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <QuestionItem
              item={item}
              isSelectionMode={isSelectionMode}
              isSelected={selectedItems.includes(item.id)}
              onPress={() => {
                if (isSelectionMode) {
                  toggleSelection(item.id);
                } else {
                  router.push(`/question/${item.id}`);
                }
              }}
            />
          )}
          ListEmptyComponent={
            <Box flex={1} justifyContent="center" alignItems="center">
              <Text variant="body" color="textSecondary">
                Nenhuma pergunta encontrada
              </Text>
            </Box>
          }
        />
      </Box>
    </SafeAreaView>
  );
}
