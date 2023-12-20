import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../firebase/fireBase';
import { getAuth } from 'firebase/auth';
import { Feather } from '@expo/vector-icons';

// Initialize Firestore
const db = getFirestore(app);

const RentScreen = ({ route, navigation }) => {
  const { product } = route.params; // Get product details from route params
 
  // Function to handle renting a product
  const handleRentPress = async () => {
    try {
       // Define locations and get current user email
      const locations = ['bryggen', 'Sluseholmen', 'Nyhavn', 'Nordhavn'];
      const auth = getAuth(app);
      const userEmail = auth.currentUser.email.toLowerCase();
      // Generate a random productId for rented product
      const productId = `product${Math.floor(Math.random() * 20) + 1}`;
// Set rented product data in user's 'rentedProducts' collection
      const rentedProductsRef = doc(db, 'Users', userEmail, 'rentedProducts', productId);
      await setDoc(rentedProductsRef, {
        productName: product.productName,
        rentedAt: new Date(),
        ReturnStatus: false,
      });
 // Update RentStatus of the product in different locations
      for (const location of locations) {
        const productRef = doc(db, location, product.id);
        await setDoc(productRef, {
          RentStatus: 2,
        }, { merge: true });
      }
// Show an alert upon successful product rental and navigate to HomeScreen
      Alert.alert('Product Rented', 'The product has been successfully rented.');

      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error('Error renting product:', error);
    }
  };

  // Use useLayoutEffect to customize the header
  useLayoutEffect(() => {
    navigation.setOptions({
      // Set header options for the screen
      title: 'Rent Product',
      headerStyle: {
        backgroundColor: '#095167',
      },
      headerTintColor: '#FCCE85',
      headerTitleStyle: {
        height: 90, 
      },
      headerLeft: () => (
        <Feather
          name="arrow-left"
          size={30}
          color="#FCCE85"
          style={styles.menuIcon}
          onPress={() => navigation.navigate('HomeScreen')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
       {/* Render product image, title, name, and rent button */}
      <Image source={require('../assets/paddle.png')} style={styles.productImage} />
      <Text style={styles.title}>Rent Product</Text>
      <Text style={styles.productName}>Product Name: {product.productName}</Text>
      <TouchableOpacity onPress={handleRentPress} style={styles.rentButton}>
        <Feather name="anchor" size={20} color="white" style={styles.icon} />
        <Text style={styles.rentButtonText}>Rent Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#095167',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fcce85',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fcce85',
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  rentButton: {
    marginTop: 20,
    padding: 10,
    width: 250,
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 100,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center', // Center both horizontally and vertically
  },
  rentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10, // Add some spacing between the icon and text
  },
  menuIcon: {
    marginLeft: 20,
  },
  icon: {
    marginRight: 1,
  },
});

export default RentScreen;