import { FC, useEffect } from 'react'
import { Task } from './Task'
import { FilterType } from '../../store/reducers/todolistsReducer/todolistsReducer'
import { useTask } from './hooks/useTask'
import { useDispatch } from 'react-redux'
import { fetchTasksTC } from '../../store/reducers/tasksReducer/tasksThunks'
import { AppDispatch } from '../../store/store'

type TasksPropsType = {
  todolistId: string
  filter: FilterType
}

export const Tasks: FC<TasksPropsType> = ({ todolistId, filter }) => {
  const { filteredTasks } = useTask(todolistId, filter)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolistId))
  }, [])

  return (
    <>
      {filteredTasks.length ? (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            todolistId={todolistId}
            task={task.title}
            status={task.status}
            filter={filter}
          />
        ))
      ) : (
        <span>
          {filter === 'all' ? 'You have no tasks' : `No ${filter} tasks`}
        </span>
      )}
    </>
  )
}
