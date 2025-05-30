import { openAIService } from '@/src/services/api/openai';
import { Box, Text } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function HomeScreen() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: question.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setIsLoading(true);

    try {
      const response = await openAIService.askQuestion(question.trim());
      const assistantMessage: Message = {
        role: 'assistant',
        content: response.choices[0].message.content,
      };
      setMessages(prev => [...prev, assistantMessage]);
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
            <Box
              key={index}
              backgroundColor={message.role === 'user' ? 'primary' : 'cardBackground'}
              padding="m"
              marginBottom="s"
              borderRadius="m"
              alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
              maxWidth="80%"
            >
              <Text
                variant="body"
                color={message.role === 'user' ? 'white' : 'textPrimary'}
              >
                {message.content}
              </Text>
            </Box>
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