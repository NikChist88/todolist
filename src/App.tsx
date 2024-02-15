import './App.scss'
import { FC, memo } from 'react'
import { TodosList } from './components/todolist/TodosList'
import { SnackBar } from './components/snackBar/SnackBar'
import { LinearProgress } from '@mui/material'
import { useSelector } from 'react-redux'
import { RequestStatusType } from './store/reducers/appReducer/appReducer'
import { RootState } from './store/store'
import { ConfirmProvider } from 'material-ui-confirm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Login } from './components/login/Login'

export const App: FC = memo(() => {
  const status = useSelector<RootState, RequestStatusType>(
    (state) => state.app.status
  )

  return (
    <BrowserRouter>
      <ConfirmProvider
        defaultOptions={{
          confirmationButtonProps: { autoFocus: true },
        }}
      >
        <div className="app">
          {status === 'loading' && <LinearProgress />}
          <SnackBar />
          <Routes>
            <Route path={'/'} element={<TodosList />} />
            <Route path={'/login'} element={<Login />} />
          </Routes>
        </div>
      </ConfirmProvider>
    </BrowserRouter>
  )
})
