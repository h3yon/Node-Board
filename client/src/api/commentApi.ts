import CommentType from 'types/CommentType';
import axios from 'axios';

const url = 'https://localhost:4000/api/posts';

export async function getCommentListAPI(postId: number): Promise<CommentType[]> {
  const resp = await axios.get(`${url}/${postId}/comments`);
  console.log('하이하이', resp.data.result);
  return resp.data.result;
}

export async function createCommentAPI(repliedId: number, commentForm: CommentType): Promise<void> {
  await axios.post(url, commentForm, {
    params: { repliedId },
  });
}

export async function deleteCommentAPI(commentId: number): Promise<void> {
  await axios.delete(`${url}/${commentId}`);
}
