'use client'

import Section from '@/components/Section'
import TweetItem from './TweetItem'
import useTweets from '@/hooks/useTweets'

const TweetList = () => {
  const { savedTweets } = useTweets()

  return (
    <Section className='flex-col mt-10'>
      <h1 className='font-bold text-xl'>Saved Tweets</h1>
      <div className="flex items-center justify-center h-full w-full flex-col mt-2">
        {savedTweets.length > 0 ? 
          savedTweets.map((props, index) => 
            <TweetItem key={index} text={props.text} href={props.href} />
          )
        :
          <p className='text-sm text-gray-600 mt-2'>{`It's empty for now... Create a tweet to begin!`}</p>
        }
      </div>
    </Section>
  )
}

export default TweetList
