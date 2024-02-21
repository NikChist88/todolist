import './Input.styles.scss'
import { ChangeEvent, KeyboardEvent, FC, memo } from 'react'

type InputPropsType = {
  value: string
  placeholder?: string
  onChange: (value: string) => void
  onKeyPress: (key: string) => void
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
  autoFocus?: boolean
}

export const Input: FC<InputPropsType> = memo(
  ({ value, placeholder, onChange, onKeyPress, onBlur, autoFocus }) => {
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value.trimStart())
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyPress(e.key)
    }

    return (
      <input
        className={`input ${value.length > 20 && 'input_error'}`}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        onKeyUp={onKeyPressHandler}
        onBlur={onBlur}
        autoFocus={autoFocus}
      />
    )
  }
)
