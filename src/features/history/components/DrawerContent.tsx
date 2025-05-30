import { Box, Text } from '@/src/theme/components';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockHistory = [
  { id: '1', title: 'Como funciona o React Native?', date: '2024-03-30' },
  { id: '2', title: 'Explicação sobre TypeScript', date: '2024-03-29' },
  { id: '3', title: 'Dúvidas sobre Expo', date: '2024-03-28' },
];

type DrawerContentProps = {
  navigation: any;
};

export function DrawerContent({ navigation }: DrawerContentProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'right']}>
      <Box flex={1} backgroundColor="mainBackground">
        <Box padding="m">
          <Text variant="header" marginBottom="l">
            Meu Guru
          </Text>
        </Box>
        
        <TouchableOpacity
          onPress={() => {
            router.push('/');
            navigation.closeDrawer();
          }}
        >
          <Box padding="m" backgroundColor="cardBackground" marginBottom="s">
            <Text variant="body" color="textPrimary">
              Nova Conversa
            </Text>
          </Box>
        </TouchableOpacity>

        <Box padding="m">
          <Text variant="subheader" marginBottom="m">
            Histórico de Conversas
          </Text>
        </Box>

        <FlatList
          data={mockHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push(`/question/${item.id}`);
                navigation.closeDrawer();
              }}
            >
              <Box
                backgroundColor="cardBackground"
                padding="m"
                marginBottom="s"
                marginHorizontal="m"
              >
                <Text variant="body" color="textPrimary" marginBottom="xs">
                  {item.title}
                </Text>
                <Text variant="caption" color="textSecondary">
                  {item.date}
                </Text>
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>
    </SafeAreaView>
  );
} 