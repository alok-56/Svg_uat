import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sidebar = ({isOpen, onClose, route}) => {
  const navigation = useNavigation();
  const [isAssetsClicked, setIsAssetsClicked] = useState(false);
  const {params: {userId} = {}} = route || {};
  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.removeItem('AssestData');
      await AsyncStorage.removeItem('userDetails');
      await AsyncStorage.removeItem('userId');

      console.log('Data CLeared');
    } catch (err) {
      console.log('error', err);
    }
  };
  const handleItemClick = screen => {
    if (screen === 'Assets') {
      setIsAssetsClicked(!isAssetsClicked);
    } else {
      onClose();
      navigation.navigate(screen);
    }
  };
  // const handleOutforDelivery = () => {
  // handleItemClick('OutForDelivery')
  // }
  const handleLogout = () => {
    clearAsyncStorage();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };
  return (
    <View
      style={[styles.sidebarContainer, {display: isOpen ? 'flex' : 'none'}]}>
      <TouchableOpacity
        onPress={() => handleItemClick('Dashboard')}
        style={[styles.sidebarButton, styles.sidebarButtonLarge]}>
        <Icon
          name="home"
          size={30}
          color="gray"
          style={{marginHorizontal: '5%'}}
        />
        <Text style={styles.sidebarItem}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleItemClick('AddToStore')}
        style={[styles.dropdownButton, styles.dropdownButtonLarge]}>
        <Icon
          name="menu"
          size={30}
          color="gray"
          style={{marginHorizontal: '5%'}}
        />
        <Text style={styles.dropdownItem}>Add New Asset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleItemClick('ApproveNewAsset')}
        style={[styles.sidebarButton, styles.sidebarButtonLarge]}>
        <Icon
          name="add-card"
          size={30}
          color="gray"
          style={{marginHorizontal: '5%'}}
        />
        <Text style={styles.sidebarItem}>Approve New Asset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleItemClick('ModifyAsset')}
        style={[styles.sidebarButton, styles.sidebarButtonLarge]}>
        <Icon
          name="change-circle"
          size={30}
          color="gray"
          style={{marginHorizontal: '5%'}}
        />
        <Text style={styles.sidebarItem}>Rejected Assets</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleItemClick('MyAssets', {userId})}
        style={[styles.sidebarButton, styles.sidebarButtonLarge]}>
        <Icon
          name="web-asset"
          size={30}
          color="gray"
          style={{marginHorizontal: '5%'}}
        />
        <Text style={styles.sidebarItem}>My Asset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleItemClick('Scan')}
        style={[styles.sidebarButton, styles.sidebarButtonLarge]}>
        <MIcon
          name="barcode-scan"
          size={30}
          color="gray"
          style={{marginHorizontal: '5%'}}
        />
        <Text style={styles.sidebarItem}>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleItemClick('Assets')}
        style={[styles.sidebarButton, styles.sidebarButtonLarge]}>
        <FIcon
          name="user-circle-o"
          size={30}
          color="gray"
          style={{marginHorizontal: '5%'}}
        />
        <Text style={styles.sidebarItem}>Assets</Text>
        <Icon
          name={isAssetsClicked ? 'arrow-drop-up' : 'arrow-drop-down'}
          size={30}
          color="gray"
          style={{marginLeft: '50%'}}
        />
      </TouchableOpacity>
      {isAssetsClicked && (
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            onPress={() => handleItemClick('Allocate')}
            style={[styles.dropdownButton, styles.dropdownButtonLarge]}>
            <FIcon
              name="file-text"
              size={30}
              color="gray"
              style={{marginHorizontal: '10%'}}
            />
            <Text style={styles.dropdownItem}>Allocate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleItemClick('DAllocate')}
            style={[styles.dropdownButton, styles.dropdownButtonLarge]}>
            <MIcon
              name="pin"
              size={30}
              color="gray"
              style={{marginHorizontal: '10%'}}
            />
            <Text style={styles.dropdownItem}>De - Allocate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleItemClick('Link')}
            style={[styles.dropdownButton, styles.dropdownButtonLarge]}>
            <Icon
              name="link"
              size={30}
              color="gray"
              style={{marginHorizontal: '10%'}}
            />
            <Text style={styles.dropdownItem}>Link Accessories</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleItemClick('DLink')}
            style={[styles.dropdownButton, styles.dropdownButtonLarge]}>
            <Icon
              name="link-off"
              size={30}
              color="gray"
              style={{marginHorizontal: '10%'}}
            />
            <Text style={styles.dropdownItem}>DLink Accessories</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={handleLogout}
        style={[styles.sidebarButton, styles.sidebarButtonLarge]}>
        <Icon
          name="logout"
          size={30}
          color="gray"
          style={{marginHorizontal: '5%'}}
        />
        <Text style={styles.sidebarItem}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: '25%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: '5%',
    marginHorizontal: '10%',
    borderRadius: 10,
  },
  sidebarContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#ccc',
  },
  sidebarButton: {
    paddingVertical: '3%',
    paddingHorizontal: '10%',
    backgroundColor: '#ccc',
    flexDirection: 'row',
  },
  sidebarButtonLarge: {
    width: '100%',
  },
  sidebarItem: {
    fontSize: 16,
    color: 'gray',
    paddingVertical: '2%',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginTop: '2%',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 2,
    marginBottom: '1%',
  },
  dropdownButton: {
    marginBottom: '1%',
    paddingVertical: '2%',
    paddingHorizontal: '10%',
    flexDirection: 'row',
    width: '100%',
  },
  dropdownButtonLarge: {
    width: '100%',
  },
  dropdownItem: {
    fontSize: 16,
    color: 'gray',
    paddingVertical: '3%',
    fontWeight: 'bold',
  },
});

export default Sidebar;
