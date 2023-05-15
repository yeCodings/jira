import React from "react"
import { User } from "./search-panel";
import { Dropdown, Menu, MenuProps, Modal, Table } from "antd";
import { TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectQueryKey } from "./util";
import { Project } from "types/project";


interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey())
  // 先得到id，后得到pin，可以使用函数柯理化编写pinProject函数
  const pinProject = (id: number) => (pin: boolean) => { mutate({ id, pin }) }

  return <Table pagination={false} rowKey={'id'} columns={[
    {
      title: <Pin checked={true} disabled={true} />,
      render(value, project) {
        return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
      }
    },
    {
      title: '名称',
      // localeCompare 是 JavaScript 字符串对象的方法，用于比较两个字符串并返回其在字母表中的排序顺序。这个方法可以通过字符串对象的原型链直接调用
      sorter: (a, b) => a.name.localeCompare(b.name),
      render(value, project) {
        return (
          <Link to={`${String(project.id)}`}>{project.name}</Link>
        );
      }
    },
    {
      title: '部门',
      dataIndex: 'organization',
    },
    {
      title: '负责人',
      render(value, project) {
        return <span>
          {users.find(user => user.id === project.personId)?.name || '未知'}
        </span>
      }
    },
    {
      title: '创建时间',
      render(value, project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
        </span>
      }
    },
    {
      render(value, project) {
        return <More project={project} />
      }
    }
  ]} {...props} />
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey())

  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗？',
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteProject({ id })
      }
    })
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Menu.Item onClick={editProject(project.id)} >编辑</Menu.Item>
      ),
    },
    {
      key: '2',
      label: (
        <Menu.Item onClick={() => confirmDeleteProject(project.id)} >删除</Menu.Item>
      ),
    }
  ]

  return (<Dropdown
    menu={{ items }}
  // 自定义下拉框内容
  // dropdownRender={(menu) =>
  //   <Menu items={items} />
  // }
  >
    <ButtonNoPadding style={{ border: 'none' }}>...</ButtonNoPadding>
  </Dropdown>
  )
}