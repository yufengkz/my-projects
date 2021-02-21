<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu :show-timeout="200" :default-active="resolveActiveIndex" :collapse="isCollapse" mode="vertical">
      <div v-show="!isCollapse" style="height: 88px; border-bottom: solid 1px #fff;box-sizing: content-box; background-color:#08b448;">
        <img
          src="@/assets/SinoCapital.png"
          style="padding:22px 0px 0px 32px;height:48px;background-color:#08b448;"
          alt="Sinochem Capital LOGO"
        />
      </div>
      <div v-show="isCollapse" style="height: 88px; box-sizing: content-box; background-color:#08b448;">
        <img
          src="@/assets/SinoCapital-logo.png"
          srcset="@/assets/SinoCapital-logo@2x.png 2x"
          style="padding:26px 0 0 1px;width:34px;"
          alt="Sinochem Capital LOGO"
        />
      </div>
      <sidebar-item v-for="route in routePermission" :key="route.path" :item="route" :base-path="route.path" />
      <!-- 解决跳转到侧边栏内不存在路由时的侧边栏显示焦点问题；由下面元素挂载非路由路径，目前仅有消息列表，后续增加时在此处增加 -->
      <el-menu-item index="/notroutemap" style="display:none;">not routeMap index</el-menu-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
// import path from 'path'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['sidebar', 'routePermission']),
    isCollapse() {
      return !this.sidebar.opened
    },
    resolveActiveIndex() {
      return this.checkParentAndChildren('/notroutemap', this.routePermission)
    }
  },
  methods: {
    checkParentAndChildren(basePath, routes) {
      const nowPath = this.$route.path.endsWith('/') ? this.$route.path.substring(0, this.$route.path.length - 1) : this.$route.path
      let routeIndex = '/notroutemap'
      for (const node of routes) {
        if (node.path === nowPath) {
          routeIndex = node.hidden === true ? basePath : nowPath
          break
        } else if (node.children && this.checkParentAndChildren(node.path, node.children) !== '/notroutemap') {
          routeIndex = this.checkParentAndChildren(node.path, node.children)
          break
        }
      }
      return routeIndex
    },
    checkChildren(basePath, children) {
      const nowPath = this.$route.path.endsWith('/') ? this.$route.path.substring(0, this.$route.path.length - 1) : this.$route.path
      let routeIndex = ''
      for (const node of children) {
        if (node.path === nowPath) {
          routeIndex = node.hidden === true ? basePath : nowPath
          break
        } else if (node.children && this.checkChildren(node.path, node.children)) {
          routeIndex = this.checkChildren(node.path, node.children)
        }
      }
      return routeIndex
    }
  }
}
</script>
