import {StyleSheet, Dimensions} from 'react-native';
var width = Dimensions.get("screen").width;
var height = Dimensions.get("screen").height;
export default StyleSheet.create({
    SearchBar: {
        width : width - 25,
        height : 60,
        position : "absolute",
        backgroundColor : "white",
        margin : 13,
        marginTop : 20,
        flexDirection : "row",
        justifyContent : "space-around",
        alignItems : "center",
        padding : 10,
    },
    TextINput:{
        width : 240,
        height : 50,
        paddingLeft : 10,
        fontWeight : "bold",
        fontSize : 17
    },
    BtnStyle: {
        width : 220,
        height : 50,
        borderRadius : 10,
        // borderRadius : 100,
        backgroundColor : "black",
        alignItems : "center",
        justifyContent : "center",
        color : "white",
    }
})