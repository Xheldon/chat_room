/**
 * @author: x
 * @date: 2020/10/15 16:33
 * @description: index.js
 */

const app = require('express')();
const server = require('http').createServer(app);
const session = require('express-session');
const io = require('socket.io').listen(server);

const userList = {
  admin: {
    name: 'admin'
  }
};

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:10086');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(session({
  secret: 'The answer to Life, Universe, and Everything',
  name: 'fourty_two',
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    domain: 'localhost',
    saveUninitialized: true,
    path: '/',
    expires: new Date( Date.now() + 60 * 60 * 24 * 365 * 1000 )
  }
}));

// TODO：加入之后是否支持查看之前的聊天

app.get('/', (req, res, next) => {
  if (req.session.user) {
    // NOTE: 返回已存在的用户数据
    res.send({
      err: 0,
      data: {
        ...userList[req.session.user.name]
      }
    });
  } else {
    res.send({
      err: 1, // 1 表示未登录
      data: null
    });
  }
});

app.get('/login', (req, res, next) => {
  // TODO: 看用户列表中是否有重名
  if (req.query) {
    const { name } = req.query;
    if (!userList[name]) {
      // NOTE: 不存在直接注册
      req.session.user = {
        name: req.query.name
      }
      userList[name] = { name };
    }
    res.send({
      err: 0,
      data: userList[name]
    });
  } else {
    res.send({
      err: 2, // TODO: 设置代码含义
      data: {
        msg: '用户名必须'
      }
    });
  }
});

const port = process.env.PORT || 10010;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

io.on('connection', socket => {
  socket.on('message_new', data => {
    io.sockets.emit('message_new', data);
  });
  socket.on('user_join', data => {
    io.sockets.emit('user_join', data);
  });
  socket.on('type_ing', data => {});
  socket.on('type_stop', data => {});
  socket.on('disconnect', data => {});
});
