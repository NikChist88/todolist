import './App.scss'
import { FC, memo } from 'react'
import { FormControl } from './components/formControl/FormControl'
import { TodosList } from './components/todolist/TodosList'
import { useTodolist } from './components/todolist/hooks/useTodolist'
import { SnackBar } from './components/snackBar/SnackBar'
import { LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { RequestStatusType } from './store/reducers/appReducer/appReducer'
import { RootState } from './store/store'
import { ConfirmProvider } from 'material-ui-confirm'

export const App: FC = memo(() => {
  const { createTodolist } = useTodolist()
  const status = useSelector<RootState, RequestStatusType>(
    (state) => state.app.status
  )

  return (
    <ConfirmProvider
      defaultOptions={{
        confirmationButtonProps: { autoFocus: true },
      }}
    >
      <div className="app">
        {status === 'loading' && <LinearProgress />}
        <SnackBar />
        <FormControl
          className="form_shadow"
          label="New todolist"
          action={createTodolist}
        />
        <TodosList />
      </div>
    </ConfirmProvider>
  )
})
