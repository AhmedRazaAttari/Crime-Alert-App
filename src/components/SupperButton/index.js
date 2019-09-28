// import React, { Component } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
// import Styles from './style';
// import Fire from '../../config/api';
// import * as Location from 'expo-location';
// import Home from '../../screens/Home'

// export default class RobbedBtn extends Component {

//     constructor() {
//         super();

//         this.state = {
//             // marker_lat: null,
//             // marker_long: null,
//             // coordinate: new AnimatedRegion({
//             //     latitude: null,
//             //     longitude: null,
//             // }),
//         }

//         this.Robbed = this.Robbed.bind(this)
//     }

//     async componentDidMount(){
//         let location = await Location.getCurrentPositionAsync({});
//         // console.log('location****', location)
//         this.setState({ location });

//         Location.watchPositionAsync({ timeInterval: 1000, distanceInterval: 0.1 }, loc => {
//             // console.log('watching***', loc);
//             this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude })
//         })
//     }

//     Btn() {
//         return <TouchableOpacity onPress={() => ToastAndroid.show("Press this button a long", 2)} onLongPress={() => this.Robbed()}>
//             <View style={Styles.BtnStyle}>
//                 <Text>Robbed!</Text>
//             </View>
//         </TouchableOpacity>
//     }

//     Robbed(){
        // const userId = Fire.auth().currentUser.uid;
        // Fire.database().ref("AllCrimes/" +  userId).set({
        //     Location : {

        //     }
        // })
//         Alert.alert(
//             'Alert',
//             'If you want to put some detail now??',
//             [
//               { text: 'NOW', onPress: () => this.nav()},
//               { text: 'LATER' },
//             ],
//             { cancelable: false }
//         );

//         // if now press so navigate to crimeInfo screen
//         // this.props.navigation.push("CrimeInfo")

//         // if later press so alert closes and navigate to home screen
//         // this.props.navigation.push("HomePage")
//     }

//     nav(){
//         this.props.navigation.navigate("CrimeInfo")
//     }


//     render() {
//         return (
//             <View style={{flex : 1}}>{this.Btn()}</View>
//         )
//     }

// }
