/* [自然人担保审批详情] 审批信息组件 担保人信息组件*/
<template>
  <div class="guarantorInfo">
    <div class="guarantorInfo_item">
      <DescriptionList class="m-l-20" v-if="resultData.personBaseRep" :content="resultData.personBaseRep">
        <Description label="姓名">{{ resultData.personBaseRep.customerName }}</Description>
        <Description label="身份证号">{{ resultData.idNo }}</Description>
        <Description label="手机号">{{ resultData.personBaseRep.mobile }}</Description>
        <Description label="性别">{{ resultData.personBaseRep.sex$FICDictName }}</Description>
        <Description label="出生日期">{{ resultData.personBaseRep.birthday }}</Description>
        <Description label="民族">{{ resultData.personBaseRep.national }}</Description>
        <Description label="年龄">{{ resultData.personBaseRep.age }}</Description>
        <!-- <Description label="与借款人关系">{{ resultData.relationship$FICDictName }}</Description> -->
        <Description label="婚姻情况">{{ resultData.personBaseRep.marriage$FICDictName }}</Description>
        <Description label="最高学历">{{ resultData.personBaseRep.highestEdu$FICDictName }}</Description>
        <Description label="户籍地址">{{ resultData.personBaseRep.censusRegisterAddress }}</Description>
        <Description label="住址">{{ resultData.personBaseRep.familyAddress }}</Description>
        <Description label="居住年限">
          {{ resultData.personBaseRep.liveLimitYear ? resultData.personBaseRep.liveLimitYear + '年' : '--' }}
        </Description>
        <Description label="配偶姓名" v-if="resultData.spouse">{{ resultData.spouse.name }}</Description>
        <Description label="配偶手机号" v-if="resultData.spouse">{{ resultData.spouse.mobile }}</Description>
        <Description label="配偶身份证号" v-if="resultData.spouse">{{ resultData.spouse.idNo }}</Description>
      </DescriptionList>
    </div>
    <div class="guarantorInfo_item">
      <div class="title">家庭年收入</div>
      <DescriptionList class="m-l-20" :content="resultData.familyIncomeSummaryResp">
        <Description label="年收入">
          {{ resultData.familyIncomeSummaryResp ? resultData.familyIncomeSummaryResp.incomeSum + '万元' : '--' }}
        </Description>
      </DescriptionList>
    </div>
    <div class="guarantorInfo_item">
      <div class="title">家庭负债</div>
      <DescriptionList class="m-l-20" :content="liabilities">
        <Description label="赊欠账款">{{ liabilities ? liabilities.outstandingAccounts + '万元' : '--' }}</Description>
        <Description label="民间借贷">{{ liabilities ? liabilities.privateLending + '万元' : '--' }}</Description>
        <Description label="银行贷款">{{ liabilities ? liabilities.bankLoans + '万元' : '--' }}</Description>
      </DescriptionList>
    </div>
    <div class="title">家庭财产状况</div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <template v-for="(item, index) in familyPropertyTabList">
        <el-tab-pane :label="item.label" :name="item.name" :key="item.name">
          <TableList :key="index" border :columns="item.columns" :dataSource="item.dataSource" :options="options" />
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'GuarantorInfo',
  props: {
    resultData: {
      type: Object
    },
    familyPropertyTabData: {
      type: Array
    },
    liabilities: {
      type: Object
    }
  },
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    TableList: () => import('@/components/Tables/TableList')
  },
  data() {
    return {
      activeName: 'first',
      familyPropertyTabList: [],
      options: {
        index: true
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name
    }
  },
  watch: {
    familyPropertyTabData(newVal) {
      if (newVal.length) {
        this.familyPropertyTabList = newVal || []
        this.activeName = newVal[0].name || 'first'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.guarantorInfo {
  .guarantorInfo_item {
    border-bottom: 1px solid #e7e7e7;
  }
  .title {
    font-size: 14px;
    padding-left: 6px;
    line-height: 14px;
    border-left: 2px solid #08b448;
    color: #08b448;
    font-weight: 600;
    margin: 10px 0 15px;
  }
}
</style>
