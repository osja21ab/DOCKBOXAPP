import React from 'react';
import { View, TextInput, StyleSheet, Text, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import fireBase from '../firebase/fireBase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
  }

  handleLogin = async () => {
    const { email, password } = this.state;
  
    if (!email || !password) {
      this.setState({ errorMessage: 'Email and password are required' });
      return;
    }
  
    try {
      const auth = getAuth(fireBase);
      await signInWithEmailAndPassword(auth, email, password);
      this.setState({ email: '', password: '', errorMessage: null });
      this.props.setIsLoggedIn(true); // Set the isLoggedIn state to true
    } catch (error) {
      this.setState({ errorMessage: 'Invalid email or password' });
    }
  }
  

  handleSignUp = () => {
    this.props.navigation.navigate('Signup'); // Ensure 'Signup' matches the correct name in the navigator
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/baggrund.png')}
        style={[styles.background, { marginTop: -5 }]}
        resizeMode="cover"
      >
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
    color: 'rgba(252,206,133,1)',
    fontSize: 41,
    marginBottom: 30,
    position: 'absolute',
    top: '20%',
    left: 10,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 400,
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: 'rgba(252,206,133,1)',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: 300,
  },
  passwordInput: {
    borderBottomWidth: 1,
    borderColor: 'rgba(252,206,133,1)',
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
  iconStyle: {
    color: 'rgba(252,206,133,1)',
    fontSize: 24,
    paddingRight: 8,
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
    color: 'black',
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
});

export default LoginScreen;
