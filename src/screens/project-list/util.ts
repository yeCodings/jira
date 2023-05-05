import { useUrlQueryParam } from "utils/url"
import { useMemo } from 'react';


export const useProjectScreenParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam
  ] as const // 将一个表达式中所有的字面量类型推导出来，并将它们都转化为不可变的 const 类型
}

