import '../input/Input.styles.scss'
import './EditableTask.styles.scss'
import { FC, memo } from 'react'
import { Button } from '../button/Button'
import { Input } from '../input/Input'
import { useEditableTask } from './hooks/useEditableTask'

type EditableTaskPropsType = {
  title: string
  isDone: boolean
  onChange: (newTitle: string) => void
}

export const EditableTask: FC<EditableTaskPropsType> = memo(
  ({ title, isDone, onChange }) => {
    
    const {
      editMode,
      inputValue,
      activateEditMode,
      activateViewMode,
      onChangeTitleHandler,
      onKeyPressHandler,
    } = useEditableTask(title, onChange)

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
)
