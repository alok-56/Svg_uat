import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput,Alert } from 'react-native';
import { Card, Checkbox } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from '../../Sidebar';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import { encode as base64Encode } from 'base-64';


const DLink = ({ navigation }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [dateTo, setToDate] = useState('');
  const [showDropdownAndInput, setShowDropdownAndInput] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showToDatepicker, setShowToDatepicker] = useState(false);
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [assetDropdownData, setAssetDropdownData] = useState([]);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState(null);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const [filteredAssetData, setFilteredAssetData] = useState([]);
  const [cardStates, setCardStates] = useState([]);
  

  const handleToDateChange = (event, selectedDate) => {
    setShowToDatepicker(false);
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = `${selectedDate.getMonth() + 1}`.padStart(2, '0'); 
      const day = `${selectedDate.getDate()}`.padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setToDate(formattedDate);
    }
  };
  
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleMenuIconPress}
          style={{ position: 'absolute', top: '30%', left: '65%', zIndex: 1 }}>
          <Icon name="menu" color="white" size={25} />
        </TouchableOpacity>
      ),
    });
  }, []);
  const handleMenuIconPress = () => {
    setSidebarOpen((prevState) => !prevState);
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
  });
  const handleBackPress = () => {
    if (showDropdownAndInput) {
  setShowDropdownAndInput(false);
    } else {
      navigation.navigate('Dashboard');
    }
  };
  const handleLink = () => {
    setShowDropdownAndInput(true);
  };
 

  const fetchAssetDropdownData = async () => {
    const Username = 'SVVG'; 
    const Password = 'Pass@123'; 
    const basicAuth = 'Basic ' + base64Encode(Username + ':' + Password);

    try {
      const response = await fetch('http://13.235.186.102/SVVG-API/webapi/De_linkAPI/asset_dropdown?usertype&searchword', {
        method: 'GET',
        headers: {
          Authorization: basicAuth,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        setAssetDropdownData(data.data);
      }
    } catch (error) {
      console.error('Error fetching asset dropdown data:', error);
      Alert.alert('Error', 'Failed to fetch asset dropdown data. Please try again.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }
  };
  useEffect(() => {
    fetchAssetDropdownData();
  }, []);
  useEffect(() => {
    const initialCheckboxes = {};
    assetDropdownData.forEach((item) => {
      initialCheckboxes[item.asset_id] = false;
    });
    setSelectedCheckboxes(initialCheckboxes);
  }, [assetDropdownData]);
  const handleAssetChange = (itemValue) => {
    const selectedAssetData = assetDropdownData.find((asset) => asset.asset_id === itemValue);
    setSelectedAsset({
      accessory_id: selectedAssetData?.accessory_id || '',
      serial_num: selectedAssetData?.serial_num || '',
      nm_accessory: selectedAssetData?.nm_accessory || '',
      Link_date: selectedAssetData?.Link_date || '',
      asset_id: selectedAssetData?.asset_id || '',
      asset_nm: selectedAssetData?.asset_nm || '',
      accessory_id_wh: selectedAssetData?.accessory_id_wh || '',
    });
    const filteredData = assetDropdownData.filter((asset) => asset.asset_id === itemValue);
    setFilteredAssetData(filteredData);
    setLoginType(itemValue);
  
    // Initialize checkboxes state individually
    const initialCheckboxes = {};
    filteredData.forEach((asset) => {
      initialCheckboxes[asset.asset_id] = false;
    });
    setSelectedCheckboxes(initialCheckboxes);
  };
  
  const [selectedAsset, setSelectedAsset] = useState({
    accessory_id: '',
    serial_num: '',
    nm_accessory:'',
    Link_date:'',
    asset_id: '',
    asset_nm: '',
    accessory_id_wh: '',
   
  });
  
  const handlePostDLinkAccessories = async () => {
    
    try {
      if ( !dateTo  ) {
        Alert.alert('Validation Error', 'Please fill in all required fields.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        return;
      }
      if ( !textValue  ) {
        Alert.alert('Validation Error', 'Please Enter Remarks', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        return;
      }
      const isCheckboxSelected = Object.values(selectedCheckboxes).some((value) => value);
      if (!isCheckboxSelected) {
        Alert.alert('Validation Error', 'Please select at least one accessory.', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        return;
      }

      
      const Username = 'SVVG';
      const Password = 'Pass@123'; 
      const basicAuth = 'Basic ' + base64Encode(Username + ':' + Password);
  
      const apiUrl = 'http://13.235.186.102/SVVG-API/webapi/De_linkAPI/SetDlinkStatus';
  
      const requestBody = {
        data: filteredAssetData
          .filter((asset) => selectedCheckboxes[asset.asset_id])
          .map((asset) => ({
            uninstallAssetDate: dateTo,
            uninstallAssetID: asset.accessory_id_wh,
            uninstallRmk: textValue,
          })),
      };
      console.log(requestBody,"postLink")
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: basicAuth,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }else{
        setShowDropdownAndInput(false);
      }
  
      const responseText = await response.text();
      console.log('POST Response:', responseText);
      Alert.alert('Response', responseText, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
  
      
      try {
        const data = JSON.parse(responseText);
        console.log('Parsed JSON Response:', data);
      } catch (jsonError) {
        console.error('Error parsing JSON:');
      }
  
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  const handleSearchInputChange = (text) => {
    setSearchText(text);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {showDropdownAndInput ? (
          <View style={styles.dropdownContainer}>
            <View style={styles.searchBarContainer}>
            <TextInput
  style={styles.searchBar}
  placeholder="Search"
  placeholderTextColor="gray"
  value={searchText}
  onChangeText={handleSearchInputChange}
/>
            </View>
            

            <Card style={styles.card}>
              <Card.Content >
                <View style={styles.labelContainer}>
                  <Text style={{ ...styles.label, color: '#ff8a3d' }}>Asset ID :</Text>
                  <Text style={styles.cardvalue}> {selectedAsset.asset_id}</Text>
                </View>
                <View style={styles.labelContainer}>
                  <Text style={{ ...styles.label, color: '#ff8a3d' }}>Asset Name :</Text>
                  <Text style={styles.cardvalue}> {selectedAsset.asset_nm}</Text>
                </View>
              </Card.Content>
            </Card>

            <View>
            {filteredAssetData.filter(item => item.accessory_id.includes(searchText)).map((asset) => (
              
    <Card key={asset.asset_id} style={styles.card}>
      <Card.Content>
      <Checkbox
            status={selectedCheckboxes[asset.asset_id] ? 'checked' : 'unchecked'}
            onPress={() => {
              setSelectedCheckboxes((prevCheckboxes) => {
                return {
                  ...prevCheckboxes,
                  [asset.asset_id]: !prevCheckboxes[asset.asset_id],
                };
              });
            }}
          />
        <View style={styles.labelContainer}>
          <Text style={{ ...styles.label, color: '#ff8a3d' }}>Accessories Id :</Text>
          <Text style={styles.cardvalue}>{asset.accessory_id}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={{ ...styles.label, color: '#ff8a3d' }}>Accessories Name :</Text>
          <Text style={styles.cardvalue}>{asset.nm_accessory}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={{ ...styles.label, color: '#ff8a3d' }}>Serial No:</Text>
          <Text style={styles.cardvalue}>{asset.serial_num}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={{ ...styles.label, color: '#ff8a3d' }}>Linked Date :</Text>
          <Text style={styles.value}>{asset.Link_date}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={{ ...styles.label, color: '#ff8a3d' }}>Acc ID :</Text>
          <Text style={styles.value}>{asset.accessory_id_wh}</Text>
        </View>
        <TextInput
          style={styles.dateInput}
          placeholder="Dlink Date"
          placeholderTextColor="gray"
          value={dateTo}
          onFocus={() => setShowToDatepicker(true)}
        />
        {showToDatepicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleToDateChange}
          />
        )}
        <TextInput
          style={styles.remarks}
          onChangeText={(value) => setTextValue(value)}
          value={textValue}
          placeholder="Enter Remarks"
          placeholderTextColor="gray"
        />
      </Card.Content>
    </Card>
  ))}
</View>
            


            <View style={styles.button}>
              <TouchableOpacity
                onPress={handlePostDLinkAccessories}>
                <Text style={styles.buttonText}>DLink</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.dropdownContainer}>
              <View
                style={{ display: 'flex', alignSelf: 'center', padding: 10, margin: 10 }}>
                <Icon name="add-shopping-cart" color='gray' size={60} />
              </View>
              <Picker
              selectedValue={loginType}
              onValueChange={(itemValue) => setLoginType(itemValue)}
              style={styles.picker}
              placeholder='Select Asset'
              onValueChange={handleAssetChange}
            >
              {assetDropdownData.map((item) => (
                <Picker.Item key={item.asset_id} label={item.asset_cd} value={item.asset_id} />
              ))}
            </Picker>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={handleLink}>
                <Text style={styles.buttonText}>DLink</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {sidebarOpen && (
        <View style={styles.sidebar}>
          <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  },
  dateContainer: {
    padding: 5,
    justifyContent: 'space-between',
    width: '60%',
    borderWidth: 1,
    borderColor: 'gray',
    margin: 10,
    alignSelf: 'center'
  },
  dateInput: {
    color: 'black',
    borderWidth:1,
    width:'100%',
    marginBottom:'2%',
    borderRadius:10
  },
  card: {
    marginBottom: '5%',
  },
  picker: {
    width: '100%',
    marginBottom: '4%',
    backgroundColor: '#ccc',
    borderRadius: 10,
    borderColor: 'black',
    padding: '10px',
    color: 'black'
  },
  labelContainer: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  valueContainer: {
    width: '50%',
  },
  content: {
    flex: 1,
    padding: '5%',
    paddingTop: '5%',
    height: '100%'
  },
  dropdownContainer: {
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ff8a3d',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '40%',
    alignSelf: 'center',
    margin: '5%'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  label: {
    fontWeight: 'bold',
    color: 'white',
    width: '35%'
  },
  value: {
    color: 'blue',
    width: '65%'
  },
  cardvalue: {
    color: 'red',
    width: '65%'
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
  remarks: {
    borderWidth: 1,
    color: 'black',
    width: '100%',
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    borderRadius:10
  },
  searchBarContainer: {

  },
  searchBar: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    color:'black'
  },
});

export default DLink;



