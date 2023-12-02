import './Form.styles.scss'
import { ChangeEvent, KeyboardEvent, FC, useState } from 'react'

type FormPropsType = {
  action: (title: string) => void
}

export const Form: FC<FormPropsType> = (props) => {
  // Props
  const { action } = props

  // Local State
  const [inputValue, setInputValue] = useState<string>('')

  // Input Change Handler
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value.trimStart())
  }

  // Key Press Handler
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.length < 21 && inputValue) {
      action(inputValue)
      setInputValue('')
    }
  }

  // Button Click Handler
  const onClickHandler = () => {
    action(inputValue)
    setInputValue('')
  }

  return (
    <div className="form">
      <div className="form__body">
        <input
          className={`form__input ${
            inputValue.length > 20 && 'form__input_error'
          }`}
          value={inputValue}
          maxLength={21}
          onChange={onChangeHandler}
          onKeyUp={onKeyPressHandler}
        />
        <button
          className="form__btn"
          disabled={!inputValue || inputValue.length > 20}
          onClick={onClickHandler}
        >
          Add
        </button>
      </div>
      {inputValue.length > 20 && (
        <span className="error">Max input value length is 20 chars!</span>
      )}
    </div>
  )
}
