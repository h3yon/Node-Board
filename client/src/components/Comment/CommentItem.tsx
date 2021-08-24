import React, { FC, useCallback, useState } from 'react';

import { Comment } from 'antd';
import CommentEditor from './CommentEditor';
import CommentType from 'types/CommentType';
import { deleteCommentAPI } from 'api/commentApi';
import styled from 'styled-components';

interface CommentItemProps {
  comment: CommentType;
  children: React.ReactNode;
  fetchCommentList: () => Promise<void>;
}

const CommentItem: FC<CommentItemProps> = ({ comment, children, fetchCommentList }: CommentItemProps) => {
  const [showCommentEditor, setShowCommentEditor] = useState(false);
  const { id, email, content, seq } = comment;

  const deleteComment = useCallback(async () => {
    await deleteCommentAPI(id);
    await fetchCommentList();
  }, [fetchCommentList, id]);

  const onReply = useCallback(() => {
    setShowCommentEditor(!showCommentEditor);
  }, [showCommentEditor]);

  const onDelete = useCallback(() => {
    deleteComment();
  }, [deleteComment]);

  return (
    <CommentItemWrapper
      author={email}
      content={content}
      actions={[
        <button key="reply" onClick={onReply}>
          답글달기
        </button>,
        <button key="delete" onClick={onDelete}>
          삭제
        </button>,
      ]}
    >
      {children}
      {showCommentEditor && (
        <CommentEditor repliedFormId={id} repliedFormDepth={seq} fetchCommentList={fetchCommentList} />
      )}
    </CommentItemWrapper>
  );
};

const CommentItemWrapper = styled(Comment)`
  border: 1px solid #f0f0f0;
  padding: 15px;
  margin: 10px 0;
  .ant-comment-inner {
    padding: 0;

    .ant-comment-content {
      display: flex;
      flex-flow: row wrap;
      .ant-comment-content-author {
        order: 1;
        margin: 0;
        justify-content: center;
        span {
          font-size: 13px;
          margin: auto 0;
        }
      }
      .ant-comment-content-detail {
        order: 3;
        width: 100%;
        overflow: auto;
        min-height: 30px;
        max-height: 100px;
        margin-top: 5px;
      }
      .ant-comment-actions {
        margin: 0;
        order: 2;
        button {
          background: none;
          border: none;
          font-size: 13px;
        }
      }
    }
  }
`;

export default React.memo(CommentItem);
