import React, {useState, useEffect} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, setDoc, collection, doc, updateDoc, snapshot } from "firebase/firestore";
import { auth, db } from '../firebase/fireBase'; // adjust the path to your fireBase.js file
import { getDoc } from "firebase/firestore";
import { deleteUser } from 'firebase/auth';
import { deleteDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

//initialise ProfileScreen
const ProfileScreen = ({ setIsLoggedIn }) => {
    const navigation = useNavigation();
    const [email, setEmail] = useState(''); // Add this line
    const [images, setImages] = useState([]);
    const [profileImage, setProfileImage] = useState(null);

    const uploadImage = async (image) => {
        const user = auth.currentUser;
        const storage = getStorage();
    //fetch user profile picture
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        const response = await fetch(image);
        const blob = await response.blob();
    
        const uploadTask = uploadBytesResumable(storageRef, blob);
    
        uploadTask.on('state_changed', 
    (snapshot) => {
    }, 
    (error) => {
        console.log('Upload error:', error);
    }, //show user profile pic on screen
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('Download URL:', downloadURL);
            const userDoc = doc(db, "Users", user.email.toLowerCase());
            await updateDoc(userDoc, { profileImage: downloadURL }, { merge: true });
            setProfileImage(downloadURL);
        }).catch((error) => {
            console.log('Get download URL error:', error);
        });
    }
);
    };
    //image picker for choosing profile picture
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });
    
        if (!result.cancelled) {
            setImages([result.uri]);
            uploadImage(result.uri);
        }
    };
//set profile image in firestore
    const fetchProfileImage = async (user) => {
        const userDoc = doc(db, "Users",user.email.toLowerCase());
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
            setProfileImage(docSnap.data().profileImage);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setEmail(user.email.toLowerCase());
                fetchProfileImage(user);
            } else {
                setEmail('');
                setProfileImage(null); // Reset the profile image when the user logs out = no user is logged in
            }
        });
    
        return unsubscribe;
    }, []);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email.toLowerCase());
            fetchProfileImage(user); // Fetch the profile image when the user changes
        } else {
            setEmail('');
        }
    }, [setIsLoggedIn]);

//header options and styling
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
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                fetchProfileImage(user);
            }
        });
    
        return unsubscribe;
    }, []);

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setEmail(user.email.toLowerCase());
            fetchProfileImage(user); // Fetch the profile image when the user changes
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
        }
    };
//delete account function
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
        <Image source={profileImage ? {uri: profileImage} : require('../assets/profil.png')} style={styles.profileImage} />
        <Text style={styles.username}>{email}</Text>
        <TouchableOpacity onPress={pickImage}>
        <Feather name="edit" style={styles.editbutton} />
        </TouchableOpacity>

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
        marginBottom: 10,
        marginTop:50
    },
    username: {
        fontSize: 16,
        marginBottom:10,
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
    editbutton: {
        fontSize: 24,
        color: 'black', // Adjust the color as needed
        zIndex: 1,
        bottom:245,
        left: 80,
        color: '#FCCE85',        
    },
    
});

export default ProfileScreen;