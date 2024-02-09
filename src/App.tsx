import './App.scss'
import { FC, memo } from 'react'
import { FormControl } from './components/formControl/FormControl'
import { Todolists } from './components/todolist/Todolists'
import { useTodolist } from './components/todolist/hooks/useTodolist'
import { CustomSnackbar } from './components/customSnackbar/CustomSnackbar'

export const App: FC = memo(() => {
  const { createTodolist } = useTodolist()

  return (
    <div className="app">
      <CustomSnackbar />
      <FormControl
        className="form_shadow"
        label="New todolist"
        action={createTodolist}
      />
      <Todolists />
    </div>
  )
})
