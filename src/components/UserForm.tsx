import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { addStudent } from "../actions/users";

export default function UserForm() {
    const dispatch: any = useDispatch()
    const [student, setStudent] = useState({ email: '', password: '' })
    const submit = () => {
        dispatch(addStudent(student.email, student.password))
        setStudent({ email: '', password: '' })
    }
    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder="email"
                onChangeText={value => setStudent({ ...student, email: value })}
                value={student.email}
            />
            <TextInput
                style={styles.input}
                placeholder="password"
                secureTextEntry={true}
                onChangeText={value => setStudent({ ...student, password: value })}
                value={student.password}
            />
            <TouchableOpacity onPress={submit} style={styles.button}>
                <Text style={{ textAlign:"center", color:"#fff" }}>Simpan</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: "#fff",
        padding: 12,
        margin: 8,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue'
    },
    button: {
        backgroundColor: "#04AA6D",
        color: "white",
        padding: 14,
        margin: 8
    }
})