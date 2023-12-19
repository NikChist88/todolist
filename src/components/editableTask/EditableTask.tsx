import '../input/Input.styles.scss'
import { ChangeEvent, FC, useState } from 'react'
import { Button } from '../button/Button'
import { Input } from '../input/Input'

type EditableTaskPropsType = {
  title: string
  isDone: boolean
  onChange: (newTitle: string) => void
}

export const EditableTask: FC<EditableTaskPropsType> = (props) => {
  // Props
  const { title, isDone, onChange } = props

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
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0 10px',
        width: '100%',
      }}
    >
      <span>{title}</span>
      <Button
        className="btn_edit"
        disabled={isDone}
        onClick={activateEditMode}
      />
    </div>
  )
}
