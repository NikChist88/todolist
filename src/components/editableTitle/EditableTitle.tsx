import "../input/Input.styles.scss"
import "./EditableTitle.styles.scss"
import { FC, memo } from "react"
import { Input } from "../input/Input"
import { useEditableTitle } from "./hooks/useEditableTitle"
import { IconButton } from "@mui/material"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import AddIcon from "@mui/icons-material/Add"

type EditableTitlePropsType = {
  title: string
  status?: boolean
  onChange: (newTitle: string) => void
}

export const EditableTitle: FC<EditableTitlePropsType> = memo(({ title, status, onChange }) => {
  const { editMode, inputValue, activateEditMode, activateViewMode, handleBlur, handleChangeTitle, handleKeyPress } =
    useEditableTitle(title, onChange)

  return editMode ? (
    <div className='field'>
      <Input
        value={inputValue}
        placeholder='Enter a task'
        onChange={handleChangeTitle}
        onKeyPress={handleKeyPress}
        onBlur={handleBlur}
        autoFocus
      />
      <IconButton
        color='primary'
        disabled={!inputValue || inputValue.length > 20}
        onClick={activateViewMode}
      >
        <AddIcon />
      </IconButton>
    </div>
  ) : (
    <div className='body'>
      <span>{title}</span>
      <IconButton
        color='primary'
        disabled={status}
        onClick={activateEditMode}
      >
        <ModeEditIcon />
      </IconButton>
    </div>
  )
})
