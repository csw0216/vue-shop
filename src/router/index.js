import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
// import Home from '@/components/home/Home.vue'
// import Welcome from '@/components/home/welcome/Welcome.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/home/Home.vue'),
      // redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('@/components/home/welcome/Welcome.vue')
      },
      {
        path: '/users',
        component: () => import('@/components/home/users/Users.vue')
      },
      {
        path: '/rights',
        component: () => import('@/components/home/power/rights/Rights.vue')
      },
      {
        path: '/roles',
        component: () => import('@/components/home/power/roles/Roles.vue')
      },
      {
        path: '/categories',
        component: () => import('@/components/home/goods/cate/Cate.vue')
      },
      {
        path: '/params',
        component: () => import('@/components/home/goods/params/Params.vue')
      },
      {
        path: '/goods',
        component: () => import('@/components/home/goods/list/List.vue')
      },
      {
        path: '/goods/add',
        component: () => import('@/components/home/goods/list/children/Add.vue')
      },
      {
        path: '/orders',
        component: () => import('@/components/home/order/Order.vue')
      },
      {
        path: '/reports',
        component: () => import('@/components/home/report/Report.vue')
      }
    ]
  }
  ],
})
router.beforeEach((to, from) => {
  // to 将访问哪一个路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数,表示放行
  //   next() 放行 next('/login') 强制跳转
  // vue3去掉了，但还可以用，只是必须保证next()在任何导航中都严格调用一次
  // 它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，
  // 否则钩子永远都不会被解析或报错。
  if (to.path === '/login') return true
  // 获取token
  const token = window.sessionStorage.getItem('token')
  if (!token) return '/login'
  return
})

export default router
