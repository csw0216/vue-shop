<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../../assets/manager.jpg" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '61px' : '200px'">
        <div class="toggle-button" @click="toggleCollpase">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" :unique-opened="true"
          :collapse="isCollapse" :collapse-transition="false" :router="true" :default-active="activePath">
          <!-- 一级菜单 -->
          <el-sub-menu :index="item.id" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <!-- <i :class="iconsObj[item.id]"></i> -->
              <!-- 文本 -->
              <!-- <span>{{ item.authName }}</span> -->
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + sunItem.path" v-for="sunItem in item.children" :key="sunItem.id"
              @click="saveActivePath('/' + sunItem.path)">
              <template slot="title">
                <!-- 二级菜单的模板区域 -->
                <i prefix-icon="menu"></i>
                <!-- 图标 -->
                <span>{{ sunItem.authName }}</span>
                <!-- 文本 -->
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主题 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import axios from 'axios'
// import { onCreated } from "vue"

const router = useRouter()
// 左侧菜单数据
const menuList = reactive([
  {
    id: 1,
    name: '糖醋排骨'
  },
  {
    id: 2,
    name: '111糖醋排骨'
  }
])
const isCollapse = ref(false) // 是否折叠属性
const activePath = ref('/welcome')

const welcome = {
  authName: '欢迎光临',
  id: 147,
  order: 1,
  path: '/welcome',
  children: [
    {
      authName: 'Welcome',
      id: 124,
      order: 1,
      path: 'welcome',
      children: []
    }
  ]
}

// onCreated(() => {
//   this.getMenuList()
//   console.log(this.activePath)
//   const path = window.sessionStorage.getItem('activePath')
//   if (path) {
//     activePath = path
//   } else {
//     activePath = '/welcome'
//   }
// })
const logout = () => {

  window.sessionStorage.clear()
  router.push('/login')
}
// 获取所有的菜单
const getMenuList = () => {
  const { data: res } = axios.get('/menus')
  if (res.meta.status !== 200) return ElMessage.error(res.meta.msg)
  ElMessage.success(res.meta.msg)
  res.data.unshift(welcome)
  menuList = res.data
  console.log(res, 'menus')
}
// 点击按钮,切换菜单的折叠和展开
const toggleCollpase = () => {
  isCollapse = !isCollapse
}
const saveActivePath = (activePath) => {
  window.sessionStorage.setItem('activePath', activePath)
  activePath = activePath
  // console.log(this.$route.path)
}

</script>

<style lang="less" scoped>
.hwelcome {
  color: #fff;
  font-size: 15px;
  height: 25px;
  text-align: center;
  background: green;

  span {
    margin-left: 10px;
  }
}

.home-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  background-color: #373d3f;
  align-items: center;
  color: #fff;
  font-size: 20px;

  >div {
    display: flex;
    align-items: center;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  padding-right: 10px;
}

.toggle-button {
  background: #4a5064;
  font-size: 10px;
  text-align: center;
  line-height: 24px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
