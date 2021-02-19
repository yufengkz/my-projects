const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  enum: state => state.app.enum,
  token: state => state.user.token,
  roles: state => state.user.roles,
  name: state => state.user.name,
  currentUser: state => state.user.currentUser,
  currentMenu: state => state.user.currentMenu,
  mobileNo: state => state.user.mobileNo,
  routePermission: state => state.permission.routers,
  backlogList: state => state.message.backlogList,
  noticeList: state => state.message.noticeList,
  noticeUnreadNum: state => state.message.noticeUnreadNum,
  backlogNum: state => state.message.backlogNum,
  warningNum: state => state.message.warningNum
}

export default getters
