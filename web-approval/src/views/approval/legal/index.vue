/* 法人担保审批列表页面 */
<template>
  <div class="approvalLegal">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="lvsige">
      <el-tab-pane label="待审批" name="first">
        <BacklogList :activeRole="resourcesName" :mapListByRole="mapListByRole"></BacklogList>
      </el-tab-pane>
      <el-tab-pane label="已审批" name="second">
        <UnderwayList :activeRole="resourcesName" :mapListByRole="mapListByRole"></UnderwayList>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="third">
        <FinishedList :activeRole="resourcesName" :mapListByRole="mapListByRole"></FinishedList>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getResourcesByUrl } from '@/api/common'
import { mapGetters } from 'vuex'
export default {
  name: 'ApprovalLegal',
  components: {
    BacklogList: () => import('./components/BacklogList'),
    FinishedList: () => import('./components/FinishedList'),
    UnderwayList: () => import('./components/UnderwayList')
  },
  data() {
    return {
      activeName: 'first',
      resourcesName: '3', // 权限身份 0 - 1 - 2 - 3
      mapListByRole: [] // map 中心下拉数据
    }
  },
  created() {
    this.getResourcesByUrlFun()
  },
  async mounted() {
    // 根据用户获取当前map中心
    await this.$store.dispatch('GetMAPList')
    this.mapListByRole = this.MAPList || []
    this.getResourcesByUrlFun()
  },
  computed: {
    ...mapGetters(['MAPList', 'mapProducts'])
  },
  methods: {
    // 获取当前账号的审批权限
    getResourcesByUrlFun() {
      let url = ''
      if (this.$route.path.endsWith('/')) {
        url = this.$route.path.slice(0, this.$route.path.length - 1)
      } else {
        url = this.$route.path
      }
      getResourcesByUrl({ url }).then(result => {
        if (result.status === 200) {
          if (result.data.resourcesName === '三级审批') {
            this.resourcesName = '3'
          } else if (result.data.resourcesName === '二级审批') {
            this.resourcesName = '2'
          } else if (result.data.resourcesName === '一级审批') {
            this.resourcesName = '1'
          } else {
            // 此处还需要做一个判断 判断为0
            this.resourcesName = '0'
          }
        } else {
          this.$message.error(result.message || '失败')
        }
      })
    },
    handleClick(tab, event) {
      this.activeName = tab.name
    }
  }
}
</script>
<style lang="scss" scoped>
.approvalLegal {
  /deep/.el-tabs__header {
    padding: 10px 20px 0 21px !important;
    position: relative;
    margin: 0 !important;
    background: #fff !important;
  }
}
</style>
