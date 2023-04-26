import { useEffect, useState } from 'react';

// 排除为0的状况
export const isFalsy = (value: unknown) => value === 0 ? false : !value;

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: object) => {

  // 等同于Object.assign({},object)
  const result = { ...object }

  Object.keys(result).forEach(key => {
    // @ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key]
    }
  })

  return result;
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

// 一个unknown类型的值不可以赋值给其他变量，也不可以读取任何的方法
// 使用泛型来解决这个问题，传什么类型 返回的 return debouncedValue 就是什么类型
export const useDebounce = (value: unknown, delay?: number): any => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
} 