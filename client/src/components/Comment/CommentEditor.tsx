import { Button, Comment, Input } from 'antd';
import React, { ChangeEvent, FC, useCallback, useState } from 'react';

import CommentType from 'types/CommentType';
import { createCommentAPI } from 'api/commentApi';
import { defaultComment } from 'models/defaultComment';
import { produce } from 'immer';
import styled from 'styled-components';

const { TextArea } = Input;

interface CommentEditorProps {
  repliedFormId: number;
  repliedFormDepth?: number;
  fetchCommentList: () => Promise<void>;
}

const CommentEditor: FC<CommentEditorProps> = ({
  repliedFormId,
  repliedFormDepth = 0,
  fetchCommentList,
}: CommentEditorProps) => {
  const [commentForm, setCommentForm] = useState<CommentType>(defaultComment);
  const { content } = commentForm;

  const createComment = useCallback(async () => {
    const replyCommentForm = {
      ...commentForm,
      depth: repliedFormDepth + 1,
    };

    await createCommentAPI(repliedFormId, replyCommentForm);
    await fetchCommentList();
  }, [fetchCommentList, repliedFormId, repliedFormDepth, commentForm]);

  const onChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCommentForm(
      produce((draft) => {
        draft[name] = value;
      }),
    );
  }, []);

  const onSubmit = useCallback(async () => {
    await createComment();
    setCommentForm(defaultComment);
  }, [createComment]);

  return (
    <CommentEditorWrapper
      author={defaultComment.email}
      content={
        <>
          <TextArea name="content" value={content} onChange={onChange} />
          <Button type="primary" onClick={onSubmit}>
            댓글 작성하기
          </Button>
        </>
      }
    />
  );
};

const CommentEditorWrapper = styled(Comment)`
  margin-top: 10px;
  .ant-comment-content {
    display: flex;
    flex-flow: column wrap;

    textArea {
      width: 100%;
    }

    button {
      margin-top: 10px;
      align-self: flex-end;
    }
  }
`;

export default React.memo(CommentEditor);
