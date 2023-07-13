import { faArrowDownAZ, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function PhoneLayout() {
    return (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
                <TouchableOpacity style={styles.buttonBrown}>
                    <FontAwesomeIcon icon={faArrowDownAZ} />
                </TouchableOpacity>
            </View>
            <View style={{ width: "65%", height: "88%" }}>
                <TextInput style={styles.input} placeholder="Search..." />
            </View>
            <View>
                <TouchableOpacity  style={styles.buttonBrown}>
                    <FontAwesomeIcon icon={faUserPlus} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        padding: 12,
        margin: 8,
        borderWidth: 1,
        borderStyle: 'solid'
    },
    buttonBrown: {
        backgroundColor: "#a57722",
        color: "white",
        padding: 14,
        margin: 8
    }
});