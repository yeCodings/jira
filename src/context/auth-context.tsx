import React, { ReactNode, useCallback, useState } from "react";
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import * as authStore from 'store/auth.slice';
import { bootstrap, selectUser } from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { Action } from "@reduxjs/toolkit";

export interface AuthForm {
  username: string;
  password: string;
}

// 解决登录刷新后返回到login页面，登录态保持
export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

/**
 * AuthProvider是一个React组件，用于提供Authentication Context给应用程序中的所有子组件。
 * 
 * Authentication Context 包含了应用程序中与用户认证相关的信息，例如当前用户是否已经登录等。
 * 
 * 注意：该组件需要包裹整个应用程序，以确保所有子组件都能够访问到Authentication Context。
 * 
 * @returns {JSX.Element} 返回一个包含Authentication Context的Provider组件
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    error,
    isLoading,
    isIdle,
    isError,
    run,
  } = useAsync<User | null>();

  const dispatch: (...args: unknown[] | any) => Promise<User> = useDispatch()

  useMount(
    // run(dispatch(bootstrap()))
    useCallback(() => run(bootstrapUser()), [])
  )


  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }


  return <div>{children}</div>
}

/**
 * useAuth是一个自定义Hook，用于获取Authentication Context Object。
 * 
 * 注意：在使用useAuth之前，必须先确定AuthProvider已经包装了整个应用程序。
 * 
 * @returns {Object} 包含了Authentication Context的context对象
 */
export const useAuth = () => {
  const dispatch: (...args: unknown[] | any) => Promise<User> = useDispatch()

  const user = useSelector(selectUser)
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch])
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
  return {
    user,
    login,
    register,
    logout,
  }
}