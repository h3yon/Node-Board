import React, { FC, useCallback } from 'react';

import { Button } from 'antd';
import PostList from 'components/Board/PostList';
import PostSearch from 'components/Board/PostSearch';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Board: FC = () => {
  const history = useHistory();

  const goCreate = useCallback(() => {
    history.push('/post/create');
  }, []);

  return (
    <BoardWrapper>
      <CreatePostButton type="primary" onClick={goCreate}>
        글쓰기
      </CreatePostButton>
      <PostSearch />
      <PostList />
    </BoardWrapper>
  );
};

const BoardWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const CreatePostButton = styled(Button)`
  width: 100px;
  margin-bottom: 20px;
`;

export default Board;
