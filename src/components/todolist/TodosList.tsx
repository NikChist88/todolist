import { FC, memo, useCallback, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { TodoItem } from "./TodoItem"
import { fetchTodolistsTC } from "../../store/reducers/todolistsReducer/todolistsThunks"
import { FormControl } from "../formControl/FormControl"
import { useTodolist } from "./hooks/useTodolist"
import { LinearProgress, IconButton } from "@mui/material"
import { Navigate } from "react-router-dom"
import LogoutIcon from "@mui/icons-material/Logout"
import { logoutTC } from "../../store/reducers/authReducer/authThunks"

export const TodosList: FC = memo(() => {
  const { createTodolist } = useTodolist()
  const todolists = useAppSelector((state) => state.todolists)
  const { status } = useAppSelector((state) => state.app)
  const { isLoggedIn } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogOut = useCallback(() => {
    dispatch(logoutTC())
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
