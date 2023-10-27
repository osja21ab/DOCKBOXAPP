import React, { Component } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import fireBase from '../firebase/fireBase'; // Import your firebase.js
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      errorMessage: null, // Added to store error messages
    };
  }

  handleSignUp = async () => {
    const { email, password, username } = this.state;

    // Input validation (optional)
    if (!email || !password || !username) {
      this.setState({ errorMessage: 'All fields are required' });
      return;
    }

    if (password.length < 6) {
      this.setState({ errorMessage: 'Password should be at least 6 characters long' });
      return;
    }

    try {
      // Get the Firebase Auth instance
      const auth = getAuth(fireBase);

      // Create a new user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // If successful, you can access userCredential.user to get the user information
      const user = userCredential.user;

      // ... Store user data in Firebase Realtime Database or Firestore if needed

      // Clear input fields and error message
      this.setState({ email: '', password: '', username: '', errorMessage: null });

      Alert.alert('Account created', 'You have successfully signed up!');
    } catch (error) {
      // Handle the error, e.g., show an error message
      console.error('Error creating user:', error);
      this.setState({ errorMessage: error.message });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage && (
          <Text style={styles.error}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          style={styles.input}
          secureTextEntry
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignupScreen;
