/* 贷款申请列表页面 */
<template>
  <div class="commonHeader">
    <el-row>
      <el-col :span="24">
        <div class="indexTop">
          <el-tabs v-model="activeName" @tab-click="handleClick" class="lvsige">
            <el-tab-pane label="待办" name="first">
              <BacklogList></BacklogList>
            </el-tab-pane>
            <el-tab-pane label="已办" name="second">
              <FinishedList></FinishedList>
            </el-tab-pane>
            <el-tab-pane label="已办结" name="third">
              <UnderwayList></UnderwayList>
            </el-tab-pane>
            <!-- <el-tab-pane label="全部" name="fourth">
              <AllList></AllList>
            </el-tab-pane> -->
          </el-tabs>
        </div>
      </el-col>
      <div class="indexBottom">
        <!-- <el-button size="small" type="plain" @click="uploadDialogVisible=true">批量导入</el-button> -->
        <!-- <el-button size="small"  icon="el-icon-plus" type="primary" @click="() => {this.$router.push('/loan-apply/add')}">新增贷款申请</el-button> -->
      </div>
    </el-row>
    <ChunkUploadDialog :orderNo="'1'" dialogTitle="贷款申请批量导入" :dialogVisible="uploadDialogVisible" @closeDialog="closeUploadDialog"></ChunkUploadDialog>
  </div>
</template>
<script>
export default {
  name: 'LoanApply',
  components: {
    BacklogList: () => import('./components/BacklogList'),
    FinishedList: () => import('./components/FinishedList'),
    UnderwayList: () => import('./components/UnderwayList'),
    // AllList: () => import('./components/AllList'),
    ChunkUploadDialog: () => import('@/components/ChunkUploadDialog')
  },
  data() {
    return {
      activeName: 'first',
      uploadDialogVisible: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    closeUploadDialog() {
      this.uploadDialogVisible = false
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.el-tabs__header {
  padding: 10px 20px 0 21px !important;
  position: relative;
  margin: 0 !important;
  background: #fff !important;
}
.indexTop {
  position: relative;
  width: 100%;
  /*height: 500px;*/
}
.indexBottom {
  position: absolute;
  right: 20px;
  top: 10px;
}
</style>
