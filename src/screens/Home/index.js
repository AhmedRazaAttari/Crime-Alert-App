import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, TextInput, Image, Alert, ToastAndroid } from 'react-native';
import Styles from './style';
import * as Permissions from 'expo-permissions';
import MapView, {
    Marker,
    AnimatedRegion,
} from 'react-native-maps';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
const screen = Dimensions.get('window');
import Fire from '../../config/api';

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

import Constants from 'expo-constants';
const Currentdevicename = Constants.deviceName;
const CurrentdeviceId = Constants.deviceId;
const CurrentSessionID = Constants.sessionId;

// const LOCATION_TASK_NAME = 'background-location-task';
export default class Home extends Component {

    constructor() {
        super();

        this.state = {
            isloading: true,
            marker_lat: LATITUDE,
            marker_long: LONGITUDE,
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
            }),
            markers: [
               
            ]
        }
    }

    SearchBar() {
        return <View style={Styles.SearchBar}>
            <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                <MaterialIcons name="view-headline" size={28} />
            </TouchableOpacity>
            <TextInput placeholder="Search or Enter Place" style={Styles.TextINput} />
            <FontAwesome name="search" size={23} />
        </View>
    }


    btn() {
        return <View style={{ position: "absolute", bottom: 20, left: 70 }}>
            <TouchableOpacity onPress={() => ToastAndroid.show("Press this button a long", 2)} onLongPress={() => this.Robbed()}>
                <View style={Styles.BtnStyle}>
                    <Text style={{ color: "white" }}>Robbed!</Text>
                </View>
            </TouchableOpacity>
        </View>
    }

    Robbed() {
        var newPostKey = Fire.database().ref().child('posts').push().key;
        const userId = Fire.auth().currentUser.uid;
        Fire.database().ref("AllCrimes/" + "/" + newPostKey).set({
            Location: {
                latitude: this.state.marker_lat,
                longitude: this.state.marker_long
            },
            Date: new Date().toUTCString(),
            PostBy : userId
        })
        Alert.alert(
            'Alert',
            'If you want to put some detail now??',
            [
                { text: 'NOW', onPress: () => this.props.navigation.navigate("CrimeInfo") },
                { text: 'LATER' },
            ],
            { cancelable: false }
        );
    }

    HomePage() {
        var photo = Fire.auth().currentUser.photoURL
        return <MapView
            followsUserLocation={true}
            showsMyLocationButton={true}
            zoomEnabled={true}
            style={{ flex: 1 }}

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
                coordinate={{
                    latitude: this.state.marker_lat,
                    longitude: this.state.marker_long
                }}
            />
            {!this.state.isloading && this.state.markers.map((items, i) => {
                return <Marker
                onPress={() => this.props.navigation.navigate("CrimeInfo", {PostBy : items.PostBy})}
                    key={i}
                    tracksViewChanges={true}
                    // 
                    pinColor="red"
                    ref={marker => {
                        this.marker = marker;
                    }}
                    coordinate={{
                        latitude: items.Location.latitude,
                        longitude: items.Location.longitude
                    }}
                />
            })}

        </MapView>
    }

    async componentDidMount() {
        var _ = this;
        let location = await Location.getCurrentPositionAsync({});
        // console.log('location****', location)
        this.setState({ location });

        Location.watchPositionAsync({ timeInterval: 1000, distanceInterval: 0.1 }, loc => {
            console.log('watching***', loc);
            this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude })
        })

        await Location.startLocationUpdatesAsync("LOCATION_TASK_NAME", {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 1000,
            distanceInterval: 0.1
        });

        Fire.database().ref("AllCrimes").once("value", function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                childSnapshot.forEach(function (anotherSnapshot) {
                    var newData = childSnapshot.val()
                    _.setState(prevState => ({
                        markers: [...prevState.markers, newData]
                    }))
                })
            })
        }).then(() => {
            _.setState({
                isloading: false,
            })
            console.log("UPDATED STATE ==>", this.state)
        })

        fetch("https://places.cit.api.here.com/places/v1/autosuggest?at=40.74917,-73.98529&q=chrysler&app_id=afJ2lI4imWasij3kElXS&app_code=mgY8vlbNXTpjJeks6pFhF0jw0VzUX2MZGCwg1K6UTIs")
            .then(res => res.json())
            .then(response => console.log(response))

    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <Navigate /> */}
                {this.HomePage()}
                {this.SearchBar()}
                {this.btn()}
            </View>
        )
    }
}

TaskManager.defineTask("LOCATION_TASK_NAME", ({ data, error }) => {
    if (error) {
        console.log("ERROR ==>", error)
        return;
    }
    if (data) {
        try {
            const { locations } = data;
            console.log("LOCATIONS ==>", locations[0].coords)
            const userId = Fire.auth().currentUser.uid;
            Fire.database().ref("users/" + userId).child("DevicesRegistered" + "/" + CurrentdeviceId + "/" + "Location").update({
                latitude: locations[0].coords.latitude,
                longitude: locations[0].coords.longitude
            })
        } catch (error) {
            console.log(error)
        }

    }
});
