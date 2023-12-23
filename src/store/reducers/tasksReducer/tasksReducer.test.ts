import { TasksType } from '../../store'
import { TaskType } from '../../store'
import {
  tasksReducer,
  RemoveTaskAC,
  AddTaskAC,
  UpdateTaskTitleAC,
  ChangeTaskStatusAC,
} from './tasksReducer'
import { v1 } from 'uuid'

// Delete Task
test('remove task from todolist', () => {
  const todolistId_1: string = v1()

  const startState: TasksType = {
    [todolistId_1]: [
      { id: v1(), title: 'html', isDone: false },
      { id: v1(), title: 'css', isDone: false },
      { id: v1(), title: 'js', isDone: false },
    ],
  }

  const taskId = startState[todolistId_1][0].id

  const action = RemoveTaskAC(taskId, todolistId_1)

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId_1].length).toBe(2)
})

// Add Task
test('add task for todolist', () => {
  const todolistId_1: string = v1()

  const startState: TasksType = {
    [todolistId_1]: [
      { id: v1(), title: 'html', isDone: false },
      { id: v1(), title: 'css', isDone: false },
      { id: v1(), title: 'js', isDone: false },
    ],
  }

  const newTask: TaskType = { id: v1(), title: 'react', isDone: false }

  const action = AddTaskAC(newTask, todolistId_1)

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId_1].length).toBe(4)
})

// Update Task Title
test('update task title', () => {
  const todolistId_1: string = v1()

  const startState: TasksType = {
    [todolistId_1]: [
      { id: v1(), title: 'html', isDone: false },
      { id: v1(), title: 'css', isDone: false },
      { id: v1(), title: 'js', isDone: false },
    ],
  }

  const taskId = startState[todolistId_1][0].id
  const newTaskTitle: string = 'svelte'

  const action = UpdateTaskTitleAC(newTaskTitle, taskId, todolistId_1)

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId_1][0].title).toBe('svelte')
})

// Change Task Status
test('change task status', () => {
  const todolistId_1: string = v1()

  const startState: TasksType = {
    [todolistId_1]: [
      { id: v1(), title: 'html', isDone: false },
      { id: v1(), title: 'css', isDone: false },
      { id: v1(), title: 'js', isDone: false },
    ],
  }

  const taskId = startState[todolistId_1][0].id

  const action = ChangeTaskStatusAC(taskId, todolistId_1)

  const endState = tasksReducer(startState, action)

  expect(endState[todolistId_1][0].isDone).toBe(true)
})
