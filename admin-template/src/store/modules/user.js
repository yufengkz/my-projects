import { doLogout, getCurrentInfo } from '@/api/login'

import {
  getToken,
  removeToken
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    currentUser: {},
    currentMenu: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, userInfo) => {
      state.currentUser = userInfo
    },
    SET_MENU: (state, menuInfo) => {
      state.currentMenu = menuInfo
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getCurrentInfo()
          .then(res => {
            if (res.code === 200) {
              commit('SET_USER', res.data.currentUserDTO)
              commit('SET_MENU', res.data.resourcesListTreeList)
              resolve(res)
            } else {
              reject(res.message || '获取用户信息异常')
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 存储用户信息
    SetUserInfo({ commit }, userInfo) {
      commit('SET_USER', userInfo.currentUserDTO)
      commit('SET_MENU', userInfo.resourcesListTreeList)
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        doLogout()
          .then(res => {
            if (res.code === 200) {
              commit('SET_TOKEN', '')
              commit('SET_USER', {})
              removeToken()
              resolve()
            } else {
              reject(res.message || '退出异常')
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
