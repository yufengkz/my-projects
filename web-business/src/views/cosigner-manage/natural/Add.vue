/* 新增担保人申请页面 */
<template>
  <div class="loan-apply-add">
    <!-- 完善信息 -->
    <!-- <div class="btn-right text-right">
      <el-button type="primary" class="wide-button" size="mini" @click="giveUp">放弃展业</el-button>
    </div> -->
    <CosignerConfirmationDialog v-if="isShowGiveUp && personBaseInfo.approvalStatus !== '5'" title="确定是否放弃展业？" buttonName="放弃展业" @giveUpInfo="giveUpInfo"/>
    <v-form title="基本信息" tips>
      <template slot="content">
        <el-divider></el-divider>
        <DescriptionList class="m-l-20" v-if="personBaseInfo.personBaseRep" :content="personBaseInfo.personBaseRep">
          <Description label="担保人">{{personBaseInfo.personBaseRep.customerName}}</Description>
          <Description label="身份证号">{{personBaseInfo.idNo}}</Description>
          <Description label="手机号">{{personBaseInfo.personBaseRep.mobile}}</Description>
          <Description label="婚姻状况">{{personBaseInfo.personBaseRep.marriage$FICDictName}}</Description>
          <Description label="状态">{{personBaseInfo.approvalStatus$FICDictName}}</Description>
        </DescriptionList>
      </template>
    </v-form>
    <div class="container">
      <el-steps :active="stepValue" finish-status="success" simple>
        <el-step title="业务准备" @click.native="handleStep(1)"></el-step>
        <el-step title="完善信息" @click.native="handleStep(2)"></el-step>
        <el-step title="担保审批" @click.native="handleStep(3)"></el-step>
      </el-steps>
      <Step1Detail
        v-show="stepValue===0 && step1Editable===false"
        @stepDetailChild2="stepDetailChild2"
        @stepDetailChild1="stepDetailChild1"
        @stepDetailChild="stepDetailChild"
        :personInfoDetail="personBaseInfo"
        :btnFlag="btnFlag"
      ></Step1Detail>
      <Step1Edit
        :applyNo="applyNo"
        :reSign="reSign"
        v-show="stepValue===0 && step1Editable===true"
        @stepEditChild="stepEditChild"
        @stepEditJump="stepEditJump"
        :personInfo="personBaseInfo"
      ></Step1Edit>
      <Step2 v-show="stepValue===1" :personInfo="personBaseInfo" @approval="ApprovalChild" ></Step2>
      <GuarantorApproval v-if="stepValue===2" :applyNo="$route.query.applyNo"></GuarantorApproval>
    </div>
  </div>
</template>
<script>
import { guarantorDetail, nuturalGiveUp } from '@/api/cosigner-manage'
import Step2 from './components/Step2'
import VForm from '@/components/VForm'
import Step1Edit from './components/Step1Edit'
import Step1Detail from './components/Step1Detail'
import DescriptionList from '@/components/DescriptionList'
import GuarantorApproval from './components/GuarantorApproval'
import CosignerConfirmationDialog from '@/components/CosignerConfirmationDialog'
import { mapGetters } from 'vuex'
export default {
  name: 'cosignerManageNaturalAdd',
  components: {
    Step2,
    VForm,
    Step1Edit,
    Step1Detail,
    DescriptionList,
    GuarantorApproval,
    CosignerConfirmationDialog
  },
  data() {
    return {
      stepValue: 0,
      stepValueFlag: true, // 是否可以点击tab状态 true 可以点击
      step1Editable: true,
      isShowGiveUp: true,
      btnFlag: false,
      applyNo: '', // 申请编号
      personBaseInfo: {},
      reSign: 'N' // 是否需要重新风险预判 Y是需要 N是不需要
    }
  },
  /**
   * stataus 状态
   *  1： 待展业
   *  2： 待完善资料
   *  3； 待金融经理提交
   *  4： 金融经理驳回
   *  5； 待风险审批
   *  6； 审批退回待提交
   *  7； 审批拒绝复议
   *  8  有条件审批通过
   *  9  审批通过
   *  10 放弃展业
   *  11 审批拒绝
   */
  created() {
    this.applyNo = this.$route.query.applyNo
    this.setDetailInfo()
  },
  mounted() {},
  computed: {
    ...mapGetters(['currentUser'])
  },
  methods: {
    // 步骤条切换
    handleStep(index) {
      if (index === 1) {
        if (this.stepValueFlag) {
          this.stepValue = 0
        }
      } else if (index === 2) {
        if (this.stepValueFlag) {
          this.stepValue = 1
        }
      } else {
        this.stepValue = 2
      }
    },
    // 放弃展业方法
    giveUpInfo() {
      nuturalGiveUp(this.$route.query.applyNo).then(result => {
        if (result.status === 200) {
          this.$router.push('/cosigner-manage/natural')
        } else {
          this.$message.error(result.msg || '失败')
        }
      })
    },
    setDetailInfo() {
      guarantorDetail(this.$route.query.applyNo).then(res => {
        if (res.status === 200) {
          if ((res.data.approvalStatus === '3' && this.currentUser.role === '金融专员') || res.data.approvalStatus === '5') {
            this.stepValue = 2
            this.stepValueFlag = false
          }
          this.personBaseInfo = res.data || {}
          if (this.personBaseInfo.personBaseRep) {
            const { marriage } = this.personBaseInfo.personBaseRep
            // 担保人没有配偶的情况下 代办完成后展示代办页面
            if (marriage !== '2' && this.personBaseInfo.creditAuth === 'Y') {
              this.step1Editable = false
              this.btnFlag = true
            } else if (this.personBaseInfo.spouse && marriage === '2' && this.personBaseInfo.spouse.creditAuthPass === 'Y' && this.personBaseInfo.creditAuth === 'Y') {
              this.step1Editable = false
              this.btnFlag = true
            } else {
              this.btnFlag = false
            }
          }
          // TODO: 字典过滤
          // this.personBaseInfo = res.data.map(item => {
          //   item.approvalStatusName = this.$store.state.app.enum.billStatusOptions[item.approvalStatus].value
          //   return item
          // })
        } else {
          this.$message.error(res.message || '失败')
        }
      })
    },
    stepEditChild(v) {
      this.step1Editable = v
      this.reSign = 'N' // 修改为N 不需要重新代办
      this.setDetailInfo()
    },
    stepDetailChild(v) {
      this.step1Editable = v
    },
    stepDetailChild1(v) {
      this.reSign = 'Y' // 修改为Y 代表要重新代办
      this.stepValue = v
      this.step1Editable = true
    },
    stepDetailChild2(v) {
      this.stepValue = v
    },

    ApprovalChild(v) {
      this.stepValue = v
      this.isShowGiveUp = false
      this.setDetailInfo()
    },
    // 跳过 去完善信息
    stepEditJump(v) {
      this.stepValue = v
    }
  }
}
</script>
<style lang="scss">
.loan-apply-add {
  .container {
    background: #fff;
  }
}
.btn-right {
  position: absolute;
  right: 20px;
  top: 10px;
}
</style>
