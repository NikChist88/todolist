import './Input.styles.scss'
import { ChangeEvent, KeyboardEvent, FC } from 'react'

type InputPropsType = {
  value: string
  onChange: (value: string) => void
  onKeyPress: (key: string) => void
  onBlur?: () => void
  autoFocus?: boolean
}

export const Input: FC<InputPropsType> = (props) => {
  const { value, onChange, onKeyPress, onBlur, autoFocus } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value.trimStart())
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress(e.key)
  }

  return (
    <input
      className={`input ${value.length > 20 && 'input_error'}`}
      placeholder='Enter a task...'
      value={value}
      onChange={onChangeHandler}
      onKeyUp={onKeyPressHandler}
      maxLength={21}
      onBlur={onBlur}
      autoFocus={autoFocus}
    />
  )
}
