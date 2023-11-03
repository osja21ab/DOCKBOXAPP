import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: 'Your profile ',
          headerStyle: {
            height: 90,
            backgroundColor: '#095167',
          },
          headerTintColor: '#FCCE85',
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={30}
              color="#FCCE85"
              style={styles.menuIcon}
              onPress={() => navigation.navigate('HomeScreen')}
            />
          ),
        });
      }, [navigation]);    
    const handleLogOut = () => {
        // Handle the log out logic here
    };

    const handleDeleteAccount = () => {
        // Handle the delete account logic here
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/userPicture.jpg')}
                style={styles.profileImage}
            />
            <Text style={styles.username}>Your email</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Change Password</Text>
                <Feather name="lock" style={styles.featherStyling} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Change Email</Text>
                <Feather name="at-sign" style={styles.featherStyling} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyTrips')}>
                <Text style={styles.buttonText}>My Trips</Text>
                <Feather name="map" style={styles.featherStyling} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Payment Methods</Text>
                <Feather name="credit-card" style={styles.featherStyling} />
            </TouchableOpacity>

            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.accountButton} onPress={handleLogOut}>
                    <Text style={styles.accountButtonText}>Log Out</Text>
                    <Feather name="log-out" style={styles.featherStyling} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.accountButton} onPress={handleDeleteAccount}>
                    <Text style={styles.accountButtonText}>Delete Account</Text>
                    <Feather name="trash-2" style={styles.featherStyling} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        marginTop: 50,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 10,
    },
    username: {
        fontSize: 12,
        marginBottom: 30,
        color: '#2A3439',
    },
    button: {
        backgroundColor: '#8FC0E8',
        padding: 10,
        borderRadius: 50,
        marginBottom: 20,
        width: 170,
    },
    buttonText: {
        color: '#2A3439',
        fontSize: 14,
        textAlign: 'center',
    },
    featherStyling: {
        color: '#2A3439',
        fontSize: 16,
        textAlign: 'center',
        marginRight: 0,
    },
    bottomButtons: {
        flexDirection: 'row', // Arrange buttons horizontally
        justifyContent: 'space-between', // Space them evenly
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 100,
    },
    accountButton: {
        backgroundColor: '#8FC0E8',
        padding: 10,
        borderRadius: 30,
        width: '48%', // Adjust the width as needed
        fontWeight: 'bold',
    },
    accountButtonText: {
        color: '#2A3439',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;