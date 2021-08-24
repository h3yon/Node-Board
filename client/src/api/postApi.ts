import PostType from 'types/PostType';
import axios from 'axios';

const url = 'https://localhost:4000/api/posts';

interface getPostListReturn {
  postList: PostType[];
  postTotalSize: number;
}

export async function getPostListAPI(keyword = '', option = '', page = 1): Promise<getPostListReturn> {
  const resp = await axios.get(url, {
    params: { keyword, option, page: page - 1 },
  });
  console.log(resp.data.result);
  return { postList: resp.data.result, postTotalSize: resp.data.result.length };
}

export async function getPostAPI(postId: number): Promise<PostType> {
  const resp = await axios.get(`${url}/${postId}`);
  return resp.data.result;
}

export async function createPostAPI(postForm: PostType): Promise<void> {
  await axios.post(url, postForm);
}

export async function updatePostAPI(postForm: PostType): Promise<void> {
  const { postId } = postForm;
  await axios.put(`${url}/${postId}`, postForm);
}

export async function deletePostAPI(postId: number): Promise<void> {
  await axios.delete(`${url}/${postId}`);
}
