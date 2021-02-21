import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/route-permission'
import message from './modules/message'
import getters from './getters'
import common from './modules/common'

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
  actions: {

  },
  modules: {
    app,
    user,
    permission,
    message,
    common
  },
  getters
})
