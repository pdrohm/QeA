import { DrawerContent } from "@/src/components/DrawerContent";
import { Drawer } from "expo-router/drawer";
import '../src/config/ReactotronConfig';
import { ThemeProvider } from "../src/theme/ThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Drawer
        screenOptions={{
          headerShown: true,
        }}
        drawerContent={(props) => <DrawerContent navigation={props.navigation} />}
      >
        <Drawer.Screen 
          name="index" 
          options={{ 
            title: 'Meu Guru',
            drawerLabel: () => null,
          }} 
        />
      </Drawer>
    </ThemeProvider>
  );
}
