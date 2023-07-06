import { SavedTweet, SavedTweets } from '@/types/tweet'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface UseTweetReturn {
  savedTweets: SavedTweets
  save: (text: string) => void
  removeTweet: (id: string) => void
  clearAll: () => void
}

const KEY = 'TWEETS'

const getTweetsFromLocalStorage = (): SavedTweets => {
  const rawTweets = localStorage.getItem(KEY)
  const savedTweets: SavedTweets = rawTweets ? JSON.parse(rawTweets) : []

  return savedTweets
}

const useLocalStorageTweets = (): UseTweetReturn => {
  const [savedTweets, setSavedTweets] = useState<SavedTweets>([])
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    setSavedTweets(getTweetsFromLocalStorage())
  }, [])

  useEffect(() => {
    if (refetch) {
      setSavedTweets(getTweetsFromLocalStorage())
      setRefetch(false)
    }
  }, [refetch])

  const saveToLocalStorage = (text: string) => {
    const href = `http://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`

    const savedTweets = getTweetsFromLocalStorage()

    const item: SavedTweet = {
      id: uuidv4(),
      text,
      href
    }

    const tweets = [...savedTweets, item]
    localStorage.setItem(KEY, JSON.stringify(tweets))

    setRefetch(true)
  }

  const removeFromLocalStorage = (id: string) => {
    const savedTweets = getTweetsFromLocalStorage()

    const newTweets = savedTweets.filter((item) => item.id !== id)
    
    localStorage.setItem(KEY, JSON.stringify(newTweets))
    setRefetch(true)
  }

  const clearLocalStorage = () => {
    localStorage.setItem(KEY, "")
    setRefetch(true)
  }

  return { 
    savedTweets,
    save: saveToLocalStorage,
    removeTweet: removeFromLocalStorage,
    clearAll: clearLocalStorage
  } as const
}

export default useLocalStorageTweets
