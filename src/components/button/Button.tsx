import './Button.styles.scss'
import { MouseEvent, FC } from 'react'

type ButtonType = {
  className?: string
  title?: string
  tooltip?: string
  disabled?: boolean
  onClick: () => void
  onMouseDown?: () => void
}

export const Button: FC<ButtonType> = (props) => {
  const { className, title, disabled, tooltip, onClick, onMouseDown } = props

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onClick()
  }

  const onMouseDownHandler = () => {
    onMouseDown && onMouseDown()
  }

  return (
    <button
      className={`btn ${className}`}
      title={tooltip}
      disabled={disabled}
      onClick={onClickHandler}
      onMouseUp={onMouseDownHandler}
    >
      {title}
    </button>
  )
}
