import { Box } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHomeScreen } from './hooks/useHomeScreen';

export default function HomeScreen() {
  const { question, isLoading, handleSubmit, setQuestion } = useHomeScreen();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.mainBackground }} edges={['left']}>
      <Box flex={1} backgroundColor="mainBackground" padding="m" justifyContent="center">
     
        
        <Box 
          backgroundColor="cardBackground" 
          borderRadius="l" 
          padding="m"
          marginBottom="l"
          style={{
            shadowColor: theme.colors.black,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
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

          <Box 
            flexDirection="row" 
            justifyContent="space-between" 
            alignItems="center"
            marginTop="m"
            paddingTop="m"
            borderTopWidth={1}
            borderTopColor="lightGray"
          >
            <Box flexDirection="row" alignItems="center">
              <TouchableOpacity 
                style={{
                  padding: theme.spacing.s,
                  marginRight: theme.spacing.m,
                  backgroundColor: theme.colors.mainBackground,
                  borderRadius: theme.borderRadii.m,
                }}
              >
                <MaterialCommunityIcons name="image-search" size={24} color={theme.colors.primary} />
              </TouchableOpacity>

              <TouchableOpacity 
                style={{
                  padding: theme.spacing.s,
                  backgroundColor: theme.colors.mainBackground,
                  borderRadius: theme.borderRadii.m,
                }}
              >
                <MaterialCommunityIcons name="microphone" size={24} color={theme.colors.primary} />
              </TouchableOpacity>
            </Box>

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
              <MaterialCommunityIcons 
                name="send" 
                size={20} 
                color={theme.colors.white} 
        
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
} 