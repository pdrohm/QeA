import { MessageBubble } from '@/src/components/MessageBubble';
import { openAIService } from '@/src/services/api/openai';
import { questionsStorage } from '@/src/services/storage/questionsStorage';
import { Box, Text } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import { Question } from '@/src/types';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function HomeScreen() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: question.trim() };
    setMessages([userMessage]);

    try {
      const response = await openAIService.askQuestion(question.trim());
      const answer = response.choices[0].message.content;
      
      const assistantMessage: Message = { role: 'assistant', content: answer };
      setMessages([userMessage, assistantMessage]);
      
      const newQuestion: Question = {
        id: Date.now().toString(),
        text: question.trim(),
        answer,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await questionsStorage.saveQuestion(newQuestion);
      router.push(`/question/${newQuestion.id}`);
      
      setQuestion('');
    } catch (error) {
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.mainBackground }} edges={['left', 'bottom']}>
      <Box flex={1} backgroundColor="mainBackground">
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: theme.spacing.m }}
        >
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              content={message.content}
              isUser={message.role === 'user'}
            />
          ))}
          {isLoading && (
            <Box alignSelf="flex-start" marginBottom="s">
              <ActivityIndicator color={theme.colors.primary} />
            </Box>
          )}
        </ScrollView>

        <Box
          padding="m"
          backgroundColor="cardBackground"
          borderTopWidth={1}
          borderTopColor="lightGray"
        >
          <Box flexDirection="row" alignItems="center">
            <TextInput
              value={question}
              onChangeText={setQuestion}
              placeholder="Digite sua pergunta..."
              placeholderTextColor={theme.colors.textSecondary}
              multiline
              style={{
                flex: 1,
                padding: theme.spacing.m,
                backgroundColor: theme.colors.mainBackground,
                borderRadius: theme.borderRadii.m,
                color: theme.colors.textPrimary,
                maxHeight: 100,
                marginRight: theme.spacing.s,
              }}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!question.trim() || isLoading}
              style={{
                backgroundColor: !question.trim() || isLoading 
                  ? theme.colors.textSecondary 
                  : theme.colors.primary,
                padding: theme.spacing.m,
                borderRadius: theme.borderRadii.m,
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text variant="body" style={{ color: theme.colors.white }}>
                →
              </Text>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
} 