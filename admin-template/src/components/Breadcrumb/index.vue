<template>
  <div>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in titleList" :key="item">
          <span v-if="index==titleList.length-1">{{item}}</span>
          <span v-else style="font-weight: bold;">{{item}}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      titleList: []
    }
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
      this.titleList = []
      this.$route.matched.forEach(item => {
        if (Object.prototype.toString.call(item.meta.title) === '[object Array]') {
          this.titleList = this.titleList.concat(item.meta.title)
        } else if (item.meta.title) {
          this.titleList.push(item.meta.title)
        }
      })
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
