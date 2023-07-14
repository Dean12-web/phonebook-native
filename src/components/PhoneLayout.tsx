import { faArrowDownAZ, faArrowDownZA, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateParams } from "../actions/phonebooks";


export default function PhoneLayout() {
    const dispatch: any = useDispatch()
    const { sortBy, sortMode } = useSelector((state: any) => state.pagination)
    const handleSearch = (value: any) => {
        dispatch(updateParams({ searchQuery: value }))
        dispatch(fetchData())
    }
    const handleSort = () => {
        const newSortMode = sortBy === 'name' && sortMode === 'desc' ? 'asc' : 'desc'
        dispatch(updateParams({ sortBy: 'name', sortMode: newSortMode }))
        dispatch(fetchData())
    }
    return (
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View>
                <TouchableOpacity onPress={handleSort} style={styles.buttonBrown}>
                    {sortMode === "desc" ? (
                        <FontAwesomeIcon icon={faArrowDownAZ} />
                    ) : (
                        <FontAwesomeIcon icon={faArrowDownZA} />
                    )}
                </TouchableOpacity>
            </View>
            <View style={{ width: "65%", height: "88%" }}>
                <TextInput onChangeText={handleSearch} style={styles.input} placeholder="Search..." />
            </View>
            <View>
                <TouchableOpacity style={styles.buttonBrown}>
                    <FontAwesomeIcon icon={faUserPlus} />
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
    buttonBrown: {
        backgroundColor: "#a57722",
        color: "white",
        padding: 14,
        margin: 8
    }
});