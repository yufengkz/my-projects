<template>
  <div class="approvalLog">
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in list"
        :key="index"
        :icon="activity.icon"
        :type="activity.type"
        :color="activity.color"
        :size="activity.size"

      >
        <section class="activity">
          <li>
            {{activity.content}}
            <span class="time">{{activity.timestamp}}</span>
          </li>
        </section>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { queryGuaranteeApproveLog } from '@/api/cosigner-manage'
export default {
  data() {
    return {
      list: []
    }
  },
  props: {},
  mounted() {},
  methods: {
    getApproveLog(applyNo) {
      this.list = []
      const param = {
        applyNo,
        guaranteeType: '02'
      }
      queryGuaranteeApproveLog(param).then(res => {
        res.data.map(item => {
          item.content = (item.createBy ? `${item.createBy} _` : '风险审批') + (item.createBy ? item.role$FICDictName : '') + ' ' + item.opinion$FICDictName
          item.timestamp = item.createTime
          item.color = '#0bbd87'
          this.list.push(item)
        })
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
