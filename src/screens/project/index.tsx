import { Link } from "react-router-dom"
import { Routes, Route, Navigate, useLocation } from "react-router"
import { KanbanScreen } from "screens/kanban"
import EpicScreen from "screens/epic"
import styled from "@emotion/styled"
import { Menu } from "antd"

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

export const ProjectScreen = () => {
  const routeType = useRouteType()

  return (
    <Container>
      <Aside>
        <Menu mode={'inline'} selectedKeys={[routeType]}>
          <Menu.Item key={'kanban'}>
            {/* kanban 如果是/kanban 跟路由模式时，点击跳转的时候，url就会把前面的路径清理掉 */}
            <Link to={'kanban'}>看板</Link>
          </Menu.Item>

          <Menu.Item key={'epic'}>
            <Link to={'epic'}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={'/kanban'} element={<KanbanScreen />} />
          <Route path={'/epic'} element={<EpicScreen />} />
          {/* 如果匹配不上以上两个路由地址，那就都跳转到下面的地址  replace={true} 代表替换当前的历史记录，跳出这个循环 */}
          <Navigate to={window.location.pathname + '/kanban'} replace={true} />
        </Routes>
      </Main>
    </Container>
  )
}

const Aside = styled.aside`
background-color: rgb(244,245,247);
display: flex; 
`

const Main = styled.div`
box-shadow: -5px 0 5px -5px rgba(0,0,0,0.1);
display: flex;
overflow: hidden;
`

const Container = styled.div`
display: flex;
grid-template-columns: 16rem 1fr;
overflow: hidden;
`