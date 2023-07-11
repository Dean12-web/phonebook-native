import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { addStudent } from "../actions/users";

export default function UserForm() {
    const dispatch:any = useDispatch()
    const [student, setStudent] = useState({ email: '', password: '' })
    const submit = () => {
        dispatch(addStudent(student.email, student.password))
        setStudent({ email: '', password: '' })
    }
    return (
        <View> 
            <TextInput
                style={{ padding: 40 }}
                placeholder="email"
                onChangeText={value => setStudent({...student, email:value})}
            />
            <TextInput
                style={{ padding: 40 }}
                placeholder="password"
                secureTextEntry={true }
                onChangeText={value => setStudent({...student, password :value})}
            />
            <TouchableOpacity onPress={submit}>
                <Text>Simpan</Text>
            </TouchableOpacity>
        </View>
    )
}