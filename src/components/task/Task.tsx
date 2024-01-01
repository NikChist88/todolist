import './Task.styles.scss'
import { FC, useCallback } from 'react'
import { Button } from '../button/Button'
import { Checkbox } from '../checkbox/Checkbox'
import { EditableTask } from '../editableTask/EditableTask'
import { AppRootStateType } from '../../store/store'
import { TasksType, TaskType } from '../../store/types/tasks'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateTaskAC,
  removeTaskAC,
  changeTaskStatusAC,
} from '../../store/actionCreators/tasksActionCreators'

type TaskPropsType = {
  id: string
  todolistId: string
  task: string
  isDone: boolean
}

export const Task: FC<TaskPropsType> = ({ id, todolistId, task, isDone }) => {
  console.log('Task render')

  const tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks)
  const dispatch = useDispatch()

  // Update Task Title Handler
  const updateTaskHandler = useCallback((newTitle: string) => {
    if (
      tasks[todolistId].find(
        (t: TaskType) => t.title === newTitle.toLowerCase()
      )
    ) {
      window.alert(`Task ${newTitle.toUpperCase()} already exists!`)
    } else {
      dispatch(updateTaskAC(id, todolistId, newTitle))
    }
  }, [id, todolistId])

  // Delete Task
  const deleteTaskHandler = () => {
    if (window.confirm(`Do you want to delete a task ${task.toUpperCase()}?`)) {
      dispatch(removeTaskAC(id, todolistId))
    }
  }

  // Change Task Status
  const changeTaskStatusHandler = useCallback(() => {
    dispatch(changeTaskStatusAC(id, todolistId, isDone))
  }, [id, todolistId, isDone])

  return (
    <li className="task">
      <div className={`task__item ${isDone && 'is-done'}`}>
        <Checkbox checked={isDone} onChange={changeTaskStatusHandler} />
        <EditableTask
          title={task}
          onChange={updateTaskHandler}
          isDone={isDone}
        />
      </div>
      <div className="task__controls">
        <Button
          className="btn_danger"
          tooltip="Delete Task"
          onClick={deleteTaskHandler}
        />
      </div>
    </li>
  )
}
