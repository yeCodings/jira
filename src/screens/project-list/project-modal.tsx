import { Button, Drawer } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { projectListAction, selectProjectModalOpen } from "./project-list.slice"



export const ProjectModal = () => {
  const dispatch = useDispatch()
  // useSelector 读取总的状态
  const projectModalOpen = useSelector(selectProjectModalOpen)

  return (
    <Drawer width={'100%'}
      onClose={() => dispatch(projectListAction.closeProjectModal())}
      open={projectModalOpen}
    >
      <h2>project Modal</h2>
      <Button onClick={() => dispatch(projectListAction.closeProjectModal())}>关闭</Button>
    </Drawer>
  )
}