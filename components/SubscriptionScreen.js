import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

const SubscriptionScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Subscription',
      headerStyle: {
        height: 90,
        backgroundColor: '#095167',
      },
      headerTintColor: '#FCCE85',
      headerLeft: () => (
        <Feather
          name="menu"
          size={30}
          color="#FCCE85"
          style={styles.menuIcon}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      ),
    });
  }, [navigation]);

  const handleBuyPackages = () => {
    // Action when Buy Packages box is pressed
    // For example, navigate to Buy Packages screen
    // navigation.navigate('BuyPackages');
  };

  const handleSubscription = () => {
    // Action when Subscription box is pressed
    // For example, navigate to Subscription screen
    // navigation.navigate('Subscription');
  };

  const handleAddPromoCode = () => {
    // Action when Add Promo Code box is pressed
    // For example, navigate to Add Promo Code screen
    // navigation.navigate('AddPromoCode');
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Packages - Subscription</Text>
        <Text style={styles.subText}>
          Save money by subscribing or buying packages; your wallet will thank you!
        </Text>
      </View>
      <Image source={require('../assets/sub.png')} style={styles.image} />

      <View style={styles.boxContainer}>
        <TouchableOpacity style={styles.box} onPress={handleBuyPackages}>
          <Feather name="package" size={24} color="#FCCE85" style={styles.boxIcon} />
          <Text style={styles.boxText}>Buy Packages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={handleSubscription}>
          <Feather name="refresh-cw" size={24} color="#FCCE85" style={styles.boxIcon} />
          <Text style={styles.boxText}>Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={handleAddPromoCode}>
          <Feather name="percent" size={24} color="#FCCE85" style={styles.boxIcon} />
          <Text style={styles.boxText}>Add Promo Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  textContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#095167',
  },
  subText: {
    marginBottom: 15,
    color: '#333',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  boxContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  box: {
    width: '95%',
    height: 60,
    backgroundColor: '#095167', // Blue color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, // Rounded edges
    marginVertical: 5,
    flexDirection: 'row',
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FCCE85', // Text color
  },
  boxIcon: {
    marginRight: 10,
  },
  menuIcon: {
    marginLeft: 15,
  },
});

export default SubscriptionScreen;
