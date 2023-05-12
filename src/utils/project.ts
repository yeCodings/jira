import { Project } from "screens/project-list/list";
import { useHttp } from "./http";
import { useAsync } from "./use-async";
import { useMutation, useQuery, useQueryClient } from "react-query";

// 获取projects 信息
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // ['projects', param] 类似useEffect 第二个参数[]的形式，当projects中的 param发生变化时，就会发起请求
  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }))
}

// 编辑
/**
 * 使用 client 方法来向服务器发送 PATCH 请求，更新指定 ID 的项目数据。
 * 同时在请求成功时，我们使用 queryClient.invalidateQueries('projects') 来让缓存中名为 projects 的查询数据失效，
 * 以保证下次从缓存中获取数据时，可以获取到最新的项目信息。
 * @returns 返回更新后的数据
 */
export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  // useMutation 和 useQueryClient 配合实现缓存管理
  return useMutation(
    // 异步更新数据
    (params: Partial<Project>) => client(`projects/${params.id}`, {
      method: 'PATCH',
      data: params
    }), {
    // mutation 成功执行时，onSuccess 回调函数会被调用, 
    onSuccess: () => queryClient.invalidateQueries('projects')
  })
}

// 添加
export const useAddProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()

  return useMutation(
    // 异步更新数据
    (params: Partial<Project>) => client(`projects`, {
      method: 'POST',
      data: params
    }), {
    // mutation 成功执行时，onSuccess 回调函数会被调用, 
    onSuccess: () => queryClient.invalidateQueries('projects')
  })
}

export const useProject = (id: number) => {
  const client = useHttp()

  return useQuery<Project>(
    ['projects', { id }],
    () => client(`projects/${id}`),
    {
      //  enabled: !!id 等效,当 id 存在时触发这个函数
      enabled: Boolean(id)
    }
  )
}