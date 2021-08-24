import React, { FC } from 'react';

import { Button } from 'antd';
import Comment from 'components/Comment/Comment';
import Post from 'components/Post/Post';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const PostPage: FC = () => {
  const history = useHistory();

  return (
    <>
      <Post />
      <Comment />
      <GoMainButton type="primary" onClick={history.goBack}>
        목록으로
      </GoMainButton>
    </>
  );
};

const GoMainButton = styled(Button)`
  display: flex;
  align-self: center;
  margin: 10px auto;
`;

export default PostPage;
