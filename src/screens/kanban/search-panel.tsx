import { useSetUrlSearchParam } from "utils/url"
import { useTasksSearchParams } from "./util"
import { Row } from "components/lib"
import { Button, Input } from "antd"
import { UserSelect } from "components/user-select"
import { TaskTypeSelect } from "components/task-type-select"

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const reset = () => {
    setSearchParams({
      projectId: undefined,
      name: undefined,
      typeId: undefined,
      processorId: undefined,
    })
  }
  return <Row marginBottom={3} gap={true}>
    <Input
      style={{ width: '20rem' }}
      placeholder={'任务名'}
      value={searchParams.name}
      onChange={(evn) => setSearchParams({ name: evn.target.value })}
    />
    <UserSelect
      defaultOptionName={'经办人'}
      value={searchParams.processorId}
      onChange={value => setSearchParams({ processorId: value })}
    />
    <TaskTypeSelect
      defaultOptionName={'类型'}
      value={searchParams.typeId}
      onChange={value => setSearchParams({ typeId: value })}
    />
    <Button onClick={reset}>清除筛选器</Button>
  </Row>
}