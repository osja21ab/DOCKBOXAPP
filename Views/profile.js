import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <Text>
            <Feather
              name="arrow-left"
              size={30}
              color="#FCCE85"
              onPress={() => navigation.goBack()}
            />
          </Text>
        </View>
      ),
      headerTitle: () => (
        <Image
          source={require('./your_logo.png')}
          style={styles.headerLogo}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Your profile content goes here */}
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
  headerLogo: {
    width: 120,
    height: 50,
    resizeMode: 'contain',
  },
  headerLeft: {
    paddingLeft: 20,
  },
});

export default Profile;
