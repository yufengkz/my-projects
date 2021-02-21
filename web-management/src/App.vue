<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <backto-top />
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import { param2Obj } from '@/utils'
import { setToken } from '@/utils/auth'
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
      mapProductsBase: null,
      cooperativeEnterpriseBase: null,
      loanProductsBase: null,
      regionsBase: null,
      provinceBase: null
    }
  },
  computed: {
    // ...mapGetters(['prodects', 'mapProducts', 'loanProducts', 'regions', 'province'])
  },
  created() {
    // if (process.env.NODE_ENV === 'development') {
    //   const queryObj = param2Obj(window.location.href)
    //   if (queryObj['sc-token']) {
    //     setToken(queryObj['sc-token'])
    //   }
    // }
    // uat环境 统一登录报错 两台服务器 token不同步
    const queryObj = param2Obj(window.location.href)
    if (queryObj['sc-token']) {
      setToken(queryObj['sc-token'])
    }
  },
  mounted() {
    this.getBaseData()
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    getBaseData() {
      //
      this.$store.dispatch('GetEnum')
      // MAP中心产品类型
      this.$store.dispatch('GetProdectsType', { type: 'productType' })
      // MAP中心贷款产品列表
      this.$store.dispatch('GetMAPProducts')
      // 获取服务业务信息
      this.$store.dispatch('getServices', { type: 'cropsType' })
      // 获取合作企业列表
      this.$store.dispatch('GetCooperativeEnterprise')
      // 获取展业状态
      this.$store.dispatch('GetStatusEnmu', { type: 'creditStatus' })
      // 获取贷款产品数据列表
      this.$store.dispatch('GetLoanProducts')
      // 获取所有省市区信息
      this.$store.dispatch('GetRegions')
      // 获取省市县 - 省 GetRegions
      this.$store.dispatch('GetProvince')
      // 是否新用户
      this.$store.dispatch('GetNewUserFlag', { type: 'newUserFlag' })
    }
  }
}
</script>

<style lang="scss">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
</style>
