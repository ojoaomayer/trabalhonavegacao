// Em App.tsx

// 1. O import do gesture-handler DEVE ser o primeiro
import 'react-native-gesture-handler';

// 2. Imports do React e Componentes
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import para o Drawer
import { Ionicons } from '@expo/vector-icons'; // Import para ícones

// 3. Imports dos Navegadores
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 4. Criação dos Navegadores
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// --- Telas Fictícias ---
// (Vamos definir todas as nossas telas como componentes simples)

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home (Tab)</Text>
      <Button
        title="Abrir Menu (Drawer)"
        onPress={() => navigation.getParent('Drawer').openDrawer()} // Abre o Drawer
      />
      <View style={{ height: 20 }} />
      <Button
        title="Abrir Modal (Stack)"
        onPress={() => navigation.navigate('ModalScreen')} // Navega para o Modal
      />
    </View>
  );
}

function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore (Tab)</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile (Tab)</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings (Drawer)</Text>
    </View>
  );
}

function ModalScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eu sou um Modal (Stack)!</Text>
      <Button title="Fechar Modal" onPress={() => navigation.goBack()} />
    </View>
  );
}

// --- NAVEGADORES (A Mágica acontece aqui) ---

/**
 * NÍVEL 3 (O mais interno): O Navegador de ABAS (Tabs)
 * Contém Home, Explore e Profile.
 */
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // O cabeçalho será controlado pelo Drawer
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="paper-plane" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * NÍVEL 2 (Intermediário): O Navegador de GAVETA (Drawer)
 * Contém as Abas (AppTabs) e a tela de Configurações (Settings).
 */
function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        // Mostra um cabeçalho e um botão "hambúrguer" para abrir o menu
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={26}
            color="black"
            style={{ marginLeft: 15 }}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      })}>
      <Drawer.Screen
        name="AppTabs"
        component={AppTabs} // As Abas estão DENTRO do Drawer
        options={{
          title: 'App Principal', // Título no menu
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen} // A outra tela do menu
        options={{
          title: 'Configurações',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

/**
 * NÍVEL 1 (Raiz): O Navegador de PILHA (Stack)
 * Contém o Drawer (AppDrawer) e as telas de Modal.
 */
export default function App() {
  return (
    // O GestureHandlerRootView é OBRIGATÓRIO para o Drawer
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AppDrawer"
            component={AppDrawer}
            options={{ headerShown: false }} // Esconde o cabeçalho do Stack
          />
          <Stack.Screen
            name="ModalScreen"
            component={ModalScreen}
            options={{ presentation: 'modal' }} // Faz a tela subir como um modal
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});