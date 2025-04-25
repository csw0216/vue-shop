// 创建服务器
import express from "express"
import jwt from "jsonwebtoken"
import cors from "cors"
// 这是commenJS的导入写法
// const appexpress = require('express');
const app = express();
app.use(express.json()); // 允许处理JSON请求体
app.use(cors());// 配置跨域资源共享

// 模拟用户数据库 登录页
const mockUsers = [
  { username: "admin", password: "123456" },
  { username: "user1", password: "abc123" }
];

// 模拟用户数据库 home页
const menuList = [{
    authName: '用户管理',
    id: 1,
    order: 1,
    path: '/users',
    children: [
        {
            authName: '用户列表',
            id: 12,
            order: 1,
            path: 'users',
            children: []
        },
    ]
},
{
    authName: '商品管理',
    id: 2,
    order: 2,
    path: '/goods',
    children: [
        {
            authName: '商品列表',
            id: 12,
            order: 1,
            path: 'goods',
            children: []
        },
        {
            authName: '分类参数',
            id: 13,
            order: 1,
            path: 'params',
            children: []
        },
        {
            authName: '商品分类',
            id: 13,
            order: 1,
            path: 'categories',
            children: []
        },
    ]
},
{
    authName: '权限管理',
    id: 3,
    order: 3,
    path: '/power',
    children: [
        {
            authName: '角色列表',
            id: 12,
            order: 1,
            path: 'roles',
            children: []
        },
        {
            authName: '权限列表',
            id: 13,
            order: 1,
            path: 'rights',
            children: []
        },
    ]
    },
{
    authName: '订单管理',
    id: 4,
    order: 4,
    path: '/order',
    children: [
        {
            authName: '订单列表',
            id: 12,
            order: 1,
            path: 'orders',
            children: []
        },
    ]
    },
{
    authName: '数据统计',
    id: 5,
    order: 5,
    path: '/reports',
    children: [
        {
            authName: '生成报告',
            id: 12,
            order: 1,
            path: 'reports',
            children: []
        },
    ]
}];
// jwt.sign({
//   data: 'foobar'  //数据
// }, '密钥', { expiresIn: 60 * 60 }); //有效时间

// 监听请求
app.get('/', (req, res) => {
    res.send('测试成功');
})
// 监听登录接口
app.post('/login', (req, res) => {
    // let userId = req.query.username; 这个写法是url传参法请求数据
    const { username, password } = req.body;
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
        // console.log(token)
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

app.get('/menus', (req, res) => {
    if (req.headers.authorization) {
      res.send({
            info:'success',
            // 需要返回token令牌
            status: 200,
            data: {
                menuList
            }
        });
  }else {
        // res.json() 会自动设置响应头 Content-Type: application/json
        res.status(400).json({
          meta: { status: 400, message: "登录过期，请重新登录！" },
          data: { isValid: false }
        });
    }

})
// 创建监听端口
app.listen(3001, () => {
    console.log('服务器创建完成http://localhost:3001')
})

// 启动后端的接口命令：nodemon（自动监视文件变化并重启）或者 node index.js