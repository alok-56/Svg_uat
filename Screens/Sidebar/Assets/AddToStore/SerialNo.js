import { View, Text ,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'

const SerialNo = () => {
    const[serialNo1,setSerialNo1] = useState('');
    const[serialNo2,setSerialNo2] = useState('');
    const[serialNo3,setSerialNo3] = useState('');
    const[serialNo4,setSerialNo4] = useState('');
    const[serialNo5,setSerialNo5] = useState('');
    const[assetRef1,setAssetRef1] = useState('');
    const[assetRef2,setAssetRef2] = useState('');
    const[assetRef3,setAssetRef3] = useState('');
    const[assetRef4,setAssetRef4] = useState('');
    const[assetRef5,setAssetRef5] = useState('');
    const handleDontSerial = () => {
        console.log('hello')
      }
  return (
    <View>
    <TouchableOpacity onPress={handleDontSerial}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Do Not Have Serial No</Text>
          </View></TouchableOpacity>
    <View style={{flexDirection:'row'}}>
      <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Serial No 1</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setSerialNo1(value)}
            value={serialNo1}
            placeholder="Search for item..."
            placeholderTextColor="gray"
          />
        </View>
        <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Asset REF.NO1</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setAssetRef1(value)}
            value={assetRef1}
            placeholder="Search for item..."
            placeholderTextColor="gray"
          />
        </View>
        </View>
        <View style={{flexDirection:'row'}}>
      <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Serial No 2</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setSerialNo2(value)}
            value={serialNo2}
            placeholder="Search for item..."
            placeholderTextColor="gray"
          />
        </View>
        <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Asset REF.NO2</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setAssetRef2(value)}
            value={assetRef2}
            placeholder="Search for item..."
            placeholderTextColor="gray"
          />
        </View>
        </View>
        <View style={{flexDirection:'row'}}>
      <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Serial No 3</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setSerialNo3(value)}
            value={serialNo3}
            placeholder="Search for item..."
            placeholderTextColor="gray"
          />
        </View>
        <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Asset REF.NO3</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setAssetRef3(value)}
            value={assetRef3}
            placeholder="Search for item..."
            placeholderTextColor="gray"
          />
        </View>
        </View>
        <View style={{flexDirection:'row'}}>
      <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Serial No 4</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setSerialNo4(value)}
            value={serialNo4}
            placeholder="Search for item..."
            placeholderTextColor="gray"
          />
        </View>
        <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Asset REF.NO4</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setAssetRef4(value)}
            value={assetRef4}
            placeholder="Search for item..."
            placeholderTextColor="gray"
          />
        </View>
        </View>
        <View style={{flexDirection:'row'}}>
      <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Serial No 5</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setSerialNo5(value)}
            value={serialNo5}
            placeholder="Search for item..."
            placeholderTextColor="gray"
          />
        </View>
        <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Asset REF.NO5</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setAssetRef5(value)}
            value={assetRef5}
            placeholder="Search for item..."
            placeholderTextColor="gray"
          />
        </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:'8%'}}>
        <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Accept</Text>
          </View></TouchableOpacity>
          <TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Reject</Text>
          </View></TouchableOpacity>
          </View>
        
    </View>
  )
}
const styles = StyleSheet.create({
    textinputs: {
      borderWidth: 1,
      borderColor: 'black',
      color: 'black',
      width: '95%',
      padding: 10,
      justifyContent: 'center',
      alignSelf: 'center',
      borderRadius: 5,
      marginLeft:'11%'
    },
    headings: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: '10%',
        marginBottom: '1%'
      },
      button: {
        backgroundColor: '#ff8a3d',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        width: '80%',
        alignSelf: 'center',
        margin: '5%',
        marginTop: '10%'
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
      },
})

export default SerialNo