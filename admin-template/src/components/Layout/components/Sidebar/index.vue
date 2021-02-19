<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :show-timeout="200"
            :default-active="resolveActiveIndex"
            :collapse="isCollapse"
            mode="vertical"
            text-color="#C5D3E0"
            active-text-color="#FFFFFF"
        >
            <div v-show="!isCollapse" class="v-logo-box" data="1">
                <img class="v-logo" src="@/assets/ddky_logo.png" style="" alt="Sinochem Capital LOGO" />
                <span>叮当快药</span>
            </div>
            <div v-show="isCollapse" class="v-logo-box-mini">
                <!-- <img src="" srcset="@/assets/SinoCapital-logo@2x.png 2x" style="padding:26px 0 0 1px;width:34px;" alt="Sinochem Capital LOGO" /> -->
                <img class="v-logo" src="@/assets/ddky_logo.png" style="" alt="Sinochem Capital LOGO" />
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
            // eslint-disable-next-line no-unused-vars
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
            // eslint-disable-next-line no-unused-vars
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

<style lang="scss" scoped>
.v-logo-box {
    height: $navbar-height;
    border-bottom: solid 1px #48586c;
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;

    .v-logo {
        height: 38px;
    }
    span {
        color: #fff;
        font-size: 20px;
        margin-left: 10px;
    }
}
.v-logo-box-mini {
    height: $navbar-height;
    border-bottom: solid 1px #48586c;
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    .v-logo {
        height: 20px;
    }
}
</style>
