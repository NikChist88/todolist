import { AppStateType, appReducer, setError, setStatus } from "./app-reducer"

let startState: AppStateType

beforeEach(() => {
  startState = {
    status: "idle",
    error: "",
    message: "",
    severity: "info",
  }
})

test("set error", () => {
  const action = setError("some error")
  const endState = appReducer(startState, action)

  expect(endState.error).toBe("some error")
})

test("set status", () => {
  const action = setStatus("loading")
  const endState = appReducer(startState, action)

  expect(endState.status).toBe("loading")
})
