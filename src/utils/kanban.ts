import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { useQuery } from "react-query";

// 获取kanbans 列表信息
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(['kanbans', param], () => client('kanbans', { data: param }))
}