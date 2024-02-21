import { FC, useEffect } from "react"
import { TaskItem } from "./TaskItem"
import { FilterType } from "../../store/reducers/todolists-reducer/todolists-reducer"
import { useTask } from "./hooks/useTask"
import { fetchTasksTC } from "../../store/reducers/tasks-reducer/tasks-thunks"
import { useAppDispatch } from "../../store/store"

type TasksListPropsType = {
  todolistId: string
  filter: FilterType
}

export const TasksList: FC<TasksListPropsType> = ({ todolistId, filter }) => {
  const { filteredTasks } = useTask(todolistId, filter)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolistId))
  }, [])

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
