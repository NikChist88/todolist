import { ChangeEvent, KeyboardEvent, FC } from 'react'

type InputPropsType = {
  className?: string
  value: string
  onChange: (value: string) => void
  addTask: () => void
}

export const Input: FC<InputPropsType> = (props) => {
  const { value, className, onChange, addTask } = props

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value.trimStart())
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.length < 15 && value) addTask()
  }

  return (
    <input
      className={className}
      type="text"
      value={value}
      onChange={onChangeHandler}
      onKeyUp={onKeyPressHandler}
      placeholder="Task to be done..."
      maxLength={15}
    />
  )
}
