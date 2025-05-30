import { Stack } from "expo-router";
import '../src/config/ReactotronConfig';
import { ThemeProvider } from "../src/theme/ThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="question/[id]" options={{ headerShown: true, title: 'Question Details' }} />
      </Stack>
    </ThemeProvider>
  );
}
