import { FC } from 'react'

type ButtonType = {
  className?: string
  title: string
  callBack: () => void
}

export const Button: FC<ButtonType> = ({ className, title, callBack }) => {
  const onClickHandler = () => callBack()

  return (
    <button className={`btn ${className}`} onClick={onClickHandler}>
      {title}
    </button>
  )
}
