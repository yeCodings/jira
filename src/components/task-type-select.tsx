
import { IdSelect } from "./id-select"
import { useTaskTypes } from "utils/task-type"

// 项目列表搜索的参数
export const TaskTypeSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes()
  return <IdSelect options={taskTypes || []} {...props}></IdSelect>
}