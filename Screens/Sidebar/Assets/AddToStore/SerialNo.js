import { View, Text ,TextInput,StyleSheet,TouchableOpacity} from 'react-native'
import React,{useEffect, useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { encode } from 'base-64';

const SerialNo = ({ route }) => {
  const { modalNm,modalName, quantity, unitPrice, taggable, warranty,startDate,endDate,leaseStatus,typeOfProcurement,location,department,costCenter,itemDescription ,poNumber,poDate,invoiceNumber,invoiceDate,grnNumber,grnDate,dcNumber,dcDate,vendor,operatingSystem,diskSpace,ram,osServiceType,selectedModelId,idAssetdiv,idSAssetdiv,typAsst} = route.params;
  const [serialNumbers, setSerialNumbers] = useState(Array.from({ length: quantity }, (_, index) => ({
    serialNo: '',
    assetRef: 'NA',
    id: index + 1
  })));
      const handleSaveData = async () => {
  
        try {
          const apiUrl = 'http://13.235.186.102/SVVG-API/webapi/Add_To_Store/SavingData';
          const username = 'SVVG';
          const password = 'Pass@123';
          const headers = new Headers();
          headers.set('Authorization', `Basic ${encode(`${username}:${password}`)}`);
          headers.set('Content-Type', 'application/json');
    
          const requestData = {
            data: [
              {
                nm_model: modalName,
                id_model: selectedModelId,
                id_assetdiv: idAssetdiv,
                id_s_assetdiv: idSAssetdiv,
                typ_asst: typAsst,
                qty_asst: quantity,
                id_emp_user: "1",
                val_asst: unitPrice,
                tag: taggable,
                warr_amc: warranty,
                dt_amc_start: startDate,
                dt_amc_exp: endDate,
                st_lease: leaseStatus,
                typ_proc: typeOfProcurement,
                std_lease: "2023-12-30",
                endt_lease: "2023-12-30",
                id_flr: "1",location,
                id_dept: "8",department,
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
                storeage_typ: diskSpace,
                ram_typ: ram,
                process_typ: operatingSystem,
                st_config: osServiceType,
                id_loc: "1",
                id_subl: "1",
                id_building: "1",
                ds_pro: modalName,
                ds_asst: modalName,
                id_inv_m: "",
                id_inv: "",
                no_model: modalName,
                cst_asst: "",
                tt_un_prc: "",
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
    
          const responseData = await response.json();
          if (responseData.status === 'success') {
            console.log('Record has been inserted successfully');
            
          } else {
            console.error('Error:', responseData.message);
          }
        } catch (error) {
          console.error('Error making POST request:', error);
          console.error('Error making POST request:', error);
      console.error('Response Status:', response.status);
      console.error('Response Text:', await response.text());
          // Handle error scenarios
        }
      };

      const handleDontSerial = async () => {
        try {
          const apiUrl = 'http://13.235.186.102/SVVG-API/webapi/Add_To_Store/Serial_No';
          const username = 'SVVG';
          const password = 'Pass@123';
      
          const headers = new Headers();
          headers.set('Authorization', `Basic ${encode(`${username}:${password}`)}`);
          headers.set('Content-Type', 'application/json');
      
          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers,
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const responseData = await response.json();
      
          // Get the maximum value and current serial number
          const maxValue = parseInt(responseData.data[0].maxvalue);
          const currentSerialNumber = parseInt(responseData.data[0].slNo);
      
          // Generate serial numbers based on the quantity
          const generatedSerialNumbers = Array.from({ length: quantity }, (_, index) => ({
            serialNo: (currentSerialNumber + index).toString(),
            assetRef: 'NA',
            id: index + 1,
          }));
      
          setSerialNumbers(generatedSerialNumbers);
        } catch (error) {
          console.error('Error fetching serial numbers:', error);
        }
      };
    
      useEffect(() => {
        // Fetch serial numbers when the component mounts
        handleDontSerial();
      }, []);   

  return (
    <ScrollView>
    <View>
    <TouchableOpacity onPress={handleDontSerial}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Do Not Have Serial No</Text>
          </View></TouchableOpacity>
          {serialNumbers.map((serialNumber, index) => (
  <View key={index} style={{ flexDirection: 'row' }}>
    <View style={{ marginTop: '5%' }}>
      <Text style={styles.headings}>{`Serial No ${serialNumber.id}`}</Text>
      <TextInput
        style={styles.textinputs}
        onChangeText={(value) => {
          const updatedSerialNumbers = [...serialNumbers];
          updatedSerialNumbers[index].serialNo = value;
          setSerialNumbers(updatedSerialNumbers);
        }}
        value={serialNumber.serialNo}
        placeholder={`Enter Serial No ${serialNumber.id}`}
        placeholderTextColor="gray"
      />
    </View>
    <View style={{ marginTop: '5%' }}>
      <Text style={styles.headings}>{`Asset REF.NO${serialNumber.id}`}</Text>
      <TextInput
        style={styles.textinputs}
        onChangeText={(value) => {
          const updatedSerialNumbers = [...serialNumbers];
          updatedSerialNumbers[index].assetRef = value;
          setSerialNumbers(updatedSerialNumbers);
        }}
        value={serialNumber.assetRef}
        placeholder={`Enter Asset REF.NO${serialNumber.id}`}
        placeholderTextColor="gray"
      />
    </View>
  </View>
))}
        {/* <View >
      <Text style={{color:'black'}}>Values to be posted:</Text>
      <Text style={{color:'black'}}>Modal Name: {modalName}</Text>
      <Text style={{color:'black'}}>Quantity: {quantity}</Text>
      <Text style={{color:'black'}}>Unit Price: {unitPrice}</Text>
      <Text style={{color:'black'}}>Taggable: {taggable}</Text>
      <Text style={{color:'black'}}>Warranty: {warranty}</Text>
      <Text style={{color:'black'}}>leaseStatus: {leaseStatus}</Text>
      <Text style={{color:'black'}}>Start Date: {startDate}</Text>
      <Text style={{color:'black'}}>end Date: {endDate}</Text>
      <Text style={{color:'black'}}>Typ of proc: {typeOfProcurement}</Text>
      <Text style={{color:'black'}}>Locations: {location}</Text>
      <Text style={{color:'black'}}>department: {department}</Text>
      <Text style={{color:'black'}}>cost center: {costCenter}</Text>
      <Text style={{color:'black'}}>itemDescription: {itemDescription}</Text>
      <Text style={{color:'black'}}>poNumber: {poNumber}</Text>
      <Text style={{color:'black'}}>poDate: {poDate}</Text>
      <Text style={{color:'black'}}>invoiceNumber: {invoiceNumber}</Text>
      <Text style={{color:'black'}}>invoiceDate: {invoiceDate}</Text>
      <Text style={{color:'black'}}>grnNumber: {grnNumber}</Text>
      <Text style={{color:'black'}}>grnDate: {grnDate}</Text>
      <Text style={{color:'black'}}>dcNumber: {dcNumber}</Text>
      <Text style={{color:'black'}}>dcDate: {dcDate}</Text>
      <Text style={{color:'black'}}>vendor: {vendor}</Text>
      <Text style={{color:'black'}}>operatingSystem: {operatingSystem}</Text>
      <Text style={{color:'black'}}>ram: {ram}</Text>
      <Text style={{color:'black'}}>diskSpace: {diskSpace}</Text>
      <Text style={{color:'black'}}>osServiceType: {osServiceType}</Text>
      <Text style={{color:'black'}}>selectedModelId: {selectedModelId}</Text>
      <Text style={{color:'black'}}>idAssetdiv: {idAssetdiv}</Text>
      <Text style={{color:'black'}}>idSAssetdiv: {idSAssetdiv}</Text>
      <Text style={{color:'black'}}>typAsst: {typAsst}</Text>
      <Text style={{color:'black'}}>modalNm: {modalNm}</Text>

    </View> */}
        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:'8%'}}>
        <TouchableOpacity onPress={handleSaveData}>
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
        backgroundColor: '#052d6e',
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