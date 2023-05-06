import styled from "@emotion/styled"
import { Button, Dropdown, Menu, MenuProps, Space, Switch } from "antd"
import { ButtonNoPadding, Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import { ReactComponent as SoftWareLogo } from 'assets/jirasoftware.svg'
import { Navigate, Route, Routes } from "react-router"
import { BrowserRouter as Router } from "react-router-dom"
import { ProjectScreen } from "screens/project"
import { resetRoute } from "utils"
import { useState } from "react"
import { ProjectModal } from "screens/project-list/project-modal"
import { ProjectPopover } from "components/project-popover"

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const onClose = () => setProjectModalOpen(false)

  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <Main>
        <Router>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen} />} />
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
            <Navigate to={'/projects'} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal projectModalOpen={projectModalOpen} onClose={onClose} />
    </Container>
  )
}

const PageHeader = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute} style={{ display: 'flex', justifyContent: 'space-around' }}>
          <SoftWareLogo width={'2.5rem'} color={'rgb(38,132,255)'} />
          <h3>Jira SoftWare</h3>
        </ButtonNoPadding>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button type={'link'} target="_blank" onClick={logout}>
          登出
        </Button>
      ),
    },
  ]

  return (
    <Dropdown menu={{ items }}>
      <Button type={'link'} onClick={(e) => e.preventDefault()}>
        <Space>
          Hi~,{user?.name}
        </Space>
      </Button>
    </Dropdown>
  )
}


const Container = styled.div``

const Header = styled(Row)`
padding: 1.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1)
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.div``