import { TodolistType } from "../../api/todolists-api"
import { todolistsReducer, TodolistDomainType, actions } from "./todolists-reducer"
import { createTodolistTC, deleteTodolistTC, fetchTodolistsTC } from "./todolists-thunks"

let startState: TodolistDomainType[] = []

beforeEach(() => {
  startState = [
    { id: "1", title: "what to learn", filter: "all", addedDate: "", order: 0 },
    { id: "2", title: "what to buy", filter: "all", addedDate: "", order: 0 },
  ]
})

test("removed todolist", () => {
  const action = deleteTodolistTC.fulfilled({id: '1'}, '', '')
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe("2")
})

test("create todolist", () => {
  const todolist: TodolistType = {
    id: "3",
    title: "home work",
    addedDate: "",
    order: 0,
  }
  const action = createTodolistTC.fulfilled({todolist}, '', todolist.title)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(todolist.title)
})

test("change todolist filter", () => {
  const action = actions.changeFilter({ id: startState[0].id, filter: "active" })
  const endState = todolistsReducer(startState, action)

  expect(endState[0].filter).toBe("active")
  expect(endState[1].filter).toBe("all")
})

test("set todolists to state", () => {
  const action = fetchTodolistsTC.fulfilled({data: startState}, '')
  const endState = todolistsReducer([], action)

  expect(endState.length).toBe(2)
})
