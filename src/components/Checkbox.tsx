import { ChangeEvent, FC } from 'react'

type CheckboxPropsType = {
  value: string
  checked: boolean
  updateTaskStatus: (status: string) => void
}

export const Checkbox: FC<CheckboxPropsType> = (props) => {
  const { value, checked, updateTaskStatus } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateTaskStatus(e.currentTarget.value)
  }

  return (
    <input
      type="checkbox"
      value={value}
      checked={checked}
      onChange={onChangeHandler}
    />
  )
}
