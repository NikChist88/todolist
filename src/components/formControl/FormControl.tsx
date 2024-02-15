import './FormControl.styles.scss'
import { FC, memo } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { TextField, IconButton } from '@mui/material'
import { useFormControl } from './hooks/useFormControl'

type FormPropsType = {
  className?: string
  label?: string
  action: (value: string) => void
}

export const FormControl: FC<FormPropsType> = memo(
  ({ className, label, action }) => {
    const { inputValue, handleChange, handleClick, handleKeyUp } =
      useFormControl(action)

    return (
      <div className={`form ${className}`}>
        <div className="form__body">
          <TextField
            id="standard-basic"
            value={inputValue}
            label={label}
            size="small"
            variant="standard"
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <IconButton
            color="primary"
            disabled={!inputValue || inputValue.length > 20}
            onClick={handleClick}
          >
            <AddIcon />
          </IconButton>
        </div>

        {inputValue.length > 20 && (
          <span className="form__error">
            Max input value length is 20 chars!
          </span>
        )}
      </div>
    )
  }
)
