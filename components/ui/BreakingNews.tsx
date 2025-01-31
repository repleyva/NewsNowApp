import { Colors } from '@/constants/Colors'
import { NewsEntity } from '@/types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SliderItem from './SliderItem'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

type Props = {
    newsList: Array<NewsEntity>
}

const BreakingNews = ({ newsList }: Props) => {

    const [data, setData] = React.useState(newsList)
    const [paginationIndex, setPaginationIndex] = React.useState(0)
    const scrollX = useSharedValue(0)
    const reference = useAnimatedRef<Animated.FlatList<any>>()

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breaking News</Text>
            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    ref={reference}
                    data={data}
                    keyExtractor={(_, index) => `list_item${index}`}
                    renderItem={({ item, index }) => (
                        <SliderItem slideItem={item} index={index} scrollX={scrollX} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16} 
                    onEndReachedThreshold={0.5}
                    onEndReached={() => setData([...data, ...newsList])}/>
            </View>
        </View>
    )
}

export default BreakingNews

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    slideWrapper: {
        justifyContent: 'center',
    }
})