import './FormControl.styles.scss'
import { ChangeEvent, KeyboardEvent, FC, useState, memo } from 'react'
import { Button } from '../button/Button'
import { TextField } from '@mui/material'

type FormPropsType = {
  label?: string
  action: (value: string) => void
}

export const FormControl: FC<FormPropsType> = ({ label, action }) => {
  console.log('FormControl render')

  // Local State
  const [inputValue, setInputValue] = useState<string>('')

  // Input Change Handler
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  // Key Press Handler
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
        <TextField
          id="standard-basic"
          value={inputValue}
          label={label}
          variant="standard"
          onChange={onChangeHandler}
          onKeyUp={onKeyUpHandler}
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

export const FormControlMemo = memo<FormPropsType>(FormControl)