import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {encode} from 'base-64';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';


const UploadFile = () => {
    const [uploadedDocument, setUploadedDocument] = useState(null);
    const uploadDocument = async () => {
        try {
          const pickedFile = await DocumentPicker.pickSingle({
            type: [DocumentPicker.types.allFiles],
          });
      
          const base64Data = await RNFS.readFile(pickedFile.uri, 'base64');
      
          // Create FormData object
          const formData = new FormData();
      
          // Append binary file data
          formData.append('file', {
            uri: pickedFile.uri,
            type: pickedFile.type,
            name: pickedFile.name,
          });
      
          const response = await fetch('http://13.235.186.102/SVVG/Upload_File', {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            console.log('Document uploaded successfully');
            Alert.alert('Upload Document', 'Document uploaded successfully');
      
            // Update the state with the uploaded document information
            setUploadedDocument({
              base64Data,
              fileName: pickedFile.name,
              fileType: pickedFile.type,
            });
      
            // Log the response
            const responseBody = await response.text();
            console.log('Response:', responseBody);
            const { upload_inv } = JSON.parse(responseBody);

        await AsyncStorage.setItem('upload_inv', upload_inv);
          } else {
            console.error('Failed to upload document. Status:', response.status);
          }
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            console.log('Document picker canceled');
          } else {
            console.error('Error picking document:', err);
            throw err;
          }
        }
      };
      
  return (
    <View>
       <View style={{marginTop: '3%'}}>
          <TouchableOpacity onPress={uploadDocument}>
            <Text
              style={{
                textAlign: 'center',
                backgroundColor: '#052d6e',
                color: 'white',
                fontWeight: 'bold',
                padding: 10,
                borderRadius: 10,
                width: '45%',
                marginTop: '3%',
                marginLeft: '3%',
              }}>
              Upload Document
            </Text>
          </TouchableOpacity>
          {uploadedDocument && (
            <View style={{marginLeft: '3%'}}>
              <Text style={{color: 'black'}}>Uploaded Document:</Text>
              <Text style={{color: 'black'}}>
                Name: {uploadedDocument.fileName}
              </Text>
              <Text style={{color: 'black'}}>
                Type: {uploadedDocument.fileType}
              </Text>
            </View>
          )}
        </View>
    </View>
  )
}

export default UploadFile