import moment from 'moment';
import postType from 'types/PostType';

export const defaultPost: postType = {
  postId: 0,
  title: '',
  content: '',
  createdAt: moment().toDate(),
  updatedAt: moment().toDate(),
};
