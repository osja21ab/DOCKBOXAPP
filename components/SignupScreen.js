import React, { Component, useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import fireBase from '../firebase/fireBase'; // Import your firebase.js

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    };
  }

  handleSignUp = async () => {
    const { email, password, username } = this.state;
    const database = fireBase.database();
    const usersRef = database.ref('users');

    // Check if the username already exists in the database
    const snapshot = await usersRef.orderByChild('username').equalTo(username).once('value');
    console.log(snapshot);

    if (snapshot.exists()) {
      Alert.alert('Username already exists', 'Please choose a different username.');
      return;
    }

    // If username is unique, create a new user entry in the database
    const newUserRef = usersRef.push();
    newUserRef.set({
      email,
      username,
      password
    });

    // You can also implement Firebase Authentication here to create a user account with email and password

    // Clear input fields
    this.setState({ email: '', password: '', username: '' });

    Alert.alert('Account created', 'You have successfully signed up!');
  };

  render() {
    return (
      <View>
        <TextInput
          placeholder="Email"
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          placeholder="Username"
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
      </View>
    );
  }
}

//lokal styling for signup viewt
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-top',
      alignItems: 'center',
      marginTop: 50,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
    },
  });

export default SignupScreen;