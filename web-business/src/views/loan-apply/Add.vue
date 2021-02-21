/* 新增贷款申请页面 */
<template>
  <div class="loan-apply-add">
    <v-form title="基本信息" tips>
      <template slot="content">
        <!-- 征信授权--编辑 -->
        <div class="btn-right text-right">
          <!-- <el-button
            style="margin-right:20px;"
            type="primary"
            class="wide-button"
            size="mini"
            @click="handleGiveUpBusiness"
          >放弃展业</el-button>-->
          <CosignerConfirmationDialog
            v-if="isShowGiveUp && basicInfo.applyStatus!=='5'"
            prop="loan-bth"
            title="确定是否放弃展业？"
            buttonName="放弃展业"
            @giveUpInfo="giveUpInfo"
          />

          <TransferOrderDialog
            :mapInParameter="mapInParameter"
            :customerCode="customerCode"
            @TransferOrderSubmit="TransferOrderSubmit"
          ></TransferOrderDialog>
        </div>
        <!-- 贷款准入--编辑
        <div class="btn-right text-right" v-show="stepValue===0 && step1Editable===false">
          <el-button type="primary" class="wide-button" size="mini">驳回借款申请</el-button>
        </div>
         完善信息
        <div class="btn-right text-right" v-show="stepValue===1">
          <el-button type="primary" class="wide-button" size="mini">驳回借款申请</el-button>
          <el-button type="primary" class="wide-button" size="mini">业务转移</el-button>
        </div>-->

        <el-divider></el-divider>
        <DescriptionList :content="basicInfo" class="m-l-20">
          <Description label="借款人">{{ basicInfo.customerName }}</Description>
          <Description label="身份证号">{{basicInfo.certNo}}</Description>
          <Description label="手机号">{{basicInfo.customerMobile}}</Description>
          <Description label="婚姻状况">{{basicInfo.marriage$FICDictName}}</Description>
          <Description label="所属MAP">{{basicInfo.centerName}}</Description>
          <Description label="意向申请金额">{{basicInfo.applySum || '0'}}元</Description>
          <Description label="产品类型">{{basicInfo.productType$FICDictName}}&nbsp;{{basicInfo.productTagType$FICDictName}}</Description>
          <Description label="状态">{{basicInfo.applyStatus$FICDictName}}</Description>
        </DescriptionList>
      </template>
    </v-form>
    <div class="container">
      <el-steps :active="stepValue" finish-status="success" simple>
        <el-step title="业务准备" @click.native="handleStep(1)"></el-step>
        <el-step title="信息完善" @click.native="handleStep(2)"></el-step>
        <el-step title="借款审批" @click.native="handleStep(3)"></el-step>
      </el-steps>
      <!-- 征信授权--编辑 -->
      <Step1Edit
        v-if="stepValue===0 && step1Editable===true"
        @stepEditJump="stepEditJump"
        @stepEditChild="stepEditChild"
        :centerId="basicInfo.centerId"
      ></Step1Edit>
      <!-- 查看 -->
      <Step1Detail
        v-if="stepValue===0 && step1Editable===false"
        @stepDetailChild2="stepDetailChild2"
        @stepDetailChild="stepDetailChild"
      ></Step1Detail>
      <!--完善信息  -->
      <Step2
        v-if="stepValue===1"
        :provinceId="provinceId"
        :loanCustomerType="basicInfo.loanCustomerType"
        @getInfo="getInfo"
        @toApproval="toApproval"
        @handleBack="handleBack"
      ></Step2>
      <!-- 审批 -->
      <StepApproval v-if="stepValue === 2"></StepApproval>
    </div>
  </div>
