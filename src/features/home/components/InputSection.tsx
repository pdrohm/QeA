import { Box } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { AudioWave } from './AudioWave';

interface InputSectionProps {
  question: string;
  setQuestion: (text: string) => void;
  isListening: boolean;
  selectedImage?: string;
  onRemoveImage?: () => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ 
  question, 
  setQuestion, 
  isListening,
  selectedImage,
  onRemoveImage
}) => (
  <Box position="relative">
    {selectedImage && (
      <Box 
        marginBottom="m" 
        position="relative"
        width="100%"
        height={150}
        borderRadius="m"
        overflow="hidden"
      >
        <Image 
          source={{ uri: selectedImage }} 
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={onRemoveImage}
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 20,
            padding: 4,
          }}
        >
          <MaterialCommunityIcons name="close" size={20} color="white" />
        </TouchableOpacity>
      </Box>
    )}
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