/* 贷款申请详情页面 */
<template>
  <div class="approvalCreditDetail">
    <el-row :gutter="16">
      <el-col :span="18">
        <div class="leftMsg">
          <el-tabs v-model="msgActiveName" @tab-click="handleClick">
            <el-tab-pane label="审批信息" name="first">
              <ApprovalInformation></ApprovalInformation>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="6" class="loogLog">
        <div
          class="rightContext"
          :style="{ height: (currrentlStatus === '3' && roleId === '金融经理')  || currrentlStatus === '4' || currrentlStatus === '5' || currrentlStatus === '10' ? '' : 'auto' }"
        >
          <div class="top">
            <!-- 状态的值根据后端返回来的值展示 -->
            <div class="title" :class="[sign ? 'titleRed' : 'title']">{{creditStatus[currrentlStatus * 1]}}</div>
            <div class="checkLog">
              <CosignerDetailDialog @showLog="showLog" :content="logData" />
            </div>
          </div>
          <div v-if="currrentlStatus === '3' && roleId === '金融经理'" class="context1">
            <CosignerConfirmationDialog
              title="确定要提交？"
              buttonName="确认展业, 提交风险审批"
              @resubmit="resubmit"
              prop="confirmationDialog"
            />
            <el-button type="success" size="mini" @click="goToAdd">去修改</el-button>
            <!-- <ApproveReject @submitVal="submitVal" role="待金融经理提交" /> -->
            <ApproveReject @submitVal="submitVal" />
          </div>
          <div
            v-else-if="currrentlStatus === '3' ||  (currrentlStatus === '4' && roleId === '金融经理') || currrentlStatus === '5' || currrentlStatus === '10'"
            class="context2"
          >
            <div class="bg">
              <!-- 待金融经理提交 -->
              <div v-if="currrentlStatus === '3'">
                <img src="@/assets/detail/manager.png" alt />
                <p>金融经理审批中</p>
              </div>
              <!-- 金融经理驳回 -->
              <div v-else-if="currrentlStatus === '4'">
                <img src="@/assets/detail/notarize.png" alt />
                <p>待专员确认</p>
              </div>
              <!-- 待风险审批 -->
              <div v-else-if="currrentlStatus === '5'">
                <img src="@/assets/detail/examine.png" alt />
                <p>风险审批中</p>
              </div>
              <!-- 放弃展业 -->
              <div v-else-if="currrentlStatus === '10'">
                <img src="@/assets/detail/givup.png" alt />
                <p>已放弃展业</p>
              </div>
            </div>
          </div>
            <!-- v-else-if="currrentlStatus === '6' || (currrentlStatus === '7' && roleId === '金融经理') || (currrentlStatus === '4' && roleId === '金融专员')" -->
          <div
            v-else-if="currrentlStatus === '6' ||  currrentlStatus === '7' || (currrentlStatus === '4' && roleId === '金融专员')"
            class="context3"
          >
            <div class="opinionWrap" v-if="currrentlStatus === '4'">
              <p class="opinion">驳回原因</p>
              <p class="opinionContext">{{refusalReason}}</p>
            </div>
            <div class="opinionWrap" v-else>
              <p class="opinion">审批意见</p>
              <p class="opinionContext">{{TraceLog.examineOpinion}}</p>
            </div>
            <!-- <div>
            </div>-->
            <CosignerConfirmationDialog
              style="width: 100%;"
              :title="(currrentlStatus === '7' && roleId === '金融经理' ) ? '只有一次复议的机会，您确认复议提交?' : '确定重新提交风控审核？'"
              :buttonName="(currrentlStatus === '7' && roleId === '金融经理' ) ? '复议提交' : '重新提交'"
              @resubmit="resubmit"
              prop="confirmationDialog"
              :showBtn="showBtn"
            />
            <el-button :disabled="showBtn" type="success" size="mini" @click="goToAdd">去修改</el-button>
          </div>
          <div
            v-else-if="currrentlStatus === '8' || currrentlStatus === '9' || currrentlStatus === '11'"
            class="context4"
          >
            <div v-if="currrentlStatus === '9' && currrentlStatus !== '11'" class="guaranteeWrap">
              <div class="box_div">
                <p class="title">审批金额</p>
                <p class="money">{{TraceLog.grantAmount}}元</p>
              </div>
              <div class="box_div">
                <p class="title">审批利率</p>
                <p class="money">{{TraceLog.grantRate}}% 年化</p>
              </div>
              <div class="box_div">
                <p class="title">贷款到期日</p>
                <p class="money">{{TraceLog.grantRepayMonth}}月{{TraceLog.grantRepayDay}}日</p>
              </div>
            </div>
            <div class="box_div">
              <p class="opinionWrap">审批意见</p>
              <p class="opinionContext">{{TraceLog.examineOpinion}}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getLoanDetail, queryOrderApproveLog, rejectLoanApply, creditApplyInfoSave, rejectReason, getTraceLog } from '@/api/loan-apply'
