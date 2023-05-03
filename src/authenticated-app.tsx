import styled from "@emotion/styled"
import { Button, Dropdown, Menu, MenuProps, Space, Switch } from "antd"
import { Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import { ReactComponent as SoftWareLogo } from 'assets/jirasoftware.svg'
import { Navigate, Route, Routes } from "react-router"
import { BrowserRouter as Router } from "react-router-dom"
import { ProjectScreen } from "screens/project"
import { resetRoute } from "utils"

export const AuthenticatedApp = () => {

  return (
    <Container>
      <PageHeader />
      <Main>
        <Router>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />} />
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
            <Navigate to={'/projects'} />
          </Routes>
        </Router>
      </Main>
    </Container>
  )
}

const PageHeader = () => {

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
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={'link'} onClick={resetRoute} style={{ display: 'flex', justifyContent: 'space-around' }}>
          <SoftWareLogo width={'2.5rem'} color={'rgb(38,132,255)'} />
          <h3>Jira SoftWare</h3>
        </Button>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items }}>
          <Button type={'link'} onClick={(e) => e.preventDefault()}>
            <Space>
              Hi~,{user?.name}
            </Space>
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
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