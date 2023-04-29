import styled from "@emotion/styled"
import { Button, Dropdown, Menu, MenuProps, Space } from "antd"
import { Row } from "components/lib"
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"
import { ReactComponent as SoftWareLogo } from 'assets/jirasoftware.svg'



export const AuthenticatedApp = () => {
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
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftWareLogo width={'2.5rem'} color={'rgb(38,132,255)'} />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          {/* <Dropdown >
            <Menu>
              <Menu.Item key={'logout'}>
                <a onClick={logout}>登出</a>
              </Menu.Item>
              <a onClick={e => e.preventDefault()}>Hi~,{user?.name}</a>
            </Menu>
          </Dropdown> */}
          <Dropdown menu={{ items }}>
            <Button type={'link'} onClick={(e) => e.preventDefault()}>
              <Space>
                Hi~,{user?.name}
              </Space>
            </Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}


const Container = styled.div`
/* display: grid;
grid-template-rows: 6rem 1rf;
height: 100vh; */
`


const Header = styled(Row)`
padding: 1.2rem;
box-shadow: 0 0 5px 0 rgba(0,0,0,0.1)
`

const HeaderLeft = styled(Row)`
`

const HeaderRight = styled.div`
`
const Main = styled.div`
`