import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/auth/Login.screen";
import RegisterScreen from "./src/screens/auth/Register.screen";
import Welcome from "./src/screens/auth/Welcome";
import TableScreen from "./src/screens/game/Table.screen";
import LobbyScreen from "./src/screens/game/Lobby.screen";
import UserDetailsScreen from "./src/screens/auth/UserDetails.screen";
import { AuthContextProvider } from './src/hooks/authContext';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Table: undefined;
  Lobby: undefined;
  UserDetails: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen 
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Table"
            component={TableScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Lobby"
            component={LobbyScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="UserDetails"
            component={UserDetailsScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}