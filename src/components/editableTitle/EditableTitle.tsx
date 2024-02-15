import '../input/Input.styles.scss'
import './EditableTitle.styles.scss'
import { FC, memo } from 'react'
import { Button } from '../button/Button'
import { Input } from '../input/Input'
import { useEditableTitle } from './hooks/useEditableTitle'

type EditableTitlePropsType = {
  title: string
  status?: boolean
  onChange: (newTitle: string) => void
}

export const EditableTitle: FC<EditableTitlePropsType> = memo(
  ({ title, status, onChange }) => {
    
    const {
      editMode,
      inputValue,
      activateEditMode,
      activateViewMode,
      handleBlur,
      handleChangeTitle,
      handleKeyPress,
    } = useEditableTitle(title, onChange)

    return editMode ? (
      <div className="field">
        <Input
          value={inputValue}
          placeholder="Enter a task"
          onChange={handleChangeTitle}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
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
