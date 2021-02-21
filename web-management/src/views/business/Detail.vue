/* 贷款申请详情页面 */
<template>
  <div class="approvalCreditDetail">
    <div class="fix-right-btn-box">
      <el-button size="mini" plain @click="goBack">返回</el-button>
    </div>
    <el-row :gutter="16">
      <el-col :span="17">
        <div class="leftMsg">
          <ApprovalInformation :dataInformation="dataInfo"></ApprovalInformation>
          <!-- <el-tabs v-model="msgActiveName">
            <el-tab-pane label="审批信息" name="first">
            </el-tab-pane>
          </el-tabs> -->
        </div>
      </el-col>
      <el-col :span="7" class="loogLog">
        <div class="rightContext">
          <div class="top">
            <div class="title">{{ refusalReason.lvStatusName }}</div>
            <div class="checkLog">
              <CosignerDetailDialog @showLog="showLog" :content="logData" />
            </div>
          </div>
          <div class="context3">
            <div class="opinionWrap">
              <p class="opinion" v-show="refusalReason.exUserName">当前处理人：{{ refusalReason.exUserName }}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getLoanDetail, queryOrderApproveLog, rejectReason } from '@/api/business'
import { mapGetters } from 'vuex'
export default {
  name: 'LoanApplyDetail',
  components: {
    CosignerDetailDialog: () => import('@/components/CosignerDetailDialog'),
    ApprovalInformation: () => import('./components/ApprovalInformation')
  },
  data() {
    return {
      // msgActiveName: 'first',
      isApproval: false,
      // 日志数据
      logData: [],
      activeName: 'first',
      dataInfo: {},
      refusalReason: '' // 审批状态
    }
  },
  created() {},
  computed: {
    // 角色 currentUser.role '金融经理'，'金融专员'
    ...mapGetters(['currentUser', 'commonEnum'])
  },
  mounted() {
    this.getDetail()
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
        this.dataInfo = result.data
        // 查询审批进度
        rejectReason(obj).then(res => {
          if (res.status === 200) {
            this.refusalReason = res.data
          }
        })
      } else {
        this.$message.error(result.data || '失败')
      }
    },
    // 获取日志信息
    async getQueryGuaranteeApproveLog() {
      const result = await queryOrderApproveLog({
        flowNo: 'C01',
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      })
      if (result.status === 200) {
        this.logData = result.data
      } else {
        this.logData = []
        this.$message.error('获取日志失败 ' + result.message)
      }
    },
    // 展示日志
    showLog() {
      this.getQueryGuaranteeApproveLog()
    },
    goBack() {
      history.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.approvalCreditDetail {
  position: relative;
  .fix-right-btn-box {
    position: absolute;
    top: -40px;
    right: 0px;
  }
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
    .title {
      font-size: 16px;
      color: #08b347;
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
  .loogLog {
    // width: 275px;
    .rightContext {
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
          // border-bottom: 1px solid rgb(187, 187, 187);
          .opinion {
            color: #8f9196 !important;
            margin-top: 20px;
          }
          .opinionContext {
            padding-right: 10px;
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
          overflow: hidden;
          .title {
            color: grey;
            float: left;
          }
          .money {
            float: right;
          }
        }
        .opinionWrap {
          color: grey;
        }
        .opinionContext {
          padding-right: 10px;
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
