import './Checkbox.styles.scss'
import { FC, memo } from 'react'

type CheckboxPropsType = {
  checked: boolean
  onChange: () => void
}

export const Checkbox: FC<CheckboxPropsType> = memo(({ checked, onChange }) => {

  const onChangeHandler = () => {
    onChange()
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
