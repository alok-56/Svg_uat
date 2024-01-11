import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ApproveNewAsset = ({navigation}) => {
  const tableData = [
    [
      'inv-004',
      '28/12/2023',
      'SUPER',
      'CANON(LASER JET)',
      'GLOBAL WEB LEARNING SOLUTION',
      '2',
      '',
    ],
  ];

  const tableHeadings = [
    'Invoice No',
    'Invoice Date',
    'Requested By',
    'Asset Name/Model',
    'Vendor',
    'Total Qty',
    'Add To Store',
  ];

  const MyTable = ({data, headings}) => {
    const cellWidths = [95, 110, 80, 150, 200, 80, 50];

    const handleAddToStorePress = () => {
      navigation.navigate('ApproveForm');
    };

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{marginTop: '10%', marginBottom: '10%'}}>
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            <Row
              data={headings}
              style={{
                height: 40,
                backgroundColor: '#ff8a3d',
                width: '100%',
              }}
              textStyle={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              widthArr={cellWidths}
            />
            <Rows
              data={data}
              style={{
                height: 35,
                justifyContent: 'space-evenly',
                color: 'black',
              }}
              textStyle={{
                textAlign: 'center',

                color: 'black',
              }}
              widthArr={cellWidths}
              onPress={(rowData, rowIndex) => {
                if (rowIndex === data.length - 1) {
                  handleAddToStorePress(rowData[0]); // Assuming the first column is the invoice number
                }
              }}
            />
          </Table>
          <View style={{position: 'absolute', right: 10, top: '50%'}}>
            <TouchableOpacity
              onPress={() => handleAddToStorePress(data[data.length - 1][0])}>
              <Icon name="add" size={30} color="#ff8a3d" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View>
      <MyTable data={tableData} headings={tableHeadings} />
    </View>
  );
};

export default ApproveNewAsset;
