import './Checkbox.styles.scss'
import { ChangeEvent, FC, memo } from 'react'

type CheckboxPropsType = {
  checked: boolean
  onChange: (status: boolean) => void
}

export const Checkbox: FC<CheckboxPropsType> = memo(({ checked, onChange }) => {

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.checked)
  }

  return (
    <input
      className={'checkbox'}
      type="checkbox"
      checked={checked}
      onChange={onChangeHandler}
    />
  )
})
