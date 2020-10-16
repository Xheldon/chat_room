/**
 * @author: x
 * @date: 2020/10/15 15:33
 * @description: 根节点
 */

import React from 'react';
import { connect } from 'react-redux';

import ChatContainer from './container/ChatContainer/Chat';
import LoginContainer from './container/LoginContainer/Login';

import style from './base.css';

function App(props) {
  const { user } = props;
  return (
    <div className={style.container}>
      { user.isLogin ? <ChatContainer /> : <LoginContainer /> }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps
)(App);
