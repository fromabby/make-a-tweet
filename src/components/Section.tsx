import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

const Section: FC<Props> = ({ children, className = "" }) => {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      {children}
    </div>
  )
}

export default Section