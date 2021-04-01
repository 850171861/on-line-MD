import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'




const Index = () => import('@/views/Index.vue')
const userIndex = () => import('@/views/user/Index.vue')
const documentIndex = () => import('@/views/document/Index.vue')
const documentCreate = () => import('@/views/document/Create.vue')
const documentUpdate = () => import('@/views/document/Update.vue')
const createProject = () => import('@/views/createProject.vue')
const settingProject = () => import('@/views/settingProject.vue')
const userRegister = () => import('@/views/user/Register.vue')
const Login = () => import('@/views/user/Login.vue')
const ResetPassword = () => import('@/views/user/ResetPassword.vue')



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/userIndex',
    name: 'userIndex',
    component: userIndex,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/documentIndex',
    name: 'documentIndex',
    component: documentIndex
  },
  {
    path: '/documentCreate',
    name: 'documentCreate',
    component: documentCreate,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/documentUpdate',
    name: 'documentUpdate',
    component: documentUpdate,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/createProject',
    name: 'createProject',
    component: createProject,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/settingProject',
    name: 'settingProject',
    component: settingProject,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/userRegister',
    name: 'userRegister',
    component: userRegister
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ResetPassword',
    name: 'ResetPassword',
    component: ResetPassword
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  let userInfo = localStorage.getItem('userInfo')
  let isLogin = localStorage.getItem('isLogin')
  const token = localStorage.getItem('token')

  if (userInfo && isLogin) {
    userInfo = JSON.parse(userInfo)
    isLogin = JSON.parse(isLogin)
  }



  const { requiresAuth } = to.meta
  // mate区别路由是否需要登录
  if (requiresAuth) {
    if (isLogin) {
      store.commit('setUserInfo', userInfo)
      store.commit('setToken', token)
      store.commit('setIsLogin', isLogin)
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }

})

export default router
