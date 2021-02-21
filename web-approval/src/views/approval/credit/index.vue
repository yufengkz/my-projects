/* 授信审批列表页面 */
<template>
  <div class="approvalCredit">
    <div class="indexTop">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="lvsige">
        <el-tab-pane label="待审批" name="first">
          <BacklogList v-if="mapListByRole.length && mapProducts.length" :mapProducts="mapProducts" :activeRole="resourcesName" :mapListByRole="mapListByRole"></BacklogList>
        </el-tab-pane>
        <el-tab-pane label="已审批" name="second">
          <UnderwayList v-if="mapListByRole.length && mapProducts.length" :mapProducts="mapProducts" :activeRole="resourcesName" :mapListByRole="mapListByRole"></UnderwayList>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="third">
          <FinishedList v-if="mapListByRole.length && mapProducts.length" :mapProducts="mapProducts" :activeRole="resourcesName" :mapListByRole="mapListByRole"></FinishedList>
        </el-tab-pane>
        <!--<el-tab-pane label="全部" name="fourth">-->
          <!--<AllList :activeRole="resourcesName" :mapListByRole="mapListByRole"></AllList>-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getResourcesByUrl } from '@/api/common'
import { mapGetters } from 'vuex'

export default {
  name: 'ApprovalCredit',
  components: {
    BacklogList: () => import('./components/BacklogList'),
    FinishedList: () => import('./components/FinishedList'),
    UnderwayList: () => import('./components/UnderwayList')
    // AllList: () => import('./components/AllList')
  },
  filters: {},
  data() {
    return {
      activeName: 'first',
      resourcesName: '3', // 当前用户身份权限 0贷审会 - 1一级 - 2二级 - 3三级
      mapListByRole: []// map 中心下拉数据
    }
  },
  async mounted() {
  },
  async created() {
    // 根据用户获取当前map中心
    await this.$store.dispatch('GetMAPList')
    this.mapListByRole = this.MAPList || []
    await this.$store.dispatch('GetMAPProducts')
    this.getResourcesByUrlFun()
  },
  computed: {
    ...mapGetters(['MAPList', 'mapProducts', 'currentUser'])
  },
  methods: {
    handleClick() {},
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
    }
  },
  watch: {}
}
</script>

<style lang="scss" scoped>
.approvalCredit {
  /deep/.el-tabs__header {
    padding: 10px 20px 0 21px !important;
    position: relative;
    margin: 0 !important;
    background: #fff !important;
  }
}
</style>
