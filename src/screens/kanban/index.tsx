
import React, { useEffect, useRef, useState, WheelEvent } from 'react'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './util'
import { KanbanColumn } from './kanban-column'
import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'
import { ScreenContainer } from 'components/lib'
import { useTasks } from 'utils/task'
import { Spin } from 'antd'
import { CreateKanban } from './create-kanban'
import { Task } from 'types/task'
import { TaskModal } from './task-modal'

function KanbanScreen() {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = kanbanIsLoading || taskIsLoading

  const [isActive, setIsActive] = useState<boolean>(true);

  const getTasks = (tasks: Task[] | undefined) => {
    if (tasks) setIsActive(false)
    return tasks
  }

  // 添加鼠标滚动，看板列表左右滑动功能
  const listRef = useRef<HTMLDivElement>(null);
  const handleScroll = (event: WheelEvent<HTMLDivElement>) => {
    const scrollAmount = event.deltaY;
    if (listRef.current && isActive) {
      listRef.current.scrollLeft += scrollAmount;
    }
  };

  return (<ScreenContainer>
    <h2> {currentProject?.name}看板</h2>
    <SearchPanel />
    {
      isLoading
        ? (<Spin size={'large'} />)
        : (<ColumnsContainer onWheel={handleScroll} ref={listRef} >
          {kanbans?.map(kanban => <KanbanColumn
            key={kanban.id}
            kanban={kanban}
            getTasks={getTasks}
          />
          )}
          <CreateKanban />
        </ColumnsContainer>)
    }
    < TaskModal />
  </ScreenContainer>
  )
}

export const ColumnsContainer = styled.div`
display: flex;
overflow-x: scroll;
flex: 1;
`
export default KanbanScreen
