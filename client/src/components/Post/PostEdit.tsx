import React, { ChangeEvent, FC, MouseEvent, useEffect, useState } from 'react';
import { getPostAPI, updatePostAPI } from 'api/postApi';

import PostEditor from 'components/Post/PostEditor';
import PostType from 'types/PostType';
import { defaultPost } from 'models/defaultPost';
import produce from 'immer';
import { useHistory } from 'react-router-dom';
import useParamsInt from 'hooks/useParamsInt';

const PostEdit: FC = () => {
  const [postForm, setPostForm] = useState<PostType>(defaultPost);
  const postId = useParamsInt('postId');
  const history = useHistory();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const resp = await getPostAPI(postId);
    setPostForm(resp);
  };

  const updatePost = async (postForm: PostType) => {
    await updatePostAPI(postForm);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostForm(
      produce((draft) => {
        draft[name] = value;
      }),
    );
  };

  const onSubmit = async (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await updatePost(postForm);
    history.goBack();
  };

  return <PostEditor postForm={postForm} onChange={onChange} onSubmit={onSubmit} />;
};

export default PostEdit;
