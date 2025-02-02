import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: Dimensions.get("window").height,
        // height: "100%",
        backgroundColor: "rgba(24, 24, 24, 1)",
    },
    video: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    uiContainer: {
        height: "100%",
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    bottomContainer: {
        padding : 30,
        justifyContent: "flex-end"
    },
    handle: {
        color: "rgb(155, 31, 31)",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 5,
    },
    description: {
        color: "rgb(155, 31, 31)",
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 5,
    },
    songRow: {
        flexDirection: "row",
        alignItems: "center",
        color: "red",
    },
    songName: {
        color: "rgb(155, 31, 31)",
        fontSize: 16,
        fontWeight: "700",
    },
    rightContainer: {
        alignSelf: "flex-end",
        position: "absolute",
        justifyContent: "space-between",
        alignItems: "center",
        height: "17%",
        padding: 15,
        bottom: 20,
    },
    profilePic: {
        width: 30,
        height: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "white",
        bottom: 5,
        right: 10,
        paddingLeft: 40,
    },
    heart:{
        color: "red",
    },
    profilePic: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "white",
    },
    share: {
        color: "green",
        margin: 1,
    },

});

export default styles;


