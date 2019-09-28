import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Styles from './style';
import Fire from '../../config/api';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default class Crimeinfo extends Component {

    constructor(){
        super();

        this.state = {

        }
    }

    static navigationOptions = {
        title : "Crime Detail"
    }

    CrimeInfoForm(){
        // handle with props using try, catch when props is undefined empty textinput box
        var userId = Fire.auth().currentUser.uid;
        Fire.database().ref("users/" + userId)
        return <View style={Styles.formDesign}>
            <Text>Crime Date</Text>
            <TextInput placeholder="Date" style={Styles.DateInput}/>
            <Text>Crime Detail</Text>
            <TextInput placeholder="Detail" style={Styles.DetailInput}/>
            <Text>Upload Some Pics</Text>
        </View>
    }


    render() {
        console.log(this.props.navigation.state.PostBy)
        return (
            <View>
                {this.CrimeInfoForm()}
            </View>
        )
    }
}