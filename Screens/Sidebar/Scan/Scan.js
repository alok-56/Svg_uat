import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text,TextInput,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from '../Sidebar';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';


const Scan = ({navigation}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleMenuIconPress}
          style={{position: 'absolute', top: '30%', left: '65%', zIndex: 1}}>
          <Icon name="menu" color="white" size={25} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const handleMenuIconPress = () => {
    setSidebarOpen(prevState => !prevState); 
  };
  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={handleBackPress}
          style={{ position: 'absolute', top: '30%', left: '20%', zIndex: 1 }}>
          <Icon name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
      ),
    });
  })
  const handleBackPress = () => {
    navigation.navigate('Dashboard')
  };
const [location,setLocation] = useState('');
const [subLocation,setSubLocation] = useState('');
const [building,setBuilding] = useState('');
const [floor,setFloor] = useState('');
const [year, setYear] = useState('');
const [separateYear,setSeparateYear] = useState('');
const [showYearpicker, setShowYearpicker] = useState(false);
const [selectedDocument, setSelectedDocument] = useState(null);
const handleYearChange = (event, selectedDate) => {
  setShowYearpicker(false);
  if (selectedDate) {
    const year = selectedDate.getFullYear();
    setYear(year.toString()); 
  }
};
const pickDocument = async () => {
  try {
    const result = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    setSelectedDocument(result);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker
    } else {
      console.error('Error picking document:', err);
    }
  }
};

const uploadDocument = async () => {
  if (!selectedDocument) {
    console.warn('No document selected');
    return;
  }

  const data = await RNFetchBlob.fs.readFile(selectedDocument.uri, 'base64');
  // Now you can send the 'data' to your server for further processing

  console.log('Document content:', data);
};

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Location</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={location}
              onValueChange={(itemValue) => setLocation(itemValue)}
              style={styles.picker}
              placeholder='Select Asset'

            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              <Picker.Item label="option 1" value="1" />
              <Picker.Item label="option 2" value="2" />
              <Picker.Item label="option 3" value="3" />
              <Picker.Item label="option 4" value="4" />
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Sub Location</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={subLocation}
              onValueChange={(itemValue) => setSubLocation(itemValue)}
              style={styles.picker}
              placeholder='Select Asset'

            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              <Picker.Item label="option 1" value="1" />
              <Picker.Item label="option 2" value="2" />
              <Picker.Item label="option 3" value="3" />
              <Picker.Item label="option 4" value="4" />
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Building</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={building}
              onValueChange={(itemValue) => setBuilding(itemValue)}
              style={styles.picker}
              placeholder='Select Asset'

            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              <Picker.Item label="option 1" value="1" />
              <Picker.Item label="option 2" value="2" />
              <Picker.Item label="option 3" value="3" />
              <Picker.Item label="option 4" value="4" />
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Floor</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={floor}
              onValueChange={(itemValue) => setFloor(itemValue)}
              style={styles.picker}
              placeholder='Select Asset'

            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              <Picker.Item label="option 1" value="1" />
              <Picker.Item label="option 2" value="2" />
              <Picker.Item label="option 3" value="3" />
              <Picker.Item label="option 4" value="4" />
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Year</Text>
          <TextInput style={styles.textinputs}
            placeholder="Start Date"
            placeholderTextColor="gray"
            value={year}
            onFocus={() => setShowYearpicker(true)}
          />
          {showYearpicker && (
            <DateTimePicker value={new Date()}
              mode="year"
              display="spinner"
              onChange={handleYearChange}
            />
          )}
        </View>
        <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5,marginTop:'3%' }}>
            <Picker
              selectedValue={separateYear}
              onValueChange={(itemValue) => setSeparateYear(itemValue)}
              style={styles.picker}
              placeholder='Select Asset'

            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              <Picker.Item label="First Half" value="1" />
              <Picker.Item label="Second Half" value="2" />
            </Picker>
          </View>
          <View style={{marginTop:'3%'}}>
          <Text style={styles.headings}>Upload Scan File (.txt)</Text>
      <TouchableOpacity onPress={pickDocument}>
        <Text style={{textAlign:'center',backgroundColor:'#052d6e',color:'white',fontWeight:'bold',padding:10,borderRadius:10,width:'45%',marginTop:'3%',marginLeft:'3%'}}>Select Document</Text>
      </TouchableOpacity>

      {selectedDocument && (
        <View>
          {/* <Text style={{textAlign:'center',backgroundColor:'#052d6e',color:'white',fontWeight:'bold',padding:10,borderRadius:10,width:'45%',marginTop:'3%',marginLeft:'3%'}}>{selectedDocument.name}</Text>
          <Text style={{textAlign:'center',backgroundColor:'#052d6e',color:'white',fontWeight:'bold',padding:10,borderRadius:10,width:'45%',marginTop:'3%',marginLeft:'3%'}}>{selectedDocument.type}</Text> */}
        </View>
      )}

      <TouchableOpacity onPress={uploadDocument}>
        <Text style={{textAlign:'center',backgroundColor:'#052d6e',color:'white',fontWeight:'bold',padding:10,borderRadius:10,width:'45%',marginTop:'3%',marginLeft:'3%'}}>Upload Document</Text>
      </TouchableOpacity>
    </View>

      {sidebarOpen && (
        <View style={styles.sidebar}>
          <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        </View>
      )}
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    position: 'absolute',
    top: '23%',
    left: '80%',
    zIndex: 1,
  },
  content: {
    flex: 1,
    padding: '5%',
    paddingTop: '10%',
  },
  card: {
    marginBottom: '5%',
    backgroundColor: '#cccfff',
  },
  back: {
    position: 'absolute',
    marginLeft: '5%',
    marginTop: '3%',
  },
  cardicon: {
    position: 'absolute',
    marginLeft: '80%',
    marginTop: '7%',
    backgroundColor: '#ccc',
    borderRadius: 10,
    height: '100%',
    width: '25%',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#ccc',
    padding: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  headings: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: '3%',
    marginBottom: '1%'
  },
  picker: {
    width: '99%',
    color: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
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
});
export default Scan;