import './Button.styles.scss'
import { FC } from 'react'

type ButtonType = {
  className?: string
  title: string
  disabled?: boolean
  onClickHandler: () => void
}

export const Button: FC<ButtonType> = (props) => {
  const { className, title, disabled, onClickHandler } = props

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
