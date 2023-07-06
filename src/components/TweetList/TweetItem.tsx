import { FC } from 'react'

interface TweetItemProps {
  text: string
  href: string
}

const TweetItem: FC<TweetItemProps> = ({ text, href }) => {
  return (
    <div className='m-2 p-2 w-96 flex justify-between items-center'>
      <p>{text}</p>
      <button type="button" className='border rounded-xl bg-slate-300 py-2 px-4'>
        <a
          target="_blank" 
          href={href}
          className='font-bold text-[#333]'
        >
          open
        </a>
      </button>
    </div>
  )
}

export default TweetItem