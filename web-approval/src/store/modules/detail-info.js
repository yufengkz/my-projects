/* eslint-disable no-undef */
// import Cookies from 'js-cookie'
// import { getCommonEnum, queryCascadeByAreaId } from '@/api/common'
// import { get } from '@/utils/request'
const detailInfo = {
  state: {
    guaranteeInfo: null
  },
  mutations: {
    // TODO: 之后新建一个js文件 单独写，在getter.js导出state.basicForm
    // 基本信息等页面用 ...mapGetters() 取值
    SET_BASICINFO: (state, data) => {
      try {
        if (data.id === '1') {
          state.basicForm.basicData = data
        } else if (data.id === '2') {
          state.basicForm.creditData = data
        } else if (data.id === undefined) {
          state.basicForm = data
        }
        console.log(state.basicForm)
      } catch (error) {}
    },
    SET_GUARANTEEINFO: (state, data) => {
      state.guaranteeInfo = data
    }
  },
  actions: {
    // 获取基本信息的全部信息
    // GetDataInfo({ commit }) {
    //   // return new Promise((resolve, reject) => {
    //   get('https://easy-mock.com/mock/5f814cd775729f6d58a78683/example/mock')
    //     .then(res => {
    //       console.log(res.data)
    //       commit('SET_DATA1', res.data.projects1)
    //       commit('SET_DATA2', res.data.projects2)
    //       // resolve(res)
    //     })
    //   // .catch(error => {
    //   //   reject(error)
    //   // })
    //   // })
    // },
    /**
     * 存储借款申请准入 接口返回的全部信息
     */
    // allDataInfo({ commit }, Info) {
    //   // console.log(Info)
    //   commit('SET_DATA1', Info.projects1)
    //   commit('SET_DATA2', Info.projects2)
    // },
    /**  存储 基本信息  */
    basicInfo({ commit }, data) {
      commit('SET_BASICINFO', data)
    },
    /** 自然人详情信息 */
    guaranteeInfo({ commit }, data) {
      commit('SET_GUARANTEEINFO', data)
    }
  }
}

export default detailInfo
