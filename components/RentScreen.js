import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { updateDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from '../firebase/fireBase';

const db = getFirestore(app);

const RentScreen = ({ route, navigation }) => {
  const { product } = route.params;

  const handleRentPress = async () => {
    try {
      // Update the RentStatus field in Firestore to 2 (rented) for "Bryggen"
      const bryggenProductRef = doc(db, 'bryggen', product.id);
      await updateDoc(bryggenProductRef, {
        RentStatus: 2,
      });

      // Update the RentStatus field in Firestore to 2 (rented) for "Sluseholmen"
      const sluseholmenProductRef = doc(db, 'sluseholmen', product.id);
      await updateDoc(sluseholmenProductRef, {
        RentStatus: 2,
      });

      // Update the RentStatus field in Firestore to 2 (rented) for "Nyhavn"
      const nyhavnProductRef = doc(db, 'nyhavn', product.id);
      await updateDoc(nyhavnProductRef, {
        RentStatus: 2,
      });

      // Update the RentStatus field in Firestore to 2 (rented) for "Nordhavn"
      const nordhavnProductRef = doc(db, 'nordhavn', product.id);
      await updateDoc(nordhavnProductRef, {
        RentStatus: 2,
      });

      // Show an alert indicating that the product has been rented
      Alert.alert('Product Rented', 'The product has been successfully rented.');

      // Navigate back to the previous screen (you can customize this navigation logic)
      navigation.goBack();
    } catch (error) {
      console.error('Error renting product:', error);
      // Handle the error as needed (e.g., show an error message)
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
