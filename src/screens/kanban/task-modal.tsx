import { useForm } from "antd/es/form/Form"
import { useTasksModal, useTasksQueryKey } from "./util"
import { useEditTask } from "utils/kanban"
import { useEffect } from "react"
import { Button, Form, Input, Modal } from "antd"
import { UserSelect } from "components/user-select"
import { TaskTypeSelect } from "components/task-type-select"
import styled from "@emotion/styled"
import { useDeleteTask } from "utils/task"


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

export const TaskModal = () => {
  const [form] = useForm()
  const { editingTaskId, editingTask, close } = useTasksModal()
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey())
  const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey())

  const onCancel = () => {
    close()
    form.resetFields()
  }

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() })
    close()
  }

  const startDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除当前项？',
      onOk() {
        return deleteTask({ id: Number(editingTaskId) })
      },
    })
    onCancel()
  }


  useEffect(() => {
    form.setFieldsValue(editingTask)
  }, [form, editingTask])

  return <Modal
    forceRender={true}      // forceRender 为true 强制渲染
    centered={true}
    footer={null}           // 取消默认的底部按钮
    confirmLoading={editLoading}
    title={'编辑任务'}
    open={!!editingTaskId}
    onCancel={onCancel}
    style={{ textAlign: 'center' }}
  >
    <Form
      {...layout}
      initialValues={editingTask}
      form={form}
      style={{ paddingRight: '8rem' }}
    >
      <Form.Item
        label={'任务名'}
        name={'name'}
        rules={[{ required: true, message: '请输入任务名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={'经办人'}
        name={'processorId'}
      >
        <UserSelect
          defaultOptionName={'经办人'}
        />
      </Form.Item>
      <Form.Item
        label={'类型'}
        name={'typeId'}
      >
        <TaskTypeSelect />
      </Form.Item>
    </Form>
    <div style={{ textAlign: 'center' }}>
      <Button onClick={startDelete} size={'small'}>删除</Button>
    </div>
    <Footer className="modal-footer">
      <ButtonSpace key="cancel" onClick={onCancel}>取消</ButtonSpace>
      <ButtonSpace key="submit" type="primary" onClick={onOk}>确定</ButtonSpace>
    </Footer>
  </Modal>
}

const Footer = styled.div`
text-align: center;
margin-top: 1rem;
`
const ButtonSpace = styled(Button)`
  margin: 0 1rem;
`
