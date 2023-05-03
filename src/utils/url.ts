import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

/**
 *  返回页面url中指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  // 当对象是 从 state获取的时候，不会造成无限循环，因为react 认为只有在 setState 的时候 state才会发生改变
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(() =>
      keys.reduce((prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string }),
      [searchParams, keys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator 可以被 key of 遍历； obj[Symbol.interator]
      // Object.fromEntries() 方法把键值对列表转化为一个对象
      const obj = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
      return setSearchParams(obj)
    }
  ] as const
}