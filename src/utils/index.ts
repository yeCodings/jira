import { useEffect, useRef, useState } from 'react';

// 排除为0的状况
export const isFalsy = (value: unknown) => value === 0 ? false : !value;
export const isVoid = (value: unknown) => value === undefined || value == null || value === "";

// 在一个函数里，改变传入的对象本身是不好的
// 清除对象里的空值
export const cleanObject = (object: { [key: string]: unknown }) => {

  // 等同于Object.assign({},object)
  const result = { ...object }

  Object.keys(result).forEach(key => {

    const value = result[key];
    if (isVoid(value)) {
      // isFalsy 可能存在value为false的时候造成误删，改用 isVoid
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
// hooks防抖函数
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]
      copy.splice(index, 1)
      setValue(copy)
    }
  }
}

export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不添加指定依赖，返回的是旧的 title
        document.title = oldTitle
      }
    }

  }, [keepOnUnmount, oldTitle])
}

// 重置路由状态，刷新整个页面
export const resetRoute = () => window.location.href = window.location.origin

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 *  返回组件的挂载状态，未挂载或者已卸载，返回false；否则返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = false
    return () => {
      mountedRef.current = true
    }
  })

  return mountedRef
}