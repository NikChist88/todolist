import '../input/Input.styles.scss'
import { FC, useState } from 'react'
import { Button } from '../button/Button'
import { Input } from '../input/Input'

type EditableTaskPropsType = {
  title: string
  onChange: (newTitle: string) => void
  isDone: boolean
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
    setEditMode(false)
    onChange(inputValue)
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
  }

  return editMode ? (
    <Input
      value={inputValue}
      placeholder='Enter a task'
      onChange={onChangeTitleHandler}
      onKeyPress={onKeyPressHandler}
      onBlur={activateViewMode}
      autoFocus
    />
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
