/* [授信审批详情] 审批日志组件 */
<template>
  <div class="approvalLog">
    <el-row>
      <el-col :span="24">
        <div class="title">审批流转日志</div>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="iconHandle(activity.examineResultDesc)"
            :color="colorHandle(activity.examineResultDesc)"
            :size="timeline.size"
          >
            <section class="activity">
              <li>
                <div>
                  <template v-if="activity.submitUserName !== '-1'">{{activity.submitUserName}}-{{activity.submitRoleName}}</template>
                  <template v-else>{{activity.examineUserName}}-{{activity.examineRoleName}}</template>
                  <span>{{activity.examineResultDesc}}</span>
                </div>
                <span class="time">
                  <template v-if="index === 0">{{ activity.submitTime }}</template>
                  <template v-else>{{ activity.examineTime }}</template>
                </span>
              </li>
              <li>
                <DescriptionList :content="activity" v-if="activity.examineResult === '000' || activity.examineResult === '030' || activity.examineResult === '040'">
                  <template v-if="activity.submitRoleId === '-1'">
                    <Description label="审批授信金额">{{ activity.grantAmount ? activity.grantAmount + '元' : '--' }}</Description>
                  </template>
                  <template  v-else>
                    <Description label="审批授信金额">{{ activity.grantAmount ? activity.grantAmount + '元' : '--' }}</Description>
                    <Description label="审批利率">{{ activity.grantRate ? activity.grantRate + '%' : '--' }}</Description>
                    <Description label="贷款到期日">{{ activity.grantRepayMonth ? activity.grantRepayMonth + '月' :  '--' }}{{ activity.grantRepayDay ? activity.grantRepayDay + '日' :  '--' }}</Description>
                    <Description label="审批意见" style="width:100%">{{ activity.examineOpinion }}</Description>
                  </template>
                </DescriptionList>
                <DescriptionList :content="activity" v-if="activity.examineResult === '010'">
                  <template >
                    <!-- <Description label="退回原因 ">{{ activity.examineOpinion }}</Description> -->
                    <Description label="审批意见 ">{{ activity.examineOpinion }}</Description>
                  </template>
                </DescriptionList>
                <DescriptionList :content="activity" v-if="activity.examineResult === '020'">
                  <template >
                    <Description label="审批意见 ">{{ activity.examineOpinion }}</Description>
                  </template>
                </DescriptionList>
              </li>
            </section>
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getTraceLog } from '@/api/approval'
import DescriptionList from '@/components/DescriptionList'
export default {
  name: 'ApprovalLog',
  components: {
    DescriptionList
  },
  data() {
    return {
      timeline: {
        size: 'large'
      },
      activities: []
    }
  },
  created() {},
  mounted() {
    this.getTraceLogFun()
  },
  methods: {
    getTraceLogFun() {
      getTraceLog({
        applyNo: this.$route.query.applyNo,
        flowNo: 'C01'
      }).then(rep => {
        if (rep.status === 200) {
          const dataList = rep.data
          this.activities = dataList || []
        }
      })
    },
    iconHandle(examineResultDesc) {
      let icon = ''
      switch (examineResultDesc) {
        case '审批通过':
          icon = 'el-icon-check'
          break
        case '有条件审核通过':
          icon = 'el-icon-check'
          break
        case '审批退回':
          icon = 'el-icon-refresh-right'
          break
        case '审批拒绝':
          icon = 'el-icon-close'
          break
        case '放弃展业':
          icon = 'el-icon-close'
          break
        default:
          icon = 'el-icon-user'
      }
      return icon
    },
    colorHandle(examineResult) {
      let color = ''
      switch (examineResult) {
        case '审批通过':
          color = '#81C875'
          break
        case '有条件审核通过':
          color = '#81C875'
          break
        case '审批退回':
          color = '#F5DCA3'
          break
        case '审批拒绝':
          color = '#FF0000'
          break
        case '放弃展业':
          color = '#FF0000'
          break
        default:
          color = '#545454'
      }
      return color
    }
  }
}
</script>
<style lang="scss" scoped>
.approvalLog {
  .title {
    font-size: 14px;
    padding-left: 6px;
    line-height: 14px;
    border-left: 2px solid #08b448;
    color: #08b448;
    font-weight: 600;
    margin: 10px 0 15px;
  }
  .activity {
    background: #f2f2f2;
    padding: 10px 15px;
    li {
      padding: 10px 0;
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
