const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  commonEnum: state => state.app.commonEnum,
  areaEnum: state => state.app.areaEnum,
  guanranteeEnum: state => state.app.guanranteeEnum,
  breadcrumbInfo: state => state.app.breadcrumbInfo,
  itrusConfigStatus: state => state.app.itrusConfigStatus,
  loginType: state => state.user.loginType,
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
  warningNum: state => state.message.warningNum,
  allInformation1: state => state.app.allInformation1,
  allInformation2: state => state.app.allInformation2,
  guaranteeInfo: state => state.detailInfo.guaranteeInfo,
  // common map 下拉
  MAPList: state => state.common.MAPList,
  mapProducts: state => state.common.mapProducts,
  MapListByRole: state => state.common.MapListByRole,
  jurisdictionStatus: state => state.common.jurisdictionStatus
}

export default getters
