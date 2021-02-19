
<template>
  <div class="app-container">
    <span class="detail-module-title">穿梭框</span>
    <Transfer :TranData="TranData" :checkTranData="value"></Transfer>
  </div>
</template>

<script>
import { getTranferList } from '@/api/mock'
export default {
  components: {
    Transfer: () => import('@/components/Transfer')
  },
  data() {
    return {
      TranData: [],
      value: []
    }
  },
  created() {
    this.getTransDataInfo()
  },
  methods: {
    getTransDataInfo() {
      getTranferList().then(res => {
        res.data.forEach(item => {
          item.label = item.createTime
          item.key = item.id
          this.TranData.push(item)
          this.value.push(item.key)
        })
      })
    }
  }
}
</script>

<style>
</style>
