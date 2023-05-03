import { Link } from "react-router-dom"
import { Routes, Route, Navigate } from "react-router"
import KanbanScreen from "screens/kanban"
import EpicScreen from "screens/epic"

export const ProjectScreen = () => {

  return (
    <>
      <h2>ProjectScreen</h2>
      {/* kanban 如果是/kanban 跟路由模式时，点击跳转的时候，url就会把前面的路径清理掉 */}
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen />} />
        <Route path={'/epic'} element={<EpicScreen />} />
        {/* 如果匹配不上以上两个路由地址，那就都跳转到下面的地址 */}
        <Navigate to={window.location.pathname + '/kanban'} />
      </Routes>
    </>
  )
}