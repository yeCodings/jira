import qs from "qs";
import * as auth from 'auth-provider'
import { useAuth } from "context/auth-context";


const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

// { data, token, headers, ...customConfig }: Config ={} 加上默认值就会自动变为 可选
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : ''
    },
    ...customConfig
  }

  // GET请求直接在endpoint携带data信息；其他请求通过 config.body携带data信息
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        await auth.logout()
        window.location.reload()
        return Promise.reject({ message: '请重新登录' })
      }

      const data = await response.json()
      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }

    })
}

// 自动把token带进去
export const useHttp = () => {
  const { user } = useAuth()
  return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}