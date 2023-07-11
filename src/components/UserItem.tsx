import { useState } from "react"
import { useDispatch } from "react-redux"
import { removeStudent, updateStudent,resendStudent  } from "../actions/users"
import { TextInput, TouchableOpacity, View } from "react-native"

export default function UserItem({ no, student }: { no: number, student: any }) {
    const dispatch = useDispatch()

    const [isEdit, setIsEdit] = useState(false)

    const [email, setEmail] = useState(student.email)

    return (
        <View>
            <View>{no}</View>
            <View>{isEdit ?
                (
                    <TextInput value={email} onChangeText={value => setEmail(value)} />
                ) : student.email
            }</View>
            {student.sent ? isEdit ? (
                <View>
                    <TouchableOpacity onPress={() => { updateStudent(student._id, email); setIsEdit(false) }}>Save</TouchableOpacity>&nbsp;
                    <TouchableOpacity onPress={() => { setIsEdit(false); setEmail(student.email) }}>Cancel</TouchableOpacity>&nbsp;
                </View>
            ) : (
                <View>
                    <TouchableOpacity onPress={() => setIsEdit(true)}>Edit</TouchableOpacity>&nbsp;
                    <TouchableOpacity onPress={() => removeStudent(student._id)}>Delete</TouchableOpacity>
                </View>
            ) : (
                <View>
                    <TouchableOpacity onPress={() => resendStudent()}>resend</TouchableOpacity>&nbsp;
                </View>
            )
            }
        </View>
    )
}