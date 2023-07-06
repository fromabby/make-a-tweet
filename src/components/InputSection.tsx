'use client'

import { useState } from 'react'
import Section from '@/components/Section'
// import useTweets from '@/hooks/useLocalStorageTweets'
import useToast from '@/hooks/useToast'
import useTweets from '@/hooks/useTweets'

const InputSection = () => {
  const [text, setText] = useState("")
  const { enqueue, Toast } = useToast()

  const { save } = useTweets()

  const submitHandler = () => {
    save(text)
    setText("")

    enqueue('Tweet saved!', 2)
  }

  return (
    <>
      <Section className='mt-10'>
        <textarea 
          cols={35}
          rows={4}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='Create tweet ...'
          className='py-2 px-4 rounded focus-within:outline-none'
        />
        <button
          type="button" 
          className='border rounded-xl bg-slate-300 m-4 py-2 px-4 font-bold text-[#333]'
          onClick={submitHandler}
        >
          save
        </button>
      </Section>
      <Toast />
    </>
  )
}

export default InputSection