import './App.scss';

import React, { ReactElement } from 'react';
import { Route, Switch } from 'react-router-dom';

import BoardPage from 'pages/BoardPage';
import PostCreatePage from 'pages/PostCreatePage';
import PostEditPage from 'pages/PostEditPage';
import PostPage from 'pages/PostPage';
import { Typography } from 'antd';

const { Title } = Typography;

function App(): ReactElement {
  return (
    <>
      <Title>게시판</Title>
      <div className="content">
        <Switch>
          <Route path="/" exact component={BoardPage} />
          <Route path="/post/create" exact component={PostCreatePage} />
          <Route path="/post/:postId" exact component={PostPage} />
          <Route path="/post/:postId/edit" exact component={PostEditPage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
