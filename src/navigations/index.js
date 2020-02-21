import React from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import Fire from '../config/api';
import Home from '../screens/Home/index';
import Mydevices from '../screens/MyDevices/index';
import AllRobbedHistory from '../screens/AllRobbedHistory/index';


var userdata;
Fire.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
      userdata = user;
    } else {
    }
});
  

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
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center', padding : 10 }}>
                <Image source={{uri : userdata.photoURL}} style={{borderRadius : 100, height : 70, width : 70}}/>
                <Text style={{ fontSize: 30 }}>{userdata.displayName}</Text>
            </View>
            <DrawerNavigatorItems {...props} />
        </SafeAreaView>
    )
}
);

const MyApp = MyDrawerNavigator;

export default MyApp;