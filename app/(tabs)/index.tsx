import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/ui/Header'
import SearchBar from '@/components/ui/SearchBar'
import axios from 'axios'
import { NewsEntity } from '@/types'

type Props = {}

const Page = (props: Props) => {

  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const { top: safeTop } = useSafeAreaInsets()
  const [breakingNews, setBreakingNews] = useState<NewsEntity[]>([])

  useEffect(() => {
    getBreakingNews()
  }, [])

  const getBreakingNews = async () => {
    try {
      const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=co&language=es&image=1&removeduplicate=1&size=5`
      const response = await axios.get(url)
      if (response && response.data) {
        setBreakingNews(response.data.results)
      }
    } catch (error: any) {
      console.log('Error fetching breaking news', error.message)
    }
  }

  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      {
        breakingNews.map((news: NewsEntity) => (
          <Text key={news.article_id}>{news.title}</Text>
        ))
      }
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})