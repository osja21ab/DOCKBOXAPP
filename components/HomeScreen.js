import React, { useLayoutEffect, useEffect, useState, useContext, useRef } from 'react';
import { Button, Modal, StyleSheet, View, Image, Alert, Text, TouchableOpacity, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, Accuracy } from 'expo-location';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, getDocs, deleteDoc, query, where, updateDoc } from 'firebase/firestore';
import UserContext from './UserContext';
import { app } from '../firebase/fireBase'
import { Picker } from '@react-native-picker/picker';

const HomeScreen = ({ navigation }) => {
  const { userId } = useContext(UserContext);
  const copenhagenCoordinates = {
    latitude: 55.6616,
    longitude: 12.5925,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [userLocation, setUserLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(copenhagenCoordinates);
  const [hasRentedProducts, setHasRentedProducts] = useState(false);
  const [rentedProducts, setRentedProducts] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const sessionBoxHeight = useRef(new Animated.Value(0.15)).current;
  const [isSessionBoxExpanded, setIsSessionBoxExpanded] = useState(true);
  const [endTime, setEndTime] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchUserData = () => {
      const db = getFirestore();
      const userRef = doc(db, 'Users', userId.toLowerCase());

      const unsubscribe = onSnapshot(collection(userRef, 'rentedProducts'), (snapshot) => {
        const products = snapshot.docs.map((doc) => doc.data());
        setRentedProducts(products);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchUserData();
    return () => unsubscribe();
  }, [userId]);

  useFocusEffect(
    React.useCallback(() => {
      const getCards = async () => {
        try {
          const db = getFirestore(app);
          const auth = getAuth();
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
    
      getCards();
    }, [])
  );

  useEffect(() => {
    console.log('selectedCard state variable:', selectedCard);
  }, [selectedCard]);

  useEffect(() => {
    if (!isSessionBoxExpanded) {
      setEndTime(new Date());
    }
  }, [isSessionBoxExpanded]);

  useEffect(() => {
    setHasRentedProducts(rentedProducts.length > 0);
  }, [rentedProducts]);

  const deleteRentedProducts = async () => {
    try {
      const auth = getAuth();
      const email = auth.currentUser.email.toLowerCase();
      const rentedProductsRef = collection(getFirestore(), 'Users', email, 'rentedProducts');
      const querySnapshot = await getDocs(rentedProductsRef);

      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      console.log('Rented products deleted successfully');
    } catch (error) {
      console.error('Error deleting rented products:', error);
    }
  };

 

  const checkRentStatus = async () => {
    const locations = ['bryggen', 'Nordhavn', 'Nyhavn', 'Sluseholmen'];
    const db = getFirestore(app);
  
    for (const location of locations) {
      const q = query(collection(db, location), where("RentStatus", "==", 2));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          updateDoc(doc.ref, { RentStatus: 1 });
        });
        return;
      }
    }
  };
  
 
  

  const dockBoxCoordinates = {
    latitude: 55.667369,
    longitude: 12.576421,
  };

  const dockBoxCoordinates2 = {
    latitude: 55.678374,
    longitude: 12.592681,
  };

  const dockBoxCoordinates3 = {
    latitude: 55.642400,
    longitude: 12.553285,
  };

  const dockBoxCoordinates4 = {
    latitude: 55.706804,
    longitude: 12.598841,
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (lat1 && lon1 && lat2 && lon2) {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance.toFixed(2); // Round to two decimal places
    } else {
      return 'N/A';
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: 80,
        backgroundColor: '#095167',
      },
      headerTintColor: 'white',
      headerTitle: () => (
        <Image
          source={require('../assets/your_logo.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          style={styles.profileIcon}
        >
          <Feather name="user" size={30} color="#FCCE85" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.menuIcon}
        >
          <Feather name="menu" size={30} color="#FCCE85" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    checkAndRequestLocationPermission();
  }, []);

  const checkAndRequestLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Location Permission Required',
        'You need to grant location permission to use this feature.',
        [{ text: 'OK', style: 'default' }]
      );
    } else {
      getUserLocation();
    }
  };

  const onReturnPress = () => {
    Animated.timing(sessionBoxHeight, {
      toValue: 0.5,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setIsSessionBoxExpanded(false);
    console.log('Return product')
  };

  const getUserLocation = async () => {
    try {
      const location = await getCurrentPositionAsync({ accuracy: Accuracy.High });
      setUserLocation(location.coords);

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error('Error getting user location:', error);
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Clean up on unmount
  }, []);

  const onMapPress = () => {
    Animated.timing(sessionBoxHeight, {
      toValue: 0.15,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        setIsSessionBoxExpanded(true);
      }, 10);
    });
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
         onPress={onMapPress}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Your Location"
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <View style={styles.customMarker}>
              <Image
                source={require('../assets/me.png')}
                style={styles.markerImage}
              />
            </View>
          </Marker>
        )}

        <Marker
          coordinate={dockBoxCoordinates}
          title= "DockBox Islands brygge"
          onPress={() => navigation.navigate('BryggenScreen', { distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            dockBoxCoordinates.latitude,
            dockBoxCoordinates.longitude
          ) })}
        >
          <View style={styles.customMarker}>
            <Image
              source={require('../assets/your_logo.png')}
              style={styles.markerImage}
            />
          </View>
        </Marker>

        <Marker
          coordinate={dockBoxCoordinates2}
          title= "DockBox Nyhavn"
          onPress={() => navigation.navigate('NyhavnScreen', { distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            dockBoxCoordinates2.latitude,
            dockBoxCoordinates2.longitude
          ) })}
        >
          <View style={styles.customMarker}>
            <Image
              source={require('../assets/your_logo.png')}
              style={styles.markerImage}
            />
          </View>
        </Marker>

        <Marker
          coordinate={dockBoxCoordinates3}
          title= "DockBox Sluseholmen"
          onPress={() => navigation.navigate('SlusenScreen', { distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            dockBoxCoordinates3.latitude,
            dockBoxCoordinates3.longitude
          ) })}
        >
          <View style={styles.customMarker}>
            <Image
              source={require('../assets/your_logo.png')}
              style={styles.markerImage}
            />
          </View>
        </Marker>

        <Marker
          coordinate={dockBoxCoordinates4}
          title= "DockBox Nordhavn"
          onPress={() => navigation.navigate('NordhavnScreen', { distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            dockBoxCoordinates4.latitude,
            dockBoxCoordinates4.longitude
          ) })}

          
        >
          <View style={styles.customMarker}>
            <Image
              source={require('../assets/your_logo.png')}
              style={styles.markerImage}
            />
          </View>
        </Marker>
      </MapView>


      {hasRentedProducts && (
  <Animated.View style={[styles.sessionBox, { height: sessionBoxHeight.interpolate({ inputRange: [0, 1], outputRange: ['15%', '90%'] }) }]}>
    <Animated.Text style={[styles.sessionHeader, { marginTop: sessionBoxHeight.interpolate({ inputRange: [0.15, 0.5], outputRange: ['0%', '-35%'] }) }]}>
      Session
    </Animated.Text>
    {!isSessionBoxExpanded && (
      <>
        <Text style={styles.titleStyle}>Thank you for choosing DockBox </Text>
        {rentedProducts.map((product, index) => {
          const rentedAt = new Date(product.rentedAt.seconds * 1000);
          const diff = Math.abs(endTime - rentedAt);
          const totalMinutes = Math.floor(diff / 60000); // convert total time difference to minutes
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;
          const seconds = Math.floor((diff % 60000) / 1000);
          const price = totalMinutes * 2; // 2 DKK per minute

          return (
            <>
              <Text style={styles.sessionText} key={index}>
                You spent {hours}h {minutes}m's renting {product.productName}
              </Text>
              <Text style={styles.sessionprice}>
                The total price for your rent = <Text style={styles.boldText}>{price},00 DKK</Text>
              </Text>
            </>
          );
        })}

<View> 
<TouchableOpacity 
  style={styles.button1} 
  onPress={async () => {
    if (cards.length === 0) {
      Alert.alert('Add Payment method first');
    } else {
      await checkRentStatus();
      deleteRentedProducts();
      Alert.alert('Your payment was successful');
    }
  }}
>
  <Text style={styles.buttonText1}>Return and Pay</Text>
</TouchableOpacity>

  <View style={styles.button2}>
  <TouchableOpacity 
  onPress={() => {
    if (cards.length === 0) {
      navigation.navigate('PaymentScreen');
    } else {
      console.log('Card: Select button pressed');
      setShowDropdown(true);
    }
  }}
>
  <Text style={{ fontSize: 18 }}>
    {`Card: ${cards.length > 0 ? `${cards[0].cardType} ending in ${cards[0].cardNumber.slice(-4)}` : 'Please add payment method'}`}
  </Text>
</TouchableOpacity>
  <Modal
  animationType="slide"
  transparent={true}
  visible={showDropdown}
  onRequestClose={() => setShowDropdown(false)}
>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    {cards.length > 0 ? (
      <View style={{ borderColor: '#000000', borderWidth: 2, borderRadius: 40, padding: 10, backgroundColor: '#095167', width: '80%' }}>
         <Text style={{ fontSize: 20, color: '#FCCE85', fontWeight: 'bold', marginBottom: 5, textAlign: 'center' }}>Choose a card</Text>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => {
              console.log('selected card:', card);
              setSelectedCard(card);
              console.log('selectedCard state variable:', selectedCard);
              setShowDropdown(false);
            }}
            style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, width: '80%', alignItems: 'center', backgroundColor: '#095167', marginBottom: 2 }}
          >
            <Text style={{ fontSize: 15, color: '#FCCE85', fontWeight: 'bold' }}>{`${card.cardType} ending in ${card.cardNumber.slice(-4)}`}</Text>
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
              style={{ ...styles.cardImage, width: 50, height: 25, resizeMode: 'contain', marginLeft: '20%' }}
            />
          </TouchableOpacity>
        ))}
      </View>
    ) : (
      <TouchableOpacity onPress={() => {
        if (!selectedCard) {
          navigation.navigate('PaymentScreen');
        }
      }}>
      </TouchableOpacity>
  )}
  </View>
