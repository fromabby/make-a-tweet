import { SavedTweet, SavedTweets } from '@/types/tweet'
import { StoreApi, UseBoundStore, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

interface UseTweetsStore {
  savedTweets: SavedTweets
  save: (text: string) => void
  removeTweet: (id: string) => void
  clearAll: () => void
  update: (id: string, text: string) => void
}

const useTweetsStore: UseBoundStore<StoreApi<UseTweetsStore>> = create(
  persist((set, get) => ({
    savedTweets: [] as SavedTweets,
    save: (text: string) => {
      const href = `http://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`

      const savedTweets = get().savedTweets

      const item: SavedTweet = {
        id: uuidv4(),
        text,
        href
      }

      const tweets = [...savedTweets, item]
      set({
        savedTweets: tweets
      })
    },
    removeTweet: (id: string) => {
      const savedTweets = get().savedTweets

      const newTweets = savedTweets.filter((item) => item.id !== id)
      
      set({
        savedTweets: newTweets
      })
    },
    clearAll: () => {
      set({
        savedTweets: []
      })
    },
    update: (id: string, text: string) => {
      const savedTweets = get().savedTweets

      const index = savedTweets.findIndex((item) => item.id === id)

      savedTweets[index] = {
        ...savedTweets[index],
        text
      }

      set({
        savedTweets
      })
    }
  }), {
    name: 'tweets'
  })
)

export default useTweetsStore