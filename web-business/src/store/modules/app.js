import Cookies from 'js-cookie'
import { getCommonEnum, getGuanranteeEnum, queryCascadeByAreaId } from '@/api/common'
// import { get } from '@/utils/request'
const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    commonEnum: {}, // 公共枚举（借款人）
    guanranteeEnum: {}, // 担保人用枚举
    areaEnum: {}, // 联级省市区
    itrusConfigStatus: 0, // 天威初始化状态（0 未初始化，1 初始化成功，-1 初始化失败）
    breadcrumbInfo: {
      businessNo: 'xxxxxxxxx',
      contractNo: 'xxxxxxxxxxxxxxxxxxx'
    },
    allInformation1: [],
    allInformation2: [],
    basicForm: {
      basicData: {},
      creditData: {},
      growData: {},
      imageData: {}
    },
    saveToastFlag: true
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_COMMON_ENUM: (state, obj) => {
      state.commonEnum = obj
    },
    SET_GUANRANTEE_ENUM: (state, obj) => {
      state.guanranteeEnum = obj
    },
    SET_AREA_ENUM: (state, obj) => {
      state.areaEnum = obj
    },
    SET_BREADCRUMB: (state, breadcrumbInfo) => {
      state.breadcrumbInfo = breadcrumbInfo
    },
    Set_Itrus_Status: (state, itrusStatus) => {
      state.itrusConfigStatus = itrusStatus
    },
    TOGGLE_TOAST_FLAG: (state, flag) => {
      state.saveToastFlag = flag
    },
    // SET_DATA1: (state, projects1) => {
    //   state.allInformation1 = projects1
    // },
    // SET_DATA2: (state, projects2) => {
    //   state.allInformation2 = projects2
    // },
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
      } catch (error) {
      }
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
      // console.log(data)
      commit('SET_BASICINFO', data)
    },
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleToastFlag({ commit }, flag) {
      commit('TOGGLE_TOAST_FLAG', flag)
    },
    async GetEnum({ commit }) {
      const commonEmumRes = await getCommonEnum()
      if (commonEmumRes.status === 200) {
        const enumFormatted = {}
        for (const item in commonEmumRes.data) {
          if (Object.prototype.hasOwnProperty.call(commonEmumRes.data, item)) {
            const options = []
            for (const childItem in commonEmumRes.data[item]) {
              if (
                Object.prototype.hasOwnProperty.call(commonEmumRes.data[item], childItem)
              ) {
                options.push({
                  value: childItem,
                  label: commonEmumRes.data[item][childItem]
                })
              }
            }
            enumFormatted[`${item}Options`] = options
          }
        }
        // enumFormatted.authResultOptions = enumFormatted.authRecordTypeOptions.concat(
        //   [
        //     {
        //       code: '0',
        //       value: '无'
        //     }
        //   ]
        // )
        commit('SET_COMMON_ENUM', Object.assign({}, enumFormatted, commonEmumRes.data))
      }
      const guanranteeEmumRes = await getGuanranteeEnum()
      if (guanranteeEmumRes.status === 200) {
        const enumFormatted = {}
        for (const item in guanranteeEmumRes.data) {
          if (Object.prototype.hasOwnProperty.call(guanranteeEmumRes.data, item)) {
            const options = []
            for (const childItem in guanranteeEmumRes.data[item]) {
              if (
                Object.prototype.hasOwnProperty.call(guanranteeEmumRes.data[item], childItem)
              ) {
                options.push({
                  value: childItem,
                  label: guanranteeEmumRes.data[item][childItem]
                })
              }
            }
            enumFormatted[`${item}Options`] = options
          }
        }
        commit('SET_GUANRANTEE_ENUM', Object.assign({}, enumFormatted, guanranteeEmumRes.data))
      }
    },
    async QueryAreaCascadeEnum({ commit }) {
      const areaCascadeRes = await queryCascadeByAreaId()
      if (areaCascadeRes.status === 200) {
        commit('SET_AREA_ENUM', Object.assign({}, areaCascadeRes.data))
      }
    },
    SetBreadcrumb({ commit }, breadcrumbInfo) {
      commit('SET_BREADCRUMB', breadcrumbInfo)
    },
    SetItrusConfigStatus({ commit }, itrusStatus) {
      // 天威初始化状态记录
      commit('Set_Itrus_Status', itrusStatus)
    }
  }
}

export default app