</template>
<script>
import Step1Detail from './components/Step1Detail'
import Step1Edit from './components/Step1Edit'
import Step2 from './components/Step2'
import DescriptionList from '@/components/DescriptionList'
import VForm from '@/components/VForm'
import { getBasicInfo, creditApplyPlantInfoSelMapByIdAndProvince, giveUpCreditApplyInfo, applyTransferOrder } from '@/api/loan-apply'
export default {
  name: 'LoanApplyAdd',
  components: {
    Step1Detail,
    Step1Edit,
    Step2,
    DescriptionList,
    VForm,
    StepApproval: () => import('./components/StepApproval'),
    TransferOrderDialog: () => import('./components/TransferOrderDialog'),
    CosignerConfirmationDialog: () => import('@/components/CosignerConfirmationDialog')
  },
  data() {
    return {
      basicInfo: {},
      basicFormRules: {},
      mapInParameter: {}, // 请求map列表 的入参
      customerCode: {
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo,
        changeMapFlowNo: this.$route.query.changeMapFlowNo
      },
      stepValue: 0,
      provinceId: 0,
      step1Editable: true,
      isShowGiveUp: true,
      dialogVisible: false
    }
  },
  created() {},
  mounted() {
    this.getInfo()
  },
  methods: {
    // 步骤条切换
    handleStep(index) {
      if (index === 1) {
        this.stepValue = 0
      } else if (index === 2) {
        this.stepValue = 1
      } else {
        this.stepValue = 2
      }
    },
    getInfo() {
      const creditApplyInfoVo = {
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }
      getBasicInfo(creditApplyInfoVo).then(res => {
        if (res.status === 200) {
          // 状态不是 待展业时，显示 查看页面
          if (res.data.applyStatus !== '1') {
            this.step1Editable = false
          }
          if (
            (res.data.applyStatus === '5' && this.$route.query.flag) ||
            (res.data.applyStatus === '3' && this.$route.query.flag) ||
            (res.data.applyStatus === '7' && this.$route.query.flag) ||
            (res.data.applyStatus === '6' && this.$route.query.flag)
          ) {
            this.stepValue = 2
          }
          this.basicInfo = res.data
          this.getProvince(this.basicInfo.centerId)
          this.mapInParameter = {
            changeMapId: this.basicInfo.centerId,
            productId: this.basicInfo.productId
          }
        }
      })
    },
    // 获取省份
    getProvince(val) {
      creditApplyPlantInfoSelMapByIdAndProvince({ id: val }).then(res => {
        if (res.status === 200) {
          this.provinceId = Number(res.data.id)
        } else {
          this.$message.error(res.message || '查询城市出错')
        }
      })
    },
    // 放弃展业
    giveUpInfo() {
      const creditApplyInfoVo = {
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }
      giveUpCreditApplyInfo(creditApplyInfoVo).then(res => {
        if (res.status === 200) {
          this.$router.go(-1)
          this.$message.success('放弃展业成功!')
        } else {
          this.$message.error(res.message || '失败')
        }
      })
    },
    TransferOrderSubmit(val) {
      const obj = {
        commitAccount: this.$store.getters.currentUser.id, // 金融经理的 ID
        customerId: this.$route.query.customerId,
        mapId: val.mapId, // map ID
        orderChangeCause: val.cause, // 原因
        orderNo: this.$route.query.orderNo,
        productId: this.basicInfo.productId // 产品类型 的id
      }
      applyTransferOrder(obj).then(res => {
        if (res.status === 200) {
          this.$router.push('/loan-apply')
          this.$message.success('转单成功')
        } else {
          this.$message.error(res.message || '失败')
        }
      })
    },
    // 申请转单
    handleTransferOrder() {
      this.dialogVisible = true
    },
    stepEditChild(v) {
      this.getInfo()
      this.step1Editable = v.status
      this.basicInfo.loanCustomerType = v.loanCustomerType
    },
    stepDetailChild(v) {
      this.step1Editable = v
    },
    stepDetailChild2(v) {
      this.stepValue = v
    },
    stepEditJump(v) {
      this.stepValue = v
    },
    toApproval() {
      this.stepValue = 2
      this.isShowGiveUp = false
    },
    handleBack() {
      this.stepValue = 0
      this.step1Editable = false
    }
  }
}
</script>
<style lang="scss">
.loan-apply-add {
  .container {
    background: #fff;
  }
  // .el-steps--simple {
  //   background: #fff;
  //   border-radius: 0;
  //   border-bottom: 1px solid #08b448;
  // }
  // .el-step__title.is-process {
  //   color: #08b448;
  // }
}
.btn-right {
  position: absolute;
  right: 20px;
  top: 10px;
  display: flex;
}
.el-step.is-simple {
  cursor: pointer;
}
</style>
