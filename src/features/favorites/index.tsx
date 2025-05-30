import { Box, Text } from '@/src/theme/components';
import theme from '@/src/theme/theme';
import { router } from 'expo-router';
import { FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavoritesScreen } from './hooks/useFavoritesScreen';

export default function FavoritesScreen() {
  const { favorites } = useFavoritesScreen();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.mainBackground }} edges={['left', 'right']}>
      <Box flex={1} padding="m">
        <Text variant="header" marginBottom="l">
          Favoritos
        </Text>
        
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/question/${item.id}`)}
            >
              <Box
                backgroundColor="cardBackground"
                padding="m"
                marginBottom="s"
                borderRadius="m"
              >
                <Text variant="body" color="textPrimary" marginBottom="xs">
                  {item.text}
                </Text>
                <Text variant="caption" color="textSecondary">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>
    </SafeAreaView>
  );
} 