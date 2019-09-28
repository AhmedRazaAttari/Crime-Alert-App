import { StyleSheet, Dimensions } from 'react-native';
const screen = Dimensions.get("screen");

export default StyleSheet.create({
    formDesign: {
        width: screen.width,
        height: screen.height,
        // backgroundColor: "white",
        // borderWidth: 2,
        padding: 10,
        // justifyContent : "center",
        alignItems : "center",
    },
    DateInput: {
        marginTop : 10,
        height: 50,
        width : screen.width - 70,
        borderWidth : 2,
        paddingLeft : 20,
        color : "black",
        marginBottom : 30,
    },
    DetailInput: {
        height : 90,
        width : screen.width - 70,
        borderWidth : 2,
        padding : 10,
        paddingLeft : 20,
        color : "black", marginBottom : 30
    }
})