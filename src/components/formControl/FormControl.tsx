import './FormControl.styles.scss'
import { FC, memo } from 'react'
import { Button } from '../button/Button'
import { TextField } from '@mui/material'
import { useFormControl } from './hooks/useFormControl'

type FormPropsType = {
  label?: string
  action: (value: string) => void
}

export const FormControl: FC<FormPropsType> = memo(({ label, action }) => {
  const { inputValue, onChangeHandler, onKeyUpHandler, onClickHandler } =
    useFormControl(action)

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
})
