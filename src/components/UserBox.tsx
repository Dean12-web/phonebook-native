import { View } from "react-native";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function UserBox(){
    return(
        <View>
            <UserForm/>
            <UserList/>
        </View>
    )
}