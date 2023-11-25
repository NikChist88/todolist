import './Button.styles.scss'
import { FC } from 'react'

type ButtonType = {
  className?: string
  title?: string
  tooltip?: string
  disabled?: boolean
  onClickHandler: () => void
}

export const Button: FC<ButtonType> = (props) => {
  const { className, title, disabled, tooltip, onClickHandler } = props

  return (
    <button
      className={`btn ${className}`}
      title={tooltip}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {title}
    </button>
  )
}
