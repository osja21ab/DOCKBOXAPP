import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Packages - Subscription</Text>
      <Image source={require('../assets/sub.png')} style={styles.image} />
      {/* Other subscription-related content can be added here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Aligns content to the top
    alignItems: 'center',
    backgroundColor: 'white', // Set background color to white
    paddingTop: 20, // Padding to avoid overlapping with the header
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#095167',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  menuIcon: {
    marginLeft: 15,
  },
});

export default SubscriptionScreen;
