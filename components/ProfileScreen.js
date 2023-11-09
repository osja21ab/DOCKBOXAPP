import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase/fireBase'; // adjust the path to your fireBase.js file
import { setDoc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { deleteUser } from 'firebase/auth';
import { deleteDoc } from 'firebase/firestore';


const ProfileScreen = ({ setIsLoggedIn }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState(''); // Add this line
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Your profile',
            headerStyle: {
                backgroundColor: '#095167',
            },
            headerTintColor: '#FCCE85',
            headerTitleStyle: {
                height: 90, // Adjust this height to modify the header height
            },
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

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email.toLowerCase());
        } else {
            setEmail('');
        }
    }, [setIsLoggedIn]);

    const handleLogOut = async () => {
        const user = auth.currentUser;
        
        if (user) {
            const email = user.email.toLowerCase(); // Convert email to lowercase
            const userDoc = doc(db, "Users", email);
            const docSnap = await getDoc(userDoc);
    
            if (!docSnap.exists()) {
                // If the document does not exist, create it
                await setDoc(userDoc, { loggedIn: false });
            } else {
                // If the document exists, update it
                await updateDoc(userDoc, { loggedIn: false });
            }
    
            // Set isLoggedIn state to false
            setIsLoggedIn(false);
    
            // Add any additional logout logic here
        }
    };

    const handleDeleteAccount = async () => {
        const user = auth.currentUser;
        if (user) {
            const email = user.email.toLowerCase(); // Convert email to lowercase
            const userDoc = doc(db, "Users", email);
    
            try {
                // Delete the user's document from Firestore
                await deleteDoc(userDoc);
    
                // Delete the user from Firebase auth
                await deleteUser(user);
    
                // Set isLoggedIn state to false
                setIsLoggedIn(false);
            } catch (error) {
                console.error("Error deleting user: ", error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerBox} />
            <Image source={require('../assets/profil.png')} style={styles.profileImage} />
            <Text style={styles.username}>{email}</Text>

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

            <TouchableOpacity style={styles.button}onPress={() => navigation.navigate('PaymentScreen')}> 
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
        marginTop: 0,
    },
    headerBox: {
        backgroundColor: '#095167',
        height: 170,
        width: '100%',
        position: 'absolute',
        top: 0,
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 150,
        marginBottom: 20,
        marginTop:50
    },
    username: {
        fontSize: 16,
        marginBottom: 30,
        color: 'grey',
    },
    button: {
        backgroundColor: 'transparent',
        padding: 15,
        borderRadius: 50,
        marginBottom: 20,
        width: 250,
        flexDirection: 'row', // Arrange button and icon horizontally
        justifyContent: 'space-between', // Space them evenly
        alignItems: 'center', // Center vertically
    },
    buttonText: {
        color: '#095167',
        fontSize: 20,
        fontWeight: 'bold',
    },
    featherStyling: {
        color: '#095167',
        fontSize: 30,
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
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
    
});

export default ProfileScreen;