import Cookies from 'js-cookie'
import { getCommonEnum, queryCascadeByAreaId } from '@/api/common'
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
    SET_COMMON_ENUM: (state, obj) => {
      state.commonEnum = obj
    },
    SET_GUANRANTEE_ENUM: (state, obj) => {
      console.log(obj, '21121wlemmeD')
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
    }
    // }
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
