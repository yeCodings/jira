import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-option";
import { Task } from "types/task";

// 获取kanbans 列表信息
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: param }))
}

// 添加kanban
export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    // 异步更新数据
    (params: Partial<Kanban>) => client(`kanbans`, {
      method: 'POST',
      data: params,
    }),
    useAddConfig(queryKey)
  )
}

// 编辑kanban
export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()

  // useMutation 和 useQueryClient 配合实现缓存管理
  return useMutation(
    // 异步更新数据
    (params: Partial<Task>) => client(`tasks/${params.id}`, {
      method: 'PATCH',
      data: params,
    }),
    useEditConfig(queryKey)
  )
}

// 删除
export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    // 异步更新数据
    ({ id }: { id: number }) => client(`kanbans/${id}`, {
      method: 'DELETE',
    }),
    useDeleteConfig(queryKey)
  )
}