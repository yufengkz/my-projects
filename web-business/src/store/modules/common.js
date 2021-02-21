import { getMapInfoList, queryMapInfoByRole } from '@/api/common'
// import { get } from '@/utils/request'
const common = {
  state: {
    MAPList: [],
    RoleMapList: []
  },
  mutations: {
    SET_MAP_LIST: (state, data) => {
      state.MAPList = data
    },
    SET_ROLE_MAP_LIST: (state, data) => {
      state.RoleMapList = data
    }
  },
  actions: {
    async GetMAPList({ commit }) {
      const { status, data } = await getMapInfoList()
      if (+status === 200) {
        commit('SET_MAP_LIST', Object.assign({}, data))
      }
    },
    async GetRoleMapList({ commit }, params) {
      const { status, data } = await queryMapInfoByRole(params)
      if (+status === 200) {
        commit('SET_ROLE_MAP_LIST', data)
      }
    }
  }
}

export default common
