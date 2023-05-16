import styled from "@emotion/styled"
import { Button, Dropdown, Menu, MenuProps, Space, Switch } from "antd"
import { ButtonNoPadding, Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import { ReactComponent as SoftWareLogo } from 'assets/software-logo.svg'
import { Navigate, Route, Routes } from "react-router"
import { BrowserRouter as Router } from "react-router-dom"
import { ProjectScreen } from "screens/project"
import { resetRoute } from "utils"
import { ProjectModal } from "screens/project-list/project-modal"
import { ProjectPopover } from "components/project-popover"

export const AuthenticatedApp = () => {

  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />} />
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
            <Navigate to={'/projects'} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  )
}

const PageHeader = () => {

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute} style={{ display: 'flex', justifyContent: 'space-around' }}>
          <SoftWareLogo width={'15rem'} color={'rgb(38,132,255)'} />
        </ButtonNoPadding>
        <ProjectPopover />
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


const Container = styled.div`
 display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

const Header = styled(Row)`
padding: 1.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1)
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const Main = styled.main`
display:flex;
overflow: hidden;
`