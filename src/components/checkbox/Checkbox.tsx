import './Checkbox.styles.scss'
import { ChangeEvent, FC } from 'react'

type CheckboxPropsType = {
  id: string
  checked: boolean
  changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Checkbox: FC<CheckboxPropsType> = (props) => {
  const { id, checked, changeTaskStatus } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(id, e.currentTarget.checked)
  }

  return (
    <input
      id={id}
      className={'checkbox'}
      type="checkbox"
      checked={checked}
      onChange={onChangeHandler}
    />
  )
}
