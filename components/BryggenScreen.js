import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase/fireBase';

const db = getFirestore(app);

const BryggenScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraVisible, setCameraVisible] = useState(false);

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

  const fetchProducts = async () => {
    const productsCollection = collection(db, 'bryggen');
    const productsData = [];

    try {
      const querySnapshot = await getDocs(productsCollection);
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (productData.RentStatus !== 2) { // Exclude products with RentStatus 2
          productsData.push({
            id: doc.id,
            productName: productData.productName,
            // ... add other fields you need
          });
        }
      });
      setProducts(productsData);
      console.log(productsData);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  const askCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleProductPress = () => {
    setCameraVisible(true);
  };

  const handleBarcodeRead = async (event) => {
    const scannedData = event.data;
    console.log('Scanned Data:', scannedData);

    const matchingProduct = products.find((product) => product.id === scannedData);
    if (matchingProduct) {
      console.log(matchingProduct);
      // If a matching product is found, navigate to the "RentProduct" screen and pass the product as a parameter
      navigation.navigate('RentScreen', { product: matchingProduct });
    } else {
      console.log('Product not found');
    }

    setCameraVisible(false);
  };

  const callPhoneNumber = () => {
    Linking.openURL('tel:+4526716980');
  };

  const getImageSource = (productName) => {
    if (productName && productName.length > 5) {
      return require('../assets/Kajak.png');
    } else {
      return require('../assets/paddle.png');
    }
  };

  const handleRefresh = () => {
    fetchProducts();
  };

  return (
    <View style={styles.container}>
      {isCameraVisible && hasPermission && (
        <Camera
          style={styles.fullScreenCamera}
          type={Camera.Constants.Type.back}
          onBarCodeScanned={handleBarcodeRead}
        />
      )}

      <View style={styles.headerContainer}>
        {!isCameraVisible && ( // Hide the "Rentals" title when the camera is visible
          <Text style={styles.title}>Rentals</Text>
        )}
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Feather name="refresh-cw" size={25} color="#FCCE85" style={styles.refreshIcon} />
        </TouchableOpacity>
      </View>

      {!isCameraVisible && ( // Hide product list when the camera is visible
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleProductPress}>
              <View style={styles.productItem}>
                <Image source={getImageSource(item.productName)} style={styles.productImage} />
                <Text style={styles.productName}>{item.productName}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fullScreenCamera: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  refreshButton: {
    padding: 10,
  },
  refreshIcon: {
    marginLeft: 10,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  headerLeftIcon: {
    marginLeft: 15,
  },
  headerRightIcon: {
    paddingRight: 20,
  },
});

export default BryggenScreen;

