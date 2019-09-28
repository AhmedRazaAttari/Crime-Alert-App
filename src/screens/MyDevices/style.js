import { StyleSheet, Dimensions } from 'react-native';
const screen = Dimensions.get("screen");

export default StyleSheet.create({
    ShowDevices: {
        position: "absolute",
        height: 80,
        // backgroundColor: "white",
        padding : 10,
        width : screen.width,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center"
    }
})