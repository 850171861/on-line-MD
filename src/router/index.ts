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
    component: documentCreate
  },
  {
    path: '/documentUpdate',
    name: 'documentUpdate',
    component: documentUpdate
  },
  {
    path: '/createProject',
    name: 'createProject',
    component: createProject
  },
  {
    path: '/settingProject',
    name: 'settingProject',
    component: settingProject
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
  const { isLogin, userInfo, token } = store.state
  const { requiresAuth } = to.meta
  console.log(requiresAuth)

  if (isLogin) {
    console.log(requiresAuth)
  }



})

export default router
