import React from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';

import  Home  from '../screens/Home/index';
import Mydevices  from '../screens/MyDevices/index';
import  AllRobbedHistory  from '../screens/AllRobbedHistory/index';


const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: Home,
    },
    "My Devices": {
        screen: Mydevices,
    },
    "My Robebd History": {
        screen: Mydevices,
    },
    "All Robbed History": {
        screen: AllRobbedHistory,
    },

}, {
    contentComponent: (props) => (
        <SafeAreaView style={{flex : 1}}>
            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 32 }}>Name</Text>
            </View>
            <DrawerNavigatorItems {...props}/>
        </SafeAreaView>
    )
}
);

const MyApp = MyDrawerNavigator;

export default MyApp;