import './Checkbox.styles.scss'
import { ChangeEvent, FC } from 'react'

type CheckboxPropsType = {
  id: string
  todolistsId: string
  checked: boolean
  changeTaskStatus: (
    taskId: string,
    todolistsId: string,
    isDone: boolean
  ) => void
}

export const Checkbox: FC<CheckboxPropsType> = (props) => {
  const { id, todolistsId, checked, changeTaskStatus } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(id, todolistsId, e.currentTarget.checked)
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
