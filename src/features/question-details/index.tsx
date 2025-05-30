import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageBubble } from '../../components/MessageBubble';
import { questionsStorage } from '../../services/storage/questionsStorage';
import { Box, Text } from '../../theme/components';
import theme from '../../theme/theme';
import { Question } from '../../types';

export default function QuestionDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadQuestion();
  }, [id]);

  const loadQuestion = async () => {
    try {
      const questions = await questionsStorage.getQuestions();
      const foundQuestion = questions.find(q => q.id === id);
      setQuestion(foundQuestion || null);
    } catch (error) {
      console.error('Error loading question:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box flex={1} backgroundColor="mainBackground" justifyContent="center" alignItems="center">
        <ActivityIndicator color={theme.colors.primary} />
      </Box>
    );
  }

  if (!question) {
    return (
      <Box flex={1} backgroundColor="mainBackground" justifyContent="center" alignItems="center">
        <Text variant="body">Pergunta não encontrada</Text>
      </Box>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.mainBackground }} edges={['left', 'right']}>
      <ScrollView 
        style={{ flex: 1 }} 
        contentContainerStyle={{ 
          flexGrow: 1,
          padding: theme.spacing.m,
          justifyContent: 'center',
          alignItems: 'center',
          gap: theme.spacing.m
        }}
      >
        <Box width="100%" alignItems="center" gap="m">
          <MessageBubble content={question.text} isUser={true} />
          {question.answer && (
            <MessageBubble content={question.answer} isUser={false} />
          )}
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
} 