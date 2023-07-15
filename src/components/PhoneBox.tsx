import { View } from "react-native";
import PhoneLayout from "./PhoneLayout";
import PhoneList from "./PhoneList";

export default function PhoneBox({navigation}:{navigation:any}){
    return(
        <View>
            <PhoneLayout navigation={navigation} />
            <PhoneList/>
        </View>
    )
    
}