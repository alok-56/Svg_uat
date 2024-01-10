import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

const Login = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async () => {
    navigation.navigate('Dashboard');
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/login.jpeg')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Icon name="user" size={24} color="gray" style={styles.icon} />
        </View>
        <TextInput
          placeholder="Enter User name"
          placeholderTextColor="gray"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.iconContainer}>
          <Icon name="lock" size={24} color="gray" style={styles.icon} />
        </View>
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.input}
          />
          <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}>
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="black"
          />
        </TouchableOpacity>
        
      </View>
      {/* <TouchableOpacity
        style={styles.resetbutton}
        onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.resetbuttonText}>Forgot password?</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '60%',
    height: '25%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: '7%',
    marginRight: '10%',
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    marginLeft: '5%',
    backgroundColor: '#f0f0f0'
  },
  iconContainer: {
    padding: 10,
  },
  icon: {
    color: 'gray',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#406792',
    borderWidth: 1,
    borderColor: '#406792',
    padding: 12,
    alignItems: 'center',
    marginHorizontal: '30%',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 10,
    marginTop:'15%',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetbutton: {
    alignItems: 'flex-end',
    marginRight: '10%',
    marginBottom: '15%',
  },
  resetbuttonText: {
    color: '#6bbcfa',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: '2%',
  },
  eyeIcon: {
    position: 'absolute',
    top: '30%',
    right: '4%',
  },
});

export default Login;