import { mapGetters } from 'vuex'
export default {
  name: 'LoanApplyDetail',
  components: {
    CosignerDetailDialog: () => import('@/components/CosignerDetailDialog'),
    ApprovalInformation: () => import('./components/ApprovalInformation'),
    CosignerConfirmationDialog: () => import('@/components/CosignerConfirmationDialog'),
    ApproveReject: () => import('@/components/ApproveReject')
  },
  data() {
    return {
      msgActiveName: 'first',
      status: 'spth',
      currrentlStatus: '', // 状态值
      activeName: 'first',
      refusalReason: '', // 驳回原因
      TraceLog: '',
      roleId: null, // 角色值 金融经理 专员
      isApproval: false,
      dialogVisible: false,
      // 日志数据
      logData: [],
      form: {
        jg: '',
        je: '',
        ll: '',
        date: false,
        type: [],
        yj: '',
        mb: '',
        yy: ''
      },
      creditStatus: {
        1: '待展业',
        2: '待完善资料',
        3: '待金融经理提交', // 经理 三个按钮  专员 图片
        4: '金融经理驳回', // 专员 文字+按钮 经理图片
        5: '待风险审批', // 经理和专员 图片
        6: '审批退回待提交', // 经理和专员 文字+按钮
        7: '审批拒绝待复议', // 经理 文字+按钮   注意：不符合条件怎么显示？
        8: '有条件审批通过', // 经理和专员 文字
        9: '审批通过', // 经理和专员 文字
        10: '放弃展业', // 经理和专员 图片
        11: '审批拒绝' // 经理和专员 文字
      },
      resultData: {} // 当前单号信息
      // classifyActive: 'legal_company_constitution' // 修改的下标 默认为数组的第一项
    }
  },
  created() {},
  computed: {
    // 角色 currentUser.role '金融经理'，'金融专员'
    ...mapGetters(['currentUser', 'commonEnum']),
    // 控制右上角标题的样式
    sign() {
      return this.currrentlStatus === 4 || this.currrentlStatus === 6 || this.currrentlStatus === 7 || this.currrentlStatus === 11
    },
    showBtn() {
      return this.currrentlStatus === '7' && this.currentUser.role === '金融专员'
    }
  },
  mounted() {
    this.roleId = this.currentUser.role
    this.getDetail()
    this.getTraceLogInfo()
  },
  methods: {
    // 获取详情页
    async getDetail() {
      const obj = {
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }
      const result = await getLoanDetail(obj)
      if (result.status === 200) {
        this.currrentlStatus = result.data.basrc.applyStatus
        // 驳回原因
        rejectReason({
          applyNo: this.$route.query.orderNo,
          opinion: result.data.basrc.applyStatus
        }).then(res => {
          if (res.status === 200) {
            this.refusalReason = res.data.refusalReason
          }
        })
      } else {
        this.$message.error(result.data || '失败')
      }
    },
    //
    getTraceLogInfo() {
      const obj = {
        applyNo: this.$route.query.orderNo,
        flowNo: 'C01'
      }
      getTraceLog(obj).then(res => {
        if (res.status === 200) {
          this.TraceLog = res.data.pop()
        }
      })
    },
    // 获取日志信息
    async getQueryGuaranteeApproveLog() {
      const result = await queryOrderApproveLog({ customerId: this.$route.query.customerId, orderNo: this.$route.query.orderNo })
      if (result.status === 200) {
        this.logData = result.data
      } else {
        this.logData = []
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 修改影像资料
    // claaifyClick(val) {
    //   this.classifyActive = val
    // },
    // 弹框确认操作
    // submitOK(val) {
    //   console.log(val, '确认展业')
    //   this.submitApprove()
    // },
    // 提交审批接口
    submitApprove() {
      const params = {
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }
      creditApplyInfoSave(params).then(res => {
        if (res.status === 200) {
          this.$router.push({
            path: '/loan-apply/add',
            query: {
              customerId: this.$route.query.customerId,
              orderNo: this.$route.query.orderNo,
              changeMapFlowNo: this.$route.query.changeMapFlowNo,
              productType: this.$route.query.productType,
              cropsType: this.$route.query.cropsType,
              flag: true
            }
          })
          this.$message.success('提交借款审批成功')
        } else {
          this.$message.error(res.message || '失败')
        }
      })
    },
    // 展示日志
    showLog() {
      this.getQueryGuaranteeApproveLog()
    },
    // 去修改
    goToAdd() {
      this.$router.push({
        path: '/loan-apply/add',
        query: {
          customerId: this.$route.query.customerId,
          orderNo: this.$route.query.orderNo,
          changeMapFlowNo: this.$route.query.changeMapFlowNo,
          productType: this.$route.query.productType,
          cropsType: this.$route.query.cropsType
        }
      })
    },
    // 重新提交
    resubmit() {
      if (this.currrentlStatus === '3') {
        this.submitApprove()
      } else if (this.currrentlStatus === '6' || this.currrentlStatus === '4') {
        // 退回待提交
        this.submitApprove()
      } else if (this.currrentlStatus === '7') {
        // 审批拒绝待复议
        this.submitApprove()
      }
    },
    // 驳回按钮操作
    submitVal(val) {
      const params = {
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo,
        refusalReason: val.context
      }
      rejectLoanApply(params).then(res => {
        if (res.status === 200) {
          this.$router.push('/loan-apply')
        }
      })
    },
    // 对话框的右上角关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.approvalCreditDetail {
  .leftMsg {
    background: #fff;
    padding: 10px 24px 0;
  }
  .rightApproval {
    background: #fff;
    border: 2px solid #08b347;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    padding: 19px 24px;
    div .title {
      font-size: 16px;
      color: #08b347;
      // line-height: 24px;
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
  .loogLog {
    // width: 275px;
    .rightContext {
      word-wrap:break-word;
      // height: 400px;
      background: #fff;
      border: 2px solid #08b347;
      -webkit-border-radius: 1px;
      -moz-border-radius: 1px;
      border-radius: 1px;
      padding: 20px;
      font-size: 14px;
      .top {
        overflow: hidden;
        border-bottom: 1px solid #08b448;
        .title {
          float: left;
          font-size: 14px;
          line-height: 14px;
          color: #08b448;
          font-weight: 600;
        }
        .titleRed {
          float: left;
          font-size: 14px;
          padding-left: 6px;
          line-height: 14px;
          color: red;
          font-weight: 600;
          // margin: 10px 0 15px;
        }
        .checkLog {
          float: right;
          margin-top: -14px;
        }
      }
      .context1 {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        font-size: 12px;
        p {
          width: 90%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0;
        }
        .titleName {
          color: gray;
        }
        p span:nth-child(1) {
          color: gray;
        }
        .el-button {
          width: 100%;
          height: 40px;
          margin-top: 15px;
          margin-left: 0px;
        }
      }
      .context2 {
        box-sizing: border-box;
        padding: 10px;
        margin-top: 10px;
        .bg {
          box-sizing: border-box;
          width: 100%;
          height: 260px;
          background-color: #fbfbfb;
          border: 2px dashed #f5f5f5;
          display: flex;
          justify-content: center;
          align-items: center;
          div {
            width: 50%;
            height: 50%;
            text-align: center;
            img {
              width: 100%;
            }
          }
        }
      }
      .context3 {
        .opinionWrap {
          padding-left: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgb(187, 187, 187);
          .opinion {
            color: #8f9196 !important;
            margin-top: 20px;
          }
          .opinionContext {
            // word-wrap:break-word;
            // padding-right: 10px;
            line-height: 25px;
          }
        }
        .el-button {
          width: 100%;
          height: 40px;
          margin-top: 15px;
          margin-left: 0px;
        }
      }
      .context4 {
        padding-left: 10px;
        .guaranteeWrap {
          .box_div {
            overflow: hidden;
            .title {
              color: grey;
              float: left;
            }
            .money {
              float: right;
            }
          }
        }
        .box_div {
          .opinionWrap {
            color: grey;
          }
          .opinionContext {
            // word-wrap:break-word;
            // padding-right: 10px;
            line-height: 25px;
          }
        }
        .opinionWrap {
          color: grey;
        }
        .opinionContext {
          // word-wrap:break-word;
          // padding-right: 10px;
          line-height: 25px;
        }
      }
    }
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
  .green {
    color: #08b347;
  }
  .red {
    color: red;
  }
  .black {
    color: #333;
  }
  .border {
    padding-bottom: 5px;
    border-bottom: 1px solid #dcdfe6;
  }
}
</style>
