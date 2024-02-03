
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { encode } from 'base-64';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


const ModifyAssetForm = ({ route }) => {
  const [modalNm, setModalNm] = useState('');
  const [idSAssetdiv, setIdSAssetdiv] = useState('');
  const [idAssetdiv, setIdAssetdiv] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [typAsst, setTypAsst] = useState('');
  const [apiData, setApiData] = useState([]);
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
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [assetType, setAssetType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [location, setLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [center, setCenter] = useState('');
  const [description, setDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [idInv, setIdInv] = useState(0)
  const [idInvM, setIdInvM] = useState(0)
  const [departments, setDepartments] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [centers, setCenters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [models, setModels] = useState([]);
  const [costCenter, setCostCenter] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedPODate, setSelectedPODate] = useState(new Date());
  const [selectedInvoiceDate, setSelectedInvoiceDate] = useState(new Date());
const [showInvoiceDatePicker, setShowInvoiceDatePicker] = useState(false);
const [selectedGRNDate, setSelectedGRNDate] = useState(new Date());
const [showGRNDatePicker, setShowGRNDatePicker] = useState(false);
const [selectedDCDate, setSelectedDCDate] = useState(new Date());
const [showDCDatePicker, setShowDCDatePicker] = useState(false);


  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedPODate(date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      setPoDate(formattedDate); // Update your state accordingly
    }
    setShowDatePicker(false);
  };
  const openInvoiceDatePicker = () => {
    setShowInvoiceDatePicker(true);
  };
  
  const handleInvoiceDateChange = (event, date) => {
    if (date) {
      setSelectedInvoiceDate(date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      setInvoiceDate(formattedDate);
    }
    setShowInvoiceDatePicker(false);
  };
  
  const openGRNDatePicker = () => {
    setShowGRNDatePicker(true);
  };
  
  const handleGRNDateChange = (event, date) => {
    if (date) {
      setSelectedGRNDate(date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      setGrnDate(formattedDate);
    }
    setShowGRNDatePicker(false);
  };
  const openDCDatePicker = () => {
    setShowDCDatePicker(true);
  };
  
  const handleDCDateChange = (event, date) => {
    if (date) {
      setSelectedDCDate(date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      setDcDate(formattedDate);
    }
    setShowDCDatePicker(false);
  };
  
  // ... Repeat for GRN Date and DC Date
  
  // ... Repeat for GRN Date and DC Date
  
  useEffect(() => {
    const id_inv_m = route.params?.id_inv_m;
    const id_inv = route.params?.id_inv_m;
    setIdInvM(id_inv_m);
    setIdInv(id_inv);
    fetchData(id_inv_m, id_inv);
  }, [route.params?.id_inv_m, route.params?.id_inv]);

  const fetchData = async (id_inv_m, id_inv) => {
    try {
      const Username = 'SVVG';
      const Password = 'Pass@123';
      const credentials = encode(`${Username}:${Password}`);
      const response = await fetch(
        `http://13.235.186.102/SVVG-API/webapi/Store_Approver/SelectedItemDetails?id_inv_m=${id_inv_m}&id_inv=${id_inv}`,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      const responseData = await response.json();

      if (Array.isArray(responseData.data) && responseData.data.length > 0) {
        const itemDetails = responseData.data[0];
        setApiData(itemDetails);
        // Populate form fields
        setPoNumber(itemDetails.PONumber);
        setPoDate(itemDetails.PODate);
        setInvoiceNumber(itemDetails.InvoiceNO);
        setInvoiceDate(itemDetails.InvoiceDate);
        setGrnNumber(itemDetails.GRN);
        setGrnDate(itemDetails.GRNdate);
        setDcNumber(itemDetails.DCNum);
        setDcDate(itemDetails.DCDate);
        setVendor(itemDetails.Vendor);
        setModalName(itemDetails.Item);
        setCategory(itemDetails.Category);
        setSubCategory(itemDetails.SubCategory);
        setAssetType(itemDetails.AssetType);
        setQuantity(itemDetails.Quantity);
        setUnitPrice(itemDetails.Price);
        setLocation(itemDetails.Location);
        setDepartment(itemDetails.Department);
        setCenter(itemDetails.CostCenter);
        setDescription(itemDetails.ItemDescription);
        setRemarks(itemDetails.Remarks || '');
         setCostCenter(itemDetails.CostCenter);
      } else {
        console.error('Error fetching data: Data is not an array or is empty');
        setApiData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiData([]);
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
  useEffect(() => {
    fetchDepartments();
    fetchVendors();
    fetchCenters();
    fetchLocations();
    fetchModels();
  }, []);
  const handleUpdate = async (status) => {
    if (!remarks.trim()) {
      Alert.alert("Alert", 'Please enter all the details');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    const postData = {
      data: [
        {
          id_emp_user: "1",
          id_inv: idInv,
          id_inv_m: idInvM,
          dt_approv: currentDate,
          dt_inv: apiData.InvoiceDate,
          id_loc: "1",
          id_sgrp: "203",
          id_grp: "3",
          status: status,
          rmk_asst: remarks,
        },
      ],
    };

    console.log('postData-->', postData);

    try {
      const Username = 'SVVG';
      const Password = 'Pass@123';
      const credentials = encode(`${Username}:${Password}`);
      const response = await fetch(
        'http://13.235.186.102/SVVG-API/webapi/Add_To_Store/SavingData',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${credentials}`,
          },
          body: JSON.stringify(postData),
        }
      );

      // Check if the response is successful (status 2xx)
      if (response.ok) {
        const responseData = await response.text(); // Get the raw response as text

        // Display different alerts based on status
        if (status === 'Updated') {
          Alert.alert('Updated', 'Record has been Updated successfully');
        } else {
          // Handle other status cases if needed
          Alert.alert('Success', responseData);
        }

        // You might want to navigate back or perform other actions here
      } else {
        // Handle error case
        console.error('Error in API response:', response.status);
        Alert.alert('Error', 'Failed to communicate with the server');
      }
    } catch (error) {
      console.error('Error in API call:', error);
      Alert.alert('Error', 'Failed to communicate with the server');
    }
  };

  const styles = StyleSheet.create({
    headings: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
      marginLeft: '3%',
      marginBottom: '1%',
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
      backgroundColor: '#ff8a3d',
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
      width: '100%',
      alignSelf: 'center',
      margin: '5%',
      marginTop: '30%',
      marginBottom: '10%',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    picker: {
      width: '99%',
      color: 'black',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });
  const handleQuantityNumber = (value) =>{
    if (/^\d*\.?\d+$/.test(value) || value === ''){
      setQuantity(value);
    }
  }
  const handleUnitPriceNumber = (value) =>{
    if (/^\d*\.?\d*$/.test(value) || value === ''){
      setUnitPrice(value);
    }
  }
  return (
    <ScrollView>
      <View>
        <View style={{ backgroundColor: '#ff8a3d' }}>
          <Text
            style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18, padding: 10 }}>
            Item/Model Details
          </Text>
        </View>
        <View style={{ marginTop: '5%' }}>
          <Text style={styles.headings}>Item/Model Name</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={modalName}
              onValueChange={(itemValue, itemIndex) => {
                getModalDetails(itemValue),
                  setModalName(itemValue)
              }}
              style={styles.picker}

            >
              {/* <Picker.Item label="Select an option" value="" /> */}
              {models.map((dept) => (
                <Picker.Item key={dept.nm_model} label={dept.nm_model} value={dept.nm_model} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Category</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setCategory(value)}
            value={category}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Sub Category</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setSubCategory(value)}
            value={subCategory}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Asset Type</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setAssetType(value)}
            value={assetType}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Quantity</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={handleQuantityNumber}
            value={quantity}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Unit Price</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={handleUnitPriceNumber}
            value={unitPrice}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Location</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={location}
              onValueChange={(itemValue) => setLocation(itemValue)}
              style={styles.picker}

            >
              {/* <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} /> */}
              {locations.map((dept) => (
                <Picker.Item key={dept.id_loc} label={dept.nm_flr} value={dept.id_loc} />
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
              {/* <Picker.Item label="Select an option" value="" /> */}
              {departments.map((dept) => (
                <Picker.Item key={dept.id_dept} label={dept.nm_dept} value={dept.id_dept} />
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

            >
              {/* <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} /> */}
              {centers.map((dept) => (
                <Picker.Item key={dept.id_cc} label={dept.nm_cc} value={dept.id_cc} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Item Description</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setDescription(value)}
            value={description}
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
        <View style={{ backgroundColor: '#ff8a3d', marginTop: '3%' }}>
          <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18, padding: 10 }}>
            Invoice Details
          </Text>
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>PO Number*</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setPoNumber(value)}
            value={poNumber}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>PO Date*</Text>
          <TouchableOpacity onPress={openDatePicker}>
            <View>
              <Text style={{...styles.textinputs,border:'0px solid white'}}>{poDate}</Text>
            </View>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedPODate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
              style={{...styles.textinputs,border:'0px solid white'}}
            />
          )}
        </View>
        {/* <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>PO Date</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setPoDate(value)}
            value={poDate}
          />
        </View> */}
        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Invoice Number*</Text>
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setInvoiceNumber(value)}
            value={invoiceNumber}
          />
        </View>
        <View style={{ marginTop: '3%' }}>
  <Text style={styles.headings}>Invoice Date*</Text>
  <TouchableOpacity onPress={openInvoiceDatePicker}>
    <View>
      <Text style={{...styles.textinputs, border: '0px solid white'}}>{invoiceDate}</Text>
    </View>
  </TouchableOpacity>

  {showInvoiceDatePicker && (
    <DateTimePicker
      value={selectedInvoiceDate}
      mode="date"
      is24Hour={true}
      display="default"
      onChange={handleInvoiceDateChange}
      style={{...styles.textinputs, border: '0px solid white'}}
    />
  )}
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
  <TouchableOpacity onPress={openGRNDatePicker}>
    <View>
      <Text style={{...styles.textinputs, border: '0px solid white'}}>{grnDate}</Text>
    </View>
  </TouchableOpacity>

  {showGRNDatePicker && (
    <DateTimePicker
      value={selectedGRNDate}
      mode="date"
      is24Hour={true}
      display="default"
      onChange={handleGRNDateChange}
      style={{...styles.textinputs, border: '0px solid white'}}
    />
  )}
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
  <TouchableOpacity onPress={openDCDatePicker}>
    <View>
      <Text style={{...styles.textinputs, border: '0px solid white'}}>{dcDate}</Text>
    </View>
  </TouchableOpacity>

  {showDCDatePicker && (
    <DateTimePicker
      value={selectedDCDate}
      mode="date"
      is24Hour={true}
      display="default"
      onChange={handleDCDateChange}
      style={{...styles.textinputs, border: '0px solid white'}}
    />
  )}
</View>

        <View style={{ marginTop: '3%' }}>
          <Text style={styles.headings}>Vendor</Text>
          <View style={{ borderWidth: 1, width: '95%', justifyContent: 'center', alignSelf: 'center', height: 58, borderRadius: 5 }}>
            <Picker
              selectedValue={vendor}
              onValueChange={(itemValue) => setVendor(itemValue)}
              style={styles.picker}
            >
              {/* <Picker.Item label="Select an option" value="" style={{ color: 'gray' }} /> */}
              {vendors.map((dept) => (
                <Picker.Item key={dept.id_ven} label={dept.nm_ven} value={dept.id_ven} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity onPress={() => handleUpdate('Updated')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Update</Text>
            </View>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  )
}


export default ModifyAssetForm;

