import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MessageBubble } from "../../components/MessageBubble";
import { Box, Text } from "../../theme/components";
import theme from "../../theme/theme";
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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.mainBackground }}
      edges={["left", "right"]}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          padding: theme.spacing.m,
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

        <Box
          flexDirection="row"
          width="100%"
          justifyContent="center"
          gap="l"
          marginTop="l"
        >
          <TouchableOpacity onPress={handleToggleFavorite}>
            <Box
              backgroundColor="cardBackground"
              padding="m"
              borderRadius="m"
              alignItems="center"
              justifyContent="center"
            >
              <Ionicons
                name={question.isFavorite ? "star" : "star-outline"}
                size={24}
                color={
                  question.isFavorite
                    ? theme.colors.primary
                    : theme.colors.textSecondary
                }
              />
            </Box>
          </TouchableOpacity>

          {question.answer && (
            <TouchableOpacity onPress={handleCopyAnswer}>
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

          <TouchableOpacity onPress={handleDelete}>
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
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}
