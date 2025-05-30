import theme from '@/src/theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

interface SendButtonProps {
  handleSubmit: () => void;
  question: string;
  isLoading: boolean;
}

export const SendButton: React.FC<SendButtonProps> = ({ handleSubmit, question, isLoading }) => (
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
    {isLoading ? (
      <ActivityIndicator color={theme.colors.white} />
    ) : (
      <MaterialCommunityIcons 
        name="send" 
        size={20} 
        color={theme.colors.white} 
      />
    )}
  </TouchableOpacity>
); 