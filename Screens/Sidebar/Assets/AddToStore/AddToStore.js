import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput ,Alert} from 'react-native';
import { Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from '../../Sidebar';
import { Picker } from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { encode } from 'base-64';

const AddToStore = ({ navigation }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalNm, setModalNm] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [taggable, setTaggable] = useState('');
  const [warranty, setWarranty] = useState('');
  const [leaseStatus, setLeaseStatus] = useState('');
  const [typeOfProcurement, setTypeOfProcurement] = useState('');
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [costCenter, setCostCenter] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [poDate, setPoDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [grnNumber, setGrnNumber] = useState('');
  const [grnDate, setGrnDate] = useState('');
  const [dcNumber, setDcNumber] = useState('');
  const [dcDate, setDcDate] = useState('');
  const [vendor, setVendor] = useState('');
  const [showStartDatepicker, setShowStartDatepicker] = useState(false);
  const [showEndDatepicker, setShowEndDatepicker] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showDateInputs, setShowDateInputs] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [centers, setCenters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState('');
  const [idSAssetdiv, setIdSAssetdiv] = useState('');
  const [idAssetdiv, setIdAssetdiv] = useState('');
  const [typAsst, setTypAsst] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);




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
  const handleSerialNo = () => {
    navigation.navigate('SerialNo')
  }
  const handleWarrantyChange = (itemValue) => {
    setWarranty(itemValue);
    setShowDateInputs(itemValue === 'AMC' || itemValue === 'Warranty');
  };
  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatepicker(false);
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = `${selectedDate.getMonth() + 1}`.padStart(2, '0');
      const day = `${selectedDate.getDate()}`.padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setStartDate(formattedDate);
    }
  };
  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatepicker(false);
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = `${selectedDate.getMonth() + 1}`.padStart(2, '0');
      const day = `${selectedDate.getDate()}`.padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setEndDate(formattedDate);
    }
  };
  const fetchDepartments = async () => {
    try {
      const Username = 'SVVG';
      const Password = 'Pass@123';

      const credentials = encode(`${Username}:${Password}`);
      const response = await fetch('http://13.235.186.102/SVVG-API/webapi/Add_To_Store/Display_department', {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDepartments(data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  const fetchVendors = async () => {
    try {
      const Username = 'SVVG';
      const Password = 'Pass@123';

      const credentials = encode(`${Username}:${Password}`);
      const response = await fetch('http://13.235.186.102/SVVG-API/webapi/Add_To_Store/vendor_dropdownlist', {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setVendors(data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  const fetchCenters = async () => {
    try {
      const Username = 'SVVG';
      const Password = 'Pass@123';

      const credentials = encode(`${Username}:${Password}`);
      const response = await fetch('http://13.235.186.102/SVVG-API/webapi/Add_To_Store/Display_CC', {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCenters(data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  const fetchLocations = async () => {
    try {
      const Username = 'SVVG';
      const Password = 'Pass@123';

      const credentials = encode(`${Username}:${Password}`);
      const response = await fetch('http://13.235.186.102/SVVG-API/webapi/Add_To_Store/Display_Loc', {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setLocations(data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  const fetchModels = async () => {
    try {
      const Username = 'SVVG';
      const Password = 'Pass@123';

      const credentials = encode(`${Username}:${Password}`);
      const response = await fetch('http://13.235.186.102/SVVG-API/webapi/Add_To_Store/Display_Model', {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setModels(data.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  useEffect(() => {
    fetchDepartments();
    fetchVendors();
    fetchCenters();
    fetchLocations();
    fetchModels();
  }, []);
  const handleSaveData = async () => {
   if (!modalName || !quantity || !unitPrice || !taggable || !warranty ) {
    // Show an alert if any field is empty
    Alert.alert('Validation Error', 'Please fill in all required fields.');
    return;
  }
    try {
      const apiUrl = 'http://13.235.186.102/SVVG-API/webapi/Add_To_Store/SavingData';
      const username = 'SVVG';
      const password = 'Pass@123';

      // Create the authorization header
      const headers = new Headers();
      headers.set('Authorization', `Basic ${encode(`${username}:${password}`)}`);
      headers.set('Content-Type', 'application/json');

      // Prepare the data to be sent in the request body
      const requestData = {
        data: [
          {
            nm_model: modalNm,
            id_model: selectedModelId,
            id_assetdiv: idAssetdiv,
            id_s_assetdiv: idSAssetdiv,
            typ_asst: typAsst,
            qty_asst: quantity,
            id_emp_user: "1",
            val_asst: "12",
            tag: taggable,
            warr_amc: warranty,
            dt_amc_start: startDate,
            dt_amc_exp: endDate,
            st_lease: leaseStatus,
            typ_proc: typeOfProcurement,
            std_lease: "2023-12-30",
            endt_lease: "2023-12-30",
            id_flr: "1",
            id_dept: "8",
            id_cc: costCenter,
            item_description: itemDescription,
            rmk_asst: "",
            no_po: poNumber,
            dt_po: poDate,
            no_inv: invoiceNumber,
            dt_inv: invoiceDate,
            no_grn: grnNumber,
            dt_grn: grnDate,
            no_dc: dcNumber,
            dt_dc: dcDate,
            id_ven: vendor,
            storeage_typ: "1TB",
            ram_typ: "6GB",
            process_typ: "OS",
            st_config: "Yes",
            id_loc: "1",
            id_subl: "1",
            id_building: "1",
            ds_pro: modalName,
            ds_asst: modalName,
            id_inv_m: "",
            id_inv: "",
            no_model: modalName,
            cst_asst: "",
            tt_un_prc: unitPrice,
            invoice_file: "Screenshot (7)_1703670462550.png",
            SerialVal: "NA63,,NA64",
            sapno: "NA63,,NA64"
          },
        ],
      };
      console.log('Request Payload:', JSON.stringify(requestData));
const response = await fetch(apiUrl, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(requestData),
});
const responseText = await response.text();
console.log('Server Response:', responseText);


      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        
      }

      // Parse the response
      const responseData = await response.json();

      // Check the response for success
      if (responseData.status === 'success') {
        console.log('Record has been inserted successfully');
        // Navigate to the next screen or perform other actions
      } else {
        console.error('Error:', responseData.message);
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error making POST request:', error);
      console.error('Error making POST request:', error);
  console.error('Response Status:', response.status);
  console.error('Response Text:', await response.text());
      // Handle error scenarios
    }
  };
  const getModalDetails = (e) => {
    const selectedModel = models.find((item) => item?.nm_model === e);
  
    if (selectedModel) {
      const { nm_model, id_model, id_s_assetdiv, id_assetdiv, typ_asst } = selectedModel;
  
      setModalNm(nm_model);
      setSelectedModelId(id_model);
      setIdSAssetdiv(id_s_assetdiv);
      setIdAssetdiv(id_assetdiv);
      setTypAsst(typ_asst);
  
      console.log('Selected Model Details:');
      console.log('modal name:', nm_model);
      console.log('model id:', id_model);
      console.log('idasset:', id_assetdiv);
      console.log('SAsset', id_s_assetdiv);
      console.log('type asset:', typ_asst);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ backgroundColor: '#052d6e' }}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18, padding: 10 }}>Item/Model Details</Text></View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Item/Model Name</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={modalName}
              onValueChange={(itemValue, itemIndex) => {
                getModalDetails(itemValue),
                setModalName(itemValue)
              }}
              style={styles.picker}
              placeholder='Select Asset'

            >
              <Picker.Item label="Select an option" value=""  />
              {models.map((dept) => (
                <Picker.Item key={dept.nm_model} label={dept.nm_model} value={dept.nm_model} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Quantity</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setQuantity(value)}
            value={quantity}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Unit Price</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setUnitPrice(value)}
            value={unitPrice}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Taggable</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={taggable}
              onValueChange={(itemValue) => setTaggable(itemValue)}
              style={styles.picker}
              placeholder='Select Asset'

            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
              
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>AMC/Warranty</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={warranty}
              onValueChange={handleWarrantyChange}
              style={styles.picker}
              placeholder='Select Asset'

            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              <Picker.Item label="NO" value="NO" />
              <Picker.Item label="AMC" value="AMC" />
              <Picker.Item label="Warranty" value="Warranty" />
            </Picker>
          </View>
        </View>
        {showDateInputs && (
          <>
            <View style={{ marginTop: '3%' }}>
              <Text style={styles.headings}>Start Date</Text>
              <TextInput style={styles.textinputs}
                placeholder="Start Date"
                placeholderTextColor="gray"
                value={startDate}
                onFocus={() => setShowStartDatepicker(true)}
              />
              {showStartDatepicker && (
                <DateTimePicker value={new Date()}
                  mode="date"
                  display="default"
                  onChange={handleStartDateChange}
                />
              )}
            </View>
            <View style={{ marginTop: '3%' }}>
              <Text style={styles.headings}>End Date</Text>
              <TextInput style={styles.textinputs}
                placeholder="End Date"
                placeholderTextColor="gray"
                value={endDate}
                onFocus={() => setShowEndDatepicker(true)}
              />
              {showEndDatepicker && (
                <DateTimePicker value={new Date()}
                  mode="date"
                  display="default"
                  onChange={handleEndDateChange}
                />
              )}
            </View>
          </>
        )}
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Lease Status</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={leaseStatus}
              onValueChange={(itemValue) => setLeaseStatus(itemValue)}
              style={styles.picker}
              placeholder='Select Asset'

            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              <Picker.Item label="Not Under Lease" value="1" />
              <Picker.Item label="Under Lease" value="2" />
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Type of Procurement</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={typeOfProcurement}
              onValueChange={(itemValue) => setTypeOfProcurement(itemValue)}
              style={styles.picker}
              placeholder='Select Asset'

            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              <Picker.Item label="Outright Purchase" value="1" />
              <Picker.Item label="Loan Basis" value="2" />
              <Picker.Item label="Add-On" value="3" />
            </Picker>
          </View>
        </View>
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
              {locations.map((dept) => (
                <Picker.Item key={dept.id_flr} label={dept.nm_flr} value={dept.id_flr} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Department</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={department}
              onValueChange={(itemValue) => setDepartment(itemValue)}
              style={styles.picker}
              placeholder='Select Department'
            >
              <Picker.Item label="Select an option" value="" />
              {departments.map((dept) => (
                <Picker.Item key={dept.id_model} label={dept.nm_dept} value={dept.id_model} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Cost Center/Project</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={costCenter}
              onValueChange={(itemValue) => setCostCenter(itemValue)}
              style={styles.picker}
              placeholder='Select Asset'

            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              {centers.map((dept) => (
                <Picker.Item key={dept.id_cc} label={dept.nm_cc} value={dept.id_cc} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={{ marginTop: '3%', marginBottom: '4%' }}>
          <Text style={styles.headings}>Item Description</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setItemDescription(value)}
            value={itemDescription}
          />
        </View>

        <View style={{ backgroundColor: '#052d6e', marginTop: '3%' }}><Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18, padding: 10 }}>Invoice Details</Text></View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>PO Number</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setPoNumber(value)}
            value={poNumber}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>PO Date</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setPoDate(value)}
            value={poDate}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Invoice Number</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setInvoiceNumber(value)}
            value={invoiceNumber}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Invoice Date</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setInvoiceDate(value)}
            value={invoiceDate}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>GRN Number</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setGrnNumber(value)}
            value={grnNumber}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>GRN Date</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setGrnDate(value)}
            value={grnDate}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>DC Number</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setDcNumber(value)}
            value={dcNumber}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>DC Date</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setDcDate(value)}
            value={dcDate}
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

            >
              <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} />
              {vendors.map((dept) => (
                <Picker.Item key={dept.id_ven} label={dept.nm_ven} value={dept.id_ven} />
              ))}
            </Picker>
          </View>
        </View>
        <TouchableOpacity onPress={handleSaveData}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </View></TouchableOpacity>

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
  button: {
    backgroundColor: '#052d6e',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '40%',
    alignSelf: 'center',
    margin: '5%',
    marginTop: '10%'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },


});
export default AddToStore;