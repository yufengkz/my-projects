// 侧边栏用route
const routePermission = {
  state: {
    /*
      用户的权限，一般为接口返回。此处为写死的假数据
      path 菜单跳转路由
      meta-icon 菜单图标
      meta-title 菜单名字
      children 下级菜单。若没有下级菜单,不能有此属性,也不能把值设为空数组
    */
    routers: []
  },
  mutations: {
    SET_ROUTERS: (state, routeMap) => {
      state.routers = routeMap
    }
  },
  actions: {
    GenerateRoutes({ commit }, routeMap) {
      return new Promise(resolve => {
        commit('SET_ROUTERS', routeMap)
        resolve()
      })
    }
  }
}

export default routePermission
