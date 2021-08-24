import { Input, Select } from 'antd';
import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import BoardQueryType from 'types/BoardQueryType';
import qs from 'qs';
import styled from 'styled-components';

const { Search, Group } = Input;
const { Option } = Select;

const PostSearch: FC = () => {
  const [keywordInput, setKeywordInput] = useState('');
  const [optionInput, setOptionInput] = useState('제목');
  const history = useHistory();
  const { search } = useLocation();
  const query: BoardQueryType = qs.parse(search, { ignoreQueryPrefix: true });
  const { page = 1 } = query;

  const onChangeKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeywordInput(value);
  }, []);

  const onChangeOption = useCallback((option: string) => {
    setOptionInput(option);
  }, []);

  const onSearch = useCallback(() => {
    history.push(`/?keyword=${keywordInput}&option=${optionInput}&page=${page}`);
  }, [history, keywordInput, optionInput, page]);

  return (
    <PostSearchWrapper>
      <Select value={optionInput} onChange={onChangeOption}>
        <Option value="1">제목</Option>
        <Option value="2">내용</Option>
        <Option value="3">제목 + 내용</Option>
      </Select>
      <Search placeholder="검색어를 입력하세요" onSearch={onSearch} onChange={onChangeKeyword} value={keywordInput} />
    </PostSearchWrapper>
  );
};

const PostSearchWrapper = styled(Group)`
  display: flex;
  width: 400px;
  margin: 0 0 20px auto;

  .ant-select {
    width: 150px;
  }
`;

export default PostSearch;
