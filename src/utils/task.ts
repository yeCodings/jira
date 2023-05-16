import { Task } from "types/task";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-option";

// 获取tasks 信息
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[]>(['tasks', param], () => client('tasks', { data: param }))
}

// 添加Tasks
export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    // 异步更新数据
    (params: Partial<Task>) => client(`tasks`, {
      method: 'POST',
      data: params,
    }),
    useAddConfig(queryKey)
  )
}

// 获取当前task信息
export const useTask = (id: number) => {
  const client = useHttp()

  return useQuery<Task>(
    ['tasks', { id }],
    () => client(`tasks/${id}`),
    {
      enabled: Boolean(id)
    }
  )
}

// 删除 task
export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    // 异步更新数据
    ({ id }: { id: number }) => client(`tasks/${id}`, {
      method: 'DELETE',
    }),
    useDeleteConfig(queryKey)
  )
}