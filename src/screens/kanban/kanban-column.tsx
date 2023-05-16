import { Kanban } from "types/kanban"
import { useTasks } from "utils/task"
import { useKanbansQueryKey, useTasksModal, useTasksSearchParams } from "./util"
import { useTaskTypes } from "utils/task-type"
import taskIcon from 'assets/task_one.svg'
import bugIcon from 'assets/task.svg'
import styled from "@emotion/styled"
import { Card, Dropdown, Menu, MenuProps, Modal } from "antd"
import { CreateTask } from "./create-task"
import { Task } from "types/task"
import { Mark } from "components/mark"
import { useDeleteKanban } from "utils/kanban"
import { ButtonNoPadding, Row } from "components/lib"

interface KanbanColumnProps {
  kanban: Kanban;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  getTasks: (tasks: Task[] | undefined) => void;
}

// 看板icon
const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) return null

  return <img alt={'task-icon'} src={name === 'task' ? taskIcon : bugIcon} style={{ width: '1.8rem' }} />
}

// 看板 taskCard
const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal()
  const { name: keyword } = useTasksSearchParams()

  return <Card
    key={task.id}
    style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
    onClick={() => startEdit(task.id)}
  >
    <p> <Mark keyword={keyword} name={task.name} /></p>
    <TaskTypeIcon id={task.typeId} />
  </Card>
}

// 看板列表
export const KanbanColumn = ({ kanban, getTasks }: KanbanColumnProps) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)

  if (tasks && tasks.length >= 5) getTasks(tasks)

  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        {
          tasks?.map(task => <TaskCard task={task} />)
        }
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  )
}

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey())

  const startEdit = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板？',
      onOk() {
        return mutateAsync({ id: kanban.id })
      }
    })
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Menu.Item onClick={startEdit} >删除</Menu.Item>
      ),
    }
  ]

  return (<Dropdown menu={{ items }}>
    <ButtonNoPadding style={{ border: 'none' }}>...</ButtonNoPadding>
  </Dropdown>
  )

}



export const Container = styled.div`
min-width: 27rem;
border-radius: 6px;
background-color: rgb(244,245,247);
display: flex;
flex-direction: column;
padding: 0.7rem 0.7rem 1rem;
margin-right: 1.5rem;
`
const TasksContainer = styled.div`
overflow: scroll;

::-webkit-scrollbar{
  display: none;
}
`