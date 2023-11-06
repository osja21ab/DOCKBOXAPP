import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
    const navigation = useNavigation();
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Your profile',
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
            <Image source={require('../assets/userPicture.jpg')} style={styles.profileImage} />
            <Text style={styles.username}>Your email</Text>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ChangePassword')}>
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
                </TouchableOpacity>
                <TouchableOpacity style={styles.accountButton} onPress={handleDeleteAccount}>
                    <Text style={styles.accountButtonText}>Delete Account</Text>
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
        width: 150,
        height: 150,
        borderRadius: 150,
        marginBottom: 20,
    },
    username: {
        fontSize: 16,
        marginBottom: 30,
        color: '#2A3439',
    },
    button: {
        backgroundColor: '#095167',
        padding: 15,
        borderRadius: 50,
        marginBottom: 20,
        width: 250,
        flexDirection: 'row', // Arrange button and icon horizontally
        justifyContent: 'space-between', // Space them evenly
        alignItems: 'center', // Center vertically
    },
    buttonText: {
        color: '#FCCE85',
        fontSize: 20,
    },
    featherStyling: {
        color: '#FCCE85',
        fontSize: 20,
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 40,
    },
    accountButton: {
        backgroundColor: '#095167',
        padding: 20,
        borderRadius: 30,
        width: '48%',
        fontWeight: 'bold',
    },
    accountButtonText: {
        color: '#FCCE85',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    menuIcon: {
        marginLeft: 16,
    },
});

export default ProfileScreen;