</Modal>
</View>
</View>
      </>
    )}
    {isSessionBoxExpanded && rentedProducts.map((product, index) => {
      const rentedAt = new Date(product.rentedAt.seconds * 1000);
      const now = new Date();
      const diff = Math.abs(currentTime - rentedAt);
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
     

      return (
        <View key={index}>
          <Text style={styles.boxText}> Have a good trip with {product.productName}!</Text>
          <Text style={styles.boxText}>Time since rented: {hours}h {minutes}m {seconds}s</Text>
          <TouchableOpacity style={styles.button} onPress={onReturnPress}>
            <Text style={styles.buttonText}>Return {product.productName}</Text>
          </TouchableOpacity>
        </View>
      );
    })}
  </Animated.View>
)}

      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  customMarker: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  headerImage: {
    width: 100,
    height: 40,
  },
  profileIcon: {
    marginRight: 20,
  },
  menuIcon: {
    marginLeft: 20,
  },
  sessionBox: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(9, 81, 103, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionHeader: {
    fontSize: 24,
    color: '#FCCE85',
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  boxText: {
    fontSize: 18,
    color: '#FCCE85',
    padding: 10,
    marginLeft: 10, // Adjust this to align on the left side
    marginVertical: 1,
  },

  sessionText: {
    fontSize: 18,
    color: '#FCCE85',
    padding: 10,
    marginLeft: -110, // Adjust this to align on the left side
    marginVertical: 30,
  },
  sessionprice: {
    fontSize: 18,
    color: '#FCCE85',
    padding: 10,
    marginLeft: -35,
    marginVertical: -40,
  },
  
  button: {
    backgroundColor: '#FCCE85',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  button1: {
    backgroundColor: '#FCCE85',
    padding: 10,
    borderRadius: 5,
    marginTop: 70,
    marginVertical: -30,
    fontWeight: 'bold',
  },

  button2: {
    backgroundColor: '#FCCE85',
    padding: 10,
    borderRadius: 5,
    marginTop: 60,
    marginVertical: -70,
    width: '150%',
    marginBottom: -80,
   
    
  },
  
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
  },
    buttonText1: {
      color: '#000',
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 0,
      marginVertical: 0,
  },
  titleStyle: {
    fontSize: 20,
    color: '#FCCE85',
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: -60,
    marginVertical: -20,
    marginTop: 30,
  },

 
});


export default HomeScreen;
