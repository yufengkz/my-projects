<template>
  <div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
          <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
          <a style="cursor: default;" v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
          <!-- <span class="prev-item" v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</span> -->
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <div v-if="breadcrumbInfo" class="right-info">
      <span v-if="breadcrumbInfo.businessNo">业务编号: {{ breadcrumbInfo.businessNo }}</span>
      <span v-if="breadcrumbInfo.contractNo">保理合同编号: {{ breadcrumbInfo.contractNo }}</span>
      <span v-if="breadcrumbInfo.receivableNo">应收账款转让通知书编号: {{ breadcrumbInfo.receivableNo }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    ...mapGetters(['breadcrumbInfo'])
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => true)
      this.levelList = matched
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      return false
      // const { redirect, path } = item
      // if (redirect) {
      //   this.$router.push(redirect)
      //   return
      // }
      // this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
// 去除小手和颜色变更效果
.el-breadcrumb__inner.is-link:hover, .el-breadcrumb__inner a:hover {
  color: #303133;
}
.right-info {
  float: right;
  font-size: 14px;
  line-height: 50px;
  color: #606266;
  span {
    margin-right: 20px;
  }
}
</style>
