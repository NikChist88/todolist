import './Button.styles.scss'
import { FC } from 'react'

type ButtonType = {
  className?: string
  title?: string
  tooltip?: string
  disabled?: boolean
  onClick: () => void
}

export const Button: FC<ButtonType> = (props) => {
  const { className, title, disabled, tooltip, onClick } = props

  const onClickHandler = () => {
    onClick()
  }

  return (
    <button
      className={`btn ${className}`}
      title={tooltip}
      disabled={disabled}
      onClick={onClickHandler}
    >
      {title}
    </button>
  )
}
