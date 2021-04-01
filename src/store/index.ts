import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,
    userInfo: {},
    token: ''
  },
  mutations: {

    // 登录状态
    setIsLogin (state, value) {
      state.isLogin = value
      localStorage.setItem('isLogin', value)
    },
    // 设置用户基本信息
    setUserInfo (state, value) {
      if (value === '') return
      state.userInfo = value
      localStorage.setItem('userInfo', JSON.stringify(value))
    },
    // token
    setToken (state, value) {
      state.token = value
      localStorage.setItem('token', value)
    }
  },
  actions: {
  },
  modules: {
  }
})
