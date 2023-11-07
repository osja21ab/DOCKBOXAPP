// PaymentForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';

const PaymentForm = ({ product, onComplete }) => {
  const [email, setEmail] = useState('');
  const { confirmPayment, loading } = useConfirmPayment();

  const handlePayment = async () => {
    const { paymentMethod, error } = await confirmPayment(/* clientSecret */);

    if (error) {
      // Handle payment error
    } else {
      // Payment successful
      onComplete(); // Callback to the parent component
    }
  };

  return (
    <View>
      <Text>Payment Information</Text>
      <CardField
        postalCodeEnabled={false} // You can enable it if needed
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button
        title="Pay Now"
        onPress={handlePayment}
        disabled={loading}
      />
    </View>
  );
};

export default PaymentForm;
