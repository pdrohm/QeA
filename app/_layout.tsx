import { Stack } from "expo-router";
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../src/config/ReactotronConfig';
import { ThemeProvider } from "../src/theme/ThemeProvider";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="question/[id]" 
            options={{ 
              title: 'Detalhes da Pergunta',
              headerBackTitle: 'Voltar',
            }} 
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
