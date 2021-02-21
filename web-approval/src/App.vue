<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <backto-top />
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api'
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
  setup(props, ctx) {
    const { $store } = ctx.root
    const isRouterAlive = ref(true)
    const currentUser = computed(() => $store.getters.currentUser)
    // if (process.env.NODE_ENV === 'development') {
    //   const queryObj = param2Obj(window.location.href)
    //   if (queryObj['sc-token']) {
    //     setToken(queryObj['sc-token'])
    //   }
    // }
    const queryObj = param2Obj(window.location.href)
    if (queryObj['sc-token']) {
      setToken(queryObj['sc-token'])
    }

    const reload = () => {
      isRouterAlive.value = false
      this.$nextTick(() => {
        isRouterAlive.value = true
      })
    }

    const getBaseData = async () => {
      // common 获取map中心列表
      await $store.dispatch('GetMAPList')
      // 获取公用数据枚举
      await $store.dispatch('GetEnumList')
      // 获取用户信息
      await $store.dispatch('GetUserInfo')

      // 根据用户获取当前map中心
      await $store.dispatch('GetMAPListByRole', currentUser.value.mobileNo)
    }

    onMounted(() => {
      // 获取公用数据枚举
      getBaseData()
    })

    return {
      isRouterAlive,
      reload
    }
  }
}
</script>

<style lang="scss"></style>
