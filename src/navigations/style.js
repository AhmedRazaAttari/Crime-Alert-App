import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default StyleSheet.create({
    sidebar: {
        height: height,
        width: width - 30,
        backgroundColor: "black",
        justifyContent : "center",
        alignItems : "center",
        padding : 15,
        flexDirection : "column",
    },
    ProfilePic: {
        width : 100,
        height: 100,
        borderRadius : 100,
    }

})