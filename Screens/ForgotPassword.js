import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image,Alert } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'


const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    
    const handleResetPassword = async () => {
      navigation.navigate('Login')
       };


    return (
        <View style={styles.container}>
         <Image source={require('../assets/login.jpeg')} style={styles.logo} />
            <View style={styles.inputContainer}>
                <Ionicons name="mail" size={20} color="black" style={styles.mailicon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    placeholderTextColor="gray"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>
            
            <TouchableOpacity style={styles.Resetbutton} onPress={handleResetPassword}>
                <Text style={styles.ResetButtonText}>Reset Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginbutton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginbuttonText}>Login Here</Text>
            </TouchableOpacity>
        </View > 
    );
};

const styles = StyleSheet.create({
    textcontainer: {
        backgroundColor: '#cccccc',
        height:"40%",
        justifyContent:'center',
        alignItems:'center'
    },
    logo: {
        width: '60%',
        height: '25%',
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: '7%',
        marginRight: '10%',
    },
    container: {
        flex: 1,
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
    usericon: {
        position: 'absolute',
        top: '30%',
        left: '5%',
    },
    mailicon: {
        position: 'absolute',
        top: '30%',
        left: '4%',
    },
    input: {
        paddingLeft: 40,
        paddingVertical: 12,
        color: 'black',
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    Resetbutton: {
        backgroundColor: '#ff8a3d',
        padding: 12,
        alignItems: 'center',
        marginHorizontal: '30%',
        borderRadius: 20,
        shadowOffset: { width: 0, height: 0 },
        elevation: 10,
        marginVertical: '10%',
    },
    ResetButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginbutton
        : {
        alignItems: 'center',
        marginBottom: '15%',
    },
    loginbuttonText: {
        color: '#6bbcfa',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: '2%',
    },
});

export default ForgotPassword;
