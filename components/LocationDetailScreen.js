import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Camera } from 'expo-camera';
import productsData from '../products.json';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'; // Import Feather icons

const LocationDetailScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [rentalProductId, setRentalProductId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Bryggen',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={30} color="#FCCE85" style={styles.headerLeftIcon} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={callPhoneNumber} style={styles.phoneIconContainer}>
          <Feather name="phone-call" size={25} color="#FCCE85" style={styles.headerRightIcon} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#095167',
      },
      headerTintColor: '#FCCE85',
    });
  }, [navigation]);

  useEffect(() => {
    fetchProducts();
    askCameraPermission();
  }, []);

  const fetchProducts = () => {
    setProducts(productsData);
  };

  const getImageSource = (imagePath) => {
    switch (imagePath) {
      case 'paddle.png':
        return require('../assets/paddle.png');
      default:
        return null;
    }
  };

  const askCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleProductPress = () => {
    setCameraVisible(true);
  };

  const handleBarcodeRead = (event) => {
    const scannedData = event.data;
    console.log('Scanned Data:', scannedData);

    const matchingProduct = products.find((product) => product.id.toString() === scannedData);
    if (matchingProduct) {
      setRentalProductId(matchingProduct.id);
    }

    setScannedData(scannedData);
    setCameraVisible(false);
  };

  const handleRentProduct = () => {
    console.log(`Renting product with ID: ${rentalProductId}`);
  };

  const callPhoneNumber = () => {
    Linking.openURL('tel:+4526716980');
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {isCameraVisible && (
        <Camera
          style={styles.fullScreenCamera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={handleBarcodeRead}
        />
      )}

      {!isCameraVisible && rentalProductId ? (
        <View style={styles.rentalContainer}>
          <Text style={styles.title}>Rent Product</Text>
          <Text style={styles.scannedDataText}>Product ID: {rentalProductId}</Text>
          <TouchableOpacity onPress={handleRentProduct} style={styles.rentButton}>
            <Text style={styles.rentButtonText}>Rent Product</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {!isCameraVisible && !rentalProductId && (
        <>
          <Text style={styles.title}>Rentals</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={handleProductPress}>
                <View style={styles.productItem}>
                  <Image
                    source={getImageSource(item.image)}
                    style={styles.productImage}
                  />
                  <Text>{item.name}</Text>
                  <Text>{item.description}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}

      {scannedData && !rentalProductId && (
        <View style={styles.scannedDataContainer}>
          <Text style={styles.scannedDataText}>Scanned Data: {scannedData}</Text>
        </View>
      )}
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
  fullScreenCamera: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  scannedDataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  scannedDataText: {
    fontSize: 16,
  },
  rentalContainer: {
    alignItems: 'center',
  },
  rentButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  rentButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerLeftIcon: {
    marginLeft: 15,
  },
  headerRightIcon: {
    paddingRight: 20, // Add padding to the right side of the phone call icon
  },
});

export default LocationDetailScreen;
