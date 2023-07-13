import { useEffect, useRef, useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PhoneItem from "./PhoneItem";
import { fetchData, resetParams, updateParams } from "../actions/phonebooks";

export default function PhoneList() {
    const phonebooks = useSelector((state: any) => state.phonebooks);
    const pagination = useSelector((state: any) => state.pagination);
    const dispatch: any = useDispatch();
    const flatListRef = useRef<FlatList | null>(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch, pagination.page, pagination.sortBy, pagination.sortMode, refresh]);

    const handleEndReached = () => {
        if (pagination.page < pagination.totalPage) {
            dispatch(updateParams({ page: pagination.page + 1 }));
        } else {
            setRefresh(true);
        }
    };

    const handleRefresh = () => {
        dispatch(resetParams());
        setRefresh(false);
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const filteredPhonebooks = phonebooks.filter((item: any) => {
        const searchQuery = pagination.searchQuery.toLowerCase();
        return (
            item.name.toLowerCase().includes(searchQuery) ||
            item.phone.toLowerCase().includes(searchQuery)
        );
    });

    const sortedPhonebooks = [...filteredPhonebooks].sort((a, b) => {
        if (pagination.sortMode === "asc") {
            return a[pagination.sortBy].localeCompare(b[pagination.sortBy]);
        } else {
            return b[pagination.sortBy].localeCompare(a[pagination.sortBy]);
        }
    });

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={sortedPhonebooks}
                keyExtractor={(item) => item.id}
                renderItem={(item) => <PhoneItem phonebook={item} />}
                style={{ maxHeight: 700 }}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
            />
            <Button color={"#a57722"} title="Refresh" onPress={handleRefresh} />
        </View>
    );
}
