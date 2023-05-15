import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url"
import { useMemo } from 'react';
import { useProject } from "utils/project";

// 项目列表的搜索参数
export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam
  ] as const // 将一个表达式中所有的字面量类型推导出来，并将它们都转化为不可变的 const 类型
}

export const useProjectQueryKey = () => {
  const [params] = useProjectSearchParams()
  return ['projects', params]
}

/**
 * 一个自定义 hook，用于显示和控制项目模态框的状态。（状态管理器相当于 redux或 context的作用） 
 *
 * 该 hook 从 useUrlQueryParam 读取数据，然后返回一个含有三个元素的数组，
 * 分别表示当前项目模态框是否可见、打开模态框的函数和关闭模态框的函数。
 *
 * @returns 数组，包含三个元素：项目模态框是否可见、打开模态框的函数和关闭模态框的函数。
 */

export const useProjectModal = () => {
  // 从 useUrlQueryParam 读取的数据都是字符串
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))
  const setUrlParams = useSetUrlSearchParam();

  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => setUrlParams({ projectCreate: false, editingProjectId: "" });
  const startEdit = (id: number) => setEditingProjectId({ editingProjectId: id })

  // 返回参数较多时，可以返回一个包含模态框是否可见、开、关 对象
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    isLoading,
    editingProject,
  }
}
