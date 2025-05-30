import { Box } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import React from 'react';
import Markdown from 'react-native-markdown-display';
import MathView from 'react-native-math-view';

type MessageBubbleProps = {
  content: string;
  isUser: boolean;
};

const MathWrapper = ({ expression, isUser }: { expression: string; isUser: boolean }) => (
  <Box marginVertical="xs">
    <MathView
      math={expression}
      style={{ backgroundColor: 'transparent' }}
      color={isUser ? theme.colors.white : theme.colors.textPrimary}
    />
  </Box>
);

export function MessageBubble({ content, isUser }: MessageBubbleProps) {
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