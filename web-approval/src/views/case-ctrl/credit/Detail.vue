<template>
  <div class="caseCtrlCreditDetail">
    <el-row :gutter="16">
      <el-col :span="17">
        <div class="leftMsg">
          <el-tabs v-model="msgActiveName" @tab-click="handleClick">
            <el-tab-pane label="审批信息" name="first">
              <ApprovalInformation :responseData="repData"></ApprovalInformation>
            </el-tab-pane>
            <el-tab-pane label="审批日志" name="third">
              <ApprovalLog></ApprovalLog>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="artificialBtn">
          <ArtificialTransferDialog :optionData="optionData" @accepterVal="accepterVal" @showVisable="showVisable" />
        </div>
        <div class="rightApproval">
          <div class="title">风险审批</div>
          <div class="approvalResult">
            <div v-if="status === '000' || status === '030' || status === '040'">
              <div class="result border">
                <span>审批结果</span>
                <span v-if="status === '000' || status === '040'" class="green">{{ riskApprovalOfCreditTransferOutDTO.examineResult$FICDictName }}</span>
                <span v-if="status === '030'" class="green">{{ riskApprovalOfCreditTransferOutDTO.submitUserLevel$FICDictName + '中' }}</span>
              </div>
              <div class="border">
                <div class="black">借款人</div>
                <div class="result">
                  <span>审批金额</span>
                  <span class="black">{{ amountFormatter(riskApprovalOfCreditTransferOutDTO.grantAmount) }}（元）</span>
                </div>
                <div class="result">
                  <span>审批利率</span>
                  <span class="black">{{ riskApprovalOfCreditTransferOutDTO.grantRate }}%（年）</span>
                </div>
                <div class="result">
                  <span>贷款到期日</span>
                  <span class="black">{{ riskApprovalOfCreditTransferOutDTO.grantRepayMonth }}月{{ riskApprovalOfCreditTransferOutDTO.grantRepayDate }}日</span>
                </div>
              </div>
              <div v-if="guarantee.length > 0" class="border">
                <template v-for="(item, index) in guarantee">
                  <div :key="item.id">
                    <div class="black">担保人{{ index + 1 }}</div>
                    <div class="result">
                      <span>担保金额</span>
                      <span class="black">{{ amountFormatter(riskApprovalOfCreditTransferOutDTO.grantAmount) }}（元）</span>
                    </div>
                  </div>
                </template>
              </div>
              <div>
                <div>审批意见</div>
                <div class="result">
                  <span class="examineOpinion">{{ riskApprovalOfCreditTransferOutDTO.examineOpinion }}</span>
                </div>
              </div>
            </div>
            <div v-if="status === '020'">
              <div class="result border">
                <span>审批结果</span>
                <span class="green" v-if="approveCreditOutDTO.status !== '11'">MAP中心处理中</span>
                <span class="red" v-else>{{ riskApprovalOfCreditTransferOutDTO.examineResult$FICDictName }}</span>
              </div>
              <div>
                <!-- <div>拒绝原因</div> -->
                <div>审批意见</div>
                <div class="result">
                  <span class="examineOpinion">{{ riskApprovalOfCreditTransferOutDTO.examineOpinion }}</span>
                </div>
              </div>
            </div>
            <div v-if="status === '010'">
              <div class="result border">
                <span>审批结果</span>
                <span class="green">{{ riskApprovalOfCreditTransferOutDTO.examineResult$FICDictName }}</span>
              </div>
              <div class="result">
                <span>退回目标</span>
                <span class="black">{{ riskApprovalOfCreditTransferOutDTO.submitUserLevel$FICDictName }}</span>
              </div>
              <div>
                <!-- <div>拒绝原因</div> -->
                <div>审批意见</div>
                <div class="result">
                  <span class="examineOpinion">{{ riskApprovalOfCreditTransferOutDTO.examineOpinion }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ansFormatter } from '@/utils/tool'
