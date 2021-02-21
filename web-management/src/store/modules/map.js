import { getStatusEnum } from '@/api/common'
import { getMapList } from '@/api/map'

export default {
  state: {
    service: [
      {
        value: '1',
        label: '粮作'
      },
      {
        value: '2',
        label: '经作'
      },
      {
        value: '3',
        label: '特作'
      },
      {
        value: '4',
        label: '新疆棉花'
      }
    ],
    // 开业状态 1 开 0关
    status: [
      {
        label: '启用',
        value: 1
      },
      {
        label: '禁用',
        value: 0
      }
    ]
  },

  mutations: {
    SET_SERVICE: (state, payload) => {
      state.service = payload
    }
  },

  actions: {
    // 获取服务业务信息
    async getServices({ commit }, params) {
      let { data } = await getStatusEnum(params)
      data =
        data &&
        data.map(item => {
          return {
            ...item,
            label: item.value,
            value: item.code
          }
        })
      commit('SET_SERVICE', data)
    },
    // 获取服务业务信息
    getServiceBusiness({ commit }) {
      return new Promise((resolve, reject) => {
        console.log('获取服务业务信息')
        getMapList()
          .then(res => {
            if (res.code === 200) {
              console.log(res)
              resolve(res)
            } else {
              reject(res.message || '获取服务业务信息')
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
