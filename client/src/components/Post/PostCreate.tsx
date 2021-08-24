import React, { ChangeEvent, FC, MouseEvent, useState } from 'react';

import PostEditor from 'components/Post/PostEditor';
import PostType from 'types/PostType';
import { createPostAPI } from 'api/postApi';
import { defaultPost } from 'models/defaultPost';
import produce from 'immer';
import { useHistory } from 'react-router-dom';

const PostCreate: FC = () => {
  const [postForm, setPostForm] = useState<PostType>(defaultPost);
  const history = useHistory();

  const createPost = async (postForm: PostType) => {
    await createPostAPI(postForm);
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
    await createPost(postForm);
    history.replace('/');
  };

  return <PostEditor postForm={postForm} onChange={onChange} onSubmit={onSubmit} />;
};

export default PostCreate;
