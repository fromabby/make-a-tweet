import { FC } from "react"

interface Props {
  message: string
}

const ToastMessage: FC<Props> = (props) => {
  const { message } = props

  return (
    <div className="flex justify-center">
      <div className="absolute z-10 flex items-center px-4 py-2 text-xs text-white bg-black rounded-md">
        <span className="flex">{message}</span>
      </div>
    </div>
  )
}

export default ToastMessage
