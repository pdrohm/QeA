import { Box } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActionButtons } from './components/ActionButtons';
import { InputSection } from './components/InputSection';
import { SendButton } from './components/SendButton';
import { useHomeScreen } from './hooks/useHomeScreen';

export default function HomeScreen() {
  const { 
    question, 
    isLoading, 
    handleSubmit, 
    setQuestion, 
    isListening, 
    speechStatus,
    handleMicrophonePress,
    pulseStyle,
    opacityStyle,
    getMicrophoneColor,
    getMicrophoneIcon,
  } = useHomeScreen();

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
          <InputSection 
            question={question}
            setQuestion={setQuestion}
            isListening={isListening}
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
            <ActionButtons 
              handleMicrophonePress={handleMicrophonePress}
              speechStatus={speechStatus}
              isListening={isListening}
              pulseStyle={pulseStyle}
              opacityStyle={opacityStyle}
              getMicrophoneIcon={getMicrophoneIcon}
              getMicrophoneColor={getMicrophoneColor}
            />

            <SendButton 
              handleSubmit={handleSubmit}
              question={question}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
} 