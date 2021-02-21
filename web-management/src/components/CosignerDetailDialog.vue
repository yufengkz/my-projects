<template>
  <div>
    <template>
      <p class="title" @click="showLog()">
        查看日志
        <span class="el-icon-arrow-right"></span>
      </p>
    </template>
    <el-dialog title="日志" :center="true" :visible.sync="dialogVisible" :before-close="handleClose" width="70%">
      <div v-if="content.length">
        <div v-for="(activity, index) in content" :key="index">
          <!-- 展业 -->
          <template v-if="activity.opinion === '2' || activity.opinion === '3'">
            <!-- 专员 -->
            <div class="item" v-if="activity.role == '003'">
              <span class="time">
                <i class="el-icon-time"></i>
                {{ activity.createTime }}
              </span>
              <span>{{ activity.createBy }} &nbsp; {{ activity.role$FICDictName }}</span>
              <span>提交业务申请</span>
            </div>
            <!-- 经理 -->
            <div class="item" v-else-if="activity.role === '002'">
              <span class="time">
                <i class="el-icon-time"></i>
                {{ activity.createTime }}
              </span>
              <span>{{ activity.createBy }} &nbsp; {{ activity.role$FICDictName }}</span>
              <span>提交业务申请</span>
            </div>
          </template>
          <!-- 审批 -->
          <template v-else>
            <!-- 030 待审批 -->
            <template v-if="activity.examineResult === '030'">
              <div class="item">
                <span class="time">
                  <i class="el-icon-time"></i>
                  {{ activity.createTime }}
                </span>
                <span>{{ activity.examineUserName }} &nbsp; {{ activity.examineRoleName }}</span>
                <span>审批中...</span>
              </div>
            </template>
            <!-- 审批 010 审批退回  020 审批拒绝 -->
            <template v-else-if="activity.examineResult === '010' || activity.examineResult === '020'">
              <div class="item">
                <span class="time">
                  <i class="el-icon-time"></i>
                  {{ activity.createTime }}
                </span>
                <span>{{ activity.submitUserName }} &nbsp; {{ activity.submitRoleName }}</span>
                <span>
                  {{ activity.examineResultDesc }}
                </span>
                <span>{{ activity.examineOpinion ? '退回意见：' + activity.examineOpinion : '' }}</span>
              </div>
            </template>
            <!-- 审批通过 000 -->
            <template v-else>
              <div class="item">
                <span class="time">
                  <i class="el-icon-time"></i>
                  {{ activity.createTime }}
                </span>
                <span>{{ activity.submitUserName }} &nbsp; {{ activity.submitRoleName }}</span>
                <span>
                  {{ activity.examineResultDesc }} &nbsp;
                  {{ activity.grantAmount ? '审批金额(元)：' + activity.grantAmount : '' }}
                </span>
                <span>{{ activity.examineOpinion ? '审批意见：' + activity.examineOpinion : '' }}</span>
              </div>
            </template>
          </template>
        </div>
      </div>
      <div v-if="!content.length" class="msg">没有操作日志</div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'CosignerDetailDialog',
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

<style lang="scss" scoped>
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
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
  // font-size: 12px;
  // font-weight: 400;
  display: grid;
  grid-template-columns: 20% 20% 20% 30%;
  grid-template-rows: auto;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  padding-bottom: 10px;

  span {
    // flex: 2;
    // text-align: center;
  }
  .time {
  }
  span:nth-child(1) {
    color: #0bbd87;
  }
}
</style>
