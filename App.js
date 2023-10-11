import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native'; // Import Text from react-native
import MapView, { Marker } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationDetail from './Views/LocationDetailScreen.js';
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();

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
            height: 100,
            backgroundColor: '#095167',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#FCCE85',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name="map"
          component={MapScreen}
          options={({ navigation }) => ({
            title: '',
            headerRight: () => (
              <View style={styles.headerRight}>
                <Text>
                  <Feather name="user" size={30} color="#FCCE85" />
                </Text>
              </View>
            ),
            headerLeft: () => (
              <View style={styles.headerLeft}>
                <Text>
                  <Feather name="list" size={30} color="#FCCE85" />
                </Text>
              </View>
            ),
            headerTitle: () => (
              <Image
                source={require('./Views/your_logo.png')}
                style={styles.headerLogo}
              />
            ),
          })}
          initialParams={{ coordinates: copenhagenCoordinates, dockBoxCoordinates }}
        />
        <Stack.Screen
          name="LocationDetail"
          component={LocationDetail}
          options={({ route }) => ({
            headerTitle: route.params.title || 'Location Detail', // Set a default title if needed
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MapScreen = ({ route, navigation }) => {
  const { coordinates, dockBoxCoordinates } = route.params;

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={coordinates}>
        <Marker
          coordinate={dockBoxCoordinates}
          title="DockBox"
          onPress={() =>
            navigation.navigate('LocationDetail', {
              title: 'DockBox', // You can pass any title you want
            })
          }
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
  headerLogo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  headerRight: {
    paddingRight: 20,
  },
  headerLeft: {
    paddingLeft: 20,
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
    borderColor: '#2CD100',
  },
});

export default App;
