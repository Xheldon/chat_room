/**
 * @author: x
 * @date: 2020/10/15 15:31
 * @description: 入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';
import * as actions from './action';
import AppContainer from './App.jsx';
import * as ajax from './ajax';

const rootElement = document.getElementById('root');


ajax.get('/').then(res => {
  if (res) {
    // NOTE：已经登录，进入聊天室
    store.dispatch(actions.setUserInfo({
      isLogin: true,
      online: true,
      name: res.name
    }));
  }
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    rootElement
  );
});