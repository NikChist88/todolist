import { TasksType, tasksReducer, actions as taskActions } from "./tasks-reducer"
import { TaskPriorities, TaskStatuses } from "../../api/todolists-api"
import { actions } from "../todolists/todolists-reducer"

let startState: TasksType = {}

beforeEach(() => {
  startState = {
    todolistId_1: [
      {
        id: "1",
        title: "html",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId_1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "css",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId_1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "js",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId_1",
        order: 0,
        addedDate: "",
      },
    ],
    todolistId_2: [
      {
        id: "1",
        title: "milk",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId_2",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "beer",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId_2",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todolistId_2",
        order: 0,
        addedDate: "",
      },
    ],
  }
})

// Delete Task
test("delete task from todolist", () => {
  const action = taskActions.deleteTask({ todolistId: "todolistId_1", id: "2" })
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId_1"].length).toBe(2)
  expect(endState["todolistId_2"].length).toBe(3)
})

// Add Task
test("add task for todolist", () => {
  const task = {
    id: "4",
    title: "restAPI",
    status: TaskStatuses.New,
    description: "",
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
    todoListId: "todolistId_1",
    order: 0,
    addedDate: "",
  }
  const action = taskActions.createTask(task)
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId_1"].length).toBe(4)
  expect(endState["todolistId_2"].length).toBe(3)
  expect(endState["todolistId_1"][0].title).toBe("restAPI")
  expect(endState["todolistId_1"][0].status).toBe(TaskStatuses.New)
})

// Update Task Title
test("update task title", () => {
  const action = taskActions.updateTask({
    todolistId: "todolistId_2",
    id: "2",
    model: {
      title: "coffee",
      status: TaskStatuses.New,
      description: "",
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
    },
  })
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId_2"].length).toBe(3)
  expect(endState["todolistId_2"][1].title).toBe("coffee")
})

// Change Task Status
test("change task status", () => {
  const action = taskActions.updateTask({
    todolistId: "todolistId_2",
    id: "2",
    model: {
      title: "beer",
      status: TaskStatuses.New,
      description: "",
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
    },
  })
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId_1"][1].status).toBe(TaskStatuses.Completed)
  expect(endState["todolistId_2"][1].status).toBe(TaskStatuses.New)
})

// Empty array tasks when we set todolists
test("empty array tasks when we set todolists", () => {
  const action = actions.setTodolists([
    { id: "1", title: "what to learn", addedDate: "", order: 0 },
    { id: "2", title: "what to buy", addedDate: "", order: 0 },
  ])
  const endState = tasksReducer({}, action)
  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState["1"]).toStrictEqual([])
  expect(endState["2"]).toStrictEqual([])
})
