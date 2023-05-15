import { useMemo, useState } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject, subset } from "utils"

/**
 *  返回页面url中指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParam = useSetUrlSearchParam()
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        // Object.fromEntries 接受一个可迭代对象 (iterable)，返回一个新的对象，该对象的属性由原对象的键值对组成。该方法与 Object.entries() 的作用正好相反。
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParam(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();

  return (params: { [key in string]: unknown }) => {
    const obj = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(obj);
  }
}