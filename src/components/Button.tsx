import { FC } from 'react'

type ButtonType = {
  className?: string
  title: string
  disabled?: boolean
  callBack: () => void
}

export const Button: FC<ButtonType> = (props) => {
  const { className, title, callBack, disabled } = props
  const onClickHandler = () => callBack()

  return (
    <button
      className={`btn ${className}`}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {title}
    </button>
  )
}
