import { Box } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

type IconName = 'image-search' | 'send' | 'microphone' | 'microphone-off' | 'delete';
type SpeechStatus = 'idle' | 'listening' | 'processing' | 'error';

interface ActionButtonsProps {
  handleMicrophonePress: () => void;
  handleClearPress: () => void;
  handleImageSearch: () => void;
  speechStatus: SpeechStatus;
  isListening: boolean;
  pulseStyle: any;
  opacityStyle: any;
  getMicrophoneIcon: () => IconName;
  getMicrophoneColor: () => string;
  isLoading: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  handleMicrophonePress,
  handleClearPress,
  handleImageSearch,
  speechStatus, 
  isListening, 
  pulseStyle, 
  opacityStyle, 
  getMicrophoneIcon, 
  getMicrophoneColor,
  isLoading
}) => (
  <Box flexDirection="row" alignItems="center">
    <TouchableOpacity 
      onPress={handleImageSearch}
      disabled={isLoading}
      style={{
        padding: theme.spacing.s,
        marginRight: theme.spacing.m,
        backgroundColor: theme.colors.mainBackground,
        borderRadius: theme.borderRadii.m,
        opacity: isLoading ? 0.5 : 1,
      }}
    >
      <MaterialCommunityIcons name="image-search" size={24} color={theme.colors.primary} />
    </TouchableOpacity>

    <Animated.View
      style={[
        pulseStyle,
        opacityStyle,
        {
          backgroundColor: isListening ? theme.colors.error + '20' : 'transparent',
          borderRadius: theme.borderRadii.m,
          opacity: isLoading ? 0.5 : 1,
        }
      ]}
    >
      <TouchableOpacity 
        onPress={handleMicrophonePress}
        disabled={speechStatus === 'processing' || isLoading}
        style={{
          padding: theme.spacing.s,
          backgroundColor: theme.colors.mainBackground,
          borderRadius: theme.borderRadii.m,
          minWidth: 48,
          minHeight: 48,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {speechStatus === 'processing' ? (
          <ActivityIndicator color={theme.colors.primary} />
        ) : (
          <MaterialCommunityIcons 
            name={getMicrophoneIcon()} 
            size={24} 
            color={getMicrophoneColor()} 
          />
        )}
      </TouchableOpacity>
    </Animated.View>

    <TouchableOpacity 
      onPress={handleClearPress}
      disabled={isLoading}
      style={{
        padding: theme.spacing.s,
        marginLeft: theme.spacing.xl,
        backgroundColor: theme.colors.mainBackground,
        borderRadius: theme.borderRadii.m,
        opacity: isLoading ? 0.5 : 1,
      }}
    >
      <MaterialCommunityIcons name="broom" size={24} color={theme.colors.error} />
    </TouchableOpacity>
  </Box>
); 