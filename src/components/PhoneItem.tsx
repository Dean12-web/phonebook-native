import { faArrowLeft, faFloppyDisk, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { Text, Image, TouchableOpacity, View, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { removeUser, updateUser } from "../actions/phonebooks";
import ImagePicker from 'react-native-image-crop-picker'
import axios from "axios";


export default function PhoneItem({ phonebook, updateAvatar }: { phonebook: any, updateAvatar:any }) {
    const dispatch: any = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState(phonebook.item.name)
    const [phone, setPhone] = useState(phonebook.item.phone)
    const [avatarSource, setAvatarSource] = useState(phonebook.item.avatar
        ? { uri: `http://192.168.1.18:3001/images/${phonebook.item.avatar}` }
        : require('../../public/images/profile.png'));
    const selectImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image)
            setAvatarSource({ uri: image.path })
            uploadImage(image.path)
        }).catch(error => {
            console.log(error)
        })
    }

    const uploadImage = (imagePath: string) =>{
        const formData = new FormData();
        formData.append('avatar',{
            uri:imagePath,
            type:'image/*',
            name:'avatar.jpg'
        });
        axios.put(`http://192.168.1.18:3001/api/phonebooks/${phonebook.id}/avatar`,formData)
            .then(response =>{
                console.log(response)
            })
            .catch(error =>{
                console.log(error)
            })
    }
    return (
        <View style={styles.card}>
            <View style={styles.image}>
                <TouchableOpacity onPress={selectImage} >
                    <Image style={styles.imageCover} source={avatarSource} />
                </TouchableOpacity>
            </View>
            <View style={styles.info}>
                {isEdit ?
                    (
                        <TextInput style={styles.textInput} value={name} onChangeText={value => setName(value)} />
                    ) : <Text style={{ marginBottom: 5 }}>{phonebook.item.name}</Text>}
                {isEdit ?
                    (
                        <TextInput style={styles.textInput} value={phone} onChangeText={value => setPhone(value)} />
                    ) : <Text>{phonebook.item.phone}</Text>}

                {isEdit ? (
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity
                            style={{ marginRight: 10 }}
                            onPress={() => { dispatch(updateUser(phonebook.item.id, name, phone)); setIsEdit(false) }}>
                            <FontAwesomeIcon icon={faFloppyDisk} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setName(phonebook.name); setPhone(phonebook.phone); setIsEdit(false) }}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </TouchableOpacity>
                    </View>
                ) : <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => setIsEdit(true)} style={{ marginRight: 10 }}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(removeUser(phonebook.item.id))}>
                        <FontAwesomeIcon icon={faTrash} />
                    </TouchableOpacity>
                </View>}

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        display: "flex",
        flexDirection: "row",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        borderRadius: 8,
        padding: 10,
        margin: 5,
        backgroundColor: "#ccc"
    },
    image: {
        flexBasis: "20%",
        padding: 10
    },
    info: {
        flexBasis: "70%",
        padding: 10,
        marginLeft: 50,
        marginTop: 10
    },
    imageCover: {
        objectFit: "cover",
        width: 100,
        height: 100,
        borderRadius: 50
    },
    textInput: {
        backgroundColor: "white",
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10
    }
})