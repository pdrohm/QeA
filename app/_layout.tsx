import { Stack } from "expo-router";
import '../src/config/ReactotronConfig';
import { ThemeProvider } from "../src/theme/ThemeProvider";

export default function RootLayout() {
  return (
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
  );
}
