import { Button, Drawer } from "antd"
import { useProjectModal } from "./util"


export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal()

  return (
    <Drawer width={'100%'} open={projectModalOpen} onClose={close}>
      <h2>project Modal</h2>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  )
}