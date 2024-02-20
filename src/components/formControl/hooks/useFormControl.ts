import { useState, useCallback, ChangeEvent, KeyboardEvent } from "react"

export const useFormControl = (action: (value: string) => void) => {
  const [inputValue, setInputValue] = useState<string>("")

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }, [])

  const handleKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.length <= 20) {
        action(inputValue)
        setInputValue("")
      }
    },
    [inputValue, action]
  )

  const handleClick = useCallback(() => {
    action(inputValue)
    setInputValue("")
  }, [inputValue, action])

  return {
    inputValue,
    handleChange,
    handleKeyUp,
    handleClick,
  }
}
