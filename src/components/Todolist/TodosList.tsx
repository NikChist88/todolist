import { FC, memo, useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { TodoItem } from "./TodoItem"
import { FormControl } from "../FormControl/FormControl"
import { useTodolist } from "./hooks/useTodolist"
import { LinearProgress, IconButton } from "@mui/material"
import { Navigate } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
import { appSelectors } from "../../store/app"
import { selectors, thunks } from "../../store/todolists"
import { authThunks, authSelectors } from "../../store/auth"

export const TodosList: FC = memo(() => {
  const { createTodolist } = useTodolist()
  const todolists = useAppSelector(selectors.selectTodolists)
  const status = useAppSelector(appSelectors.selectAppStatus)
  const isLoggedIn = useAppSelector(authSelectors.selectAuthIsLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(thunks.fetchTodolists())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogOut = useCallback(() => {
    dispatch(authThunks.logout())
  }, [dispatch])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      {status === "loading" && <LinearProgress sx={{ width: "100%" }} />}
      {isLoggedIn && (
        <IconButton
          onClick={handleLogOut}
          sx={{
            display: "flex",
            alignSelf: "flex-end",
            margin: "10px",
            cursor: "pointer",
          }}
        >
          <LogoutIcon />
        </IconButton>
      )}
      <FormControl
        className='form_shadow'
        label='New todolist'
        action={createTodolist}
      />
      <div className='wrapper'>
        {todolists.map((item) => {
          return (
            <TodoItem
              key={item.id}
              item={item}
            />
          )
        })}
      </div>
    </>
  )
})
