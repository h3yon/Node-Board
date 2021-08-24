import React, { FC } from 'react';

import CommentItem from 'components/Comment/CommentItem';
import CommentType from 'types/CommentType';

interface CommentListProps {
  commentList: CommentType[];
  fetchCommentList: () => Promise<void>;
}

const CommentList: FC<CommentListProps> = ({ commentList, fetchCommentList }: CommentListProps) => {
  return (
    <>
      {commentList.map((comment) => {
        // console.log(comment);
        const {
          id,
          //   ,subCommentList
        } = comment;

        return (
          <CommentItem key={id} comment={comment} fetchCommentList={fetchCommentList}>
            {/* <CommentList commentList={subCommentList} fetchCommentList={fetchCommentList} /> */}
          </CommentItem>
        );
      })}
    </>
  );
};

export default React.memo(CommentList);
