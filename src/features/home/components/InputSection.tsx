import { Box } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import React from 'react';
import { Text, TextInput } from 'react-native';
import { AudioWave } from './AudioWave';

interface InputSectionProps {
  question: string;
  setQuestion: (text: string) => void;
  isListening: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ question, setQuestion, isListening }) => (
  <Box position="relative">
    <TextInput
      value={question}
      onChangeText={setQuestion}
      placeholder="Digite sua pergunta..."
      placeholderTextColor={theme.colors.textSecondary}
      multiline
      style={{
        backgroundColor: theme.colors.mainBackground,
        borderRadius: theme.borderRadii.m,
        color: theme.colors.textPrimary,
        minHeight: 100,
        maxHeight: 200,
        padding: theme.spacing.m,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24,
      }}
    />
    {isListening && (
      <Box
        position="absolute"
        bottom={theme.spacing.m}
        left={theme.spacing.m}
        right={theme.spacing.m}
        flexDirection="row"
        alignItems="center"
        backgroundColor="mainBackground"
        padding="s"
        borderRadius="m"
      >
        <Text style={{ 
          color: theme.colors.primary,
          marginRight: theme.spacing.s,
          fontSize: 14,
          fontWeight: '500',
        }}>
          Ouvindo...
        </Text>
        <AudioWave isListening={isListening} />
      </Box>
    )}
  </Box>
); 