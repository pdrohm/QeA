import { questionsStorage } from '@/src/services/storage/questionsStorage';
import { Box, Text } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import { Question } from '@/src/types';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const loadedQuestions = await questionsStorage.getQuestions();
      setQuestions(loadedQuestions);
    } catch (error) {
      console.error('Error loading questions:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.mainBackground }} edges={['left', 'right']}>
      <Box flex={1} padding="m">
        <Text variant="header" marginBottom="l">
          Histórico
        </Text>
        
        <FlatList
          data={questions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/question/${item.id}`)}
            >
              <Box
                backgroundColor="cardBackground"
                padding="m"
                marginBottom="s"
                borderRadius="m"
              >
                <Text variant="body" color="textPrimary" marginBottom="xs">
                  {item.text}
                </Text>
                <Text variant="caption" color="textSecondary">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>
    </SafeAreaView>
  );
} 