import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    userInfo: {
      username:'8501718@qq.com',
      name:'123'
    },
    token: ''
  },
  mutations: {

    // 登录状态
    setIsLogin (state, value) {
      state.isLogin = value
    },
    // 设置用户基本信息
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
    },
    // token
    setToken (state, value) {
      state.token = value
    }
  },
  actions: {
  },
  modules: {
  }
})
