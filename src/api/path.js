// 存放所有路径
const base = {
    // `url` 是用于请求的服务器 URL
    // 放置多个不同的请求数据的url，在index.js中不同方法访问不同路径
  url: '/user',
  loginUrl: '/login',

  // `method` 是创建请求时使用的方法
  // method: 'get', // 默认是 get

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'http://localhost:3001/',


  

}
export default base;