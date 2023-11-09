import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../firebase/fireBase';
import { collection, addDoc } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);

const RentScreen = ({ route, navigation }) => {
  const { product } = route.params;

  //tjek om bryggen skal være med småt
  const handleRentPress = async () => {
    try {
      const locations = ['bryggen', 'Sluseholmen', 'Nyhavn', 'Nordhavn'];
      const auth = getAuth(app);
      const userEmail = auth.currentUser.email.toLowerCase();
      const productId = `product${Math.floor(Math.random() * 20) + 1}`;

      const rentedProductsRef = doc(db, 'Users', userEmail, 'rentedProducts',productId);
      await setDoc(rentedProductsRef, {
        productName: product.productName,
        rentedAt: new Date(),
        ReturnStatus: false, // Add the ReturnStatus field 
        // Store the current date and time
      });

      for (const location of locations) {
        const productRef = doc(db, location, product.id);
        await setDoc(productRef, {
          RentStatus: 2,
        }, { merge: true });
      }

      // Show an alert indicating that the product has been rented
      Alert.alert('Product Rented', 'The product has been successfully rented.');

      // Navigate back to the previous screen (you can customize this navigation logic)
      navigation.goBack();
    } catch (error) {
      console.error('Error renting product:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/paddle.png')} style={styles.productImage} />
      <Text style={styles.title}>Rent Product</Text>
      <Text style={styles.productName}>Product Name: {product.productName}</Text>
      <TouchableOpacity onPress={handleRentPress} style={styles.rentButton}>
        <Text style={styles.rentButtonText}>Rent Product</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productImage: {
    width: 200, // Adjust the width and height as needed
    height: 200,
    resizeMode: 'contain',
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
});

export default RentScreen;