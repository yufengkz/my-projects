<template>
  <div>
    <template>
      <p class="title" @click="showLog()">
        查看日志
        <span class="el-icon-arrow-right"></span>
      </p>
    </template>
    <el-dialog
      title="日志"
      size="mini"
      :center="true"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-timeline  v-if="content.length">
        <el-timeline-item
          v-for="(activity, index) in content"
          :key="index"
          icon="el-icon-discover"
          color="#419EFF"
          size="large"
        >
          <div class="item">
            <span>{{activity.createTime}}</span>
            <span>{{activity.createBy}}_{{activity.role$FICDictName}}</span>
            <span>{{activity.opinion$FICDictName}}</span>
          </div>
        </el-timeline-item>
      </el-timeline>
      <div v-if="!content.length" class="msg">没有操作日志</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    // 审批日志数据
    content: {
      type: Array
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      console.log('查看日志中的方法', done)
      done()
    },
    showLog() {
      this.dialogVisible = true
      this.$emit('showLog') // 调用父组件的审批日志报告的方法
    }
  },
  watch: {
    content() {}
  }
}
</script>

<style lang='scss' scoped>
/deep/ .el-dialog__wrapper .el-dialog {
  margin-top: 50vh !important;
  width: 30% !important;
  transform: translateY(-50%) !important;
}
.title {
  font-size: 14px;
  padding-left: 6px;
  line-height: 14px;
  color: #08b448;
  font-weight: 600;
  cursor: pointer;
}
.msg{
  text-align: center;
}
.item {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: auto;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  span {
    text-align: center;
  }
  span:nth-child(1) {
    color: #419eff;
  }
}
</style>
