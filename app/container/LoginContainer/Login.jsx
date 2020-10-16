/**
 * @author: x
 * @date: 2020/10/15 15:39
 * @description: Login
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ajax from '../../ajax';
import * as actions from '../../action'
import store from '../../store'
import socket from '../../socket'
import style from './style.css'

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  handleClick = e => {
    // TODO: 去登陆/注册
    const { name } = this.state;
    const { setUserLogin } = this.props;
    // FIXME: 不需要密码
    ajax.get(`/login?name=${name}`).then(res => {
      if (!res.err) {
        // TODO: 设置用户信息
        store.dispatch(setUserLogin({
          name: res.name
        }));
        // NOTE: 通知服务端新人加入
        socket.emit('user_join', { name: res.name });
      }
    });
  }

  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    let { name } = this.state;
    return (
      <div className={style.container}>
        <input type="text" value={name} onChange={this.handleChange} placeholder="输入用户名" />
        <button className={style.button} onClick={this.handleClick}>登陆</button>
        <div className={style.tips}>Tips:若用户名存在将会登陆，否则将直接注册新用户</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setUserLogin: actions.setUserLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
