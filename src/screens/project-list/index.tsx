import React, { useState, useEffect } from "react"
import { SearchPanel } from "./search-panel"
import { List } from './list'
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { useUrlQueryParam } from "utils/url";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {

  const [users, setUsers] = useState([]);

  // 基本数据类型，组件状态 可以放到 hooks 的依赖里面
  // 非组件状态的对象，不可以放到 hooks 的依赖里面；会引起无限渲染

  // const [keys, setKeys] = useState<('name' | 'personId')[]>(['name', 'personId'])
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])

  const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 200);
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  useDocumentTitle('项目列表', false)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = true

/**
// class组件里面的设置

class Test extends React.Component<any, any> {
  static whyDidYouRender = true
} 

*/


const Container = styled.div`
padding: 3.2rem;
`