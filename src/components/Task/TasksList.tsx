import { FC, useEffect } from "react"
import { TaskItem } from "./TaskItem"
import { FilterType } from "../../store/todolists/todolists-reducer"
import { fetchTasks } from "../../store/tasks/tasks-thunks"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { selectTasks } from "../../store/tasks/tasks-selectors"
import { TaskStatuses } from "../../api/todolists-api"

type TasksListPropsType = {
  todolistId: string
  filter: FilterType
}

export const TasksList: FC<TasksListPropsType> = ({ todolistId, filter }) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasks(todolistId))
  }, [])

  // Filtered Tasks
  let filteredTasks = tasks[todolistId]
  if (filter === "active") filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.New)
  if (filter === "completed") filteredTasks = filteredTasks.filter((t) => t.status === TaskStatuses.Completed)

  return (
    <>
      {filteredTasks.length ? (
        filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            filter={filter}
          />
        ))
      ) : (
        <span>{filter === "all" ? "You have no tasks" : `No ${filter} tasks`}</span>
      )}
    </>
  )
}
