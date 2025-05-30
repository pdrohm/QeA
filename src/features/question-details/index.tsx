import { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, Share } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { MessageBubble } from "../../components/MessageBubble";
import { Box, Text } from "../../theme/components";
import theme from "../../theme/theme";
import { ActionButtons } from "./components/ActionButtons";
import { QuestionBottomSheet } from "./components/QuestionBottomSheet";
import { useQuestionDetailsScreen } from "./hooks/useQuestionDetailsScreen";

export default function QuestionDetailsScreen() {
  const {
    question,
    isLoading,
    isCopied,
    handleToggleFavorite,
    handleDelete,
    handleCopyAnswer,
  } = useQuestionDetailsScreen();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleOpenBottomSheet = useCallback(() => {
    setIsBottomSheetOpen((prev) => !prev);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(false);
  }, []);

  const handleShare = useCallback(async () => {
    if (!question) return;

    try {
      await Share.share({
        message: `Pergunta: ${question.text}\n\nResposta: ${
          question.answer || "Sem resposta ainda"
        }`,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  }, [question]);

  if (isLoading) {
    return (
      <Box
        flex={1}
        backgroundColor="mainBackground"
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator color={theme.colors.primary} />
      </Box>
    );
  }

  if (!question) {
    return (
      <Box
        flex={1}
        backgroundColor="mainBackground"
        justifyContent="center"
        alignItems="center"
      >
        <Text variant="body">Pergunta não encontrada</Text>
      </Box>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.mainBackground }}
        edges={["left", "right", "bottom"]}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: theme.spacing.m,
            justifyContent: "center",
            alignItems: "center",
            gap: theme.spacing.m,
          }}
        >
          <Box width="100%" alignItems="center" gap="m">
            <MessageBubble content={question.text} isUser={true} />
            {question.answer && (
              <MessageBubble content={question.answer} isUser={false} />
            )}
          </Box>
        </ScrollView>
        <ActionButtons
          isFavorite={question.isFavorite}
          hasAnswer={!!question.answer}
          isCopied={isCopied}
          onToggleFavorite={handleToggleFavorite}
          onCopyAnswer={handleCopyAnswer}
          onDelete={handleDelete}
          onOpenBottomSheet={handleOpenBottomSheet}
        />

        <QuestionBottomSheet
          isFavorite={question.isFavorite}
          isOpen={isBottomSheetOpen}
          onClose={handleCloseBottomSheet}
          onShare={handleShare}
          onCopyAnswer={handleCopyAnswer}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
