// import useTweets from '@/hooks/useLocalStorageTweets'
import useTweets from '@/hooks/useTweets'
import { SavedTweet } from '@/types/tweet'
import { FC } from 'react'

interface TweetItemProps {
  tweet: SavedTweet
  index: number
}

const TweetItem: FC<TweetItemProps> = (props) => {
  const { id, text, href } = props.tweet
  const index = props.index+1
  const { removeTweet } = useTweets()

  return (
    <div className='m-2 p-2 w-96 flex justify-between items-center'>
      <p><span className='font-semibold text-xs'>{index}.</span> {text}</p>
      <div className='flex justify-between items-center gap-3 text-xs'>
        <button type="button" className='border rounded-xl bg-slate-300 py-2 px-4'>
          <a
            target="_blank" 
            href={href}
            className='font-bold text-[#333]'
          >
            open
          </a>
        </button>
        <p
          className='text-red-500 hover:underline cursor-pointer'
          onClick={() => removeTweet(id)}
        >remove</p>
      </div>
    </div>
  )
}

export default TweetItem