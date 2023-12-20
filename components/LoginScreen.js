import React from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import fireBase from '../firebase/fireBase';
// Import necessary Firebase authentication and firestore methods
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc } from 'firebase/firestore'; // Import Firebase configuration

//Login screen initialisation
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
  }
  // Function to handle user login
  handleLogin = async () => {
    let { email, password } = this.state;
  
    if (!email || !password) {
      this.setState({ errorMessage: 'Email and password are required' });
      return;
    }
  
    // Convert email to lowercase
    email = email.toLowerCase();
  
    try {
      const auth = getAuth(fireBase);
      await signInWithEmailAndPassword(auth, email, password);
      this.setState({ email: '', password: '', errorMessage: null });
    
      // Add user to Firestore after successful login
      const db = getFirestore();
      await setDoc(doc(db, "Users", email), { loggedIn: true }, { merge: true });
    
      this.props.setIsLoggedIn(true); // Set the isLoggedIn state to true
    } catch (error) {
      this.setState({ errorMessage: 'Invalid email or password' }); // Handle login error
    }
  }
  // Function to navigate to the Signup screen
  handleSignUp = () => {
    this.props.navigation.navigate('SignupScreen');
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/baggrund.png')}
        style={[styles.background, { marginTop: -5 }]}
        resizeMode="cover"
      >
        {/* New ImageBackground for Dockbox.png */}
        <ImageBackground
          source={require('../assets/Dockbox.png')}
          style={styles.dockboxImage}
          resizeMode="contain"
        />
      
        <StatusBar hidden />
        <View style={styles.container}>
          <Text style={styles.title}>Welcome To DockBox</Text>
          {this.state.errorMessage !== '' && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor="rgba(252,206,133,1)"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              style={[styles.input, { width: 300 }]}
            />
            <View style={[styles.passwordInput, { width: 300 }]}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(252,206,133,1)"
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                style={styles.inputStyle} // Password input style
                secureTextEntry={true} // Hide the text
              />
            </View>
          </View>
          <TouchableOpacity style={[styles.loginButton, { width: 300 }]} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <View style={[styles.orContainer, { width: 300, marginTop: 20 }]}>
            <View style={styles.orLine} />
            <Text style={styles.orText}> Or </Text>
            <View style={styles.orLine} />
          </View>
          <TouchableOpacity style={[styles.loginButton, { width: 300, backgroundColor: '#FCCE85', marginTop: 20 }]} onPress={this.handleSignUp}>
            <Text style={styles.buttonText}>Sign Up!</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  title: {
    fontFamily: '',
    color: '#FCCE85',
    fontSize: 41,
    marginBottom: 30,
    marginTop: 70,
    position: 'absolute',
    top: '20%',
    left: 10,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 200,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#FCCE85',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: 300,
  },
  passwordInput: {
    borderBottomWidth: 1,
    borderColor: '#FCCE85',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: 300,
  },
  inputStyle: {
    color: '#000',
    paddingRight: 16,
    fontFamily: '',
    fontSize: 16,
    alignSelf: 'stretch',
    flex: 1,
    lineHeight: 16,
    paddingTop: 14,
    paddingBottom: 8,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    top: 450,
  },
  loginButton: {
    backgroundColor: '#FCCE85',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    color: '#095167',
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#FCCE85',
  },
  orText: {
    paddingHorizontal: 10,
    color: '#FCCE85',
  },
  dockboxImage: {
    position: 'absolute',
    top: 70,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure the Dockbox image is on top of the background image
    height: '35%',
    width:'100%',
  },
});

export default LoginScreen; // Export the LoginScreen component
