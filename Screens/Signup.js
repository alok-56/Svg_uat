import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [pwd, setPassword] = useState('');
  const [name, setUsername] = useState('');

  const handleSignup = () => {
    if (!email || !name || !pwd) {
      alert('Please enter all fields');
      return;
    }
    else {
      navigation.navigate('Dashboard')
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={'#000'}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={'#000'}
        placeholder="Username"
        value={name}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor={'#000'}
        placeholder="Password"
        secureTextEntry
        value={pwd}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Already have an account ?  Login Here..!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    color: 'black',
    backgroundColor: '#f0f0f0',
  },
  signupButton: {
    backgroundColor: '#FF9800',
    borderWidth: 1,
    borderColor: 'white',
    padding: 12,
    alignItems: 'center',
    margin: 20,
  },
  signupButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: '2%'
  },
  link: {
    marginTop: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'transparent',
  },
});

export default Signup;
