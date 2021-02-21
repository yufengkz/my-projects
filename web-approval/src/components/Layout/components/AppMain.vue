<template>
  <section class="app-main">
    <breadcrumb></breadcrumb>
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <!-- <router-view :key="key"></router-view> -->
      <router-view/>
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'AppMain',
  components: { Breadcrumb },
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style scoped>
.app-main {
  /*88 = navbar  */
  background-color: #f6f6fa;
  padding: 0 2% 30px;
  min-height: calc(100vh - 88px);
  position: relative;
  overflow: hidden;
}
</style>
