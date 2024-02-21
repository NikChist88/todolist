import "./App.scss"
import { FC, memo, useEffect } from "react"
import { TodosList } from "./components/Todolist/TodosList"
import { SnackBar } from "./components/SnackBar/SnackBar"
import { ConfirmProvider } from "material-ui-confirm"
import { Route, Routes, Navigate } from "react-router-dom"
import { LoginForm } from "./pages/LoginForm/LoginForm"
import { Error404 } from "./pages/Error404/Error404"
import { useAppDispatch, useAppSelector } from "./store/store"
import { CircularProgress } from "@mui/material"
import { initTC } from "./store/reducers/auth-reducer/auth-thunks"

export const App: FC = memo(() => {
  const { isInit } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initTC())
  }, [])

  if (!isInit) {
    return (
      <CircularProgress
        size={50}
        sx={{ position: "fixed", left: "50%", top: "50%" }}
      />
    )
  }

  return (
    <div className='app'>
      <ConfirmProvider
        defaultOptions={{
          confirmationButtonProps: { autoFocus: true },
        }}
      >
        <SnackBar />
        <Routes>
          <Route
            path={"/"}
            element={<TodosList />}
          />
          <Route
            path={"/login"}
            element={<LoginForm />}
          />
          <Route
            path={"/error404"}
            element={<Error404 />}
          />
          <Route
            path={"/*"}
            element={<Navigate to={"/error404"} />}
          />
        </Routes>
      </ConfirmProvider>
    </div>
  )
})
