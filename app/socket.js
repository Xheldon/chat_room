/**
 * @author: x
 * @date: 2020/10/15 16:16
 * @description: message.js
 */

import io from 'socket.io-client';
import store from './store';
import * as actions from './action';

const socket = io('ws://localhost:10010');

socket.on('login', data => {
  // 将消息附加到 dom 中
});

socket.on('user_join', data => {
  // NOTE：有用户加入欢迎
  store.dispatch(actions.addMessage({
    type: 'user_join',
    text: `欢迎用户 ${data.name} 加入！`,
    key: Date.now() + Math.random() // FIXME
  }));
});

socket.on('user_leave', data => {
  // NOTE：有用户离开欢送
  store.dispatch(actions.addMessage({
    type: 'user_leave',
    text: `欢送用户 ${data.name} 离开！`,
    key: Date.now() + Math.random() // FIXME
  }));
});

socket.on('message_new', data => {
  store.dispatch(actions.addMessage({
    type: 'message_new',
    key: Date.now() + Math.random(), // FIXME
    ...data
  }));
});

socket.on('connect', () => {
  // 提醒已连接
  store.dispatch(actions.setUserStatus(true));
});

socket.on('disconnect', () => {
  // 提醒已断开连接
});

export default socket;
