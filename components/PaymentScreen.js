import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getFirestore, collection, doc, addDoc } from 'firebase/firestore';
import { app, auth } from '../firebase/fireBase'; // Verify the path to the firebase config

const PaymentScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');

  const addCardToFirestore = async () => {
    try {
      const db = getFirestore(app); // Get the Firestore instance

      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email.toLowerCase();

        const userDocRef = collection(db, 'Users', userEmail, 'PaymentMethod');

        await addDoc(userDocRef, {
          cardNumber,
          expiry,
          cvv,
        });

        Alert.alert('Card Added', 'Card details have been successfully stored.');
      } else {
        console.log('No user logged in.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Text>Card Number</Text>
      <TextInput
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        placeholder="Enter card number"
      />

      <Text>Expiry Date</Text>
      <TextInput
        value={expiry}
        onChangeText={setExpiry}
        keyboardType="numeric"
        placeholder="MM/YY"
      />

      <Text>CVV</Text>
      <TextInput
        value={cvv}
        onChangeText={setCVV}
        keyboardType="numeric"
        placeholder="CVV"
      />

      <Button title="Add Card to Firestore" onPress={addCardToFirestore} />
    </View>
  );
};

export default PaymentScreen;
