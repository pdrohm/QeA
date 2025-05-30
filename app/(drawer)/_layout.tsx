import { DrawerContent } from '@/src/components/DrawerContent';
import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerShadowVisible: false,
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
  );
} 