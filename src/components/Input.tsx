import { ChangeEvent, KeyboardEvent, FC } from 'react'

type InputPropsType = {
  className?: string
  value: string
  setInputValue: (value: string) => void
  addTask: () => void
}

export const Input: FC<InputPropsType> = (props) => {
  const { value, className, setInputValue, addTask } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value.trimStart())
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && addTask()
  }

  return (
    <input
      className={className}
      type="text"
      value={value}
      onChange={onChangeHandler}
      onKeyUp={onKeyPressHandler}
      placeholder="Task to be done..."
    />
  )
}
