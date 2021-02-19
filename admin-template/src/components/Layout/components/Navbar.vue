<template>
  <div>
    <div class="navbar" mode="horizontal">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
      <span class="title">系统管理基础框架</span>
      <div class="user-content">
        <!-- <el-badge
          :value="noticeUnreadNum > 0 ? noticeUnreadNum : null"
          :max="99"
          class="badge-item"
          @click.native="handleNotice"
          v-if="currentUser.curRoleNo==='YEWU' || currentUser.curRoleNo==='RISK'"
        >
          <svg-icon icon-class="notice" style="font-size:26px" />
        </el-badge>
        <el-badge
          :value="warningNum > 0 ? warningNum : null"
          :max="99"
          class="badge-item"
          @click.native="handleWarn"
          v-if="currentUser.curRoleNo==='YEWU' || currentUser.curRoleNo==='RISK'"
        >
          <svg-icon icon-class="warning" style="font-size:26px" />
        </el-badge> -->
        <el-dropdown :hide-on-click="true" placement="bottom-start" @command="handleDropdownClick" trigger="click">
          <span class="el-dropdown-link">
            欢迎您，{{ currentUser.userName }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu class="header-dropdown" slot="dropdown">
            <!-- <el-dropdown-item style="cursor:default">
              企业名称：{{currentUser.entName}}
              <br />
              当前角色：{{currentRoleName}}
            </el-dropdown-item>
            <el-dropdown-item
              command="toggleRole"
              divided
              v-if="currentUser.isDoubleRole === 1"
            >切换角色：{{anotherRoleName}}</el-dropdown-item> -->
            <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <ChangePwd :dialogVisible="showPwdDialog" :userMobile="currentUser.mobile" @closeDialog="showPwdDialog = false"></ChangePwd>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import ChangePwd from '@/views/login/ChangePwd'
export default {
  components: {
    Hamburger,
    ChangePwd
  },
  created() {
    this.$store.dispatch('GetEnum')
  },
  data() {
    return {
      showPwdDialog: false,
      ocrRoute: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'currentUser', 'noticeUnreadNum', 'warningNum'])
  },
  methods: {
    // 触发window的resize
    resizeImage() {
      // let event = document.createEvent('HTMLEvents')
      // event.initEvent('resize', true, true)
      window.dispatchEvent(new Event('resize'))
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
      if (this.$route.name === 'ocrManageAdd' || this.$route.name === 'ocrManageShow') {
        setTimeout(() => {
          this.resizeImage()
        }, 300)
      }
    },
    handleDropdownClick(command) {
      switch (command) {
        case 'changePwd':
          this.showPwdDialog = true
          break
        case 'logout':
          this.$confirm('是否确定退出登录？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
          break
        default:
          break
      }
    }
    // handleNotice() {
    //   this.$router.push('/message/notice')
    // },
    // handleWarn() {
    //   this.$router.push('/message/warning')
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 88px;
  line-height: 88px;
  border-radius: 0px !important;
  display: flex;
  .hamburger-container {
    line-height: 102px;
    height: 88px;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #59676f;
  }
  .user-content {
    position: absolute;
    right: 30px;
    // width: 280px;
    float: right;
    text-align: right;
    font-size: 14px;
    .el-dropdown {
      font-size: 14px;
      max-width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      height: 56px;
      vertical-align: top;
      .el-dropdown-link {
        cursor: pointer;
      }
      .el-dropdown-menu {
        min-width: 180px;
      }
    }
    > span {
      display: inline-block;
      margin: 0 10px;
    }
  }
}
.badge-item {
  line-height: 1;
  cursor: pointer; //鼠标变小手
  margin-top: 0px;
  margin-right: 30px;
}
</style>
<style rel="stylesheet/scss" lang="scss">
.bell {
  width: 30px;
  height: 30px;
  .el-icon-bell {
    font-family: 'element-icons' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: top;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
  }
}
</style>
