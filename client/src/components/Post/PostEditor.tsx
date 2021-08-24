import { Button, Form, Input, Modal } from 'antd';
import React, { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react';

import PostType from 'types/PostType';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const { Item } = Form;
const { TextArea } = Input;

interface PostUpdateProps {
  postForm: PostType;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onSubmit: MouseEventHandler<HTMLElement>;
}

const PostEditor: FC<PostUpdateProps> = ({ postForm, onChange, onSubmit }: PostUpdateProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const { title, content } = postForm;
  console.log('포스트폼', postForm);

  const onCancel = () => {
    history.goBack();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onModalOk = () => {
    setIsModalVisible(false);
    onCancel();
  };

  const onModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <PostEditorWrapper>
      <Buttons>
        <Button type="primary" onClick={onSubmit}>
          확인
        </Button>
        <Button onClick={showModal}>취소</Button>
      </Buttons>
      <Form>
        <Item label="제목" valuePropName="title">
          <Input name="title" value={title} onChange={onChange} />
        </Item>
        <Item label="내용" valuePropName="content">
          <TextArea name="content" value={content} onChange={onChange} />
        </Item>
      </Form>
      <Modal title="글 작성 취소" visible={isModalVisible} onOk={onModalOk} onCancel={onModalCancel}>
        <p>작성중인 글이 삭제됩니다.</p>
        <p>글 작성을 취소하겠습니까?</p>
      </Modal>
    </PostEditorWrapper>
  );
};

const PostEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  padding: 30px;
  .ant-form-item {
    margin: 20px 0px;

    textarea {
      height: 300px;
      text-overflow: auto;
    }
  }
`;

const Buttons = styled.div`
  align-self: flex-end;
  button {
    margin-left: 10px;
  }
`;

export default PostEditor;
