import Cookies from 'js-cookie'
import { getGuanranteeEnum, getCommonEnum } from '@/api/common'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    enum: {}, // 枚举
    commonEnum: {}, // 公共枚举（借款人）
    guanranteeEnum: {}, // 担保人用枚举
    itrusConfigStatus: 0, // 天威初始化状态（0 未初始化，1 初始化成功，-1 初始化失败）
    breadcrumbInfo: {
      businessNo: 'xxxxxxxxx',
      contractNo: 'xxxxxxxxxxxxxxxxxxx'
    }
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
    SET_ENUM: (state, obj) => {
      state.enum = obj
    },
    SET_BREADCRUMB: (state, breadcrumbInfo) => {
      state.breadcrumbInfo = breadcrumbInfo
    },
    Set_Itrus_Status: (state, itrusStatus) => {
      state.itrusConfigStatus = itrusStatus
    },

    SET_COMMON_ENUM: (state, obj) => {
      state.commonEnum = obj
    },
    SET_GUANRANTEE_ENUM: (state, obj) => {
      state.guanranteeEnum = obj
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    async GetEnum({ commit }) {
      const commonEmumRes = await getCommonEnum()
      if (commonEmumRes.status === 200) {
        const enumFormatted = {}
        for (const item in commonEmumRes.data) {
          if (Object.prototype.hasOwnProperty.call(commonEmumRes.data, item)) {
            const options = []
            for (const childItem in commonEmumRes.data[item]) {
              if (Object.prototype.hasOwnProperty.call(commonEmumRes.data[item], childItem)) {
                options.push({
                  value: childItem,
                  label: commonEmumRes.data[item][childItem]
                })
              }
            }
            enumFormatted[`${item}Options`] = options
          }
        }
        commit('SET_COMMON_ENUM', Object.assign({}, enumFormatted, commonEmumRes.data))
      }
      const guanranteeEmumRes = await getGuanranteeEnum()
      if (guanranteeEmumRes.status === 200) {
        const enumFormatted = {}
        for (const item in guanranteeEmumRes.data) {
          if (Object.prototype.hasOwnProperty.call(guanranteeEmumRes.data, item)) {
            const options = []
            for (const childItem in guanranteeEmumRes.data[item]) {
              if (Object.prototype.hasOwnProperty.call(guanranteeEmumRes.data[item], childItem)) {
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
