import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

const ScanFirst = ({ navigation }) => {
    const handlePhysical = () => {
        navigation.navigate('Scan')
    }
  return (
    <View>
      <Text style={{textAlign:'center',fontWeight:'bold',color:'black'}}>Asset id</Text>
      <TouchableOpacity>
      <Text style={{color:'black',margin:20,backgroundColor:'green',padding:25,width:82,borderRadius:40,color:'white',fontWeight:'bold',marginLeft:'72%',marginTop:500}}>Scan</Text></TouchableOpacity>
      <TouchableOpacity onPress={handlePhysical}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Send for Physical verification</Text>
          </View></TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#052d6e',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        width: '90%',
        alignSelf: 'center',
        margin: '5%',
        marginTop: '5%'
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
      },
})

export default ScanFirst