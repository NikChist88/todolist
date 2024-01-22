import { useState, useCallback, ChangeEvent, KeyboardEvent } from 'react'

export const useFormControl = (action: (value: string) => void) => {
  // Local State
  const [inputValue, setInputValue] = useState<string>('')

  // Input Change Handler
  const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }, [])

  // Key Up Handler
  const onKeyUpHandler = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && inputValue.length < 21 && inputValue) {
        action(inputValue)
        setInputValue('')
      }
    },
    [inputValue, action]
  )

  // Button Click Handler
  const onClickHandler = useCallback(() => {
    action(inputValue)
    setInputValue('')
  }, [inputValue, action])

  return {
    inputValue,
    onChangeHandler,
    onKeyUpHandler,
    onClickHandler,
  }
}
