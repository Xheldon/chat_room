/**
 * @author: x
 * @date: 2020/10/15 20:23
 * @description: action
 */

// action 创建函数
export function setUserInfo(status) {
  return {
    type: 'USER_UPDATE',
    data: status
  }
}

export function setUserLogin(data) {
  return {
    type: 'USER_UPDATE',
    data: {
      isLogin: true,
      name: data.name
    }
  }
}
export function setUserStatus(data) {
  return {
    type: 'USER_STATUS',
    data: {
      online: data
    }
  }
}

export function setUserLogOut() {
  return {
    type: 'USER_UPDATE',
    data: {
      isLogin: false,
      name: null
    }
  }
}

export function addMessage(data) {
  return {
    type: 'MESSAGE_ADD',
    data
  }
}
