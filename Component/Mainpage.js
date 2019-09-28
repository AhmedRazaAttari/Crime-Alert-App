import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class MainPage extends React.Component {

    constructor() {
        super();

        this.state = {
            render: false,
            HomePage: true,
        }
    }

    static navigationOptions = {
        header: null,
    }

    componentDidMount() {

        setTimeout(function () {
            this.setState({ render: true })
        }.bind(this), 4000)
        // fire.auth().onAuthStateChanged((user) => {
        //     if (user != null) {
        //         // console.log(user.uid)
        //         this.props.navigation.push('Home')
        //     }
        //     else {
        //     }
        // });
    }

    HomePage() {
        return <View>
            <Text>Hello world</Text>
            {/* <Image source={Icon} style={{ width: 130, height: 130 }} /> */}
        </View>
    }

    whatRender() {
        const { render } = this.state;
        return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {!render && this.HomePage()}
            {render && <Text>NOT</Text>}
        </View>
    }

    render() {
        return (
            <View style={{backgroundColor : "black"}}>
                {this.whatRender()}
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
