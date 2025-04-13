// 创建服务器
import express from "express"
import jwt from "jsonwebtoken"
import cors from "cors"
// 这是commenJS的导入写法
// const appexpress = require('express');
const app = express();
app.use(express.json()); // 允许处理JSON请求体

app.use(cors());// 配置跨域资源共享

// 模拟用户数据库
const mockUsers = [
  { username: "admin", password: "123456" },
  { username: "user1", password: "abc123" }
];
// jwt.sign({
//   data: 'foobar'  //数据
// }, '密钥', { expiresIn: 60 * 60 }); //有效时间

// 监听请求
app.get('/', (req, res) => {
    res.send('测试成功');
})
// 监听登录接口
app.post('/login', (req, res) => {
    // req.query.username 和 req.query.password 在 POST 请求时为 undefined，
    // 导致数据库查询失败，返回 400
    // let userId = req.query.username;
    // let pwd = req.query.password;
    const { username, password } = req.body;
console.log(username)
    // 查询数据库，确认用户信息存在数据库

    // 模拟数据库查询
  const user = mockUsers.find(u => 
    u.username === username && u.password === password
  );

    if (user) {

// 不能多次调用 res.json()，一个请求只能有一个响应

// 如果要发送非JSON数据，应该使用 res.send()

        let token = jwt.sign({
        username
        }, 'secret', { expiresIn: 60 * 60 });

        console.log(token)
        res.send({
        info:'success',
        // 需要返回token令牌
        status: 200,
        data: {
            username,
            token
        }
    });

    } else {
        // res.json() 会自动设置响应头 Content-Type: application/json
    res.status(400).json({
      meta: { status: 400, message: "用户名或密码错误" },
      data: { isValid: false }
    });
  }


}) 

// 创建监听端口
app.listen(3001, () => {
    console.log('服务器创建完成http://localhost:3001')
})

// 启动后端的接口命令：nodemon（自动监视文件变化并重启）或者 node index.js