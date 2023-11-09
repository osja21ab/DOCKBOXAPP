import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Image, Modal } from 'react-native';
import { getFirestore, collection, doc, addDoc, getDocs } from 'firebase/firestore';
import { app, auth } from '../firebase/fireBase';
import { Feather } from '@expo/vector-icons';



const PaymentScreen = ({navigation}) => {
    
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardType, setCardType] = useState('');
  const [cards, setCards] = useState([]);
  const [showCardTypePicker, setShowCardTypePicker] = useState(false);

  const getCards = async () => {
    try {
      const db = getFirestore(app);
      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email.toLowerCase();
        const userDocRef = doc(db, 'Users', userEmail);
        const paymentMethodCollectionRef = collection(userDocRef, 'PaymentMethod');
        const querySnapshot = await getDocs(paymentMethodCollectionRef);
        const userCards = [];
        querySnapshot.forEach((doc) => {
          userCards.push({ id: doc.id, ...doc.data() });
        });
        setCards(userCards);
      } else {
        console.log('No user logged in.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  const addCardToFirestore = async () => {
    try {
      const db = getFirestore(app);
      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email.toLowerCase();
        const userDocRef = doc(db, 'Users', userEmail);
        const paymentMethodCollectionRef = collection(userDocRef, 'PaymentMethod');

        await addDoc(paymentMethodCollectionRef, {
          cardNumber,
          expiry,
          cvv,
          cardType,
        });

        Alert.alert('Card Added', 'Card details have been successfully stored.');
        setCardNumber('');
        setExpiry('');
        setCVV('');
        setCardType('');
        setShowCardTypePicker(false);

        getCards();
      } else {
        console.log('No user logged in.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const selectCardType = (type) => {
    setCardType(type);
    setShowCardTypePicker(false);
  };

  useEffect(() => {
    navigation.setOptions({
        title: 'Add Payment Method',
        headerStyle: {
          backgroundColor: '#095167',
        },
        headerTintColor: '#FCCE85',
        headerTitleStyle: {
          fontSize: 18, // Change the title font size
        },
        headerLeft: () => (
          <Feather // Use Feather icon for the back button
            name="arrow-left"
            size={24}
            color="#FCCE85"
            onPress={() => navigation.navigate('ProfileScreen')}
            style={{ marginLeft: 10 }}
          />
        ),
      });
    }, [navigation]);
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Add Payment Method</Text>
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
        placeholder="Enter card number"
      />
      <View style={{ flexDirection: 'row' }}>
  <TextInput
    style={styles.inputdate}
    value={expiry}
    onChangeText={setExpiry}
    keyboardType="numeric"
    placeholder="MM/YY"
  />
  <TextInput
    style={styles.inputcvv}
    value={cvv}
    onChangeText={setCVV}
    keyboardType="numeric"
    placeholder="CVV"
  />
</View>

      <View style={styles.cardTypeContainer}>
        <Button title={`Card Type: ${cardType || 'Select'}`} onPress={() => setShowCardTypePicker(!showCardTypePicker)} />
        <Modal
          animationType="slide"
          transparent={true}
          visible={showCardTypePicker}
          onRequestClose={() => setShowCardTypePicker(false)}
        >
          <View style={styles.modalView}>
            <Button title="Visa" color={'#FCCE85'} onPress={() => selectCardType('Visa')} />
            <Button title="Mastercard" color={'#FCCE85'} onPress={() => selectCardType('Mastercard')} />
            <Button title="Dankort" color={'#FCCE85'} onPress={() => selectCardType('Dankort')} />
          </View>
        </Modal>
      </View>

      <Button title="Add Card" onPress={addCardToFirestore} />

      <Text style={styles.sectionTitle}>Your Cards</Text>
      <ScrollView>
        {cards.length === 0 ? (
          <Text style={styles.noCardText}>You have no cards added.</Text>
        ) : (
          cards.map((card) => (
            <View key={card.id} style={styles.cardContainer}>
              <View style={styles.cardDetails}>
                <Text style={styles.cardDetailstext}>Card Number: {card.cardNumber}</Text>
                <Text style={styles.cardDetailstext}>Expiry: {card.expiry}</Text>
                <Text style={styles.cardDetailstext}>CVV: {card.cvv}</Text>
                <Text style={styles.cardDetailstext}>Card Type: {card.cardType}</Text>
              </View>
              <Image
                source={
                  card.cardType === 'Visa'
                    ? require('../assets/visa.png')
                    : card.cardType === 'Mastercard'
                    ? require('../assets/mastercard.png')
                    : card.cardType === 'Dankort'
                    ? require('../assets/dankort.png')
                    : null
                }
                style={styles.cardImage}
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#095167',
    alignSelf: 'center',
  },
  input: {
    height: 45,
    borderColor: '#095167',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 20,
    width: 350,
    alignSelf: 'center',
  },
  inputdate: {
    height: 45,
    borderColor: '#095167',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 20,
    width: 140,
    marginRight: 10,
    marginLeft: 30,
  },
  inputcvv: {
    height: 45,
    borderColor: '#095167',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 20,
    width: 140,
    
  

  },
  noCardText: {
    fontSize: 16,
    color: 'gray',
  },
  cardContainer: {
    padding: 20,
    backgroundColor: '#095167',
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  

  },
  cardDetails: {
    flex: 1,
  
  },
  cardDetailstext: {
    color: '#FCCE85',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  cardTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
     
  },
  modalView: {
    margin: 50,
    backgroundColor: '#095167',
    marginTop: '90%',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default PaymentScreen;
