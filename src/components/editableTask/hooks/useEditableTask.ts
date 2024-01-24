import { useState, useCallback } from 'react'

export const useEditableTask = (
  title: string,
  onChange: (newTitle: string) => void
) => {
  
  // Local State
  const [editMode, setEditMode] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  // Edit Mode
  const activateEditMode = useCallback(() => {
    setEditMode(true)
    setInputValue(title)
  }, [title])

  // View Mode
  const activateViewMode = useCallback(() => {
    if (!inputValue) {
      window.alert('Title is requaried!')
    } else {
      setEditMode(false)
      onChange(inputValue)
    }
  }, [inputValue, onChange])

  // Change Title Handler
  const onChangeTitleHandler = useCallback((value: string) => {
    setInputValue(value)
  }, [])

  // Key Press handler
  const onKeyPressHandler = useCallback(
    (key: string) => {
      if (key === 'Enter' && inputValue && inputValue.length < 21) {
        activateViewMode()
      }
      if (key === 'Escape') {
        setEditMode(false)
      }
    },
    [inputValue, activateViewMode]
  )

  return {
    editMode,
    inputValue,
    activateEditMode,
    activateViewMode,
    onChangeTitleHandler,
    onKeyPressHandler,
  }
}
