import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';

const GetstartedScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Get Started',
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.stepsContainer}>
        <Text style={styles.step}>Steps to Rent Paddleboards</Text>
        {renderStep('1. Find your nearest DockBox location', require('../assets/step1.png'))}
        {renderStep('2. Select an item to rent in the app', require('../assets/step2.png'))}
        {renderStep('3. Scan the QR code on the desired item', require('../assets/step3.png'))}
        {renderStep('4. Swipe to rent', require('../assets/step4.png'))}
        {renderStep('5. Grab a paddle, and enjoy!', require('../assets/step5.png'))}
      </View>
    </ScrollView>
  );
};

const renderStep = (stepText, image) => {
  return (
    <View style={styles.stepBox}>
      <Text style={styles.stepText}>{stepText}</Text>
      <Image source={image} style={styles.stepImage} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  menuIcon: {
    marginLeft: 20,
  },
  stepsContainer: {
    width: '90%',
  },
  step: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  stepText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});

export default GetstartedScreen;
