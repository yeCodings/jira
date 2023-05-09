import { configureStore } from "@reduxjs/toolkit"
import { projectListSlice } from "screens/project-list/project-list.slice"
import { authSlice } from "./auth.slice"

// 注册事件
export const rootReducer = {
  projectList: projectListSlice.reducer,
  auth: authSlice.reducer
}

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
