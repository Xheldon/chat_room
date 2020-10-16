/**
 * @author: x
 * @date: 2020/10/15 15:39
 * @description: Chat
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import style from './style.css';
import socket from '../../socket';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.msgContainerRef = React.createRef();
    this.inputRef = React.createRef();
    this.fileSelectRef = React.createRef();
  }

  handleClick = e => {
    const { user } = this.props;
    const { text } = this.state;
    e.preventDefault();
    socket.emit('message_new', {
      msg_type: 'text',
      text,
      name: user.name
    });
    // FIXME: 应该将 message 存到 state 然后再发送到服务端避免输入信息丢失
    this.setState({text: ''});
    // NOTE：滚动到底部
    if (this.msgContainerRef && this.msgContainerRef.current) {
      setTimeout(() => {
        this.msgContainerRef.current.scrollTop = this.msgContainerRef.current.scrollHeight + 100;
      }, 50);
    }
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    });
  }

  handleKeydown = e => {
    if (e.keyCode === 13) {
      this.handleClick(e);
    }
  }

  handleSelectClick = e => {
    if (this.fileSelectRef && this.fileSelectRef.current) {
      this.fileSelectRef.current.click();
    }
  }

  handleSelectChange = () => {
    const reader = new FileReader();
    const { user } = this.props;
    reader.onload = e => {
      socket.emit('message_new', {
        name: user.name,
        msg_type: 'img',
        text: e.target.result
      });
    }
    reader.readAsDataURL(this.fileSelectRef.current.files[0]);
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.inputRef && this.inputRef.current) {
        this.inputRef.current.focus();
      }
    }, 100);
  }

  render() {
    const { message, user } = this.props;
    const { text } = this.state;
    // FIXME：无线滚动组件渲染
    return (
      <>
        <div
          ref={this.msgContainer}
          className={style.msg_container}>
          {message.map(msg => {
            switch (msg.type) {
              case 'user_join': {
                return (
                  <div
                    className={style.system_welcome}
                    key={`${msg.key}`}>
                    {msg.text}
                  </div>
                );
              }
              case 'message_new': {
                const isSelf = msg.name === user.name;
                const isText = msg.msg_type === 'text';
                return (
                  <div
                    className={`${style.user_message} ${isSelf ? style.user_self : ''}`}
                    key={`${msg.key}`}>
                    {
                      isText ?
                        `${isSelf ? msg.text : msg.name + ':' + msg.text}` :
                        isSelf ? <img src={msg.text} /> : <span>{msg.name}:<img src={msg.text} /></span>
                    }
                  </div>
                );
              }
              case 'user_leave': {}
              case 'message_recall': {} // TODO
            }
          })}
        </div>
        <div className={style.input_container}>
          <div
            onClick={this.handleSelectClick}
            className={style.input_select_container}>
            <span>+</span>
            <input
              ref={this.fileSelectRef}
              onChange={this.handleSelectChange}
              className={style.input_select}
              accept="image/*"
              type="file" />
          </div>
          <input
            className={style.input_input}
            value={text}
            ref={this.inputRef}
            onKeyDown={this.handleKeydown}
            onChange={this.handleChange} type="input" />
          <button
            className={style.input_button}
            onClick={this.handleClick}>
            发送({user.online ? '在线' : '已离线'})
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    message: state.message
  }
}

export default connect(
  mapStateToProps
)(ChatContainer);