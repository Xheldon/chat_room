/**
 * @author: x
 * @date: 2020/10/15 15:44
 * @description: store
 */

import { combineReducers, createStore } from 'redux';

const initUser = {
  isLogin: false,
  name: null,
  nickName: null // TODO
};

const initMessage = [];

function setUserInfo(state = initUser, action) {
  switch (action.type) {
    case 'USER_INIT':
    case 'USER_UPDATE':
      return {...state, ...action.data};
    case 'USER_STATUS':
      return {...state, online: action.data.online}
    default:
      return state;
  }
}

function setMessageInfo(state = initMessage, action) {
  switch (action.type) {
    case 'MESSAGE_ADD':
      // data: {type|text|from}
      state.push({...action.data});
      return Array.from(state);
    default:
      return state;
  }
}

export default createStore(combineReducers({
  user: setUserInfo,
  message: setMessageInfo
}));