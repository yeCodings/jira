import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/project-list/search-panel";
import * as auth from 'auth-provider'
import { AppDispatch, RootState } from "store";
import { AuthForm, bootstrapUser } from "context/auth-context";

interface State {
  user: User | null
}

const initialState: State = {
  user: null
}

/**
 * createSlice 函数用于创建一个包含 reducer 和 action 的切片
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // 定义一个 reducer，用于设置 user 属性
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    }
  }
})

// 从 authSlice 中提取出 setUser 函数
const { setUser } = authSlice.actions

// 定义一个 selector，用于从状态中获取 user 属性
export const selectUser = (state: RootState) => state.auth.user

// 四个thunk,定义异步的 login、register、logout、bootstrap 函数，它们都返回一个函数，该函数接受 dispatch 参数，用于派发 action
export const login = (form: AuthForm) => (
  dispatch: AppDispatch
) => auth.login(form).then(user => dispatch(setUser(user)))

export const register = (form: AuthForm) => (
  dispatch: AppDispatch
) => auth.register(form).then(user => dispatch(setUser(user)))

export const logout = () => (
  dispatch: AppDispatch
) => auth.logout().then(user => dispatch(setUser(null)))

export const bootstrap = () => (
  dispatch: AppDispatch
) => bootstrapUser().then(user => dispatch(setUser(user)))