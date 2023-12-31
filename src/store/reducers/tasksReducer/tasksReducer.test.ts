import { TasksType } from '../../types/tasks'
import { tasksReducer } from './tasksReducer'
import { createTaskAC, removeTaskAC, updateTaskAC, changeTaskStatusAC } from '../../actionCreators/tasksActionCreators'
import { v1 } from 'uuid'

// Delete Task
test('remove task from todolist', () => {
  const startState: TasksType = {
    ['todolistId_1']: [
      { id: '1', title: 'html', isDone: false },
      { id: '2', title: 'css', isDone: false },
      { id: '3', title: 'js', isDone: false },
    ],
    ['todolistId_2']: [
      { id: '1', title: 'milk', isDone: false },
      { id: '2', title: 'beer', isDone: false },
      { id: '3', title: 'tea', isDone: false },
    ],
  }

  const taskId = startState['todolistId_2'][0].id
  const action = removeTaskAC(taskId, 'todolistId_2')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId_1'].length).toBe(3)
  expect(endState['todolistId_2'].length).toBe(2)
})

// Add Task
test('add task for todolist', () => {
  const todolistId_1: string = v1()
  const todolistId_2: string = v1()

  const startState: TasksType = {
    [todolistId_1]: [
      { id: v1(), title: 'html', isDone: false },
      { id: v1(), title: 'css', isDone: false },
      { id: v1(), title: 'js', isDone: false },
    ],
    [todolistId_2]: [],
  }

  const taskTitle: string = 'milk'
  const action = createTaskAC(taskTitle, todolistId_2)
  const endState = tasksReducer(startState, action)

  expect(endState[todolistId_2].length).toBe(1)
  expect(endState[todolistId_2].find((t) => t.title === taskTitle)).toBeTruthy()
})

// Update Task Title
test('update task title', () => {
  const todolistId_1: string = v1()
  const todolistId_2: string = v1()

  const startState: TasksType = {
    [todolistId_1]: [
      { id: v1(), title: 'html', isDone: false },
      { id: v1(), title: 'css', isDone: false },
      { id: v1(), title: 'js', isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: 'milk', isDone: false },
      { id: v1(), title: 'beer', isDone: false },
      { id: v1(), title: 'tea', isDone: false },
    ],
  }

  const taskId = startState[todolistId_2][0].id
  const newTaskTitle: string = 'coffee'
  const action = updateTaskAC(taskId, todolistId_2, newTaskTitle)
  const endState = tasksReducer(startState, action)

  expect(endState[todolistId_2].length).toBe(3)
  expect(endState[todolistId_2][0].title).toBe(newTaskTitle)
})

// Change Task Status
test('change task status', () => {
  const todolistId_1: string = v1()
  const todolistId_2: string = v1()

  const startState: TasksType = {
    [todolistId_1]: [
      { id: v1(), title: 'html', isDone: false },
      { id: v1(), title: 'css', isDone: false },
      { id: v1(), title: 'js', isDone: false },
    ],
    [todolistId_2]: [
      { id: v1(), title: 'milk', isDone: false },
      { id: v1(), title: 'beer', isDone: false },
      { id: v1(), title: 'tea', isDone: false },
    ],
  }

  const taskId = startState[todolistId_2][0].id
  const action = changeTaskStatusAC(taskId, todolistId_2, false)
  const endState = tasksReducer(startState, action)

  expect(endState[todolistId_1][0].isDone).toBe(false)
  expect(endState[todolistId_2][0].isDone).toBe(true)
})