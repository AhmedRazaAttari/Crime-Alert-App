import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Login extends React.Component {

    constructor() {
        super();

        this.state = {
            
        }
    }

    static navigationOptions = {
        header: null,
    }


    render() {
        return (
            <View style={{backgroundColor : "black"}}>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
