<template>
  <div>
    <template>
      <p class="title" @click="showLog()">
        查看日志
        <span class="el-icon-arrow-right"></span>
      </p>
    </template>
    <el-dialog title="日志" :center="true" :visible.sync="dialogVisible" :before-close="handleClose">
      <el-timeline v-if="content.length">
        <el-timeline-item
          v-for="(activity, index) in content"
          :key="index"
          icon="el-icon-discover"
          color="#0bbd87"
          size="large"
        >
          <div class="item" v-if="activity.createBy">
            <span class="time">{{activity.createTime}}</span>
            <span>{{activity.createBy}}_{{activity.role$FICDictName}}</span>
            <span v-if="activity.opinion === '3' || activity.opinion === '5'">
              <span v-show="activity.opinion === '3'">提交授信业务申请</span>
              <span v-show="activity.opinion === '5'">提交风险审批</span>
            </span>
            <span v-else>{{activity.opinion$FICDictName}}</span>
          </div>
          <div class="item" v-else>
            <span class="time">{{activity.createTime}}</span>
            <span>风险审批</span>
            <span v-if="activity.opinion === '5'">审批中……</span>
            <span v-else>{{activity.opinion$FICDictName}}</span>
            <!-- <span>{{activity.opinion$FICDictName}}</span> -->
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
  // margin-top: 50vh !important;
  width: 40% !important;
  // transform: translateY(-50%) !important;
  .el-dialog__body {
    max-height: 400px;
    overflow-y: auto;
  }
}
.title {
  font-size: 14px;
  padding-left: 6px;
  line-height: 14px;
  color: #08b448;
  font-weight: 600;
  cursor: pointer;
}
.msg {
  text-align: center;
}
.item {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: auto;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  .time {
    color: #0bbd87;
  }
}
.el-dialog__body {
  overflow-y: auto !important;
}
/deep/.el-timeline {
  /deep/.el-timeline-item {
    /deep/.el-timeline-item__wrapper {
      top: 0px !important;
    }
  }
}
</style>
