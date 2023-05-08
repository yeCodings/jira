import React from "react"
import { User } from "./search-panel";
import { Button, Dropdown, Menu, MenuProps, Space, Table } from "antd";
import { TableProps } from "antd/es/table";
import dayjs from "dayjs";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { UserOutlined } from '@ant-design/icons'
import { useDispatch } from "react-redux";
import { projectListAction } from "./project-list.slice";


export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  list: Project[];
  reFresh?: () => void;
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject()
  const dispatch = useDispatch()
  // 先得到id，后得到pin，可以使用函数柯理化编写pinProject函数
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.reFresh)

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
        return <Dropdown
          // 自定义下拉框内容
          dropdownRender={(menu) =>
            <ButtonNoPadding
              type={'link'}
              onClick={() => dispatch(projectListAction.openProjectModal())}
            >创建项目</ButtonNoPadding>
          }
        >
          <ButtonNoPadding style={{ border: 'none' }}>...</ButtonNoPadding>
        </Dropdown>
      }
    }
  ]} dataSource={props.list} />
}