import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'




const Index = () => import('@/views/Index.vue')
const userIndex = () => import('@/views/user/Index.vue')
const documentIndex = () => import('@/views/document/Index.vue')
const documentCreate = () => import('@/views/document/create.vue')
const documentUpdate = () => import('@/views/document/update.vue')
const createProject = () => import('@/views/createProject.vue')
const settingProject = () => import('@/views/settingProject.vue')
const directory = () => import('@/views/directory.vue')
const userRegister = () => import('@/views/user/Register.vue')
const Login = () => import('@/views/user/Login.vue')
const ResetPassword = () => import('@/views/user/ResetPassword.vue')
const ProjectPassword = () => import('@/views/projectPassword.vue')
const demoIndex = () => import('@/views/demo/Index.vue')
const demoCreate = () => import('@/views/demo/Create.vue')

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
    path: '/directory',
    name: 'directory',
    component: directory,
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
  },
  {
    path: '/ProjectPassword',
    name: 'ProjectPassword',
    component: ProjectPassword
  },
  {
    path: '/demoIndex',
    name: 'demoIndex',
    component: demoIndex
  },
  {
    path: '/demoCreate',
    name: 'demoCreate',
    component: demoCreate
  }



]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// ????????????
router.beforeEach((to, from, next) => {
  let userInfo = localStorage.getItem('userInfo')
  let isLogin = localStorage.getItem('isLogin')
  const token = localStorage.getItem('token')

  if (userInfo && isLogin) {
    userInfo = JSON.parse(userInfo)
    isLogin = JSON.parse(isLogin)
  }

  store.commit('setUserInfo', userInfo)
  store.commit('setToken', token)
  store.commit('setIsLogin', isLogin)

  const { requiresAuth } = to.meta
  // mate??????????????????????????????
  if (requiresAuth) {
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    if (to.path === '/login') {
      if (isLogin) {
        next('/userIndex')
      }
    }
    next()
  }

})

export default router
