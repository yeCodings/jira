import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useDebounce } from "../../utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";


// 基本数据类型，组件状态 可以放到 hooks 的依赖里面
// 非组件状态的对象，不可以放到 hooks 的依赖里面；会引起无限渲染
export const ProjectListScreen = () => {
  const [param, setParam] = useProjectSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  const { open } = useProjectModal()

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {/* {props.projectButton} */}
        <ButtonNoPadding
          type={'link'}
          onClick={open}
        >创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false

/**
// class组件里面的设置

class Test extends React.Component<any, any> {
  static whyDidYouRender = true
} 

*/


const Container = styled.div`
padding: 3.2rem;
`