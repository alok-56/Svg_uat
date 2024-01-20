
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { encode } from 'base-64';

const ModifyAssetForm = ({ route }) => {
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
  const [idInv,setIdInv]=useState(0)
  const [idInvM,setIdInvM]=useState(0)
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
        setDescription(itemDetails.st_config);
        setRemarks(itemDetails.Remarks || '');
      } else {
        console.error('Error fetching data: Data is not an array or is empty');
        setApiData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiData([]);
    }
  };
 
  const handleUpdate = async (status) => {
    if (!remarks.trim()) {
      Alert.alert("Alert",'Please enter all the details');
      return;
    }
  
    const currentDate = new Date().toISOString().split('T')[0];
  
    const postData = 
    { 
        data: [ 
            { 
                nm_model: "CANON (LASERJET)", 
                id_model: "3", 
                id_grp: '3', 
                id_sgrp: '203', 
                typ_asst: 'IT', 
                qty_asst: '10', 
                id_emp_user:'1', 
                val_asst: '12', 
                tag: 'Yes', 
                warr_amc: 'A', 
                dt_amc_start: "2023-12-31", 
                dt_amc_exp: "2023-12-31", 
                st_lease: 'UL', 
                typ_proc: 'OP', 
                std_lease: "2023-12-31", 
                endt_lease: "2023-12-31", 
                id_flr: '1', 
                id_dept: '8', 
                id_cc: '1', 
                item_description: "CANON(LASERJET)", 
                rmk_asst: "", 
                no_po: "PO/001/2023", 
                dt_po: "2023-12-31", 
                no_inv: "INV/01/2023", 
                dt_inv: "2023-12-31", 
                no_grn: "GRN/01/2023", 
                dt_grn: "2023-12-31", 
                no_dc: "DC/01/2023", 
                dt_dc: "2023-12-31", 
                id_ven: '1', 
                storeage_typ: '1TB', 
                ram_typ: '6GB', 
                process_typ: 'OS', 
                st_config: 'Yes', 
                id_loc: '1', 
                id_subl: '1', 
                id_building: '1', 
                ds_pro: "CANON (LASERJET)", 
                ds_asst: "CANON (LASERJET)", 
                id_inv_m:"" , 
                id_inv:"" , 
                no_model: "CANON (LASERJET)", 
                cst_asst: "", 
                tt_un_prc: "", 
                invoice_file:" Screenshot (7)_1703670462550.png", 
                SerialVal: "NA63,NA64", 
                sapno: "NA63,NA64", 
            } 
        ] 
    } ;
    console.log('postData-->', postData);
    try {
      const Username = 'SVVG';
      const Password = 'Pass@123';
      const credentials = encode(`${Username}:${Password}`);
      const response = await fetch(
        'http://13.235.186.102/SVVG-API/webapi/Store_Rejectlist/UpdateAddToStore',
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
        }  else {
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
  });
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
        <View style={{ backgroundColor: '#ff8a3d', marginTop: '3%' }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 18, padding: 10 }}>
        Invoice Details
        </Text>
        </View>
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
          <TextInput
            style={styles.textinputs}
            onChangeText={(value) => setVendor(value)}
            value={vendor}
            editable={false}
          />
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


export default ModifyAssetForm

