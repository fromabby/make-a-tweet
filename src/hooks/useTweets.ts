import { SavedTweet, SavedTweets } from '@/types/tweet'
import { useState, useEffect } from 'react'

interface UseTweetReturn {
  savedTweets: SavedTweets
  save: (text: string) => void
}

const useTweets = (): UseTweetReturn => {
  const [savedTweets, setSavedTweets] = useState<SavedTweets>([])

  const saveToLocalStorage = (text: string) => {
    const href = `http://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`

    const rawTweets = localStorage.getItem('TWEETS')
    const savedTweets: SavedTweets = rawTweets ? JSON.parse(rawTweets) : []

    const item: SavedTweet = {
      text,
      href
    }

    const tweets = [...savedTweets, item]
    localStorage.setItem('TWEETS', JSON.stringify(tweets))

    setSavedTweets(tweets)
  }

  useEffect(() => {
    const rawTweets = localStorage.getItem('TWEETS')
    const savedTweets: SavedTweets = rawTweets ? JSON.parse(rawTweets) : []
    setSavedTweets(savedTweets)
  }, [])
  
  return { 
    savedTweets,
    save: saveToLocalStorage
  }
}

export default useTweets
