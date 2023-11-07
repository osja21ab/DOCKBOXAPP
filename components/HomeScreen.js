import React, { useLayoutEffect, useEffect, useState } from 'react';
import { StyleSheet, View, Image, Alert, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  Accuracy,
} from 'expo-location';

const HomeScreen = ({ navigation }) => {
  const copenhagenCoordinates = {
    latitude: 55.6616,
    longitude: 12.5925,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(copenhagenCoordinates);

  const dockBoxCoordinates = {
    latitude: 55.667369,
    longitude: 12.576421,
  };

  const dockBoxCoordinates2 = {
    latitude: 55.678374,
    longitude: 12.592681,
  };

  const dockBoxCoordinates3 = {
    latitude: 55.642400,
    longitude: 12.553285,
  };

  const dockBoxCoordinates4 = {
    latitude: 55.706804,
    longitude: 12.598841,
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (lat1 && lon1 && lat2 && lon2) {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance.toFixed(2); // Round to two decimal places
    } else {
      return 'N/A';
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: 80,
        backgroundColor: '#095167',
      },
      headerTintColor: 'white',
      headerTitle: () => (
        <Image
          source={require('../assets/your_logo.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          style={styles.profileIcon}
        >
          <Feather name="user" size={30} color="#FCCE85" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.menuIcon}
        >
          <Feather name="menu" size={30} color="#FCCE85" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    checkAndRequestLocationPermission();
  }, []);

  const checkAndRequestLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Location Permission Required',
        'You need to grant location permission to use this feature.',
        [{ text: 'OK', style: 'default' }]
      );
    } else {
      getUserLocation();
    }
  };

  const getUserLocation = async () => {
    try {
      const location = await getCurrentPositionAsync({ accuracy: Accuracy.High });
      setUserLocation(location.coords);

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
          >
            <View style={styles.customMarker}>
              <Image
                source={require('../assets/me.png')}
                style={styles.markerImage}
              />
            </View>
          </Marker>
        )}

        <Marker
          coordinate={dockBoxCoordinates}
          title= "DockBox Islands brygge"
          onPress={() => navigation.navigate('BryggenScreen', { distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            dockBoxCoordinates.latitude,
            dockBoxCoordinates.longitude
          ) })}
        >
          <View style={styles.customMarker}>
            <Image
              source={require('../assets/your_logo.png')}
              style={styles.markerImage}
            />
          </View>
        </Marker>

        <Marker
          coordinate={dockBoxCoordinates2}
          title= "DockBox Nyhavn"
          onPress={() => navigation.navigate('NyhavnScreen', { distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            dockBoxCoordinates2.latitude,
            dockBoxCoordinates2.longitude
          ) })}
        >
          <View style={styles.customMarker}>
            <Image
              source={require('../assets/your_logo.png')}
              style={styles.markerImage}
            />
          </View>
        </Marker>

        <Marker
          coordinate={dockBoxCoordinates3}
          title= "DockBox Sluseholmen"
          onPress={() => navigation.navigate('SlusenScreen', { distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            dockBoxCoordinates3.latitude,
            dockBoxCoordinates3.longitude
          ) })}
        >
          <View style={styles.customMarker}>
            <Image
              source={require('../assets/your_logo.png')}
              style={styles.markerImage}
            />
          </View>
        </Marker>

        <Marker
          coordinate={dockBoxCoordinates4}
          title= "DockBox Nordhavn"
          onPress={() => navigation.navigate('NordhavnScreen', { distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            dockBoxCoordinates4.latitude,
            dockBoxCoordinates4.longitude
          ) })}
        >
          <View style={styles.customMarker}>
            <Image
              source={require('../assets/your_logo.png')}
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
  },
  map: {
    flex: 1,
  },
  customMarker: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  headerImage: {
    width: 100,
    height: 40,
  },
  profileIcon: {
    marginRight: 20,
  },
  menuIcon: {
    marginLeft: 20,
  },
});

export default HomeScreen;
