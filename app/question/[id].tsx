import { useLocalSearchParams } from 'expo-router';
import { Box, Text } from '../../src/theme/components';

export default function QuestionDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <Box flex={1} backgroundColor="mainBackground" padding="m">
      <Text variant="header">Question Details</Text>
      <Text variant="body">Question ID: {id}</Text>
    </Box>
  );
} 