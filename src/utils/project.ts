import { Project } from "screens/project-list/list";
import { useHttp } from "./http";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useAsync } from "./use-async";

// 获取projects 信息
export const useProjects = (params?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>()
  const fetchProjects = () => client('projects', { data: cleanObject(params || {}) })

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects
    })
  }, [params])

  return result
}

// 编辑
export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}

// 添加
export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(client(`projects${params.id}`, {
      data: params,
      method: 'POST'
    }))
  }

  return {
    mutate,
    ...asyncResult
  }
}
