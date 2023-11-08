import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import fireBase from '../firebase/fireBase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import * as Font from 'expo-font';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome from expo vector icons

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      /* stripeID */
      errorMessage: null,
      fontsLoaded: false,
    };
  }

  async componentDidMount() {
    await this.loadFonts();
    this.setState({ fontsLoaded: true });
  }

  loadFonts = async () => {
    await Font.loadAsync({
      Feather: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Feather.ttf'),
      FontAwesome: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf'), // Load FontAwesome
    });
  };

  handleSignUp = async () => {
    const { email, password, confirmPassword } = this.state;
  
    if (!email || !password || !confirmPassword) {
      this.setState({ errorMessage: 'All fields are required' });
      return;
    }
  
    if (password !== confirmPassword) {
      this.setState({ errorMessage: 'Passwords do not match' });
      return;
    }
  
    if (password.length < 6) {
      this.setState({ errorMessage: 'Password should be at least 6 characters long' });
      return;
    }
  
    try {
      const auth = getAuth(fireBase);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      this.setState({ email: '', password: '', confirmPassword: '', errorMessage: null });
  
      Alert.alert('Account created', 'You have successfully signed up!', [
        { text: 'OK', onPress: () => this.props.navigation.navigate('Login') }
      ]);
    } catch (error) {
      console.error('Error creating user:', error);
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <ImageBackground
        source={require('../assets/baggrund.png')}
        style={[styles.background, { marginTop: -5 }]}
        resizeMode="cover"
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={30} color="#FCCE85" />
        </TouchableOpacity>

        <View style={[styles.container, { paddingTop: 120 }]}>
          <Text style={styles.title}>Sign Up!</Text>

          {this.state.errorMessage && (
            <Text style={styles.error}>{this.state.errorMessage}</Text>
          )}

          <TextInput
            placeholder="Email"
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            style={styles.input}
            placeholderTextColor="rgba(252, 206, 133, 0.5)"
          />

          <TextInput
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            style={styles.input}
            placeholderTextColor="rgba(252, 206, 133, 0.5)"
            secureTextEntry
          />

          <TextInput
            placeholder="Confirm Password"
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
            value={this.state.confirmPassword}
            style={styles.input}
            placeholderTextColor="rgba(252, 206, 133, 0.5)"
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={this.handleSignUp}
          >
            <Text style={styles.buttonText}>Sign Up!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.facebookButton}>
            <Feather name="facebook" size={24} color="#fff" style={styles.facebookIcon} />
            <Text style={[styles.buttonText, styles.facebookButtonText]}>Sign Up with Facebook</Text>
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
    color: '#FCCE85',
    fontSize: 41,
    marginBottom: 30,
    position: 'absolute',
    top: '20%',
    left: 10,
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
  error: {
    color: 'red',
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    top: 320,
  },
  loginButton: {
    backgroundColor: '#FCCE85',
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    width: 300,
    marginTop: 20,
  },
  buttonText: {
    color: '#095167',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
  },
  facebookButton: {
    backgroundColor: '#3b5998', /* Facebook blue */
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    width: 300,
    marginTop: 20,
    flexDirection: 'row', // Align icon and text side by side
    justifyContent: 'center',
  },
  facebookIcon: {
    marginRight: 10,
  },
  facebookButtonText: {
    color: '#fff', // White text color
    fontWeight: 'bold',
  },
});

export default SignupScreen;
