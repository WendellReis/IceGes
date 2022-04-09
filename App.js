import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

import { Login } from './src/screens/Login';
import { Home } from './src/screens/Home';
import { Estoque } from './src/screens/Estoque';
import { Categoria } from './src/screens/Categoria';
import { Pedido } from './src/screens/Pedido';
import { Perfil } from './src/screens/Perfil';
import { Historico } from './src/screens/Historico';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Estoque" component={Estoque} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Categoria" component={Categoria} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="Historico" component={Historico} />
          <Stack.Screen name="Pedido" component={Pedido} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}