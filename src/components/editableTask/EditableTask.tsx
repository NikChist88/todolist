import '../input/Input.styles.scss'
import './EditableTask.styles.scss'
import { FC, memo } from 'react'
import { Button } from '../button/Button'
import { Input } from '../input/Input'
import { useEditableTask } from './hooks/useEditableTask'

type EditableTaskPropsType = {
  title: string
  status: boolean
  onChange: (newTitle: string) => void
}

export const EditableTask: FC<EditableTaskPropsType> = memo(
  ({ title, status, onChange }) => {
    
    const {
      editMode,
      inputValue,
      activateEditMode,
      activateViewMode,
      onChangeTitleHandler,
      onKeyPressHandler,
      onBlurHandler
    } = useEditableTask(title, onChange)

    return editMode ? (
      <div className="field">
        <Input
          value={inputValue}
          placeholder="Enter a task"
          onChange={onChangeTitleHandler}
          onKeyPress={onKeyPressHandler}
          onBlur={onBlurHandler}
          autoFocus
        />
        <Button className="btn_primary" onClick={activateViewMode} />
      </div>
    ) : (
      <div className="body">
        <span>{title}</span>
        <Button
          className="btn_edit"
          disabled={status}
          onClick={activateEditMode}
        />
      </div>
    )
  }
)
