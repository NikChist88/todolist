import { AppStateType, appReducer, setAppError, setAppStatus } from "./app-reducer"

let startState: AppStateType

beforeEach(() => {
  startState = {
    status: "idle",
    error: {
      message: "",
      severity: "info",
    },
  }
})

test("set error", () => {
  const action = setAppError({ message: "Some error occured!", severity: "error" })
  const endState = appReducer(startState, action)

  expect(endState.error.message).toBe("Some error occured!")
})

test("set status", () => {
  const action = setAppStatus("loading")
  const endState = appReducer(startState, action)

  expect(endState.status).toBe("loading")
})
