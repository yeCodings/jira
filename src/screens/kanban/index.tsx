
import React from 'react'
import { useDocumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { useKanbanSearchParams, useProjectInUrl } from './util'
import { KanbanColumn } from './kanban-column'
import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'

function KanbanScreen() {
  useDocumentTitle('看板列表')
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  console.log('data: kanbans', kanbans)
  const { data: currentProject } = useProjectInUrl()

  return (<div>
    <h2> {currentProject?.name}看板</h2>
    <SearchPanel />
    <ColumnsContainer >
      {kanbans?.map(kanban => <KanbanColumn key={kanban.id} kanban={kanban} />)}
    </ColumnsContainer>
  </div>
  )
}


const ColumnsContainer = styled.div`
display: flex;
overflow: hidden;
margin-right: 2rem;
`


export default KanbanScreen
