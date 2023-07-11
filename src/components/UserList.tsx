import { FlatList, StyleSheet, View } from "react-native"
import UserItem from "./UserItem"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { loadStudent } from "../actions/users"
export default function UserList() {
    const students = useSelector((state: any) => state.users)
    const dispatch: any = useDispatch()
    useEffect(() => {
        dispatch(loadStudent())
    }, [dispatch])
    return (
        // For Looping Data use FlatList 
        <View style={styles.container}>
            <FlatList
                data={students}
                keyExtractor={item => item._id} 
                renderItem={({ item, index }) => <UserItem no={index + 1} student={item} />}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    }
});  