/** 第三步：借款审批 */
<template>
  <div class="approvalLog">
    <el-timeline class="m-t-20">
      <el-timeline-item
        v-for="(activity, index) in logs"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"
      >
        <section class="activity">
          <li>
            {{activity.opinionName}}
            <span class="time">{{activity.timestamp}}</span>
          </li>
        </section>
      </el-timeline-item>
    </el-timeline>
    <div class="text-right m-r-20 p-b-20">
      <el-button type="primary" class="wide-button" size="small" @click="() => {this.$router.push('/loan-apply')}">返回</el-button>
    </div>
  </div>
</template>

<script>
import { queryOrderApproveLog } from '@/api/loan-apply'
export default {
  data() {
    return {
      logs: []
    }
  },
  mounted() {
    this.getLogData()
  },
  methods: {
    getLogData() {
      queryOrderApproveLog({
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }).then(res => {
        if (res.status === 200) {
          res.data.map(item => {
            item.opinionName =
              (item.createBy ? `${item.createBy}_` : '风险审批') + (item.createBy ? item.role$FICDictName : '') + ' ' + item.opinion$FICDictName
            item.color = '#0bbd87'
            item.timestamp = item.createTime
            this.logs.push(item)
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.approvalLog {
  width: 98%;
  /deep/ .el-timeline {
    margin-top: 20px !important;
  }
  .activity {
    background: #f2f2f2;
    padding: 10px 15px;
    li {
      padding: 10px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    li:nth-child(1) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .time {
        color: gray;
        font-size: 12px;
      }
    }
  }
}
</style>
