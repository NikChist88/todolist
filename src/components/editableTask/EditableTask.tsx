import '../input/Input.styles.scss'
import './EditableTask.styles.scss'
import { FC, useState } from 'react'
import { Button } from '../button/Button'
import { Input } from '../input/Input'

type EditableTaskPropsType = {
  title: string
  isDone: boolean
  onChange: (newTitle: string) => void
}

export const EditableTask: FC<EditableTaskPropsType> = ({
  title,
  isDone,
  onChange,
}) => {
  console.log('Editable Task render')

  // Local State
  const [editMode, setEditMode] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  // Edit Mode
  const activateEditMode = () => {
    setEditMode(true)
    setInputValue(title)
  }

  // View Mode
  const activateViewMode = () => {
    if (!inputValue) {
      window.alert('Title is requaried!')
    } else {
      setEditMode(false)
      onChange(inputValue)
    }
  }

  // Change Title Handler
  const onChangeTitleHandler = (value: string) => {
    setInputValue(value)
  }

  // Key Press handler
  const onKeyPressHandler = (key: string) => {
    if (key === 'Enter' && inputValue && inputValue.length < 21) {
      activateViewMode()
    }
    if (key === 'Escape') {
      setEditMode(false)
    }
  }

  return editMode ? (
    <div className="field">
      <Input
        value={inputValue}
        placeholder="Enter a task"
        onChange={onChangeTitleHandler}
        onKeyPress={onKeyPressHandler}
        autoFocus
      />
      <Button className="btn_primary" onClick={activateViewMode} />
    </div>
  ) : (
    <div className="body">
      <span>{title}</span>
      <Button
        className="btn_edit"
        disabled={isDone}
        onClick={activateEditMode}
      />
    </div>
  )
}
