import { View } from "react-native";
import PhoneLayout from "./PhoneLayout";
import PhoneForm from "./PhoneForm";
import PhoneItem from "./PhoneItem";
import PhoneList from "./PhoneList";

export default function PhoneBox(){
    return(
        <View>
            <PhoneLayout />
            {/* <PhoneForm/> */}
            <PhoneList/>
        </View>
    )
    
}