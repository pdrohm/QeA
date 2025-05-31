import { Box } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import React from 'react';
import { Dimensions, Text } from 'react-native';
import Markdown from 'react-native-markdown-display';
import MathView from 'react-native-math-view';
import { AppImage } from './AppImage';

type MessageBubbleProps = {
  content: string;
  isUser: boolean;
  image?: string;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_CONTAINER_WIDTH = SCREEN_WIDTH * 0.6;

const MathWrapper = ({ expression, isUser }: { expression: string; isUser: boolean }) => (
  <Box marginVertical="xs">
    <MathView
      math={expression}
      style={{ backgroundColor: 'transparent' }}
      color={isUser ? theme.colors.white : theme.colors.textPrimary}
    />
  </Box>
);

export function MessageBubble({ content, isUser, image }: MessageBubbleProps) {
  const markdownStyles = {
    body: {
      color: isUser ? theme.colors.white : theme.colors.textPrimary,
      fontSize: 16,
      lineHeight: 24,
    },
    code_inline: {
      backgroundColor: isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      padding: 4,
      borderRadius: 4,
      fontFamily: 'monospace',
    },
    code_block: {
      backgroundColor: isUser ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
      padding: 8,
      borderRadius: 4,
      marginVertical: 8,
      fontFamily: 'monospace',
    },
  };

  // Dividir o conteúdo em partes de LaTeX e não LaTeX
  const parts = content.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$)/);

  return (
    <Box
      backgroundColor={isUser ? 'primary' : 'cardBackground'}
      padding="m"
      marginBottom="s"
      borderRadius="m"
      alignSelf={isUser ? 'flex-end' : 'flex-start'}
      maxWidth="80%"
    >
      {image && (
        <Box
          width={IMAGE_CONTAINER_WIDTH}
          height={IMAGE_CONTAINER_WIDTH * 0.75}
          marginBottom="s"
          borderRadius="m"
          overflow="hidden"
          backgroundColor="cardBackground"
        >
          <AppImage
            uri={image}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
            fallback={
              <Box
                flex={1}
                justifyContent="center"
                alignItems="center"
                backgroundColor="cardBackground"
              >
                <Text style={{ color: isUser ? theme.colors.white : theme.colors.textPrimary }}>
                  Image not available
                </Text>
              </Box>
            }
          />
        </Box>
      )}
      {parts.map((part, idx) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          // Matematica em bloco
          return <MathWrapper key={idx} expression={part.slice(2, -2)} isUser={isUser} />;
        } else if (part.startsWith('$') && part.endsWith('$')) {
          // Matematica em linha
          return <MathWrapper key={idx} expression={part.slice(1, -1)} isUser={isUser} />;
        } else if (part.trim() !== '') {
          // Texto normal
          return <Markdown key={idx} style={markdownStyles}>{part}</Markdown>;
        } else {
          return null;
        }
      })}
    </Box>
  );
} 