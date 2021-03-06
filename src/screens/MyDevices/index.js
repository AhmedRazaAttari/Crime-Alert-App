import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import Fire from '../../config/api';
const screen = Dimensions.get("screen");
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import Styles from './style';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var itm = ["Nice"];
export default class MyDevices extends Component {

    constructor() {
        super();

        this.state = {
            isloading: true,
            marker_lat: LATITUDE,
            marker_long: LONGITUDE,
            // longituteDelta : ,
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
                longitudeDelta: LONGITUDE_DELTA
            }),
            devices: [],

        }
    }

    SearchBar() {
        return <View style={Styles.SearchBar}>
            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                <MaterialIcons name="view-headline" size={28} />
            </TouchableOpacity>
            <Text style={{color : "olive", fontSize : 19, marginLeft : 30}}>Your Registere Devices</Text>
            {/* <TextInput placeholder="Search or Enter Place" style={Styles.TextINput} value={this.state.searchLoc} onChangeText={(searchLoc) => { this.setState({ searchLoc }) }} /> */}
            {/* <TouchableOpacity onPress={() => this.searchLoc()}>
                <FontAwesome name="search" size={23} />
            </TouchableOpacity> */}
        </View>
    }

    userDevices(){
        
    }

    map() {
        return <MapView
            style={{ flex: 1 }}
            showsUserLocation={true}
            followsUserLocation={true}
            scrollEnabled={true}
            zoomEnabled={true}
            initialRegion={{
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
        >
            <Marker
                ref={marker => {
                    this.marker = marker;
                }}
                tracksViewChanges={true}
                coordinate={{
                    latitude: this.state.marker_lat,
                    longitude: this.state.marker_long,
                    longitudeDelta: this.state
                }}
            />
        </MapView>
    }


    componentDidMount() {

        const userId = Fire.auth().currentUser.uid

        var _ = this;
        Fire.database().ref("users/" + userId).child("DevicesRegistered").once("value").then(function (snapshot) {
            let items = [];
            snapshot.forEach(function (anotherSnapshot) {
                items.push({
                    deviceid: anotherSnapshot.val().deviceId,
                    devicename: anotherSnapshot.val().devicename,
                })
            })
            itm = items;
            console.log(itm)
        })
            .then((success) => {
                _.setState({
                    isloading: false
                })
            })

    }

    // ShowMyDevices() {
    //     return <View style={Styles.ShowDevices}>
    //         <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
    //             <MaterialIcons name="view-headline" size={28} />
    //         </TouchableOpacity>
    //         {/* <View style={{ height: 35, width: 70, backgroundColor: "#03a5fc", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
    //             <Text style={{ color: "white" }}>Device</Text>
    //         </View> */}
    //         {itm.map((item => console.log(item)))}
    //         {itm.map((item, i) => {
    //             return <TouchableOpacity key={i} onPress={() => this.trackLocation(item.deviceid)}>
    //                 <View style={{ height: 35, width: 70, backgroundColor: "#03a5fc", borderRadius: 10, justifyContent: "center", alignItems: "center" }}>
    //                     <Text style={{ color: "white" }}>{item.devicename}</Text>
    //                 </View>
    //             </TouchableOpacity>
    //         })}
    //     </View>
    // }

    // distance(lat1, lon1, lat2, lon2, unit) {
    //     if ((lat1 == lat2) && (lon1 == lon2)) {
    //         return 0;
    //     }
    //     else {
    //         var radlat1 = Math.PI * lat1/180;
    //         var radlat2 = Math.PI * lat2/180;
    //         var theta = lon1-lon2;
    //         var radtheta = Math.PI * theta/180;
    //         var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    //         if (dist > 1) {
    //             dist = 1;
    //         }
    //         dist = Math.acos(dist);
    //         dist = dist * 180/Math.PI;
    //         dist = dist * 60 * 1.1515;
    //         if (unit=="K") { dist = dist * 1.609344 }
    //         if (unit=="N") { dist = dist * 0.8684 }
    //         console.log(dist)
    //         return dist;
    //     }
    // }


    // timing() {
    //     var _ = this;
    //     setTimeout(function () {
    //         _.setState({ isloading: false })
    //     }.bind(this), 4000)
    // }

    trackLocation(deviceid) {
        console.log(deviceid)
        const UserID = Fire.auth().currentUser.uid
        // console.log("UserId")
        var latitude, longitude
        Fire.database().ref("users/" + UserID).child("DevicesRegistered" + "/" + deviceid).once("value").then(function (snapshot) {
            console.log(snapshot.val())
            latitude = snapshot.val().Location.latitude
            longitude = snapshot.val().Location.longitude
        })
        this.setState({
            marker_lat: latitude,
            marker_long: longitude
        })
    }


    render() {
        const { isloading } = this.state;

        return (
            <View style={{ flex: 1 }}>
                {/* {this.map()} */}
                {this.SearchBar()}
                {/* {!isloading && this.ShowMyDevices()} */}

            </View>
        )
    }
}