import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import LocationDetailScreen from './components/LocationDetailScreen';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';
import GetstartedScreen from './components/GetstartedScreen';
import FAQScreen from './components/FAQScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="LocationDetailScreen" component={LocationDetailScreen} />
  </Stack.Navigator>
);

const AuthNavigator = ({ setIsLoggedIn }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" options={{ title: 'Login' }}>
      {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="Map" component={MainNavigator} />
        <Drawer.Screen name="Get started" component={GetstartedScreen} options={{ headerShown: true }} /> 
        <Drawer.Screen name="FAQ" component={FAQScreen} options={{ headerShown: true }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
