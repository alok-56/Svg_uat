import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import ForgotPassword from '../Screens/ForgotPassword';
import Dashboard from '../Screens/Dashboard';
import MyAssets from '../Screens/Sidebar/MyAssets/MyAssets';
import Scan from '../Screens/Sidebar/Scan/Scan';
import AddToStore from '../Screens/Sidebar/Assets/AddToStore/AddToStore';
import Allocate from '../Screens/Sidebar/Assets/Allocate/Allocate';
import DAllocate from '../Screens/Sidebar/Assets/DAllocate/DAllocate';
import Link from '../Screens/Sidebar/Assets/Link/Link';
import DLink from '../Screens/Sidebar/Assets/DLink/DLink';
import Employee from '../Screens/Employee/Employee';
import DamagedAssets from '../Screens/DamagedAssets/DamagedAssets';
import Instore from '../Screens/Instore/Instore';
import ApproveNewAsset from '../Screens/Sidebar/ApproveNewAsset/ApproveNewAsset';
import ApproveForm from '../Screens/Sidebar/ApproveNewAsset/ApproveForm';
import SerialNo from '../Screens/Sidebar/Assets/AddToStore/SerialNo';
import ScanFirst from '../Screens/Sidebar/Scan/ScanFirst';
import QRCodeScannerComp from '../Screens/Sidebar/Scan/QrCodeScanner';
import WelcomeScreen from '../Screens/WelcomeScreen';
import ModifyAsset from '../Screens/Sidebar/ModifyAsset/ModifyAsset';
import ModifyAssetForm from '../Screens/Sidebar/ModifyAsset/ModifyAssetForm';

const Stack = createStackNavigator();
const Routes = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: 'Welcome to AMS',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerTitle: 'Sign up',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerTitle: 'Forgot Password',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerTitle: 'Dashboard',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="MyAssets"
          component={MyAssets}
          options={{
            headerTitle: 'My Assets',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Scan"
          component={Scan}
          options={{
            headerTitle: 'Scan',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="QrCodeScanner"
          component={QRCodeScannerComp}
          options={{
            headerTitle: 'QrCode / BarCode Scanner',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Allocate"
          component={Allocate}
          options={{
            headerTitle: 'Allocate Asset',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="DAllocate"
          component={DAllocate}
          options={{
            headerTitle: 'De - Allocate Asset',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Link"
          component={Link}
          options={{
            headerTitle: 'Link Accessories',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="DLink"
          component={DLink}
          options={{
            headerTitle: 'DLink Accessories',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="AddToStore"
          component={AddToStore}
          options={{
            headerTitle: 'Add To Store',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Employee"
          component={Employee}
          options={{
            headerTitle: 'Allocated to Employee',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="DamagedAssets"
          component={DamagedAssets}
          options={{
            headerTitle: 'Damaged Assets',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Instore"
          component={Instore}
          options={{
            headerTitle: 'In Store',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="ApproveNewAsset"
          component={ApproveNewAsset}
          options={{
            headerTitle: 'Approve New Asset',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="ModifyAsset"
          component={ModifyAsset}
          options={{
            headerTitle: 'Modify Asset',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="ModifyAssetForm"
          component={ModifyAssetForm}
          options={{
            headerTitle: 'Modify Asset Form',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="ApproveForm"
          component={ApproveForm}
          options={{
            headerTitle: 'Approve New Asset',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="SerialNo"
          component={SerialNo}
          options={{
            headerTitle: 'Add Serial No.',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="ScanFirst"
          component={ScanFirst}
          options={{
            headerTitle: 'Scan',
            headerStyle: {backgroundColor: '#052d6e'},
            headerTitleAlign: 'center',
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  logoutButton: {},
});

export default Routes;
