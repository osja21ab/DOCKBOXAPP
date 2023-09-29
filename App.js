import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationDetailScreen from './Views/LocationDetailScreen';

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
      <Stack.Navigator>
        <Stack.Screen
          name="map"
          options={({ navigation }) => ({
            title: 'DockBox',
          })}
        >
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

        <Stack.Screen name="LocationDetail" component={LocationDetailScreen} />
        {/* Remove the Terms Screen */}
        {/* <Stack.Screen name="Terms" component={TermsAndConditionsScreen} /> */}
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
});

export default App;
