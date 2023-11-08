import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import NyhavnScreen from './components/NyhavnScreen';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';
import GetstartedScreen from './components/GetstartedScreen';
import FAQScreen from './components/FAQScreen';
import SlusenScreen from './components/SlusenScreen';
import NordhavnScreen from './components/NordhavnScreen';
import BryggenScreen from './components/BryggenScreen';
import RentScreen from './components/RentScreen';
import MyTrips from './components/MyTrips';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MainNavigator = ({ setIsLoggedIn }) => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="ProfileScreen">
      {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
    <Stack.Screen name="BryggenScreen" component={BryggenScreen} />
    <Stack.Screen name="SlusenScreen" component={SlusenScreen} />
    <Stack.Screen name="NordhavnScreen" component={NordhavnScreen} />
    <Stack.Screen name="NyhavnScreen" component={NyhavnScreen} />
    <Stack.Screen name="RentScreen" component={RentScreen} />
    <Stack.Screen name='MyTrips' component={MyTrips} />
  </Stack.Navigator>
);

const AuthNavigator = ({ setIsLoggedIn }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" options={{ title: 'Login' }}>
      {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
    </Stack.Screen>
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
  </Stack.Navigator>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator screenOptions={{ headerShown: false }}>
          <Drawer.Screen name="Map">
            {(props) => <MainNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Drawer.Screen>
          <Drawer.Screen name="Get started" component={GetstartedScreen} options={{ headerShown: true }} />
          <Drawer.Screen name="FAQ" component={FAQScreen} options={{ headerShown: true }} />
        </Drawer.Navigator>
      ) : (
        <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
};


export default App;
