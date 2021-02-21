/* [自然人担保审批详情] 审批信息组件 担保人信息组件*/
<template>
  <div class="guarantorInfo">
    <div class="guarantorInfo_item">
      <DescriptionList class="m-l-20" :content="resultData" v-if="resultData.personBaseRep">
        <Description label="姓名">{{resultData.personBaseRep.customerName}}</Description>
        <Description label="身份证号">{{resultData.idNo}}</Description>
        <Description label="手机号">{{resultData.personBaseRep.mobile}}</Description>
        <Description label="性别">{{resultData.personBaseRep.sex$FICDictName}}</Description>
        <Description label="出生日期">{{resultData.personBaseRep.birthday}}</Description>
        <Description label="民族">{{resultData.personBaseRep.national}}</Description>
        <Description label="年龄">{{resultData.personBaseRep.age}}</Description>
        <!-- <Description label="与借款人关系">{{ resultData.relationship$FICDictName }}</Description> -->
        <Description label="婚姻情况">{{resultData.personBaseRep.marriage$FICDictName}}</Description>
        <Description label="最高学历">{{resultData.personBaseRep.highestEdu$FICDictName}}</Description>
        <Description label="户籍地址">{{resultData.personBaseRep.censusRegisterAddress}}</Description>
        <Description label="住址">{{resultData.personBaseRep.familyAddress}}</Description>
        <Description
          label="居住年限"
        >{{resultData.personBaseRep.liveLimitYear ? resultData.personBaseRep.liveLimitYear + '年' : ''}}</Description>
          <Description label="配偶姓名" v-if="resultData.spouse">{{resultData.spouse.name}}</Description>
          <Description label="配偶手机号" v-if="resultData.spouse">{{resultData.spouse.mobile}}</Description>
          <Description label="配偶身份证号" v-if="resultData.spouse">{{resultData.spouse.idNo}}</Description>
      </DescriptionList>
    </div>
    <div class="guarantorInfo_item">
      <div class="title">家庭年收入</div>
      <el-tabs v-model="familyIncomeActive" @tab-click="handleFamilyIncomeClick">
        <template v-for="(item,index) in familyTabDataList.familyIncomeTabData">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.label">
            <TableList :key="index" border :columns="item.columns" :dataSource="item.dataSource" :options="options" />
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <div class="guarantorInfo_item">
      <div class="title">家庭负债</div>
      <DescriptionList class="m-l-20" :content="resultData.liabilities[0]" v-if="resultData.liabilities">
        <Description label="赊欠账款">{{resultData.liabilities[0] && resultData.liabilities[0].outstandingAccounts + '万元'}}</Description>
        <Description label="民间借贷">{{resultData.liabilities[0] && resultData.liabilities[0].privateLending + '万元' }}</Description>
        <Description label="银行贷款">{{resultData.liabilities[0] && resultData.liabilities[0].bankLoans +'万元' }}</Description>
      </DescriptionList>
    </div>
    <div class="title">家庭财产状况</div>
    <el-tabs v-model="familyPropertyActive" @tab-click="handleFamilyPropertyClick">
      <template v-for="(item,index) in familyTabDataList.familyPropertyTabData">
        <el-tab-pane :label="item.label"  :name="item.name" :key="item.label">
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
    familyTabData: {
      type: Object
    }
  },
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    TableList: () => import('@/components/Tables/TableList')
  },
  data() {
    return {
      options: {
        index: true
      },
      familyTabDataList: {},
      familyPropertyData: [], // 家庭财产状况
      propertyTabsLabel: {
        a: '商品房',
        b: '自建房',
        c: '其他资产'
      },
      propertyTableLabel: {
        commodityHouse: {
          a: '房产地址',
          b: '详细地址',
          c: '房屋结构',
          d: '房产面积(㎡)',
          e: '房产价值(万)'
        },
        buildHouse: {
          a: '房产地址',
          b: '详细地址',
          c: '房产面积(㎡)',
          d: '房产价值(万)'
        },
        otherAssets: {
          a: '资产类型',
          b: '资产价值(万)'
        }
      },
      familyIncomeActive: 'first',
      familyPropertyActive: 'first'
    }
  },
  computed: {},
  created() {},
  methods: {
    handleFamilyPropertyClick(tab, event) {
      this.familyPropertyActive = tab.name
    },
    // 家庭信息Tab 切换
    handleFamilyIncomeClick(tab, event) {
      this.familyIncomeActive = tab.name
    }
  },
  watch: {
    familyTabData: {
      handler(newName, oldName) {
        this.familyTabDataList = newName || {}
        this.familyIncomeActive = newName.familyIncomeTabData.length ? newName.familyIncomeTabData[0].name : 'first'
        this.familyPropertyActive = newName.familyPropertyTabData.length ? newName.familyPropertyTabData[0].name : 'first'
      },
      deep: true
    }
  }
}
</script>

<style lang='scss' scoped>
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
