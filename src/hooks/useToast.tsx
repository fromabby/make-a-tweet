import { useEffect, useState } from "react"
import ToastMessage from "@/components/ToastMessage"

interface UseToastProps {
  enqueue: (text: string, seconds: number) => void
  Toast: () => JSX.Element | null
}

const useToast = (): UseToastProps => {
  const [message, setMessage] = useState<string|null>(null)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  const enqueue = (text: string, seconds: number) => {
    setMessage(text)
    setTimeoutId(setTimeout(() => {
      setMessage(null)
    }, seconds * 1000))
  }

  useEffect(() => {
    return () => clearTimeout(timeoutId)
  }, [timeoutId])

  const Toast = () => (message ?
    <div className="sticky top-[16%]">
      <ToastMessage message={message} />
    </div> : null)

  return { enqueue, Toast } as const
}

export default useToast
