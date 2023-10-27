import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native'; // Import DrawerActions

const HomeScreen = ({ navigation }) => {
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
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} // Open the drawer
          style={styles.menuIcon}
        >
          <Feather name="menu" size={30} color="#FCCE85" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={copenhagenCoordinates}
      >
        <Marker
          coordinate={dockBoxCoordinates}
          title="DockBox"
          onPress={() => navigation.navigate('LocationDetailScreen')}
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
    borderWidth: 2,
    borderColor: 'lightgreen',
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
