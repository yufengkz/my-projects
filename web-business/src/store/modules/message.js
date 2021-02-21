import { getMessage, getWarningNum } from '@/api/common'

const message = {
  state: {
    noticeList: [],
    backlogList: [],
    noticeUnreadNum: 0,
    backlogNum: 0,
    warningNum: 0
  },
  mutations: {
    SET_UNTREAD_NUM: (state, count) => {
      state.noticeUnreadNum = count
    },
    SET_BACKLOG_NUM: (state, count) => {
      state.backlogNum = count
    },
    SET_WARNING_NUM: (state, count) => {
      state.warningNum = count
    },
    SET_NOTICE: (state, arr) => {
      state.noticeList = arr
    },
    SET_BACKLOG: (state, arr) => {
      state.backlogList = arr
    }
  },
  actions: {
    async GetNotice({
      commit,
      getters
    }) {
      const params = {
        pageNo: 1,
        type: 'system_notice',
        entNo: getters.currentUser.entNo, // 企业编号
        roleNo: getters.currentUser.curRoleNo,
        messageStatus: '0', // 消息状态 ：0：未读（未处理） 1：已读 （已处理） 空：查询全部
        pageSize: 5,
        userId: getters.currentUser.userNo
      }
      const res = await getMessage(params)
      if (res.status === '200' || res.status === 200) {
        // commit('SET_NOTICE', res.data.rows.filter(item => item.messageStatus === '0'))
        commit('SET_NOTICE', res.data.rows)
        commit('SET_UNTREAD_NUM', res.data.total)
      }
    },
    async GetBacklog({
      commit,
      getters
    }) {
      const params = {
        pageNo: 1,
        type: 'system_task_notice',
        entNo: getters.currentUser.entNo, // 企业编号
        roleNo: getters.currentUser.curRoleNo,
        pageSize: 5,
        userId: getters.currentUser.userNo
      }
      const res = await getMessage(params)
      if (res.status === '200' || res.status === 200) {
        commit('SET_BACKLOG', res.data.rows || [])
        commit('SET_BACKLOG_NUM', res.data.total)
      }
    },
    async GetWarningNum({
      commit
      // getters
    }) {
      // const params = {
      //   pageNumber: 1,
      //   alertStatus: '1', // 1:预警中 2:已解除
      //   entNo: getters.currentUser.entNo, // 企业编号
      //   roleNo: getters.currentUser.curRoleNo,
      //   pageSize: 5
      //   userId: getters.currentUser.userNo
      // }
      // const res = await getWarningNum(params)
      const res = await getWarningNum()
      if (res.status === '200' || res.status === 200) {
        commit('SET_WARNING_NUM', res.data)
      }
    }
  }
}
export default message
