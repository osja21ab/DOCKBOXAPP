import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import LocationDetailScreen from './components/LocationDetailScreen';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="LocationDetailScreen" component={LocationDetailScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false }} // Hide the header for Drawer navigator
      >
        <Drawer.Screen name="Main" component={MainNavigator} />
        <Drawer.Screen name="Signup" component={SignupScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
