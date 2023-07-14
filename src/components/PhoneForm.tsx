import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addUser } from "../actions/phonebooks";
export default function PhoneForm({navigation}:{navigation:any}) {
    const dispatch: any = useDispatch()
    const [user, setUser] = useState({ name: "", phone: "" })
    const submit = () => {
        dispatch(addUser(user.name, user.phone))
        setUser({ name: "", phone: "" })
    }
    return (
        <View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={value => setUser({...user, name: value})}
                    value={user.name}
                />
            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    onChangeText={value => setUser({...user, phone:value})}
                    value={user.phone}
                />
            </View>
            <View>
                <TouchableOpacity onPress={submit} style={styles.buttonGreen}>
                    <Text style={{ textAlign: "center", color: "white" }}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonYellow}>
                    <Text style={{ textAlign: "center", color: "white" }}>Cancel</Text>
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
    buttonGreen: {
        backgroundColor: "#04AA6D",
        color: "white",
        padding: 14,
        margin: 8
    },
    buttonYellow: {
        backgroundColor: "#ffc107",
        color: "white",
        padding: 14,
        margin: 8
    },
});