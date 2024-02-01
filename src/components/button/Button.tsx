import './Button.styles.scss'
import { FC, HTMLAttributes, memo } from 'react'

interface IButtonComponent extends HTMLAttributes<HTMLButtonElement> {
  className?: string
  text?: string
  disabled?: boolean
}

export const Button: FC<IButtonComponent> = memo(
  ({ className, text, disabled, ...props }) => {
    
    return (
      <button className={`btn ${className}`} disabled={disabled} {...props}>
        {text}
      </button>
    )
  }
)
