import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationDetail from './Views/LocationDetailScreen.js'; // Import the LocationDetail component
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator(); // Styling

const App = () => {
  const copenhagenCoordinates = {
    latitude: 55.6616,
    longitude: 12.5925,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const dockBoxCoordinates = {
    latitude: 55.667369,
    longitude: 12.576421,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: 100, // Adjust the header height as needed
            backgroundColor: '#095167',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#FCCE85',
          headerTitleStyle: {
            fontSize: 20, // Adjust the title text size as needed
          },
          headerTitle: 'Dock Box', // Set the header title
          headerRight: () => (
            <View style={styles.headerRight}>
              <Feather name="user" size={30} color="#FCCE85" />
            </View>
          ),
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <Feather name="list" size={30} color="#FCCE85" />
            </View>
          ),
        }}
      >
        <Stack.Screen name="map">
          {({ navigation }) => (
            <View style={styles.container}>
              <MapView
                style={styles.map}
                initialRegion={copenhagenCoordinates}
              >
                <Marker
                  coordinate={dockBoxCoordinates}
                  title="DockBox"
                  onPress={() => navigation.navigate('LocationDetail')}
                >
                  <View style={styles.customMarker}>
                    <Image
                      source={require('./Views/your_logo.png')}
                      style={styles.markerImage}
                    />
                  </View>
                </Marker>
              </MapView>
            </View>
          )}
        </Stack.Screen>

        {/* Integrate the LocationDetail component */}
        <Stack.Screen name="LocationDetail" component={LocationDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  customMarker: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'blue',
  },
  headerText: {
    color: '#FCCE85',
    fontSize: 20,
  },
  headerLeft: {
    paddingLeft: 10,
  },
  headerRight: {
    paddingRight: 10,
  },
});

export default App;