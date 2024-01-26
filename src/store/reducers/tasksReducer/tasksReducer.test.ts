import { TasksType, tasksReducer } from './tasksReducer'
import {
  createTaskAC,
  removeTaskAC,
  updateTaskAC,
  changeTaskStatusAC,
} from '../../actionCreators/tasksActionCreators'
import { TaskPriorities, TaskStatuses } from '../../../api/todolistsAPI'

let startState: TasksType = {}

beforeEach(() => {
  startState = {
    todolistId_1: [
      {
        id: '1',
        title: 'html',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId_1',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'css',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId_1',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'js',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId_1',
        order: 0,
        addedDate: '',
      },
    ],
    todolistId_2: [
      {
        id: '1',
        title: 'milk',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId_2',
        order: 0,
        addedDate: '',
      },
      {
        id: '2',
        title: 'beer',
        status: TaskStatuses.Completed,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId_2',
        order: 0,
        addedDate: '',
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: 'todolistId_2',
        order: 0,
        addedDate: '',
      },
    ],
  }
})

// Delete Task
test('remove task from todolist', () => {
  const action = removeTaskAC('2', 'todolistId_1')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId_1'].length).toBe(2)
  expect(endState['todolistId_2'].length).toBe(3)
})

// Add Task
test('add task for todolist', () => {
  const action = createTaskAC('wine', 'todolistId_2')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId_1'].length).toBe(3)
  expect(endState['todolistId_2'].length).toBe(4)
  expect(endState['todolistId_2'][0].title).toBe('wine')
  expect(endState['todolistId_2'][0].status).toBe(TaskStatuses.New)
})

// Update Task Title
test('update task title', () => {
  const action = updateTaskAC('2', 'todolistId_2', 'coffee')
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId_2'].length).toBe(3)
  expect(endState['todolistId_2'][1].title).toBe('coffee')
})

// Change Task Status
test('change task status', () => {
  const action = changeTaskStatusAC('2', 'todolistId_2', TaskStatuses.New)
  const endState = tasksReducer(startState, action)

  expect(endState['todolistId_1'][1].status).toBe(TaskStatuses.Completed)
  expect(endState['todolistId_2'][1].status).toBe(TaskStatuses.New)
})
