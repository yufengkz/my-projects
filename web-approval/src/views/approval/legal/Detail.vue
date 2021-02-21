<template>
  <div class="approvalLegalDetail">
    <el-row :gutter="16">
      <el-col :span="18">
        <div class="leftContext">
          <el-tabs ref="approvalDetailTabs" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="审批信息" name="first">
              <ApprovalInfo :resultData="resultData" :timeData="timeData"/>
              <!-- <ApprovalInfo ref="approvalInfo"/> -->
            </el-tab-pane>
            <el-tab-pane label="审批日志" name="second">
              <ApprovalLog ref="approvaLog"  :activities="activities" />
            </el-tab-pane>
            <el-tab-pane label="历史审批记录" name="third" v-if="isShow">
              <HistoricalApprovalRecord ref="third"/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="rightContext">
          <div class="title">风险审批</div>
          <div v-if="isApproval">
            <!-- 风险审批提交前 -->
              <RiskApprovalForm @onSubmit="onSubmit" @onSaveDrafts="onSaveDrafts" :resultOptions="resultOptions" :sendBackOptions="sendBackOptions" :maxMoney="maxMoney" :riskApprovaResult="riskApprovaResult" :approveAmount="examineData.approveAmount"/>
          </div>
          <div v-else>
            <!-- 审批查看 通过-->
            <div class="approveShow" v-if="status === '000' ">
              <li>
                <span class="name">审批结果</span>
                <span class="active">{{riskApprovaResult.examineResultDesc}}</span>
              </li>
              <li>
                <span class="name">担保金额</span>
                <span>{{amountFormatter(riskApprovaResult.grantAmount)}} (元)</span>
              </li>
              <li>
                <span class="name">审批意见</span>
              </li>
              <div class="text">{{riskApprovaResult.examineOpinion}}</div>
            </div>
            <!-- 审批查看 退回-->
            <div class="approveShow" v-if="status === '010'">
              <li>
                <span class="name">审批结果</span>
                <span class="active">{{riskApprovaResult.examineResultDesc}}</span>
              </li>
              <li>
                <span class="name">退回目标</span>
                <span>{{riskApprovaResult.submitUserLevel$FICDictName}}</span>
              </li>
              <li>
                <span class="name">审批意见</span>
                <!-- <span class="name">退回原因</span> -->
              </li>
              <div class="text">{{riskApprovaResult.examineOpinion}}</div>
            </div>
            <!-- 审批查看 拒绝-->
            <div class="approveShow" v-if="status === '020'">
              <li>
                <span class="name">审批结果</span>
                <span class="active" v-if="examineData.status !== '11'">MAP中心处理中</span>
                <span class="on" v-else>{{riskApprovaResult.examineResultDesc}}</span>
              </li>
              <li>
                <!-- <span class="name">拒绝原因</span> -->
                <span class="name">审批意见</span>
              </li>
              <div class="text">{{riskApprovaResult.examineOpinion}}</div>
            </div>
          </div>
          <!-- 审批查看 审批中 N是显示回显状态 010为不是退回状态-->
          <div class="approveShow" v-if="riskApprovaResult.is !== 'Y' && riskApprovaResult.examineResult !== '010' && riskApprovaResult.examineResult !== '000' &&riskApprovaResult.examineResult !=='020'">
            <li>
              <span class="name">审批结果</span>
              <span class="active">{{examineData.checkLevel$FICDictName + '中'}}</span>
            </li>
            <li>
              <span class="name">担保金额</span>
              <span>{{amountFormatter(riskApprovaResult.grantAmount)}} (元)</span>
            </li>
            <li>
              <span class="name">审批意见</span>
            </li>
            <div class="text">{{riskApprovaResult.examineOpinion}}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getTraceLog, getLegalDetail, legalSubmitForApproval, getQueryReturnApprovalLevelStatus, getApproveTypeSelect, naturalSubmitTraceStaging } from '@/api/approval'
import { ansFormatter } from '@/utils/tool.js'
import { mapGetters } from 'vuex'

