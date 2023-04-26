// 在真实环境中，如果使用firebase这种第三方auth服务，本文件不用开发者开发

import { User } from "screens/project-list/search-panel"

const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

// 注册
export const register = (data: { username: string, password: string }) => {
  fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(
    async (response: Response) => {
      if (response.ok) {
        return handleUserResponse(await response.json())
      }
    }
  )
}

// 登录
export const login = (data: { username: string, password: string }) => {
  fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(
    async (response: Response) => {
      if (response.ok) {
        return handleUserResponse(await response.json())
      }
    }
  )
}

// 退出
export const loginOut = () => window.localStorage.removeItem(localStorageKey)