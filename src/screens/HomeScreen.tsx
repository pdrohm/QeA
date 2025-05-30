import { Box, Text } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (!question.trim()) return;
    console.log('Pergunta enviada:', question);
    setQuestion('');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box flex={1} padding="m" backgroundColor="mainBackground">
        <Text variant="header" marginBottom="l">
          Meu Guru
        </Text>
        
        <Box marginBottom="m">
          <TextInput
            value={question}
            onChangeText={setQuestion}
            placeholder="Digite sua pergunta..."
            placeholderTextColor={theme.colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={{
              height: 120,
              padding: theme.spacing.m,
              backgroundColor: theme.colors.cardBackground,
              borderRadius: theme.borderRadii.m,
              color: theme.colors.textPrimary,
            }}
          />
        </Box>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!question.trim()}
          style={{
            backgroundColor: !question.trim() ? theme.colors.textSecondary : theme.colors.primary,
            padding: theme.spacing.m,
            borderRadius: theme.borderRadii.m,
            alignItems: 'center',
          }}
        >
          <Text variant="body" style={{ color: theme.colors.white, fontWeight: 'bold' }}>
            Enviar Pergunta
          </Text>
        </TouchableOpacity>
      </Box>
    </SafeAreaView>
  );
} 