import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from '../Sidebar';
<<<<<<< HEAD
import { encode } from 'base-64';
=======
import {encode} from 'base-64';
>>>>>>> 6e504a12c3a9fafaf998ef3b7a15a6a106c96f52
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyAssets = ({navigation, route}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const getData = async () => {
    try {
      const Idempuser = await AsyncStorage.getItem('userId');
<<<<<<< HEAD
      console.log(Idempuser, "IdempUser My assets");
=======
      console.log(Idempuser, 'IdempUser My assets');
>>>>>>> 6e504a12c3a9fafaf998ef3b7a15a6a106c96f52
      return Idempuser;
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  };
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
          style={{position: 'absolute', top: '30%', left: '20%', zIndex: 1}}>
          <Icon name="arrow-back" color="white" size={25} />
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleBackPress = () => {
    navigation.navigate('Dashboard');
  };

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    getData()
      fetchDepartments();
=======
    getData();
    fetchDepartments();
>>>>>>> 6e504a12c3a9fafaf998ef3b7a15a6a106c96f52
  }, []);

  const fetchDepartments = async () => {
    const Idempuser = await getData();
<<<<<<< HEAD
    console.log(Idempuser,"Idempuser my assets")
=======
    console.log(Idempuser, 'Idempuser my assets');
>>>>>>> 6e504a12c3a9fafaf998ef3b7a15a6a106c96f52
    try {
      const Username = 'SVVG';
      const Password = 'Pass@123';

      const credentials = encode(`${Username}:${Password}`);
      const response = await fetch(
        `http://13.235.186.102/SVVG-API/webapi/myasset?searchword=${Idempuser}`,
        {
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setDepartments(data.data || []); // Provide a default empty array
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {departments &&
          departments.map(department => (
            <Card key={department.id_dept} style={styles.card}>
              <Card.Content>
                <View style={styles.labelValueContainer}>
                  <Text style={styles.label}>Asset Name :</Text>
                  <Text style={styles.value}>{department.des}</Text>
                </View>
                <View style={styles.labelValueContainer}>
                  <Text style={styles.label}>Asset ID:</Text>
                  <Text style={styles.value}>{department.assetid}</Text>
                </View>
                <View style={styles.labelValueContainer}>
                  <Text style={styles.label}>Serial No:</Text>
                  <Text style={styles.value}>{department.serial}</Text>
                </View>
                <View style={styles.labelValueContainer}>
                  <Text style={styles.label}>Asset Ref No:</Text>
                  <Text style={styles.value}>{department.appno}</Text>
                </View>
                <View style={styles.labelValueContainer}>
                  <Text style={styles.label}>Remarks:</Text>
                  <Text style={styles.value}>{department.remark}</Text>
                </View>
              </Card.Content>
            </Card>
          ))}
      </View>
      {sidebarOpen && (
        <View style={styles.sidebar}>
<<<<<<< HEAD
          <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar}/>
=======
          <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
>>>>>>> 6e504a12c3a9fafaf998ef3b7a15a6a106c96f52
        </View>
      )}
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
    backgroundColor: 'white',
  },
  card: {
    marginBottom: '5%',
    backgroundColor: '#e0e0e0',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  labelValueContainer: {
    width: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: 'bold',
    color: 'black',
    width: '35%',
  },
  value: {
    color: 'black',
    width: '65%',
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
});

export default MyAssets;
