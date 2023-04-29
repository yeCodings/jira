import React, { useState, useEffect } from "react"
import { SearchPanel } from "./search-panel"
import { List } from './list'
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {

  const [users, setUsers] = useState([]);

  const [param, setParam] = useState({
    name: '',
    personId: ''
  });

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
      {/* <Helmet><title>项目列表</title></Helmet> */}
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  )
}

const Container = styled.div`
padding: 3.2rem;
`