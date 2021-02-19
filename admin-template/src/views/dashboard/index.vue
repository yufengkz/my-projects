<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
// import debtor from './debtor'
// import financier from './financier'
import factoring from './factoring'

export default {
  name: 'Dashboard',
  components: { factoring },
  data() {
    return {
      currentRole: 'factoring'
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'roles'
  //   ])
  // },
  created() {
    // if (this.$route)
  },
  mounted() {
    // 按设计稿，去除上层布局的padding间距
    this.$emit('dashboardStatus', true)
  },
  beforeDestroy() {
    // 还原上层布局的padding间距
    this.$emit('dashboardStatus', false)
  }
}
</script>
