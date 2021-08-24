import React, { FC, useCallback, useEffect, useState } from 'react';

import CommentEditor from 'components/Comment/CommentEditor';
import CommentList from 'components/Comment/CommentList';
import CommentType from 'types/CommentType';
import { getCommentListAPI } from 'api/commentApi';
import styled from 'styled-components';
import useParamsInt from 'hooks/useParamsInt';

const Comment: FC = () => {
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const postId = useParamsInt('postId');

  useEffect(() => {
    fetchCommentList();
  }, []);

  const fetchCommentList = useCallback(async () => {
    const resp = await getCommentListAPI(postId);
    setCommentList(resp);
  }, [postId]);

  return (
    <CommentWrapper>
      <CommentList commentList={commentList} fetchCommentList={fetchCommentList} />
      <CommentEditor repliedFormId={postId} fetchCommentList={fetchCommentList} />
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div`
  border: 1px solid #f0f0f0;
  margin-top: 20px;
  padding: 30px;
`;

export default Comment;
