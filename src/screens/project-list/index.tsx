
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useDebounce } from "../../utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectScreenParams } from "./util";

// 基本数据类型，组件状态 可以放到 hooks 的依赖里面
// 非组件状态的对象，不可以放到 hooks 的依赖里面；会引起无限渲染
export const ProjectListScreen = () => {
  const [param, setParam] = useProjectScreenParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} list={list || []} />
    </Container>
  );
};

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