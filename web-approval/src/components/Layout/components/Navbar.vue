<template>
  <div class="fixed-header">
    <div class="navbar" mode="horizontal">
      <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />
      <span class="title">MAP金农审批系统</span>
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
        <!-- 用户信息 -->
        <div class="user-content-item user-content-username">欢迎您，{{ currentUser.userName }} {{ currentUser.roleName || '' }}</div>
        <div class="user-content-item">
          <!-- 切换角色 -->
          <el-tooltip placement="bottom" effect="light" v-if="nextRoleInfo">
            <div slot="content" class="tool-tip-content">
              角色信息：{{ nextRoleInfo.roleName }}
              <br />
              当前有{{ nextRoleInfo.businessCount || 0 }}条待审批
            </div>
            <el-badge
              :value="nextRoleInfo.businessCount"
              class="v-badge v-item"
              style="cursor:pointer;"
              :max="99"
              @click.native="handleCheckRole"
            >
              <i class="el-icon-refresh"></i>
            </el-badge>
          </el-tooltip>
          <el-divider direction="vertical" v-if="nextRoleInfo"></el-divider>
          <!-- 设置 -->
          <el-dropdown :hide-on-click="true" placement="bottom-start" @command="handleDropdownClick" trigger="click" class="v-item">
            <span class="el-dropdown-link">
              <i class="el-icon-s-tools"></i>
            </span>
            <el-dropdown-menu class="header-dropdown" slot="dropdown">
              <el-dropdown-item command="password">修改密码</el-dropdown-item>
              <el-dropdown-item command="mobile">修改手机号</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <ChangePwd :dialogVisible="showPwdDialog" :userMobile="currentUser.mobile" @closeDialog="showPwdDialog = false"></ChangePwd>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { changeLoginRole } from '@/api/login'
// import { routeInfo } from '@/store/modules/route-info'
import Hamburger from '@/components/Hamburger'
import ChangePwd from '@/views/login/ChangePwd'

import { changeRole, getNextRoleInfo } from '@/api/user'

export default {
  components: {
    Hamburger,
    ChangePwd
  },
  created() {
    // this.$store.dispatch('GetWarningNum')
    this.$store.dispatch('GetEnum')
    this.$store.dispatch('QueryAreaCascadeEnum')
  },
  data() {
    return {
      showPwdDialog: false,
      ocrRoute: false,
      nextRoleInfo: {}
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'currentUser', 'noticeUnreadNum', 'warningNum'])
    // currentRoleName() {
    //   return roleNameDic[this.currentUser.curRoleNo || '']
    // },
    // anotherRoleName() {
    //   const anotherRoleNo = this.currentUser.roleNo.find(element => element !== this.currentUser.curRoleNo)
    //   return roleNameDic[anotherRoleNo || '']
    // }
  },
  mounted() {
    this._getNextRoleInfo()
  },
  methods: {
    async _getNextRoleInfo() {
      const { status, data } = await getNextRoleInfo()
      if (status === 200) {
        this.nextRoleInfo = data
      }
    },
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
    // 切换角色
    handleCheckRole() {
      this.$confirm('是否确定切换角色？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用切换角色接口 病刷新页面
        changeRole({ change$RoleId: this.nextRoleInfo.roleId }).then(res => {
          if (res.status === 200) {
            this.$message.success('切换成功')
            setTimeout(() => {
              location.href = '/home' // 为了重新实例化vue-router对象 避免bug
            }, 1000)
          }
        })
      })
    },
    // 下拉框
    handleDropdownClick(command) {
      switch (command) {
        case 'password':
          this.$router.push('/password')
          break
        case 'mobile':
          this.$router.push('/mobile')
          break
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
  border-radius: 0px !important;
  background: $primary;
  border-left: 1px solid #55ca81;
  display: flex;
  align-items: center;
  .hamburger-container {
    line-height: 98px;
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
    color: #fff;
  }
  .user-content {
    position: absolute;
    right: 30px;
    // width: 280px;
    float: right;
    text-align: right;
    font-size: 14px;
    display: flex;
    .user-content-item {
      display: flex;
      align-items: center;
      margin: 0 10px;
      .v-item {
        font-size: 15px;
        color: #fff;
        padding: 0 10px;
      }
      .v-badge {
      }
      /deep/ .el-badge__content {
        height: 15px;
        line-height: 15px;
        padding: 0 3px;
        border: 1px solid transparent;
      }
      /deep/ .el-badge__content.is-fixed {
        top: 18px;
        z-index: 10;
      }
      .el-divider {
        background: #fff;
      }
    }
    .user-content-username {
      color: #fff;
    }
    .el-dropdown {
      font-size: 14px;
      max-width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      // height: 56px;
      vertical-align: top;
      .el-dropdown-link {
        cursor: pointer;
        color: #fff;
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
.tool-tip-content {
  color: #666;
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
