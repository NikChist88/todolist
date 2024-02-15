import { useState, useCallback } from 'react'

export const useEditableTitle = (
  title: string,
  onChange: (newTitle: string) => void
) => {
  
  const [editMode, setEditMode] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')

  const activateEditMode = useCallback(() => {
    setEditMode(true)
    setInputValue(title)
  }, [title])

  const activateViewMode = useCallback(() => {
    if (!inputValue) {
      window.alert('Title is requaried!')
    } else {
      setEditMode(false)
      onChange(inputValue)
    }
  }, [inputValue, onChange])

  const handleBlur = useCallback(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setEditMode(false)
    }, 200)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  const handleChangeTitle = useCallback((value: string) => {
    setInputValue(value)
  }, [])

  const handleKeyPress = useCallback(
    (key: string) => {
      if (key === 'Enter' && inputValue.length <= 20) {
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
    handleChangeTitle,
    handleKeyPress,
    handleBlur,
  }
}
