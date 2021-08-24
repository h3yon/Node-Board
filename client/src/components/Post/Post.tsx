import { Button, Modal, Typography } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { deletePostAPI, getPostAPI } from 'api/postApi';

import PostType from 'types/PostType';
import { defaultPost } from 'models/defaultPost';
import { formatDate } from 'utils/dateUtil';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import useParamsInt from 'hooks/useParamsInt';

const { Title, Text } = Typography;

const Post: FC = () => {
  const [post, setPost] = useState<PostType>(defaultPost);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useHistory();
  const postId = useParamsInt('postId');
  const { title, content, createdAt, updatedAt } = post;

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const resp = await getPostAPI(postId);
    setPost(resp);
  };

  const deletePost = async (postId: number) => {
    await deletePostAPI(postId);
  };

  const goEdit = () => {
    history.push(`/post/${postId}/edit`);
  };

  const onDelete = async () => {
    await deletePost(postId);
    history.replace('/');
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onModalOk = () => {
    setIsModalVisible(false);
    onDelete();
  };

  const onModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <PostWrapper>
        <Buttons>
          <Button type="primary" onClick={goEdit}>
            수정
          </Button>
          <Button onClick={showModal}>삭제</Button>
        </Buttons>
        <Title level={2}>
          No.{postId} {title}
        </Title>
        <Info>
          <Text>등록일 : {formatDate(createdAt)}</Text>
          <Text>수정일 : {formatDate(updatedAt)}</Text>
        </Info>
        <Content>
          <Text>{content}</Text>
        </Content>
      </PostWrapper>
      <Modal title="게시글 삭제" visible={isModalVisible} onOk={onModalOk} onCancel={onModalCancel}>
        <p>삭제된 글은 복구가 불가능합니다.</p>
        <p>그래도 삭제하시겠습니까?</p>
      </Modal>
    </div>
  );
};

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f0f0;
  padding: 30px;
  div {
    margin-top: 20px;
  }
`;

const Buttons = styled.div`
  align-self: flex-end;
  button {
    margin-left: 10px;
  }
`;

const Info = styled.div`
  span {
    margin-right: 20px;
  }
`;

const Content = styled.div`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 30px;
  max-height: 400px;
  min-height: 200px;
  overflow: auto;
  line-height: 30px;
`;

export default Post;
