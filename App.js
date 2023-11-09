import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import getAuth and onAuthStateChanged from Firebase
import UserContext from './components/UserContext'; // Import UserContext
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
import PaymentScreen from './components/PaymentScreen';
import RecommendedTrips from './components/RecommendedScreen';
import TermsScreen from './components/TermsScreen';
import SubscriptionScreen from './components/SubscriptionScreen';




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
    <Stack.Screen name='PaymentScreen' component={PaymentScreen} />
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
  const [userId, setUserId] = useState(null);
  const auth = getAuth(); // Initialize auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.email); // Set the user's email when they log in
      } else {
        setUserId(null); // Clear the user's email when they log out
      }
    });
  
    return () => unsubscribe();
  }, []);



  return (
    <UserContext.Provider value={{ userId }}>
      <NavigationContainer>
        {isLoggedIn ? (
         <Drawer.Navigator
         screenOptions={{
           headerShown: false,
           drawerStyle: {
             backgroundColor: '#095167', // Change background color of the drawer
             width: 275, // Set width of the drawer
             paddingTop: 20,
           },
           drawerLabelStyle: {
             fontSize: 20, // Adjust font size of drawer labels
             fontWeight: 'bold', // Make drawer labels bold
             color: '#FCCE85', // Set color of drawer labels
           },
         }}
       >
            <Drawer.Screen name="Map">
              {(props) => <MainNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Drawer.Screen>
            <Drawer.Screen name="Get started" component={GetstartedScreen} options={{ headerShown: true }} />
            <Drawer.Screen name="Recommended Trips" component={RecommendedTrips} options={{ headerShown: true }} />
            <Drawer.Screen name="FAQ" component={FAQScreen} options={{ headerShown: true }} />
            <Drawer.Screen name="Subscription" component={SubscriptionScreen} options={{ headerShown: true }} />
            <Drawer.Screen name="Terms and Conditions" component={TermsScreen} options={{ headerShown: true }} />
          </Drawer.Navigator>
        ) : (
          <AuthNavigator setIsLoggedIn={setIsLoggedIn} />
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
 };
export default App;
