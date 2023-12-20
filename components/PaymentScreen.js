import React, { useState, useEffect } from 'react';
import { View,Text,TextInput,Button, Alert,StyleSheet,ScrollView,Image,Modal,TouchableOpacity,} from 'react-native';
import { getFirestore, collection, doc, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { app, auth } from '../firebase/fireBase';
import { Feather } from '@expo/vector-icons';

//initialise Card screen 
const PaymentScreen = ({ navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');
  const [cardType, setCardType] = useState('');
  const [cards, setCards] = useState([]);
  const [showCardTypePicker, setShowCardTypePicker] = useState(false);

//fetch users already created cards from firestore
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
//function to add card data to firestore and show in app
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
//Delete card form firestore and app
  const deleteCard = async (cardId) => {
    try {
      const db = getFirestore(app);
      const user = auth.currentUser;

      if (user) {
        const userEmail = user.email.toLowerCase();
        const userDocRef = doc(db, 'Users', userEmail);
        const paymentMethodDocRef = doc(userDocRef, 'PaymentMethod', cardId);

        await deleteDoc(paymentMethodDocRef);

        Alert.alert('Card Deleted', 'Card has been successfully deleted.');
        getCards();
      } else {
        console.log('No user logged in.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
//Header details
  useEffect(() => {
    navigation.setOptions({
      title: 'Add Payment Method',
      headerStyle: {
        backgroundColor: '#095167',
      },
      headerTintColor: '#FCCE85',
      headerTitleStyle: {
        fontSize: 18,
      },
      headerLeft: () => (
        <Feather
          name="arrow-left"
          size={24}
          color="#FCCE85"
          onPress={() => navigation.navigate('ProfileScreen')}
          style={{ marginLeft: 10 }}
        />
      ),
    });
  }, [navigation]);

  const handleCardNumberChange = (input) => {
    // Remove any non-numeric characters
    const numericInput = input.replace(/[^\d]/g, '');

    // Insert a space every 4 digits
    const formattedInput = numericInput.replace(/(\d{4})/g, '$1 ').trim();

    // Limit total length to 19 characters
    const limitedInput = formattedInput.slice(0, 19);

    setCardNumber(limitedInput);
  };

  const handleExpiryChange = (input) => {
    // Remove any non-numeric characters
    const numericInput = input.replace(/[^\d]/g, '');

    // Format the input as MM/YY
    const formattedInput = numericInput.replace(/(\d{0,2})(\d{0,2})/, (_, p1, p2) => (p1 ? p1 + (p2 ? '/' + p2 : '') : ''));

    setExpiry(formattedInput);
  };

  const handleCVVChange = (input) => {
    // Remove any non-numeric characters
    const numericInput = input.replace(/[^\d]/g, '');

    // Limit to a maximum of 3 digits
    const limitedInput = numericInput.slice(0, 3);

    setCVV(limitedInput);
  };

  const selectCardType = (type) => {
    setCardType(type);
    setShowCardTypePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Add Payment Method</Text>

      <View style={styles.cardInputContainer}>
        <View style={styles.inputRow}>
          <View style={styles.cardIcon}>
            <Feather name="credit-card" size={20} color="#095167" />
          </View>
          <TextInput
            style={styles.input}
            value={cardNumber}
            onChangeText={handleCardNumberChange}
            keyboardType="numeric"
            placeholder="Enter card number"
            placeholderTextColor="#b3b3b3"
            maxLength={19}
          />
        </View>

        <View style={styles.inputRow}>
          <View style={styles.cardIcon}>
            <Feather name="calendar" size={20} color="#095167" />
          </View>
          <TextInput
            style={styles.inputdate}
            value={expiry}
            onChangeText={handleExpiryChange}
            keyboardType="numeric"
            maxLength={5}
            placeholder="MM/YY"
            placeholderTextColor="#b3b3b3"
          />

          <View style={styles.cardIcon}>
            <Feather name="lock" size={20} color="#095167" />
          </View>
          <TextInput
            style={styles.inputcvv}
            value={cvv}
            onChangeText={handleCVVChange}
            keyboardType="numeric"
            placeholder="CVV"
            placeholderTextColor="#b3b3b3"
/>
        </View>
      </View>

      <TouchableOpacity
          style={styles.cardTypeButton}
          onPress={() => setShowCardTypePicker(!showCardTypePicker)}
        >
          <Text style={styles.cardTypeButtonText}>{`Card Type: ${cardType || 'Select'}`}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showCardTypePicker}
          onRequestClose={() => setShowCardTypePicker(false)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.cardTypePickerOption} onPress={() => selectCardType('Visa')}>
              <Text style={styles.cardTypePickerOptionText}>Visa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardTypePickerOption} onPress={() => selectCardType('Mastercard')}>
              <Text style={styles.cardTypePickerOptionText}>Mastercard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardTypePickerOption} onPress={() => selectCardType('Dankort')}>
              <Text style={styles.cardTypePickerOptionText}>Dankort</Text>
            </TouchableOpacity>
          </View>
        </Modal>

      <TouchableOpacity
        style={styles.addButton}
        onPress={addCardToFirestore}
      >
        <Text style={styles.addButtonLabel}>Add Card</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Your Cards</Text>
      <ScrollView>
  {cards.length === 0 ? (
    <Text style={styles.noCardText}>You have no payment method, please add one above!</Text>
  ) : (
    cards.map((card) => (
      <View key={card.id} style={styles.cardContainer}>
        <View style={styles.cardDetails}>
          <Text style={styles.cardDetailstext}>Card Number: **** **** **** {card.cardNumber.slice(-4)}</Text>
          <Text style={styles.cardDetailstext}>Expiry: {card.expiry}</Text>
          <Text style={styles.cardDetailstext}>CVV: ***</Text>
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
        <TouchableOpacity onPress={() => deleteCard(card.id)}>
          <Feather name="trash-2" size={24} color="#d11a2a" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 45,
    borderColor: '#095167',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 20,
    width: 300,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  inputdate: {
    height: 45,
    borderColor: '#095167',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 20,
    width: 130,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputcvv: {
    height: 45,
    borderColor: '#095167',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 20,
    width: 130,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noCardText: {
    fontSize: 16,
    color: 'gray',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#095167',
    borderRadius: 20,
    marginBottom: 10,
    elevation: 3, // Add elevation for a slight shadow on Android
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardDetails: {
    flex: 1,
    marginRight: 20,
  },
  cardDetailstext: {
    color: '#FCCE85',
    fontWeight: 'bold',
    fontSize: 12,
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
  cardInputContainer: {
    marginBottom: 10,
  },
  cardIcon: {
    marginRight: 7,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50', // Set your desired green color
    borderRadius: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardTypeButton: {
    backgroundColor: '#FCCE85', // Set your desired color
    borderRadius: 20,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  cardTypeButtonText: {
    color: '#095167', // Set your desired text color
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  cardTypePickerOption: {
    backgroundColor: '#FCCE85',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#095167',
    alignItems: 'center',
  },
  
  cardTypePickerOptionText: {
    color: '#095167',
    fontSize: 16,
    fontWeight: 'bold',
  },
});  

export default PaymentScreen;
