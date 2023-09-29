import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Camera } from 'expo-camera';
import productsData from '../products.json';

const LocationDetail = () => {
  const [products, setProducts] = useState([]);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    fetchProducts();
    askCameraPermission();
  }, []);

  const fetchProducts = () => {
    setProducts(productsData);
  };

  const getImageSource = (imagePath) => {
    switch (imagePath) {
      case './paddle.png':
        return require('./paddle.png');
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

    // Optionally, perform additional actions with the scanned data here
    // setScannedData(scannedData);
    setCameraVisible(false); // Close the camera after scanning

    // Open the scanned URL
    if (scannedData.startsWith('http://') || scannedData.startsWith('https://')) {
      Linking.openURL(scannedData);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Camera Component */}
      {isCameraVisible && (
        <Camera
          style={styles.fullScreenCamera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={handleBarcodeRead}
        />
      )}

      {!isCameraVisible && (
        <>
          <Text style={styles.title}>Produktliste</Text>
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

      {scannedData && (
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
});

export default LocationDetail;
