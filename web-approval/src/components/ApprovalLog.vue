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
                  <template v-if="!activity.submitUserName && activity.examineResult === '020'">{{activity.submitRoleName}}</template>
                  <template v-else-if="activity.submitUserName !== '-1'">{{activity.submitUserName}}-{{activity.submitRoleName}}</template>
                  <span>{{activity.examineResultDesc}}</span>
                  <!-- <template v-if="activity.examineResultDesc === '待审批'">待{{activity.examineUserName}}_{{activity.examineRoleName}}审批</template> -->
                  <!-- <template v-if="activity.examineResultDesc === '待审批'">待{{activity.examineUserName === '-1' ? 'map中心' : activity.examineUserName}}{{activity.examineRoleName === '-1' ? '' : '_' + activity.examineRoleName}}审批</template>
                  <template v-else-if="activity.examineResultDesc !== '待审批'">{{activity.submitUserName}}_{{activity.submitRoleName}}&nbsp;&nbsp;&nbsp;&nbsp;{{activity.examineResultDesc}}</template> -->
                  <!-- <template v-else-if="!activity.submitUserName && activity.examineResult === '020'">{{activity.submitRoleName}}</template> -->
                </div>
                <span class="time">
                  <template>{{ activity.submitTime }}</template>
                </span>
              </li>
              <li>
                 <DescriptionList :col="20" :content="activity" v-if="activity.examineResult === '000' || activity.examineResult === '030'">
                  <template v-if="activity.examineResultDesc === '待审批'">
                    <Description label="审批担保金额">{{ amountFormatter(activity.grantAmount) }} 元</Description>
                    <!-- <Description label="申请担保金额">{{ activity.grantAmount }}</Description> -->
                  </template>
                  <template v-else-if="activity.examineResultDesc === '审批通过' || activity.examineResultDesc === '有条件审核通过' ">
                    <Description label="审批担保金额">{{ amountFormatter(activity.grantAmount) }} 元</Description>
                    <Description label="审批意见" style="width:100%">{{ activity.examineOpinion }}</Description>
                  </template>
                </DescriptionList>
                <DescriptionList :content="activity" v-else>
                  <template >
                    <Description label="审批意见"  >{{ activity.examineOpinion }}</Description>
                    <!-- <Description :label="activity.examineResult === '020' ? '拒绝原因' : '退回原因'"  >{{ activity.examineOpinion }}</Description> -->
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
import DescriptionList from '@/components/DescriptionList'
import { ansFormatter } from '@/utils/tool.js'
export default {
  name: 'ApprovalLog',
  props: {
    activities: {
      type: Array,
      default: () => []
    }
  },
  components: {
    DescriptionList
  },
  data() {
    return {
      timeline: {
        size: 'large'
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
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
    },
    /* 金额格式化 */
    amountFormatter(v) {
      return ansFormatter(v)
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
