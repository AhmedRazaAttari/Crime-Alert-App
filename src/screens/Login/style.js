import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get("screen").width

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    LogoViewStyle: {
        width: 180,
        height: 180,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: 'white',
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    LogoStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    },
    LoginPage: {
        flexDirection: "column",
        flex: 1,
    },
    LoginFirstDiv: {
        width: width,
        height: 260,
        backgroundColor: "#e03448",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    LoginSecondDiv: {
        width: width,
        height: 70,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#313a3b"
    },
    IconViewStyle: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: "#ad7af5",
        alignItems: "center",
        justifyContent: "center"
    },
    LoginThirdDiv: {
        width: width,
        height: 196,
        backgroundColor: "white",
        // padding: 10,
        alignItems: "center",
        justifyContent: "center",
        // overflow : "hidden"
    },
    LoginForthDiv: {
        width: width,
        height: 50,
        backgroundColor: "black",
        position: "absolute",
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    testing: {
        width: width,
        height: 195,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

})