import { getCreditApplicationDetail, creditPersonGuarantee, getTransferResources } from '@/api/case-ctrl'
import { mapGetters } from 'vuex'
export default {
  name: 'CaseCtrlCreditDetail',
  components: {
    ApprovalInformation: () => import('./components/ApprovalInformation'),
    ApprovalLog: () => import('./components/ApprovalLog'),
    ArtificialTransferDialog: () => import('@/components/ArtificialTransferDialog')
  },
  data() {
    return {
      msgActiveName: 'first',
      isApproval: false,
      status: '',
      // 退回目标 下拉数组
      form: {
        examineOpinion: '', // 意见
        examineResultNo: '', // 审批结果code
        flowNo: '', // 业务类型
        grantAmount: '', // 金额
        grantRate: '', // 利率
        date: '',
        returnApprovalLevel: '' // 退回审批等级
      },
      riskApprovalOfCreditTransferOutDTO: {},
      approveCreditOutDTO: {},
      apply: {}, // 准入信息
      guarantee: [], // 担保人
      // 人工转案数据
      optionData: [],
      repData: {}
    }
  },
  created() {},
  mounted() {
    this.getCreditApplyInfoPc()
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    getCreditApplyInfoPc() {
      getCreditApplicationDetail({
        applyNo: this.$route.query.applyNo
      }).then(rep => {
        if (rep.status === 200) {
          this.repData = rep
          this.riskApprovalOfCreditTransferOutDTO = rep.data.riskApprovalOfCreditTransferOutDTO ? rep.data.riskApprovalOfCreditTransferOutDTO : {}
          this.approveCreditOutDTO = rep.data.approveCreditOutDTO ? rep.data.approveCreditOutDTO : {}
          this.apply = rep.data.data.apply ? rep.data.data.apply : []
          this.guarantee = []
          this.apply.relcustomerRiskOutVos.forEach(item => {
            if (item.authType === '2') {
              this.guarantee.push(item)
            }
          })
          this.status = rep.data.riskApprovalOfCreditTransferOutDTO.examineResult
        }
      })
    },
    /* 金额格式化 */
    amountFormatter(v) {
      return ansFormatter(v)
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    onSubmit() {
      // console.log('确认提交')
    },
    accepterVal(val) {
      const parmas = [
        {
          applyNo: this.$route.query.applyNo,
          id: val.id,
          transitionId: this.currentUser.id,
          transitionName: this.currentUser.userName
        }
      ]
      creditPersonGuarantee(parmas).then(result => {
        if (result.status === 200) {
          this.$message.success(result.message || '成功了')
        } else {
          this.$message.error(result.message || '失败了')
        }
      })
    },
    // 点击人工转案事件
    showVisable() {
      const params = {
        businessType: 'C01',
        applyNo: this.$route.query.applyNo
      }
      getTransferResources(params).then(result => {
        if (result.status === 200) {
          this.optionData = result.data && result.data.map(item => {
            return { ...item, key: item.id, value: item.userName }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .caseCtrlCreditDetail {
    .leftMsg {
      background: #fff;
      padding: 10px 24px 0;
    }
    .rightApproval {
      background: #fff;
      border: 2px solid #08B347;
      -webkit-border-radius: 1px;
      -moz-border-radius: 1px;
      border-radius: 1px;
      padding: 19px 24px;
      .title {
        font-size: 16px;
        color: #08B347;
        line-height: 24px;
        font-weight: 600;
        padding-bottom: 10px;
      }
      /deep/ .el-form-item {
        margin-bottom: 16px;
      }
      /deep/ .el-form-item__label {
        line-height: 22px;
        padding-bottom: 8px;
      }
    }
    .btnRight {
      display: flex;
      justify-content: flex-end;
      padding-right: 5%;
    }
  }
  .approvalResult {
    font-size: 12px;
    color: #5a5a5a;
    line-height: 30px;
    .result {
      display: flex;
      justify-content: space-between;
    }
    .examineOpinion {
      white-space:normal;
      word-break:break-all;
    }
    .green {
      color: #08B347;
    }
    .red {
      color: red;
    }
    .black {
      color: #333;
    }
    .border {
      padding-bottom: 5px;
      border-bottom: 1px solid #DCDFE6;
    }
  }
  .artificialBtn {
    text-align: center;
    padding: 10px 0;
  }
</style>
