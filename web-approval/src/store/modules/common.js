import { getEnumList, queryJurisdictionStatus, queryMapInfoByRole, getMapList } from '@/api/base'
import { getMapInfoLists } from '@/api/common'
// import { get } from '@/utils/request'
const common = {
  state: {
    MapListByRole: [], // 根据用户获取当前map中心
    MAPList: [],
    mapProducts: [],
    applyInfoStatusEnum: [],
    approvalBusinessTypeEnum: [],
    approvalExamineResultTypeEnum: [],
    approvalRatingEnum: [],
    approvalResultTypeEnum: [],
    approveRecourcesTagEnum: [],
    approveResourceTypeEnum: [],
    mapStatusEnum: [],
    approveStatusEnum: [],
    completionStatusEnum: [], // 状态下拉框枚举
    jurisdictionStatus: [] // 不同权限对应审批状态
  },
  mutations: {
    // MAP中心产品  prodects
    SET_MAP_PRODUCTS: (state, payload) => {
      state.mapProducts = payload
    },
    // 根据用户获取当前map中心
    SET_MAP_LIST_BY_ROLE: (state, data) => {
      state.MapListByRole = data
    },
    SET_MAP_LIST: (state, data) => {
      state.MAPList = data
    },
    SET_applyInfoStatusEnum: (state, payload) => {
      state.applyInfoStatusEnum = payload
    },
    SET_approvalBusinessTypeEnum: (state, payload) => {
      state.approvalBusinessTypeEnum = payload
    },
    SET_approvalExamineResultTypeEnum: (state, payload) => {
      state.approvalExamineResultTypeEnum = payload
    },
    SET_approvalRatingEnum: (state, payload) => {
      state.approvalRatingEnum = payload
    },
    SET_approvalResultTypeEnum: (state, payload) => {
      state.approvalResultTypeEnum = payload
    },
    SET_approveRecourcesTagEnum: (state, payload) => {
      state.approveRecourcesTagEnum = payload
    },
    SET_approveResourceTypeEnum: (state, payload) => {
      state.approveResourceTypeEnum = payload
    },
    SET_mapStatusEnum: (state, payload) => {
      state.mapStatusEnum = payload
    },
    SET_approveStatusEnum: (state, payload) => {
      state.approveStatusEnum = payload
    },
    SET_completionStatusEnum: (state, payload) => {
      state.completionStatusEnum = payload
    },
    // 不同权限对应审批状态
    SET_jurisdictionStatus: (state, payload) => {
      state.jurisdictionStatus = payload
    }
  },
  actions: {
    // 获取产品列表
    async GetMAPProducts({ commit }, payload) {
      let { status, data } = await getMapList()
      if (+status === 200) {
        data =
          data &&
          data.map(item => {
            return {
              ...item,
              label: item.name,
              value: item.id + ''
            }
          })
        commit('SET_MAP_PRODUCTS', data)
      } else {
        commit('SET_MAP_PRODUCTS', [])
      }
    },
    // 根据用户获取当前map中心
    async GetMAPListByRole({ commit }, params) {
      let { status, data } = await queryMapInfoByRole(params)
      if (+status === 200) {
        data =
          data &&
          data.map(item => {
            return {
              ...item,
              label: item.name,
              value: item.id + ''
            }
          })
        commit('SET_MAP_LIST_BY_ROLE', Object.assign({}, data))
      }
    },
    async GetMAPList({ commit }) {
      const { status, data } = await getMapInfoLists()
      if (+status === 200) {
        const arr = data && data.map(item => {
          return {
            ...item,
            label: item.name,
            value: item.id
          }
        })
        commit('SET_MAP_LIST', arr)
      }
    },
    //
    async GetEnumList({ commit }) {
      const { status, data } = await getEnumList()
      if (+status === 200) {
        //
        const {
          applyInfoStatusEnum,
          approvalBusinessTypeEnum,
          approvalExamineResultTypeEnum,
          approvalRatingEnum,
          approvalResultTypeEnum,
          approveRecourcesTagEnum,
          approveResourceTypeEnum,
          mapStatusEnum,
          approveStatusEnum,
          completionStatusEnum
        } = data
        // JsonToArray(applyInfoStatusEnum)

        commit('SET_applyInfoStatusEnum', JsonToArray(applyInfoStatusEnum))
        commit('SET_approvalBusinessTypeEnum', JsonToArray(approvalBusinessTypeEnum))
        commit('SET_approvalExamineResultTypeEnum', JsonToArray(approvalExamineResultTypeEnum))
        commit('SET_approvalRatingEnum', JsonToArray(approvalRatingEnum))
        commit('SET_approvalResultTypeEnum', JsonToArray(approvalResultTypeEnum))
        commit('SET_approveRecourcesTagEnum', JsonToArray(approveRecourcesTagEnum))
        commit('SET_approveResourceTypeEnum', JsonToArray(approveResourceTypeEnum))
        commit('SET_mapStatusEnum', JsonToArray(mapStatusEnum))
        commit('SET_approveStatusEnum', JsonToArray(approveStatusEnum))
        commit('SET_completionStatusEnum', JsonToArray(completionStatusEnum))
      }
    },
    // 不同权限对应审批状态
    async GetJurisdictionStatus({ commit }, params) {
      const { status, data } = await queryJurisdictionStatus(params)
      if (+status === 200) {
        commit('SET_jurisdictionStatus', Object.assign({}, JsonToArray(data)))
      } else {
        commit('SET_jurisdictionStatus', [])
      }
    }
  }
}

function JsonToArray(obj) {
  if (obj === null || JSON.stringify(obj) === '{}') return
  return Object.keys(obj).map(k => {
    return {
      label: obj[k],
      value: k
    }
  })
}

export default common
