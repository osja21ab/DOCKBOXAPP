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
import TermsScreen from './components/TermsScreen';
import RecommendedScreen from './components/RecommendedScreen';
import SubscriptionScreen from './components/SubscriptionScreen';

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
      {isLoggedIn ? (
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              backgroundColor: '#095167', // Change background color of the drawer
              width: 230, // Set width of the drawer
            },
            drawerLabelStyle: {
              fontSize: 15, // Adjust font size of drawer labels
              fontWeight: 'bold', // Make drawer labels bold
              color: '#FCCE85', // Set color of drawer labels
            },
          }}
        >
          <Drawer.Screen name="Map" component={MainNavigator} />
          <Drawer.Screen name="Get started" component={GetstartedScreen} options={{ headerShown: true }} />
          <Drawer.Screen name="Recommended Trips" component={RecommendedScreen} options={{ headerShown: true }} />
          <Drawer.Screen name="Subscription" component={SubscriptionScreen} options={{ headerShown: true }} />
          <Drawer.Screen name="FAQ" component={FAQScreen} options={{ headerShown: true }} />
          <Drawer.Screen name="Terms and Conditions" component={TermsScreen} options={{ headerShown: true }} />
        </Drawer.Navigator>
      ) : (
        <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
      )}
    </NavigationContainer>
  );
};

export default App;
