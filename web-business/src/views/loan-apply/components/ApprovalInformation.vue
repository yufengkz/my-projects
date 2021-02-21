/* 审批信息Tab */
<template>
  <div>
    <div class="titleCont">
      <div class="title">基本信息</div>
      <DescriptionList :content="basrc" class="m-l-20">
        <Description label="流水号">{{ basrc.orderNo }}</Description>
        <Description label="MAP中心">{{ basrc.centerName }}</Description>
        <Description label="申贷面积">{{ basrc.plantArea ?  basrc.plantArea + '亩' : '--'}}</Description>
        <Description label="申请产品">{{ basrc.productName }}</Description>
        <Description label="建议申请金额">{{ basrc.proposedCreditLine ? basrc.proposedCreditLine + '元' : '--' }} </Description>
        <Description label="建议贷款到期日">{{ basrc.repayMonth && basrc.repayDate ?  basrc.repayMonth + '月' + basrc.repayDate + '日' : '--'}}</Description>
        <Description label="客户申请时间">{{ basrc.applyTime }}</Description>
        <Description label="MAP中心提交时间">{{basrc.mapSubmitTime}}</Description>
        <Description label="更新时间">{{ basrc.updatedTime }}</Description>
      </DescriptionList>
    </div>
    <el-row :gutter="16">
      <el-col :span="16">
        <div class="borrowerCont">
          <div class="borrower">
            <el-row :gutter="16">
              <el-col :span="12">
                <div class="titleCont">
                  <div class="title">借款人</div>
                  <div class="borrowerMsg">
                    <div>
                      {{ creditApplyCustomerInfoOutDTO.customerName }}
                      <!--需判断性别-->
                      <svg-icon :icon-class="creditApplyCustomerInfoOutDTO.sex === '1' ? 'male' : 'female' " style="width: 14px; height: 14px; margin-left: 7px" />
                    </div>
                    <div>手机号：{{ creditApplyCustomerInfoOutDTO.mobile }}</div>
                    <div>身份证号：{{ creditApplyCustomerInfoOutDTO.idCardNo }}</div>
                  </div>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="titleCont">
                  <div class="title">共借人</div>
                  <!--需判断有无担保人-->
                  <div v-if="coBorrower.length === 0" class="nobody">
                    <svg-icon icon-class="nobody" style="width: 82px; height: 82px" />
                    <div>暂无共借人</div>
                  </div>
                  <div v-else class="borrowerMsg">
                    <div>
                      {{ coBorrower.customerName }}
                      <!--需判断性别-->
                      <svg-icon :icon-class="coBorrower.sex === '1' ? 'male' : 'female' " style="width: 14px; height: 14px; margin-left: 7px" />
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
            <div>客户申请金额:</div>
            <div>{{ basrc.applySum ? basrc.applySum + '元' : '--' }}</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="guarantee">
          <div class="titleCont">
            <div class="title">担保人</div>
            <!--需判断有无担保人-->
            <div v-if="guarantee.length === 0" class="nobody">
              <svg-icon icon-class="nobody" style="width: 82px; height: 82px" />
              <div>暂无担保人</div>
            </div>
            <div v-for="(item, index) in guarantee" :key="item.id" class="guaranteerMsg">
              <div>担保人{{ index ? '2' : '1' }}：
                <svg-icon v-show="item.limitCode" icon-class="person-new" style="width: 26px; height: 26px; vertical-align: middle" />
                <span>{{ item.customerName }}</span>
              </div>
              <div>
                <!--需判断性别-->
                <svg-icon :icon-class="item.sex === '1' ? 'male' : 'female' " style="width: 14px; height: 14px; margin-left: 7px" />
                <span>{{ item.relation$FICDictName }}</span>
                <span>{{ item.marriage$FICDictName }}</span>
              </div>
              <div>
                申请担保金额：
                <span v-if="basrc.grantAmount || basrc.proposedCreditLine" class="green"> {{ basrc.grantAmount || basrc.proposedCreditLine }}元</span>
                <span v-else>--</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="tabsLarge">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="风险预判信息" name="first">
          <RiskInfo :self="apply.self" :common="apply.common ? apply.common : {}" :guarantee="apply.guarantee"></RiskInfo>
        </el-tab-pane>
        <el-tab-pane label="业务基本信息" name="second">
          <BasicInfo :basicInfoData="detailsData"></BasicInfo>
        </el-tab-pane>
        <el-tab-pane label="增信信息" name="third">
          <CreditInfo :enhancementDetail="enhancementDetail"></CreditInfo>
        </el-tab-pane>
        <el-tab-pane label="种植信息" name="fourth">
          <GrowInfo :creditApplyPlant="creditApplyPlant"></GrowInfo>
        </el-tab-pane>
        <el-tab-pane label="影像资料" name="fifth">
          <ImageInfo :appplyCustomer="creditApplyCustomerInfoOutDTO" :guarantee="guarantee" :realImageDtos="realImageDtos"></ImageInfo>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { creditApplyInfoPc } from '@/api/loan-apply-lilin'
import DescriptionList from '@/components/DescriptionList'
export default {
  name: 'ApprovalInformation',
  components: {
    DescriptionList,
    RiskInfo: () => import('@/components/BusinessDetail/RiskInfo'), // 风险预判信息
    BasicInfo: () => import('@/components/BusinessDetail/BasicInfo'), // 业务基本信息
    CreditInfo: () => import('@/components/BusinessDetail/CreditInfo'), // 增信信息
    GrowInfo: () => import('@/components/BusinessDetail/GrowInfo'), // 种植信息
    ImageInfo: () => import('@/components/BusinessDetail/ImageInfo') // 影像资料
  },
  props: {
  },
  data() {
    return {
      activeName: 'first',
      detailsData: {}, // 详情数据
      basicInformation: {}, // 借款人基本信息
      basrc: {}, // 基本信息
      creditApplyCustomerInfoOutDTO: {}, // 借款人基本信息
      enhancementDetail: {}, // 增信信息
      creditApplyPlant: {}, // 种植信息
      realImageDtos: {}, // 影像信息
      apply: {}, // 准入信息
      coBorrower: [], // 共借人
      guarantee: [] // 担保人
    }
  },
  created() {},
  mounted() {
    this.getCreditApplyInfoPc(this.$route.query.customerId, this.$route.query.orderNo)
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    getCreditApplyInfoPc(customerId, orderNo) {
      creditApplyInfoPc({
        customerId,
        orderNo
      }).then(rep => {
        if (rep.status === 200) {
          this.detailsData = rep.data
          this.basicInformation = rep.data.basicInformation ? rep.data.basicInformation : {}
          this.basrc = rep.data.basrc ? rep.data.basrc : {}
          this.creditApplyCustomerInfoOutDTO = rep.data.apply.self ? rep.data.apply.self : {}
          this.enhancementDetail = rep.data.enhancementDetail ? rep.data.enhancementDetail : {}
          this.creditApplyPlant = rep.data.creditApplyPlant ? rep.data.creditApplyPlant : {}
          this.realImageDtos = rep.data.realImageDtos ? rep.data.realImageDtos : {}
          this.apply = rep.data.apply ? rep.data.apply : {}
          this.guarantee = rep.data.apply.guarantee ? rep.data.apply.guarantee : []
          this.coBorrower = rep.data.apply.common ? rep.data.apply.common : []
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
    .nobody {
      width: 100%;
      height: 138px;
      border: 1px dashed #dcdfe6;
      background: rgba(218, 218, 218, 0.09);
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      text-align: center;
      padding-top: 12px;
      div {
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        line-height: 22px;
      }
    }
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
