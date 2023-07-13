import { useState } from "react"
import { useDispatch } from "react-redux"
import { removeStudent, updateStudent, resendStudent } from "../actions/users"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

export default function UserItem({ no, student }: { no: number, student: any }) {
    const dispatch:any = useDispatch()

    const [isEdit, setIsEdit] = useState(false)

    const [email, setEmail] = useState(student.email)
    return (
        <View style={styles.item}>
            <View><Text>{no}</Text></View>
            <View>{isEdit ?
                (
                    <TextInput value={email} onChangeText={value => setEmail(value)} />
                ) : <Text>{student.email}</Text>
            }</View>
            {student.sent ? isEdit ? (
                <View>
                    <TouchableOpacity onPress={() => { updateStudent(student._id, email); setIsEdit(false) }}><Text>Save</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => { setIsEdit(false); setEmail(student.email) }}><Text>Cancel</Text></TouchableOpacity>
                </View>
            ) : (
                <View>
                    <TouchableOpacity onPress={() => setIsEdit(true)}><Text>Edit</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(removeStudent(student._id))}><Text>Delete</Text></TouchableOpacity>
                </View>
            ) : (
                <View>
                    <TouchableOpacity onPress={() => resendStudent()}><Text>resend</Text></TouchableOpacity>
                </View>
            )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        display: "flex",
        fontWeight:"bold",
        backgroundColor: "#fff",
        margin: 10,
        padding: 5,
        borderRadius: 3,
        flexDirection: "row",
        justifyContent: "space-between"

    }
})