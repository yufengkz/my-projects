<template>
  <div></div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  created() {
    // 获取用户信息，跳转到菜单第一个页面
    this.$store
      .dispatch('GetUserInfo')
      .then(res => {
        this.$store.dispatch('GenerateRoutes', res.data.resourcesListTreeList).then(() => {
          this.$router.push(res.data.resourcesListTreeList[0].path || '/home')
        })
      })
      .catch(err => {
        this.$message.error(err)
      })
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
