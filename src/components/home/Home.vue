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

        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true"
          :collapse="isCollapse" collapse-transition :router="true" :default-active="activePath">
          <!-- 一级菜单 -->
          <el-sub-menu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template #title>
              <!-- 图标 -->
              <el-icon>
                <Menu />
              </el-icon>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
              <!-- <span>pne</span> -->
            </template>
            <!-- 二级菜单 -->
            <el-menu-item v-for="sonItem in item.children" :index="'/' + sonItem.path" :key="sonItem.id"
              @click="saveActivePath('/' + sonItem.path)">
              <template #title>
                <!-- 二级菜单的模板区域 -->
                <!-- <i prefix-icon="menu"></i> -->
                <!-- 图标 -->
                <span>{{ sonItem.authName }}</span>
                <!-- 文本 -->
              </template>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主题 -->
      <el-main>
        <!-- 路由占位符 -->
        <!-- <p>{{ menuList }}</p> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import api from "@/api/index.js"
import { onMounted } from "vue"

const router = useRouter()
// 左侧菜单数据
const menuList = reactive([])
const isCollapse = ref(false) // 是否折叠属性
const activePath = ref('/welcome')

const welcome = {
  authName: '欢迎光临',
  id: 0,
  order: 1,
  path: '/welcome',
  children: [
    {
      authName: 'Welcome',
      id: 1,
      order: 1,
      path: 'welcome',
      children: []
    }
  ]
}

onMounted(() => {
  getMenuList()
  // console.log(activePath)
  const path = window.sessionStorage.getItem('activePath')
  if (path) {
    activePath.value = path
  } else {
    activePath.value = '/welcome'
  }
})
const logout = () => {
  window.sessionStorage.clear()
  router.push('/login')
}
// 获取所有的菜单
const getMenuList = async () => {
  await api.getMenuList().then(res => {
    if (res.data.status !== 200) {
      ElMessage.error(res.meta.message)
      router.push('/login')
    }
    // menuList.push(res.data.data.menuList)
    // menuList.unshift(welcome)
    // console.log(res.data.data.menuList)
    menuList.push(welcome, ...res.data.data.menuList)
    // console.log(toRaw(menuList))
    // console.log(menuList)
  })
}
// 点击按钮,切换菜单的折叠和展开
const toggleCollpase = () => {
  isCollapse.value = !isCollapse.value
}
const saveActivePath = (path) => {
  window.sessionStorage.setItem('activePath', path)
  activePath.value = path
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
      color: #fff;
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
