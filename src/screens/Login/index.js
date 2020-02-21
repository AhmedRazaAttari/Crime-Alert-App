import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StatusBar, Image, ScrollView, Dimensions } from 'react-native';
import Styles from './style';
import Logo from '../../assets/images/download.png';
import First from '../../assets/images/first.png'
import Second from '../../assets/images/second.png'
import * as Font from 'expo-font';

import { Ionicons, Entypo, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const width = Dimensions.get("screen").width;

import * as firebase from 'firebase';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import * as Facebook from 'expo-facebook';
import config from '../../config/api';
import Constants from 'expo-constants';

const Currentdevicename = Constants.deviceName;
const CurrentdeviceId = Constants.deviceId;
const CurrentSessionID = Constants.sessionId;

import { Notifications } from 'expo';
const screen = Dimensions.get('window');

import MapView, {
    Marker,
    AnimatedRegion,
} from 'react-native-maps';


const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 24.8822179;
const LONGITUDE = 67.0652013;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class login extends Component {

    constructor() {
        super();

        this.state = {
            isload: false,
            marker_lat: LATITUDE,
            marker_long: LONGITUDE,
            coordinate: new AnimatedRegion({
                latitude: LATITUDE,
                longitude: LONGITUDE,
            }),
            hasPermission: null
        }

        this.loginWithFacebook = this.loginWithFacebook.bind(this)
    }

    static navigationOptions = {
        header: null,
    }

    async componentDidMount() {
        if (this.state.hasPermission == null) {
            const { status } = await Permissions.askAsync(Permissions.LOCATION, Permissions.NOTIFICATIONS);
            this.setState({ hasPermission: status === 'granted' });
        }
        // await Location.requestPermissionsAsync()

        // const { status } = await Permissions.askAsync(Permissions.LOCATION);
        // let finalStatus = status;

        // if (status !== "granted") {
        //     const { status } = await Permissions.askAsync(Permissions.LOCATION);
        //     finalStatus = status;
        // }

        // if (finalStatus !== "granted") {
        //     return;
        // }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });

        Location.watchPositionAsync({ timeInterval: 1000, distanceInterval: 0.1 }, loc => {
            this.setState({ marker_long: loc.coords.longitude, marker_lat: loc.coords.latitude })
        })

        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                this.props.navigation.push('Drawer')
            }
            else {
                console.log("no user signin");
            }
        });

        try {
            await Font.loadAsync({
                'segan-light': require('../../assets/fonts/Segan-Light.ttf'),
                'workSans-light': require('../../assets/fonts/WorkSans-Light.ttf'),
            });
            this.setState({
                isload: true,
            })
        } catch (error) {
            console.log(error)
        }
    }


    async loginWithFacebook() {
        //ENTER YOUR APP ID 
        const { type, token } = await Facebook.logInWithReadPermissionsAsync('1376675659149699', { permissions: ['public_profile'] })
        if (type === 'success') {
            // Build Firebase credential with the Facebook access token.
            const credential = firebase.auth.FacebookAuthProvider.credential(token);

            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const res = await response.json();
            // console.log('res==>', res);
            var _ = this;
            // Sign in with credential from the Facebook user.
            await Notifications.getExpoPushTokenAsync().then(res => {
                // console.log("RES", res)
                const CurrentExpoToken = res;
                // console.log("REJ", rej)

                config.auth().signInWithCredential(credential).then((user) => {

                    config.database().ref("users/" + user.user.uid).once("value", function (snapshot) {
                        if (snapshot.exists()) {

                        }
                        else {

                        }
                    })
                    config.database().ref("users/" + user.user.uid).set({
                        Username: user.user.displayName,
                        Profile: user.user.photoURL,
                        Email: user.user.email,
                        
                    })

                }).then(() => {
                    var newPostKey = config.database().ref().child('posts').push().key;
                    var userID = config.auth().currentUser.uid
                    config.database().ref("users/" + userID).child("DevicesRegistered" + "/" + CurrentdeviceId).set({
                        deviceId: CurrentdeviceId,
                        devicename: Currentdevicename,
                        DeviceToken: CurrentExpoToken,
                        sessionId: CurrentSessionID,
                        Location: {
                            latitude: _.state.marker_lat,
                            longitude: _.state.marker_long
                        }
                    })
                        .then((success) => {
                            this.props.navigation.push('Drawer')
                        })

                })
                    .catch((error) => {
                        console.log(error)
                    });

            });
        }
    }

    loginForm() {
        return <View style={Styles.LoginPage}>
            <View style={Styles.LoginFirstDiv}>
                <View style={Styles.LogoViewStyle}>
                    <Image source={Logo} style={Styles.LogoStyle} />
                </View>
                <Text style={{ fontSize: 29, color: "white", fontFamily: 'workSans-light' }}>Login</Text>
            </View>
            <View style={Styles.LoginSecondDiv}>
                <Text style={{ fontSize: 25, fontFamily: "workSans-light", color: "white" }}>Login With</Text>
                <View style={{ width: 160, flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={this.loginWithFacebook}>
                        <View style={Styles.IconViewStyle}>
                            <Text style={{ color: "white" }}><MaterialCommunityIcons name="facebook" size={26} /></Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[Styles.IconViewStyle, { backgroundColor: "black", opacity: 0.6 }]}>
                        <Text style={{ color: "white" }}><Entypo name="500px" size={26} /></Text>
                    </View>
                    <TouchableOpacity>
                        <View style={[Styles.IconViewStyle, { backgroundColor: "#3078c9" }]}>
                            <Text style={{ color: "white" }}><FontAwesome name="google" size={26} /></Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView horizontal={true} pagingEnabled={true} contentContainerStyle={{ marginTop: 7 }}>
                <View style={[Styles.LoginThirdDiv, { padding: 10 }]}>
                    <Text style={{ fontSize: 17, fontFamily: "workSans-light", textAlign: "center" }}>crime alert system works through a combination of technology and human efforts. It spends 24 hours a day scanning hundreds of public-safety radio frequencies in areas.This App also provides detailed updates as an event happens, and even lets people share information through live videos or comments.</Text>
                </View>
                <View style={Styles.LoginThirdDiv}>
                    <Image source={First} width={width} height={192} />
                </View>
                <View style={Styles.LoginThirdDiv}>
                    <Image source={Second} width={width} height={192} />
                </View>
            </ScrollView>
            <View style={Styles.LoginForthDiv}>
                <Text style={{ fontSize: 21, fontFamily: "workSans-light", color: "white" }}>@ Say No To Crime</Text>
            </View>
        </View>
    }


    render() {
        const { isload } = this.state;
        return (
            <View style={Styles.container}>
                <StatusBar hidden={true} backgroundColor="#772ea2" barStyle="light-content" />
                <View>
                    {isload && this.loginForm()}
                </View>
            </View>
        )
    }
}