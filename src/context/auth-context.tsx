import React, { ReactNode, useCallback, useState } from "react";
import * as auth from 'auth-provider'
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

interface AuthForm {
  username: string;
  password: string;
}

// 解决登录刷新后返回到login页面，登录态保持
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext = React.createContext<{
  user: User | null,
  login: (form: AuthForm) => Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>,
} | undefined>(undefined);

AuthContext.displayName = 'AuthContext';

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
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();
  // const [user, setUser] = useState<User | null>(null)
  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(user => setUser(null))

  useMount(
    useCallback(() => run(bootstrapUser()), [])
  )


  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }


  return <AuthContext.Provider value={{ user, login, register, logout }} children={children} />
}

/**
 * useAuth是一个自定义Hook，用于获取Authentication Context Object。
 * 
 * 注意：在使用useAuth之前，必须先确定AuthProvider已经包装了整个应用程序。
 * 
 * @returns {Object} 包含了Authentication Context的context对象
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}