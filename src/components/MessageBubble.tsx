import { Box, Text } from '@/src/theme/components';
import React from 'react';

type MessageBubbleProps = {
  content: string;
  isUser: boolean;
};

export function MessageBubble({ content, isUser }: MessageBubbleProps) {
  return (
    <Box
      backgroundColor={isUser ? 'primary' : 'cardBackground'}
      padding="m"
      marginBottom="s"
      borderRadius="m"
      alignSelf={isUser ? 'flex-end' : 'flex-start'}
      maxWidth="80%"
    >
      <Text
        variant="body"
        color={isUser ? 'white' : 'textPrimary'}
      >
        {content}
      </Text>
    </Box>
  );
} 