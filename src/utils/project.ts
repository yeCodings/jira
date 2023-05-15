
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-option";
import { Project } from "types/project";

// 获取projects 信息
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // ['projects', param] 类似useEffect 第二个参数[]的形式，当projects中的 param发生变化时，就会发起请求
  return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }))
}

// 编辑
/**
 * 使用 client 方法来向服务器发送 PATCH 请求，更新指定 ID 的项目数据。
 * @returns 返回更新后的数据
 */
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()

  // useMutation 和 useQueryClient 配合实现缓存管理
  return useMutation(
    // 异步更新数据
    (params: Partial<Project>) => client(`projects/${params.id}`, {
      method: 'PATCH',
      data: params,
    }),
    useEditConfig(queryKey)
  )
}

// 添加
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    // 异步更新数据
    (params: Partial<Project>) => client(`projects`, {
      method: 'POST',
      data: params,
    }),
    useAddConfig(queryKey)
  )
}

// 删除
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    // 异步更新数据
    ({ id }: { id: number }) => client(`projects/${id}`, {
      method: 'DELETE',
    }),
    useDeleteConfig(queryKey)
  )
}

// 获取当前信息
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