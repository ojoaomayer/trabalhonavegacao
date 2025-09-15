// App.js
import 'react-native-gesture-handler'; // Importante: deve ser a primeira linha
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe suas telas
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// 1. STACK NAVIGATOR
// Este navegador será usado dentro da aba "Home"
function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
    </Stack.Navigator>
  );
}

// 2. TAB NAVIGATOR
// Este navegador conterá o Stack (Home/Settings) e a tela de Notificações
function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Principal' }} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notificações' }} />
    </Tab.Navigator>
  );
}

// 3. DRAWER NAVIGATOR
// Este é o navegador principal que envolve tudo
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={MainTabNavigator} options={{ title: 'Início e Notificações' }}/>
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Meu Perfil' }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}