import { ChangeEvent, FC } from 'react'

type CheckboxPropsType = {
  id: string
  checked: boolean
  updateTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Checkbox: FC<CheckboxPropsType> = (props) => {
  const { id, checked, updateTaskStatus } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    updateTaskStatus(id, e.currentTarget.checked)
  }

  return <input type="checkbox" checked={checked} onChange={onChangeHandler} />
}
