import { useEffect, useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PhoneItem from "./PhoneItem";
import { fetchData, updateParams } from "../actions/phonebooks";

export default function PhoneList() {
    const phonebooks = useSelector((state: any) => state.phonebooks);
    const pagination = useSelector((state: any) => state.pagination);
    const dispatch: any = useDispatch();
    const flatListRef = useRef<FlatList | null>(null);
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch, pagination.page]);
    console.log("ini page",pagination.page)
    console.log("ini TotalPage",pagination.totalPage)
    const handleEndReached = () => {
        if (pagination.page < pagination.totalPage) {
            dispatch(updateParams({ page: pagination.page + 1 }));
        }
    };
    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={phonebooks}
                keyExtractor={(item) => item.id}
                renderItem={(item) => <PhoneItem phonebook={item} />}
                style={{ maxHeight: 750 }}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}
