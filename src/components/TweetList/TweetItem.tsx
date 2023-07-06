// import useTweets from '@/hooks/useLocalStorageTweets'
import useToast from '@/hooks/useToast'
import useTweets from '@/hooks/useTweets'
import { SavedTweet } from '@/types/tweet'
import { FC, useState } from 'react'

interface TweetItemProps {
  tweet: SavedTweet
  index: number
}

const TweetItem: FC<TweetItemProps> = (props) => {
  const { id, text, href } = props.tweet
  const index = props.index+1
  const { update, removeTweet } = useTweets()
  const { enqueue, Toast } = useToast()

  const [isEditing, setIsEditing] = useState(false)
  const [updatedText, setUpdatedText] = useState(text)

  const submitHandler = () => {
    update(id, updatedText)
    setIsEditing(false)
  }

  const Number = () => <span className='font-semibold text-xs pr-4'>{index}.</span>
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(href);
      enqueue('Saved to clipboard!', 2)
    } catch (err) {}
  }

  return (
    <div className='m-2 p-2 w-96 flex justify-between items-center'>
      {isEditing ?
        <>
          <Number />
          <textarea 
            cols={35}
            rows={4}
            value={updatedText}
            onChange={e => setUpdatedText(e.target.value)}
            placeholder='Create tweet ...'
            className='py-2 px-4 rounded focus-within:outline-none'
          />
          <button
            type="button" 
            className='border rounded-xl bg-slate-300 m-4 py-2 px-4 font-bold text-[#333] text-xs'
            onClick={submitHandler}
          >
            update
          </button>
          <p
            className='text-red-500 hover:underline cursor-pointer text-xs'
            onClick={() => {
              setIsEditing(false)
              setUpdatedText(text)
            }}
          >cancel</p>
        </>
        :
        <>
          <p><Number />{text}</p>
          <div className='flex justify-between items-center gap-3 text-xs'>
              <a
                target="_blank" 
                href={href}
                className='font-bold text-[#333] border rounded-xl bg-slate-300 py-2 px-4'
              >
              <button type="button">
                open
              </button>
            </a>
            <button onClick={copyToClipboard}>copy to clipboard</button>
            <p
              className='text-blue-500 hover:underline cursor-pointer'
              onClick={() => setIsEditing(true)}
            >edit</p>
            <p
              className='text-red-500 hover:underline cursor-pointer'
              onClick={() => removeTweet(id)}
            >remove</p>
          </div>
        </>
      }
      <Toast />
    </div>
  )
}

export default TweetItem