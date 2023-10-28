import React from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import fireBase from '../firebase/fireBase'; // Import your firebase.js
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null, // Added to store error messages
    };
  }

  handleLogin = async () => {
    const { email, password } = this.state;

    // Input validation (optional)
    if (!email || !password) {
      this.setState({ errorMessage: 'Email and password are required' });
      return;
    }

    try {
      // Get the Firebase Auth instance
      const auth = getAuth(fireBase);

      // Sign in the user with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);

      // If successful, navigate to the next screen (HomeScreen)
      this.props.navigation.navigate('HomeScreen');

      // Clear input fields and error message
      this.setState({ email: '', password: '', errorMessage: null });
    } catch (error) {
      // Handle the error, e.g., show an error message
      this.setState({ errorMessage: 'Invalid email or password' });
    }
  }

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
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          style={styles.input}
          secureTextEntry
        />
        <Button title="Log In" onPress={this.handleLogin} />
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

export default LoginScreen;
