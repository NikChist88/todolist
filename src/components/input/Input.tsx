import './Input.styles.scss'
import { ChangeEvent, KeyboardEvent, FC, FocusEvent } from 'react'

type InputPropsType = {
  value: string
  onChange: (value: string) => void
  onKeyPress: () => void
  onBlur?: (focused: boolean) => void
  autoFocus?: boolean
}

export const Input: FC<InputPropsType> = (props) => {
  const { value, onChange, onKeyPress, onBlur, autoFocus } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value.trimStart())
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.length < 16 && value) onKeyPress()
  }

  const onBlurHandler = () => {
    onBlur && onBlur(false)
  }

  return (
    <input
      className="input"
      type="text"
      placeholder="Task to be done..."
      value={value}
      onChange={onChangeHandler}
      onKeyUp={onKeyPressHandler}
      onBlur={onBlurHandler}
      maxLength={16}
      autoFocus={autoFocus}
    />
  )
}
