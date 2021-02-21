<template>
  <div class="fix-box">
    <div class="fix-right-btn-box">
      <el-button size="mini" plain @click="goBack">返回</el-button>
    </div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="17">
        <v-form title="基本信息" :subTitle="null">
          <template slot="content">
            <el-divider></el-divider>
            <DescriptionList class="m-l-20" :col="8" :content="mapChangeBasrc">
              <Description label="流水号">{{ mapChangeBasrc.flowNo || '--' }}</Description>
              <Description label="提交时间">{{ mapChangeBasrc.createTime || '--' }}</Description>
              <Description label="完成时间">{{ mapChangeBasrc.updateTime || '--' }}</Description>
              <Description label="流转原因">{{ mapChangeBasrc.orderChangeCause || '--' }}</Description>
            </DescriptionList>
            <span class="all-subtitle m-l-20">申请来源</span>
            <DescriptionList class="m-l-20 m-t-10 m-l-30" :content="mapChangeBasrc">
              <Description label="申请人">{{ mapChangeBasrc.customerName || '--' }}</Description>
              <Description label="MAP中心">{{ mapChangeBasrc.centerName || '--' }}</Description>
            </DescriptionList>
            <span class="all-subtitle m-l-20">流转目标</span>
            <DescriptionList class="m-l-20 m-t-10 m-l-30" :content="mapChangeBasrc">
              <Description label="MAP中心">{{ mapChangeBasrc.mapNmae || '--' }}</Description>
            </DescriptionList>
          </template>
        </v-form>
        <!-- 业务信息 - 展业贷款详情 -->
        <v-form title="业务信息" :subTitle="null" class="m-t-20">
          <template slot="content">
            <el-divider></el-divider>
            <div class="leftMsg p-l-10 p-r-10">
              <ApprovalInformation :dataInformation="dataInfo"></ApprovalInformation>
            </div>
          </template>
        </v-form>
      </el-col>
      <!-- 右侧 操作 -->
      <el-col :span="7" class="m-l-20" v-if="+result === 0">
        <v-form title="流转审批" :subTitle="null">
          <template slot="content">
            <el-divider></el-divider>
            <el-radio v-model="type" label="1">审批通过</el-radio>
            <el-radio v-model="type" label="2">审批拒绝</el-radio>
            <el-input
              v-if="type === '2'"
              class="m-t-20"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4 }"
              placeholder="请输入拒绝原因"
              v-model="orderChangeCauseNo"
            ></el-input>
            <div class="btns-center-box m-t-20">
              <el-button type="primary" @click="submit" size="mini" style="width: 100%;">
                确定
              </el-button>
            </div>
          </template>
        </v-form>
      </el-col>
      <!-- 右侧 查看详情状态 -->
      <el-col :span="7" class="m-l-20" v-else-if="+result === 1">
        <v-form title="流转审批" :subTitle="null">
          <template slot="content">
            <el-divider></el-divider>
            <p class="txt">审批通过</p>
          </template>
        </v-form>
      </el-col>
      <el-col :span="7" class="m-l-20" v-else-if="+result === 2">
        <v-form title="流转审批" :subTitle="null">
          <template slot="content">
            <el-divider></el-divider>
            <p class="txt">审批拒绝</p>
            <p class="txt">拒绝原因：{{ orderChangeCauseNo }}</p>
          </template>
        </v-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import VForm from '@/components/VForm'
import DescriptionList from '@/components/DescriptionList'
import { getDetail, approved, approvalRefuse } from '@/api/orders'
export default {
  components: {
    VForm,
    DescriptionList,
    ApprovalInformation: () => import('./components/ApprovalInformation')
  },
  data() {
    return {
      type: '', // 1审批通过  2审批拒绝
      orderChangeCauseNo: '', // 拒绝原因
      result: '', // 0 处理中 1 通过 2 不通过
      changeMapStatus: '', //
      customerId: '',
      orderNo: '',
      changeMapFlowNo: '',
      mapChangeBasrc: {},
      // 复制
      msgActiveName: 'first',
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
      // 日志数据
      logData: [],
      dialogVisible: false,
      creditStatus: {
        1: '待展业',
        2: '待完善资料',
        3: '待金融经理提交', // 经理 三个按钮  专员 图片
        4: '金融经理驳回', // 专员 图片
        5: '待风险审批', // 经理和专员 图片
        6: '审批退回待提交', // 经理和专员 文字+按钮
        7: '审批拒绝待复议', // 经理 文字+按钮   注意：不符合条件怎么显示？
        8: '有条件审批通过', // 经理和专员 文字
        9: '审批通过', // 经理和专员 文字
        10: '放弃展业', // 经理和专员 图片
        11: '审批拒绝' // 经理和专员 文字
      },
      currrentlStatus: '', // 状态值
      roleId: null, // 角色值 01 金融经理 02 专员
      resultData: {}, // 当前单号信息
      activeName: 'first',
      dataInfo: {},
      refusalReason: '' // 驳回原因
    }
  },
  // copy
  computed: {
    // 角色 currentUser.role '金融经理'，'金融专员'
    ...mapGetters(['currentUser', 'commonEnum'])
  },
  mounted() {
    this.customerId = this.$route.query.customerId
    this.orderNo = this.$route.query.orderNo
    this.changeMapFlowNo = this.$route.query.changeMapFlowNo
    this.changeMapStatus = !!(this.$route.query.changeMapStatus === '1') // 1 待审批状态，可以操作 !== 1 查看操作详情
    this.getSourceData({ customerId: this.customerId, orderNo: this.orderNo, changeMapFlowNo: this.changeMapFlowNo })
  },
  methods: {
    // 获取列表数据
    async getSourceData(params) {
      const res = await getDetail(params)
      this.mapChangeBasrc = res.data && res.data.mapChangeBasrc
      //
      this.result = res.data && res.data.mapChangeBasrc.result
      this.orderChangeCauseNo = res.data && res.data.mapChangeBasrc.orderChangeCauseNo
      // ....
      this.dataInfo = res.data && res.data.pcOrderInfo
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 展示日志
    showLog() {
      this.getQueryGuaranteeApproveLog()
    },
    // 右侧审批操作
    async submit() {
      if (+this.type === 1) {
        // 通过
        const { status, message } = await approved({
          customerId: this.customerId,
          orderNo: this.orderNo,
          changeMapFlowNo: this.changeMapFlowNo
        })
        if (+status === 200) {
          this.$message.success('操作成功')
          history.back()
        } else {
          this.$message.error('操作失败 ' + message)
        }
      } else {
        // 拒绝
        if (!this.orderChangeCauseNo) {
          this.$message.error('请输入拒绝原因')
          return false
        }
        const { status, message } = await approvalRefuse({
          customerId: this.customerId,
          orderNo: this.orderNo,
          changeMapFlowNo: this.changeMapFlowNo,
          orderChangeCauseNo: this.orderChangeCauseNo
        })
        if (+status === 200) {
          this.$message.success('操作成功')
          history.back()
        } else {
          this.$message.error('操作失败 ' + message)
        }
      }
    },
    goBack() {
      history.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.fix-box {
  position: relative;
  .fix-right-btn-box {
    position: absolute;
    top: -40px;
    right: 0px;
  }
}
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
    width: 275px;
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
          padding-bottom: 10px;
          border-bottom: 1px solid rgb(187, 187, 187);
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
