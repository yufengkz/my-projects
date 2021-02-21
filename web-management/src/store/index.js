import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/route-permission'
import getters from './getters'
// 业务
import MAP from './modules/map'
// 基础数据
import base from './modules/base'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    invoiceTable: { detailId: String, outInvoiceData: [] }
  },
  mutations: {
    setInvoiceTableData(state, payload) {
      state.invoiceTable.detailId = payload.detailId
      state.invoiceTable.outInvoiceData = payload.outInvoiceData
    }
  },
  actions: {},
  modules: {
    app,
    user,
    permission,
    // 业务
    base,
    MAP
  },
  getters
})
