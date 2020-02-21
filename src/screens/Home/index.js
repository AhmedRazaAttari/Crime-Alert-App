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
import * as BackgroundFetch from 'expo-background-fetch';

import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
const screen = Dimensions.get('window');
import Fire from '../../config/api';

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const latlong = "24.8822179"
import Constants from 'expo-constants';
const Currentdevicename = Constants.deviceName;
const CurrentdeviceId = Constants.deviceId;
const CurrentSessionID = Constants.sessionId;
var itm = [];

BackgroundFetch.setMinimumIntervalAsync(3);
const taskname = "test-Beckground-fetch";
TaskManager.defineTask(taskname, async ({ data, error }) => {
    if (error) {
        console.log("ERROR ==>", error)
        return;
    }
    else if (data) {
        try {
            const { locations } = data;
            console.log("background fetch running", locations);
            const userId = Fire.auth().currentUser.uid;
            Fire.database().ref("users/" + userId).child("DevicesRegistered" + "/" + CurrentdeviceId + "/" + "Location").update({
                latitude: locations[0].coords.latitude,
                longitude: locations[0].coords.longitude
            })
        } catch (error) {
            console.log(error)
        }
    }
    return BackgroundFetch.Result.NewData;
})
console.log("task defined");


// const LOCATION_TASK_NAME = 'background-location-task';
export default class Home extends Component {

    constructor() {
        super();

        this.state = {
            searchLoc: '',
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
            <TextInput placeholder="Search or Enter Place" style={Styles.TextINput} value={this.state.searchLoc} onChangeText={(searchLoc) => { this.setState({ searchLoc }) }} />
            <TouchableOpacity onPress={() => this.searchLoc()}>
                <FontAwesome name="search" size={23} />
            </TouchableOpacity>
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

    async searchLoc() {
        const NR = await Location.geocodeAsync(this.state.searchLoc);
        console.log('LATLOONG***', this.state.searchLoc, NR[0].longitude, NR[0].latitude);
        //  this.setState({latitude:NR[0].latitude,longitude:NR[0].longitude,searchLoc:''})
        this.setState({ marker_long: NR[0].longitude, marker_lat: NR[0].latitude })
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
            PostBy: userId
        })
        Fire.database().ref("users/" + userId).child("MyReportedCrimes" + "/" + newPostKey).set({
            Location: {
                latitude: this.state.marker_lat,
                longitude: this.state.marker_long
            },
            Date: new Date().toUTCString()
        }).then(() => {
            Fire.database().ref("users").once("value").then(function (snapshot) {
                // console.log(snapshot.val())
                let items = [];
                snapshot.forEach(function (anotherSnapshot) {
                    // console.log(anotherSnapshot.val())
                    anotherSnapshot.child("DevicesRegistered").forEach(function (lastSnapshot) {
                        // console.log(lastSnapshot.val())
                        var CurrentExpoToken;
                        Fire.database().ref("users/" + userId).child("DevicesRegistered").once("value").then(function (data) {
                            data.forEach(function (finalData) {
                                CurrentExpoToken = finalData.val().DeviceToken
                            })
                        }).then(() => {
                            if (lastSnapshot.val().DeviceToken !== CurrentExpoToken) {
                                items.push({
                                    deviceid: lastSnapshot.val().DeviceToken,
                                })
                                itm = items
                                fetch('https://exp.host/--/api/v2/push/send', {
                                    body: JSON.stringify({
                                        to: lastSnapshot.val().DeviceToken,
                                        title: "Alert",
                                        body: "Warned!! Crime Happend near you...",
                                        data: { message: `${"title"} - ${"Hello"}` },
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    method: 'POST',
                                });
                            }
                        })

                    })
                })

            })

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
            style={{ flex: 1 }
            }

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
            {
                !this.state.isloading && this.state.markers.map((items, i) => {
                    return <Marker
                        onPress={() => this.props.navigation.navigate("CrimeInfo", { PostBy: items.PostBy })}
                        key={i}
                        tracksViewChanges={true}
                        // 
                        pinColor="red"
                        ref={marker => {
                            this.marker = marker;
                        }}
                        icon={<Image source={{ uri : Fire.auth().currentUser.photoURL}} width="160" />}
                        coordinate={{
                            latitude: items.Location.latitude,
                            longitude: items.Location.longitude
                        }}
                    />
                })
            }

        </MapView >
    }

    async componentDidMount() {
        var _ = this;
        let location = await Location.getCurrentPositionAsync({});
        // console.log('location****', location)
        this.setState({ location });

        this.registerTaskAsync();

        Location.watchPositionAsync({ timeInterval: 1000, distanceInterval: 0.1 }, loc => {
            // console.log('watching***', loc);
            this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude })
        })

        await Location.startLocationUpdatesAsync(taskname, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 1000,
            distanceInterval: 0.1
        });

        // var foursquare = require('react-native-foursquare-api')({
        //     clientID: 'WYQ1CBVLKVCMDNAYBDVZYA5QTKFLIGQR5U0PPVFLPQMEYC33',
        //     clientSecret: 'P34I1F4L5JUJS1W4OJRGE2FVFVL5WBL0M4C4S3OYMEHFGDHA',
        //     style: 'foursquare', // default: 'foursquare'
        //     version: '20140806' //  default: '20140806'
        //   });

        //   // see respective api documentation for list of params you could pass
        //   var params = {
        //       "ll": this.state.marker_lat + "," + this.state.marker_long,
        //     // "query": 'Movie Towne'
        //   };

        //   foursquare.venues.getVenues(params)
        //         .then(function(venues) {
        //               console.log("DATA FROM FOURSQUAREAPI" , venues);
        //           })
        //         .catch(function(err){
        //           console.log("ERROR FROM FOURSQUAREAPI", err);
        //         });

        // await BackgroundFetch.registerTaskAsync("BACKGROUND_FETCH", {
        //     minimumInterval: 5000,
        // }).then(() => {
        //     const check = TaskManager.isTaskRegisteredAsync("BACKGROUND_FETCH")
        //     console.log(check)
        // })
        // console.log(BackgroundFetch.Result.NoData)
        // // cosole.log(check)

        // const status = await BackgroundFetch.getStatusAsync();
        // console.log(status)
        // await BackgroundFetch.setMinimumIntervalAsync(1000)

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
            // console.log("UPDATED STATE ==>", this.state)
        })

    }


    registerTaskAsync = async () => {
        await BackgroundFetch.registerTaskAsync(taskname);
        console.log('task registered');
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


// TaskManager.defineTask(taskname, ({ data, error }) => {
//     if (error) {
//         console.log("ERROR ==>", error)
//         return;
//     }
//     if (data) {
//         try {
//             const { locations } = data;
//             // console.log("LOCATIONS ==>", locations[0].coords)
//             const userId = Fire.auth().currentUser.uid;
//             Fire.database().ref("users/" + userId).child("DevicesRegistered" + "/" + CurrentdeviceId + "/" + "Location").update({
//                 latitude: locations[0].coords.latitude,
//                 longitude: locations[0].coords.longitude
//             })
//         } catch (error) {
//             console.log(error)
//         }

//     }
// });
