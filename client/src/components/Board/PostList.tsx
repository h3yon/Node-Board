import React, { FC, useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import BoardQueryType from 'types/BoardQueryType';
import PostType from 'types/PostType';
import { Table } from 'antd';
import { formatDate } from 'utils/dateUtil';
import { getPostListAPI } from 'api/postApi';
import qs from 'qs';
import styled from 'styled-components';

const columns = [
  {
    title: 'ID',
    dataIndex: 'postId',
    key: 'postId',
  },
  {
    title: '메세지 제목',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '최초 등록일자',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: Date) => formatDate(date),
  },
  {
    title: '최종 수정일자',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (date: Date) => formatDate(date),
  },
];

const PostList: FC = () => {
  const [postList, setPostList] = useState<PostType[]>([]);
  const [postTotalSize, setPostTotalSize] = useState(0);
  const { search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  const { keyword = '', option = '', page = 1 }: BoardQueryType = query;
  const history = useHistory();

  useEffect(() => {
    fetchPostList();
  }, [search]);

  const fetchPostList = useCallback(async () => {
    const resp = await getPostListAPI(keyword, option, page);
    console.log(resp);
    setPostList(resp.postList);
    setPostTotalSize(resp.postTotalSize);
  }, [keyword, option, page]);

  const onRow = ({ postId }: PostType) => {
    const onRowClick = () => {
      history.push(`/post/${postId}`);
    };
    const rowProps = {
      onClick: onRowClick,
    };
    return rowProps;
  };

  const pagenationConfig = {
    total: postTotalSize,
    current: +page,
    showSizeChanger: false,
    showQuickJumper: false,
    onChange: async (newPage: number) => {
      history.push(`/?keyword=${keyword}&option=${option}&page=${newPage}`);
    },
  };

  return (
    <PostListWrapper>
      <Table columns={columns} dataSource={postList} onRow={onRow} rowKey="postId" pagination={pagenationConfig} />
    </PostListWrapper>
  );
};

const PostListWrapper = styled.div`
  width: 100%;
`;

export default PostList;
