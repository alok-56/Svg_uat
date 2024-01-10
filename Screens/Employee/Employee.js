// ExportTable.js
import React ,{useEffect,useState}from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import XLSX from 'xlsx';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { encode } from 'base-64';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Employee = () => {
  const[apiData,setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const tableHeadings = [
    'Asset Id',
    'Serial No',
    'Invoice No',
    'Location',
  ];

  const MyTable = ({ data, headings }) => {
    const cellWidths = [150,130, 80,120];
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ marginTop: '10%', marginBottom: '10%' }}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row
              data={headings}
              style={{
                height: 40,
                backgroundColor: '#052d6e',
                width: '100%', 
              }}
              textStyle={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}
              widthArr={cellWidths}
            />
            {data && data.map && (
              <Rows
                data={data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
                 style={{ height: 35, justifyContent: 'space-evenly', color: 'black' }}
                textStyle={{
                  textAlign: 'center',
                  color: 'black',
                }}
                widthArr={cellWidths}
                onPress={(rowData, rowIndex) => {
                  if (rowIndex === data.length - 1) {
                    handleAddToStorePress(rowData[0]); 
                  }
                }}
              />
            )}
          </Table>
          
        </View>
      </ScrollView>
    );
  };
  
  const fetchData = async () => {
    try {
      const Username = 'SVVG';
      const Password = 'Pass@123';
  
      const credentials = encode(`${Username}:${Password}`);
      const response = await fetch('http://13.235.186.102/SVVG-API/webapi/reportAPI/assetstatusreport?searchword=all', {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
  
      const responseData = await response.json();
  
      if (Array.isArray(responseData.data) && responseData.data.length > 0) {
        const mappedData = responseData.data.map(item => [
          item.AssetID,
          item.SerialNo,
          item.InvoiceNo,
          item.Location,
        ]);
        setApiData(mappedData);
      } else {
        console.error('Error fetching data: Data is not an array or is empty');
        setApiData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiData([]);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []); 
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#052d6e',
      padding: 10,
      alignItems: 'center',
      border:"none",
      width: '40%',
      alignSelf: 'center',
      margin: '5%'
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 10,
    },
    paginationButton: {
      padding: 8,
      marginHorizontal: 5,
      border:"none",
      color:"white"
    },
    activePaginationButton: {
      backgroundColor: '#052d6e',
      color:"white"
    },
    paginationButtonText: {
      color: 'black',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    exportButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
  })

  const generatePDF = async () => {
    // Check if WRITE_EXTERNAL_STORAGE permission is granted
    const permissionResult = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    console.log('Permission Result:', permissionResult);
    
    if (permissionResult === RESULTS.GRANTED) {
      // Permission is already granted, proceed with PDF generation and export
      const htmlContent = generateTableHTML({ data: tableData, headings: tableHeadings });
      const pdfFileName = 'table-export.pdf';
      const pdfFilePath = `${downloadsPath}/${pdfFileName}`;
      const options = {
        html: htmlContent,
        fileName: pdfFileName,
        directory: downloadsPath,
      };

      const pdf = await RNHTMLtoPDF.convert(options);
      console.log(pdf.filePath);

      // Move the downloaded PDF file to the correct path
      try {
        await RNFS.moveFile(pdf.filePath, pdfFilePath);
        console.log('PDF file moved to:', pdfFilePath);
        Alert.alert('PDF Export', 'Successfully exported PDF!');
      } catch (moveError) {
        console.error('Error moving PDF file:', moveError);
        Alert.alert('PDF Export', 'Failed to export PDF!');
      }
    } else {
      // Request permission from the user
      const requestResult = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      
      if (requestResult === RESULTS.GRANTED) {
        // Permission granted, call the generatePDF function again
        generatePDF();
      } else {
        // Permission denied, handle accordingly (e.g., show an alert)
        Alert.alert('Permission Denied', 'You need to grant storage permission to export files.');
      }
    }
  };

  const downloadsPath = RNFS.DownloadDirectoryPath;
  const generateExcel = () => {
    // Convert the data to worksheet
    const ws = XLSX.utils.aoa_to_sheet([tableHeadings, ...tableData]);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Convert the workbook to binary Excel format
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

    // Save the Excel file with the correct extension (.xlsx)
    const path = `${downloadsPath}/table-export.xlsx`;

    RNFS.writeFile(path, excelBuffer, 'base64')
      .then(() => {
        console.log('Excel file created:', path);
        Alert.alert('Excel Export', 'Successfully exported Excel!');
      })
      .catch(error => {
        console.error('Error creating Excel file:', error);
        Alert.alert('Excel Export', 'Failed to export Excel!');
      });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const renderPaginationButtons = () => {
    const totalItems = apiData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Display up to 5 pagination buttons, along with previous and next arrows
    const visiblePages = 5;
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    return (
      <View style={styles.paginationContainer}>
        {currentPage > 1 && (
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => handlePageChange(currentPage - 1)}>
            <Text style={styles.paginationButtonText}>{"<"}</Text>
          </TouchableOpacity>
        )}

        {[...Array(endPage - startPage + 1).keys()].map((index) => (
          <TouchableOpacity
            key={startPage + index}
            style={[
              styles.paginationButton,
              currentPage === startPage + index && styles.activePaginationButton,
            ]}
            onPress={() => handlePageChange(startPage + index)}>
            <Text style={styles.paginationButtonText}>{startPage + index}</Text>
          </TouchableOpacity>
        ))}

        {currentPage < totalPages && (
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => handlePageChange(currentPage + 1)}>
            <Text style={styles.paginationButtonText}>{">"}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ScrollView>
    <View>
    {apiData && apiData.length > 0 ? (
          <>
            <MyTable data={apiData} headings={tableHeadings} />
            {renderPaginationButtons()}
          </>
        ) : (
          <Text>Loading data...</Text>
        )}
     
        <View style={styles.exportButtonsContainer}>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={generatePDF}>
            <Text style={styles.buttonText}>Export to PDF</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={generateExcel}>
            <Text style={styles.buttonText}>Export to Excel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </ScrollView>
  ); 
};


export default Employee;
