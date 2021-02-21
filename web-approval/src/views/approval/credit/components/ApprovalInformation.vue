/* 审批信息Tab */
<template>
  <div>
    <div class="titleCont">
      <div class="title">基本信息</div>
      <DescriptionList :content="basrc" class="m-l-20">
        <Description label="流水号">{{ approveCreditOutDTO.applyNo }}</Description>
        <Description label="MAP中心">{{ basrc.centerName }}</Description>
        <Description label="申请人">{{ approveCreditOutDTO.applyCommiter }}</Description>
        <Description label="申请产品">{{ basrc.productName }}</Description>
        <Description label="建议申请金额">{{ basrc.proposedCreditLine ? basrc.proposedCreditLine + '元' : '--' }}</Description>
        <Description label="建议贷款到期日">{{ basrc.repayMonth ? basrc.repayMonth+'月'+basrc.repayDate+'日': '--'}}</Description>
        <Description label="客户申请时间">{{ basrc.applyTime }}</Description>
        <Description label="MAP中心提交时间">{{ basrc.mapSubmitTime }}</Description>
        <Description label="更新时间">{{ basrc.updatedTime }}</Description>
        <!--<Description label="申请人">{{ approveCreditOutDTO.applyCommiter }}</Description>-->
        <!--<Description label="身份证号">{{ basrc.certNo }}</Description>-->
        <!--<Description label="手机号">{{ basrc.customerMobile }}</Description>-->
        <!--<Description label="客户类型">{{ basrc.loanCustomerType$FICDictName }}</Description>-->
        <!--<Description label="站长类型" v-if="basrc.loanCustomerType === '2'">{{ basrc.loanCustomerTypeOne$FICDictName }}</Description>-->
        <!--<Description label="婚姻状况">{{ basrc.marriage$FICDictName }}</Description>-->
        <!--<Description label="申请产品">{{ basrc.productName}}</Description>-->
        <!--<Description label="单/双季授信">{{ basrc.productTagType$FICDictName }}</Description>-->
        <!--<Description label="所属MAP">{{ basrc.centerName }}</Description>-->
        <!--<Description label="建议申请金额">{{ basrc.proposedCreditLine ? basrc.proposedCreditLine + '元' : '&#45;&#45;' }}</Description>-->
        <!--<Description label="建议贷款到期日">{{ basrc.repayMonth ? basrc.repayMonth+'月'+basrc.repayDate+'日': '&#45;&#45;'}}</Description>-->
        <!--<Description label="客户申请时间">{{ basrc.applyTime }}</Description>-->
        <!--<Description label="更新时间">{{ basrc.updatedTime }}</Description>-->
        <!-- <Description label="状态">{{ basrc.applyStatus$FICDictName }}</Description> -->
      </DescriptionList>
    </div>
    <el-row :gutter="16">
      <el-col :span="16">
        <div class="borrowerCont">
          <div class="borrower">
            <el-row :gutter="16">
              <el-col :span="12">
                <div class="titleCont" v-if="creditApplyCustomerInfoOutDTO">
                  <div class="title">借款人</div>
                  <div class="borrowerMsg">
                    <div>
                      {{ creditApplyCustomerInfoOutDTO.customerName }}
                      <!--需判断性别-->
                      <svg-icon v-if="creditApplyCustomerInfoOutDTO.sex === '1'" icon-class="male" style="width: 14px; height: 14px; margin-left: 7px"/>
                      <svg-icon v-if="creditApplyCustomerInfoOutDTO.sex === '0'" icon-class="female" style="width: 14px; height: 14px; margin-left: 7px"/>
                    </div>
                    <div>手机号：{{ creditApplyCustomerInfoOutDTO.mobile }}</div>
                    <div>身份证号：{{ creditApplyCustomerInfoOutDTO.idCardNo }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="titleCont" v-if="coBorrower">
                  <div class="title">共借人</div>
                  <div class="borrowerMsg">
                    <div>
                      {{ coBorrower.customerName }}
                      <!--需判断性别-->
                      <svg-icon v-if="coBorrower.sex === '1'" icon-class="male" style="width: 14px; height: 14px; margin-left: 7px"/>
                      <svg-icon v-if="coBorrower.sex === '0'"  icon-class="female" style="width: 14px; height: 14px; margin-left: 7px"/>
                      <span>{{ coBorrower.relation$FICDictName }}</span>
                    </div>
                    <div>手机号：{{ coBorrower.mobile }}</div>
                    <div>身份证号：{{ coBorrower.idCardNo }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="suggestedAmount">
            <div>审批金额</div>
            <div v-if="status === '000' || status === '040'">{{ approveCreditOutDTO.approveAmount ? approveCreditOutDTO.approveAmount + '元' : '--' }}</div>
            <div v-else>--</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="guarantee">
          <div class="titleCont">
            <div class="title">担保人</div>
            <!--需判断有无担保人-->
            <div v-if="guarantee.length === 0" class="nobody">
              <svg-icon icon-class="nobody" style="width: 82px; height: 82px"/>
              <div>暂无担保人</div>
            </div>
            <template v-for="(item, index) in guarantee">
              <div v-if="index < 2" :key="item.id" class="guaranteerMsg">
                <div>担保人{{ index + 1 }}：{{ item.customerName }}</div>
                <div>
                  <!-- {{ item.personBaseRep.customerName }} -->
                  <!--需判断性别-->
                  <svg-icon v-if="item.sex === '1'" icon-class="male" style="width: 14px; height: 14px; margin-left: 7px"/>
                  <svg-icon v-if="item.sex === '0'" icon-class="female" style="width: 14px; height: 14px; margin-left: 7px"/>
                  <span>{{ item.relation$FICDictName }}</span>
                  <span>{{ item.marriage$FICDictName }}</span>
                </div>
                <div v-if="item.limitCode">本次担保金额：<span class="green">{{ approveCreditOutDTO.approveAmount ? approveCreditOutDTO.approveAmount + '元' : '--' }}</span></div>
                <div v-else>申请担保金额：<span class="green">{{ approveCreditOutDTO.approveAmount ? approveCreditOutDTO.approveAmount + '元' : '--' }}</span></div>
              </div>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="tabsLarge">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风险信息提示" name="first">
          <RiskInfo :apply="apply"></RiskInfo>
        </el-tab-pane>
        <el-tab-pane label="业务基本信息" name="second">
          <BasicInfo :basicInfoData="detailsData" :approveCreditOutDTO="approveCreditOutDTO"></BasicInfo>
        </el-tab-pane>
        <el-tab-pane label="增信信息" name="third">
          <CreditInfo :enhancementDetail="enhancementDetail" :isApproval="isApproval" :realImageDtos="realImageDtos"></CreditInfo>
        </el-tab-pane>
        <el-tab-pane label="种植信息" name="fourth">
          <GrowInfo :creditApplyPlant="creditApplyPlant" :businessType="basrc.productType"></GrowInfo>
        </el-tab-pane>
        <el-tab-pane label="影像信息" name="fifth">
          <ImageInfo :realImageDtos="realImageDtos" :guarantee="guarantee"></ImageInfo>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { getCreditApplicationDetail } from '@/api/approval'
import DescriptionList from '@/components/DescriptionList'
export default {
  name: 'ApprovalInformation',
  components: {
    DescriptionList,
    RiskInfo: () => import('@/components/BusinessDetail/RiskInfo'), // 风险信息提示
    BasicInfo: () => import('@/components/BusinessDetail/BasicInfo'), // 业务基本信息
    CreditInfo: () => import('@/components/BusinessDetail/CreditInfo'), // 增信信息
    GrowInfo: () => import('@/components/BusinessDetail/GrowInfo'), // 种植信息
    ImageInfo: () => import('@/components/BusinessDetail/ImageInfo') // 影像信息
  },
  data() {
    return {
      activeName: 'first',
      approveCreditOutDTO: {},
      detailsData: {}, // 详情数据
      basicInformation: {}, // 借款人基本信息
      basrc: {}, // 基本信息
      creditApplyCustomerInfoOutDTO: {}, // 借款人基本信息
      enhancementDetail: {}, // 增信信息
      creditApplyPlant: {}, // 种植信息
      realImageDtos: {}, // 影像信息
      apply: {}, // 准入信息
      coBorrower: {}, // 共借人
      guarantee: [], // 担保人
      isApproval: '',
      status: ''
    }
  },
  props: {
    responseData: {
      type: Object
    }
  },
  watch: {
    responseData: {
      handler (val, oldVal) {
        this.reponseHandler(val)
      },
      deep: true // 深度观察监听
    }
  },
  created() {},
  mounted() {
    // this.getCreditApplyInfoPc()
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    getCreditApplyInfoPc() {
      getCreditApplicationDetail({
        applyNo: this.$route.query.applyNo
      }).then(rep => {
        if (rep.status === 200) {
          this.reponseHandler(rep)
        }
      })
    },
    reponseHandler(rep) {
      this.isApproval = rep.data.riskApprovalOfCreditTransferOutDTO.is
      this.status = rep.data.riskApprovalOfCreditTransferOutDTO.examineResult
      this.approveCreditOutDTO = rep.data.approveCreditOutDTO || {}
      this.detailsData = rep.data.data || {}
      this.basicInformation = rep.data.data.basicInformation ? rep.data.data.basicInformation : {}
      this.basrc = rep.data.data.basrc ? rep.data.data.basrc : {}
      // this.creditApplyCustomerInfoOutDTO = rep.data.data.basicInformation.creditApplyCustomerInfoOutDTO ? rep.data.data.basicInformation.creditApplyCustomerInfoOutDTO : {}
      this.enhancementDetail = rep.data.data.enhancementDetail ? rep.data.data.enhancementDetail : {}
      this.creditApplyPlant = rep.data.data.creditApplyPlant ? rep.data.data.creditApplyPlant : {}
      this.realImageDtos = rep.data.data.realImageDtos ? rep.data.data.realImageDtos : {}
      this.apply = rep.data.data.apply ? rep.data.data.apply : []
      // this.coBorrower = rep.data.data.apply.common ? rep.data.data.apply.common : {}
      // this.guarantee = rep.data.data.enhancementDetail.personDetailRepList || []
      this.guarantee = []
      this.apply.relcustomerRiskOutVos.forEach(item => {
        if (item.riskTipsOutDTO.data) {
          if (item.authType === '3') {
            this.creditApplyCustomerInfoOutDTO = item
          }
          if (item.authType === '2') {
            this.guarantee.push(item)
          }
          if (item.authType === '1') {
            this.coBorrower = item
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.borrowerCont {
  padding: 16px 0 16px 0;
  .borrower {
    padding-bottom: 18px;
    margin-bottom: 17px;
    border-bottom: 1px dashed #dcdfe6;
    .borrowerMsg {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 22px;
      border: 1px dashed #dcdfe6;
      background: rgba(218, 218, 218, 0.09);
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      padding: 12px;
      div {
        padding: 8px 0;
        &:first-child {
          color: #333;
          font-size: 16px;
          span {
            display: inline-block;
            font-size: 12px;
            line-height: 20px;
            padding: 0 8px;
            color: #08b347;
            background: rgba(8, 179, 71, 0.1);
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            margin-left: 5px;
          }
        }
      }
    }
  }
  .suggestedAmount {
    background: #e2f3e8;
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 48px;
    line-height: 48px;
    padding: 0 16px;
    font-size: 14px;
    div:first-child {
      color: rgba(0, 0, 0, 0.85);
    }
    div:last-child {
      color: #08b347;
    }
  }
}
.guarantee {
  padding-top: 16px;
  .nobody {
    width: 100%;
    height: 224px;
    border: 1px dashed #dcdfe6;
    background: rgba(218, 218, 218, 0.09);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    text-align: center;
    padding-top: 50px;
    div {
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      line-height: 22px;
    }
  }
  .guaranteerMsg {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 22px;
    border: 1px dashed #dcdfe6;
    background: rgba(218, 218, 218, 0.09);
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding: 7px 0 0;
    margin-bottom: 8px;
    div {
      padding: 3px 12px;
      &:nth-child(2) {
        border-bottom: 1px dashed #dcdfe6;
        padding-bottom: 10px;
        span {
          display: inline-block;
          font-size: 12px;
          line-height: 20px;
          padding: 0 8px;
          color: #08b347;
          background: rgba(8, 179, 71, 0.1);
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          border-radius: 2px;
          margin-left: 5px;
        }
      }
      &:last-child {
        color: rgba(0, 0, 0, 0.85);
        padding: 6px 12px;
      }
      .green {
        color: #08b347;
      }
    }
  }
}
.tabsLarge {
  position: relative;
  padding: 0 0 20px;
  .leftBorder {
    position: absolute;
    width: 3px;
    height: 15px;
    background: #08b448;
    left: 0;
    top: 13px;
  }
}
.titleCont {
  .title {
    font-size: 14px;
    padding-left: 6px;
    line-height: 14px;
    border-left: 3px solid #08b448;
    color: #08b448;
    font-weight: 600;
    margin: 10px 0 15px;
  }
}
</style>
