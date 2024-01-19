import React, { useLayoutEffect, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase/fireBase'; // Import Firebase app instance
import { useRoute } from '@react-navigation/native';

const db = getFirestore(app); // Initialize Firestore database

const BryggenScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const distance = route.params?.distance || 'N/A'; // Get distance from route parameters

// State variables to manage product data, camera permission, and camera visibility
  const [products, setProducts] = useState([]);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraVisible, setCameraVisible] = useState(false);

  // Header configurations including title, icons, and styles
  useLayoutEffect(() => {
   navigation.setOptions({
      headerTitle: `Bryggen (Distance: ${distance} km)`, //change header depedending on distance
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

   // Fetch products and ask for camera permission on component start
  useEffect(() => {
    fetchProducts();
    askCameraPermission();
  }, []);

  // Function to fetch products from Firestore
  const fetchProducts = async () => {
    const productsCollection = collection(db, 'bryggen');
    const productsData = [];

    try {
      const querySnapshot = await getDocs(productsCollection);
      querySnapshot.forEach((doc) => {
        const productData = doc.data();
        if (productData.RentStatus !== 2) { // Exclude products with RentStatus 2(rented)
          productsData.push({
            id: doc.id,
            productName: productData.productName,
          });
        }
      });
      setProducts(productsData);
      console.log(productsData);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };
// Function to request camera permission using Expo's Camera API
  const askCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

// when product is pressed activate the camera for barcode scanning
  const handleProductPress = () => {
    setCameraVisible(true);
  };

    // Handle barcodedata from the camera and find matching product with that ID
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
//support phone function
  const callPhoneNumber = () => {
    Linking.openURL('tel:+4526716980');
  };

  //product pictures
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

  //UI
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

