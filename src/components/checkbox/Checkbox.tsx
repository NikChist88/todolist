import './Checkbox.styles.scss'
import { FC } from 'react'

type CheckboxPropsType = {
  checked: boolean
  onChange: () => void
}

export const Checkbox: FC<CheckboxPropsType> = (props) => {
  const { checked, onChange } = props

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
}
