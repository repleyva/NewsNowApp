import { Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

const platformIos = Platform.OS === 'ios'

type Props = {}

const SearchBar = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} style={styles.searchIcon} />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor={Colors.lightGrey}
                    style={styles.searchText}
                    autoCapitalize='none'
                />
            </View>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    searchIcon: {
        color: Colors.lightGrey,
        marginStart: platformIos ? 0 : 10,
    },
    searchBar: {
        backgroundColor: '#E4E4E4',
        paddingHorizontal: platformIos ? 10 : 0,
        paddingVertical: platformIos ? 12 : 0,
        borderRadius: 10,
        flexDirection: 'row',
        gap: platformIos ? 10 : 5,
        alignItems: 'center',
    },
    searchText: {
        color: Colors.darkGrey,
        flex: 1,
        fontSize: 14,
    },
})