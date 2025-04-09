<template>
  <div class="welcome">
    <h2>Welcome~ 亲 建议: 先新创建数据再删或改自己的弄出来的数据~~~~~~</h2>
    <h3>欢迎登录到电商后台管理系统!</h3>
    <div class="info">
      <h4>以前的小东西 :</h4>
      <ul>
        <li>
          <a href="https://lianghj.top/back" target="_blank">
            个人博客 文章分享 vue3 前后端
          </a>
          <br />
          <a
            href="https://www.apifox.cn/apidoc/shared-35f5392c-4216-4cb8-8cca-e94d42ae075e"
            target="_blank"
          >
            https://www.apifox.cn/apidoc/shared-35f5392c-4216-4cb8-8cca-e94d42ae075e </a
          >api文档位置
          <br />
          <span>练习项目 开发中 ------------------</span>
          QQ 交流群:
          <img
            style="height: 200px"
            src="https://lhj-blog-service.oss-cn-guangzhou.aliyuncs.com/picture/qr/qqq.jpg?x-oss-process=style/mystyle"
            alt=""
          />
        </li>
        <li>
          <a href="https://lianghj.top" target="_blank"
            >一个vue + tsx的网易云播放项目</a
          ><span>一个vue + tsx的网易云播放项目</span>
        </li>
        <li>
          <a
            href="https://blog.csdn.net/weixin_46858768?spm=1000.2115.3001.5343"
            target="_blank"
            >博客</a
          ><span>CSDN博客 在学习时写的一些笔记</span>
        </li>
        <li>
          <a href="https://github.com/lysimportant" target="_blank">Github</a
          ><span>Github 项目文件等存放的地方 -- 国外</span>
        </li>
        <li>
          <a href="https://gitee.com/lysimportant" target="_blank">Gitte</a
          ><span>Gitte 项目文件等存放的地方 -- 国内</span>
        </li>

        <li>
          <a href="https://lianghj.top/mgj" target="_blank">coderwhy蘑菇商城</a
          ><span
            >在网页打开切换到手机端后要刷新页面才可以滑动,手机端打开可以直接滑动<a
              href="https://www.bilibili.com/video/BV17j411f74d?t=12"
              >源网站</a
            ></span
          >
        </li>
        <li>
          <a href="https://lianghj.top/pyg" target="_blank">Pink品优购商城</a
          ><span
            >类似购物网站<a
              href="https://www.bilibili.com/video/BV14J4114768?from=search&seid=6544069264377211049"
              >源网站</a
            ></span
          >
        </li>
      </ul>
    </div>
    <address>纯自娱练习用</address>
  </div>
</template>

<script>
export default {
  name: 'Welcome'
}
</script>

<style lang="less" scoped>
.welcome {
  font-size: 20px;
  text-align: center;
  color: #000;
  h3 {
    margin: 0 auto 0;
    font-size: 30px;
  }
  .info {
    margin: 5px 0 10px;
    ul {
      margin: 5px 0 0 150px;
      li {
        margin: 5px 0 50px;
        text-align: left;
        margin: 8px;
        color: black;
        a {
          text-align: center;
          display: inline-block;
          padding: 5px;
          font-size: 18px;
          border: 3px solid pink;
        }
        a:hover {
          color: pink;
          background-color: green;
        }
        span {
          width: 100%;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