export default {
  name: 'ApprovalLegalDetail',
  components: {
    ApprovalInfo: () => import('./components/ApprovalInfo'), // 审批信息
    ApprovalLog: () => import('@/components/ApprovalLog'), // 审批日志
    HistoricalApprovalRecord: () => import('./components/HistoricalApprovalRecord'), // 历史审批记录
    RiskApprovalForm: () => import('./components/RiskApprovalForm')
  },
  data() {
    return {
      timeData: {}, // 提交时间
      maxMoney: 0, // 建议申请金额
      activities: [],
      // 审批结果 下拉数组
      resultOptions: [
        // { label: '审批通过', value: 1000 },
        // { label: '审批拒绝', value: 4000 },
        // { label: '审批退回', value: 3000 }
      ],
      // 退回目标 下拉数组
      sendBackOptions: [],
      resultData: {}, // 详情页面信息
      activeName: 'first',
      logData: [], // 审批日志数据
      status: '', // 当前审批状态
      examineData: {}, // 审批中状态
      riskApprovaResult: {}, // 风险审批结果
      isApproval: true, // 审批操作还是审批查看
      isShow: true // 历史审批记录为true显示
    }
  },
  created() {},
  mounted() {
    this.isShowTab()
    this.getLegalPersonDetail() // 获取详情数据
    this.getSelectStatus() // 获取退回下拉框
    this.getApproveTypeSelectFun() // 获取风险审批结果数据
  },
  methods: {
    // 获取详情页面数据
    getLegalPersonDetail() {
      getLegalDetail({ applyNo: this.$route.query.applyNo }).then(result => {
        if (result.status === 200) {
          this.maxMoney = +result.data.data.proposalLimit
          this.resultData = result.data.data || {}
          this.timeData.commitTime = result.data.approveLegalGuaranteOutDTO.commitTime // 提交时间
          this.examineData = result.data.approveLegalGuaranteOutDTO || {}
          this.status = result.data.riskApprovalOfCreditTransferOutDTO.examineResult || ''
          this.riskApprovaResult = result.data.riskApprovalOfCreditTransferOutDTO || {}
          if (result.data.riskApprovalOfCreditTransferOutDTO.is === 'Y') {
            this.isApproval = true
          } else {
            this.isApproval = false
          }
        } else {
          this.$message.error(result.data || '失败')
        }
      })
    },
    // 风险审批确认提交
    onSubmit(val) {
      // 获取审批结果编号
      const examineResultNo = this.resultOptions.find(v => v.label === val.examineResultDesc)
      const params = {
        ...val,
        applyNo: this.$route.query.applyNo,
        examineResultNo: examineResultNo.value // 审批结果编号
      }
      // 法人风险审批提交
      legalSubmitForApproval(params).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message)
          // 重新调用详情接口
          this.getLegalPersonDetail()
          if (this.activeName === 'second') {
            // 调用审批日志接口
            this.getTraceLogFun()
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 切换tab
    handleClick(tab, event) {
      if (tab.name === 'second') {
        this.getTraceLogFun()
      } else if (this.$route.query.isShow === '1' && tab.name === 'third') {
        this.$refs.third.getHistoryPersonInfo()
        this.$refs.third.initSelectList()
      }
    },
    // 判断是否显示历史审批记录
    isShowTab() {
      this.isShow = this.$route.query.isShow === '1'
      this.activeName = 'first'
      this.getLegalPersonDetail()
    },
    // 获取退回下拉框数据
    getSelectStatus() {
      getQueryReturnApprovalLevelStatus({ businessType: 'C03' }).then(res => {
        if (res.status === 200) {
          if (res.data) {
            this.sendBackOptions = Object.keys(res.data).map(item => {
              return {
                label: res.data[item],
                value: 'LV' + item
              }
            })
          } else {
            this.sendBackOptions = []
          }
        }
      })
    },
    // 获取日志信息
    getTraceLogFun() {
      getTraceLog({
        applyNo: this.$route.query.applyNo,
        flowNo: 'C03'
      }).then(rep => {
        if (rep.status === 200) {
          const dataList = rep.data
          this.activities = dataList || []
        }
      })
    },
    /* 金额格式化 */
    amountFormatter(v) {
      return ansFormatter(v)
    },
    // 获取风险审批结果下拉框
    getApproveTypeSelectFun() {
      getApproveTypeSelect('C03').then(res => {
        if (res.status === 200) {
          this.resultOptions = Object.keys(res.data).length && Object.keys(res.data).map(item => {
            return {
              label: res.data[item],
              value: item
            }
          })
        } else {
          this.$message.error(res.message || '失败')
        }
      })
    },
    // 保存草稿
    onSaveDrafts(val) {
      const examineResultNo = this.resultOptions.find(v => v.label === val.examineResultDesc)
      const params = {
        ...val,
        flowNo: 'C03', // 业务类型
        applyNo: this.$route.query.applyNo,
        commitUserId: this.currentUser.id, // 当前提交人id
        commitUserName: this.currentUser.userName, // 当前提交人姓名
        examineResultNo: examineResultNo.value // 审批结果编号
      }
      naturalSubmitTraceStaging(params).then(res => {
        if (res.status === 200) {
          this.getLegalPersonDetail() // 保存草稿后 刷新详情页草稿回写数据
          this.$message.success(res.message)
        } else {
          this.$message.error(res.message)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  watch: {
    $route: {
      handler(newVal, oldVal) {
        if (newVal.query.isShow !== oldVal.query.isShow) {
          this.isShowTab()
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.approvalLegalDetail {
  .leftContext {
    background: #fff;
    padding: 10px 24px 0;
    /deep/ .el-tabs__nav {
      display: flex;
    }
  }
  .rightContext {
    background: #fff;
    border: 2px solid #08b347;
    border-radius: 1px;
    padding: 19px 24px;
    .title {
      font-size: 16px;
      color: #08b347;
      line-height: 24px;
      font-weight: 600;
      padding-bottom: 10px;
    }
    /deep/ .el-col {
      width: 100%;
    }
    /deep/ .el-form-item {
      display: flex;
      flex-direction: column;
    }
    /deep/ .el-form {
      padding: 20px 20px 0 0;
      .el-form-item__label {
        text-align: left;
      }
    }
    .approveShow {
      // padding: 0 10px;
      width: 100%;
      height: auto;
      li {
        display: flex;
        height: 28px;
        list-style: none;
        justify-content: space-between;
        align-items: center;
        .name {
          color: #5a5a5a;
        }
      }
      .text {
        max-height: 150px;
        overflow-y: auto;
        font-size: 12px;
        line-height: 28px;
      }
      span {
        font-size: 12px;
        &.active {
          color: #08B448;
        }
        &.on {
          color: red;
        }
      }
    }
  }
}
</style>
