import './Button.styles.scss'
import { FC, memo } from 'react'

type ButtonPropsType = {
  className?: string
  title?: string
  tooltip?: string
  disabled?: boolean
  onClick: () => void
}

export const Button: FC<ButtonPropsType> = memo(
  ({ className, title, disabled, tooltip, onClick }) => {
    
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
)
