'use client'

import Section from '@/components/Section'
import TweetItem from './TweetItem'
import useTweets from '@/hooks/useTweets'
// import useTweets from '@/hooks/useLocalStorageTweets'

const TweetList = () => {
  const { savedTweets, clearAll } = useTweets()

  return (
    <Section className='flex-col mt-10'>
      <h1 className='font-bold text-xl'>Saved Tweets</h1>
      {savedTweets.length > 0 ? 
        <span
          className='text-gray-500 font-medium text-xs cursor-pointer py-2' 
          onClick={() => clearAll()}
        >clear all</span> 
        : 
        null
      }
      <div className="flex items-center justify-center h-full w-full flex-col mt-2">
        {savedTweets.length > 0 ? 
          savedTweets.map((tweet, index) => 
            <TweetItem key={index} tweet={tweet} index={index} />
          )
        :
          <p className='text-sm text-gray-600 mt-2'>{`It's empty for now... Create a tweet to begin!`}</p>
        }
      </div>
    </Section>
  )
}

export default TweetList
