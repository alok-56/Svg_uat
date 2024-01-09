import { View, Text ,TouchableOpacity,StyleSheet,TextInput} from 'react-native'
import React,{useState} from 'react'
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';

const ApproveForm = () => {
    const [poNumber, setPoNumber] = useState('');
  const [poDate, setPoDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [grnNumber, setGrnNumber] = useState('');
  const [grnDate, setGrnDate] = useState('');
  const [dcNumber, setDcNumber] = useState('');
  const [dcDate, setDcDate] = useState('');
  const [vendor, setVendor] = useState('');
  const [modalName, setModalName] = useState('');
  const [category,setCategory] = useState('');
  const [subCategory,setSubCategory] = useState('');
  const [assetType, setAssetType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [center, setCenter] = useState('');
  const [description, setDescription] = useState('');
  const [remarks, setRemarks] = useState('');

  return (
    <ScrollView>
    <View>
    <View style={{ backgroundColor: '#052d6e' }}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18, padding: 10 }}>Item/Model Details</Text></View>
        <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Item/Model Name</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setModalName(value)}
            value={modalName}
            placeholder="Search for item..."
            placeholderTextColor="gray"
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Category</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setCategory(value)}
            value={category}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Sub Category</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setSubCategory(value)}
            value={subCategory}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Asset Type</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setAssetType(value)}
            value={assetType}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Quantity</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setQuantity(value)}
            value={quantity}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Unit Price</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setUnitPrice(value)}
            value={unitPrice}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Location</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setLocation(value)}
            value={location}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Department</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setDepartment(value)}
            value={department}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Cost Center/Project</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setCenter(value)}
            value={center}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Item Description</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setDescription(value)}
            value={description}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Remarks</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setRemarks(value)}
            value={remarks}
          />
        </View>
       <View style={{ backgroundColor: '#052d6e', marginTop: '3%' }}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18, padding: 10 }}>Invoice Details</Text></View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>PO Number</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setPoNumber(value)}
            value={poNumber}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>PO Date</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setPoDate(value)}
            value={poDate}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Invoice Number</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setInvoiceNumber(value)}
            value={invoiceNumber}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Invoice Date</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setInvoiceDate(value)}
            value={invoiceDate}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>GRN Number</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setGrnNumber(value)}
            value={grnNumber}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>GRN Date</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setGrnDate(value)}
            value={grnDate}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>DC Number</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setDcNumber(value)}
            value={dcNumber}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>DC Date</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setDcDate(value)}
            value={dcDate}
            editable={false}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Vendor</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={vendor}
              onValueChange={(itemValue) => setVendor(itemValue)}
              style={styles.picker}
              placeholder='Select Asset'
              editable={false}
            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              <Picker.Item label="option 1" value="1" />
              <Picker.Item label="option 2" value="2" />
              <Picker.Item label="option 3" value="3" />
              <Picker.Item label="option 4" value="4" />
            </Picker>
          </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
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
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    headings: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: '3%',
        marginBottom: '1%'
      },
      textinputs: {
        borderWidth: 1,
        borderColor: 'black',
        color: 'black',
        width: '95%',
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 5,
      },
      button: {
        backgroundColor: '#052d6e',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        width: '100%',
        alignSelf: 'center',
        margin: '5%',
        marginTop: '30%',
        marginBottom:'10%'
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
      },
})

export default ApproveForm