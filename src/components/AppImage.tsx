import { useTheme } from '@shopify/restyle';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ImageProps } from 'react-native';
import { Box } from '../theme/components';
import { Theme } from '../theme/theme';

interface AppImageProps extends Omit<ImageProps, 'source'> {
  uri: string;
  fallback?: React.ReactNode;
}

export function AppImage({ uri, fallback, style, ...props }: AppImageProps) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme<Theme>();

  useEffect(() => {
    const checkImage = async () => {
      if (uri.startsWith('file://')) {
        const fileInfo = await FileSystem.getInfoAsync(uri);
        if (!fileInfo.exists) {
          setError(true);
        }
      }
    };

    checkImage();
  }, [uri]);

  const handleLoadStart = () => {
    setIsLoading(true);
    setError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = (error: any) => {
    console.error('AppImage error:', {
      uri,
      error: error.nativeEvent
    });
    setIsLoading(false);
    setError(true);
  };

  if (error && fallback) {
    return <Box style={style}>{fallback}</Box>;
  }

  return (
    <Box
      backgroundColor="lightGray"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      style={style}
    >
      {isLoading && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          justifyContent="center"
          alignItems="center"
          backgroundColor="lightGray"
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </Box>
      )}
      <Image
        source={{ uri }}
        style={[
          {
            width: '100%',
            height: '100%',
            opacity: isLoading ? 0 : 1,
          },
          style
        ]}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...props}
      />
    </Box>
  );
} 