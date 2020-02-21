import { StyleSheet, Dimensions } from 'react-native';
const screen = Dimensions.get("screen");

export default StyleSheet.create({
    ShowDevices: {
        position: "absolute",
        height: 80,
        // backgroundColor: "white",
        padding : 5,
        width : screen.width,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center"
    },
    SearchBar: {
        width : screen.width,
        height : 60,
        position : "absolute",
        backgroundColor : "white",
        
        // marginTop : 20,
        flexDirection : "row",
        // justifyContent : "space-around",
        alignItems : "center",
        padding : 15,
        elevation : 3
        // backgroundColor : "grey"
    },
})