import { AppRootState } from "../store"

export const selectTasks = (state: AppRootState) => state.tasks
