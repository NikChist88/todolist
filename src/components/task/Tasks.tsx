import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { RootStateType } from '../../store/store'
import { Task } from './Task'
import { FilterType } from '../../store/reducers/todolistsReducer/todolistsReducer'
import { ThunkDispatch } from 'redux-thunk'
import {
  TasksActionsTypes,
  fetchTasksTC,
} from '../../store/reducers/tasksReducer/tasksReducer'
import { useTask } from './hooks/useTask'

type TasksPropsType = {
  todolistId: string
  filter: FilterType
}

export const Tasks: FC<TasksPropsType> = ({ todolistId, filter }) => {
  const { filteredTasks } = useTask(todolistId, filter)
  const dispatch: ThunkDispatch<RootStateType, any, TasksActionsTypes> =
    useDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolistId))
  }, [todolistId, dispatch])

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
