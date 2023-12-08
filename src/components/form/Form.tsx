import './Form.styles.scss'
import { FC, useState } from 'react'
import { Input } from '../input/Input'
import { Button } from '../button/Button'

type FormPropsType = {
  title?: string
  action: (title: string) => void
}

export const Form: FC<FormPropsType> = (props) => {
  // Props
  const { title, action } = props

  // Local State
  const [inputValue, setInputValue] = useState<string>('')

  // Input Change Handler
  const onChangeHandler = (value: string) => {
    setInputValue(value)
  }

  // Key Press Handler
  const onKeyPressHandler = (key: string) => {
    if (key === 'Enter' && inputValue.length < 21 && inputValue) {
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
      {title}
      <div className="form__body">
        <Input
          value={inputValue}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          placeholder="Type here..."
        />
        <Button
          title={'Add'}
          disabled={!inputValue || inputValue.length > 20}
          onClick={onClickHandler}
        />
      </div>
      {inputValue.length > 20 && (
        <span className="form__error">Max input value length is 20 chars!</span>
      )}
    </div>
  )
}
