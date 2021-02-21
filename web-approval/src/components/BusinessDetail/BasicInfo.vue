/* 业务基本信息组件 */
<template>
  <div class="basicInfo">
    <div class="titleCont">
      <div class="title">业务基本信息</div>
      <DescriptionList :content="basrc" class="m-l-20">
        <Description label="借款人">{{ basrc.customerName }}</Description>
        <Description label="借款人手机">{{ basrc.customerMobile }}</Description>
        <Description label="身份证号">{{ basrc.certNo }}</Description>
        <Description label="客户类型">{{ basrc.loanCustomerType$FICDictName }}</Description>
        <Description label="站长类型" v-if="basrc.loanCustomerType === '2'">{{ basrc.loanCustomerTypeOne$FICDictName }}</Description>
        <Description label="婚姻状况">{{ basrc.marriage$FICDictName }}</Description>
        <Description label="产品类型">{{ basrc.productType$FICDictName }}</Description>
        <Description label="意向申请金额">{{ approveCreditOutDTO.applyAmount ? approveCreditOutDTO.applyAmount + '元' : '--' }}</Description>
        <Description label="单/双季授信">{{ basrc.productTagType$FICDictName }}</Description>
      </DescriptionList>
    </div>
    <div class="titleCont">
      <div class="title">借款人基本信息</div>
      <DescriptionList v-if="creditApplyCustomerInfoOutDTO" :content="creditApplyCustomerInfoOutDTO" class="m-l-20">
        <Description label="姓名">{{ creditApplyCustomerInfoOutDTO.customerName }}</Description>
        <Description label="身份证号">{{ creditApplyCustomerInfoOutDTO.idCardNo }}</Description>
        <Description label="手机号">{{ creditApplyCustomerInfoOutDTO.mobile }}</Description>
        <Description label="性别">{{ creditApplyCustomerInfoOutDTO.sex$FICDictName }}</Description>
        <Description label="出生日期">{{ creditApplyCustomerInfoOutDTO.birthday }}</Description>
        <Description label="民族">{{ creditApplyCustomerInfoOutDTO.national }}</Description>
        <Description label="年龄">{{ creditApplyCustomerInfoOutDTO.age }}</Description>
        <Description label="户籍地址">{{ creditApplyCustomerInfoOutDTO.censusRegisterAddress }}</Description>
        <Description label="最高学历">{{ creditApplyCustomerInfoOutDTO.highestEdu$FICDictName }}</Description>
        <Description label="住址">{{ creditApplyCustomerInfoOutDTO.familyAddress }}</Description>
        <Description label="居住年限">{{ creditApplyCustomerInfoOutDTO.liveLimitYear }}</Description>
      </DescriptionList>
    </div>
    <div class="titleCont">
      <div class="title">借款人家庭信息</div>
      <DescriptionList v-if="creditApplyCustomerInfoOutDTO" :content="creditApplyCustomerInfoOutDTO" class="m-l-20">
        <Description label="婚姻状况">{{ creditApplyCustomerInfoOutDTO.marriage$FICDictName }}</Description>
        <Description label="赡养老人人数">{{ creditApplyCustomerInfoOutDTO.parentNum }}</Description>
        <Description label="未成年子女人数">{{ creditApplyCustomerInfoOutDTO.minorPersonNum }}</Description>
        <Description label="未成年子女正接受高等教育人数">{{ creditApplyCustomerInfoOutDTO.minorPersonHigherEduNum }}</Description>
        <Description label="成年子女人数">{{ creditApplyCustomerInfoOutDTO.adultPersonNum }}</Description>
        <Description label="成年子女正接受高等教育人数">{{ creditApplyCustomerInfoOutDTO.adultPersonHigherEduNum }}</Description>
        <Description label="家庭成员总人数">{{ creditApplyCustomerInfoOutDTO.familyNum }}</Description>
      </DescriptionList>
    </div>
    <div class="titleCont">
      <div class="title">联系人信息</div>
      <el-table :data="dataSource" ref="table" border size="mini" class="m-t-20">
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.linkmanName }}</span>
            <el-tag size="mini" v-show="scope.row.togBorrowerFlag === '1'">共借人</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="scope">
            <span>{{ scope.row.linkmanMobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="与借款人关系">
          <template slot-scope="scope">
            <span v-show="scope.row.relationship$FICDictName">{{scope.row.relationship$FICDictName }}</span>
            <span v-show="!scope.row.relationship$FICDictName">{{ scope.row.relationshipName }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="inEx">
      <div class="titleCont">
        <div class="title">家庭年收入</div>
        <DescriptionList :content="basicInfoData" class="m-l-20">
          <Description label="年收入">{{ basicInfoData.income ? basicInfoData.income + '万元' : '--' }}</Description>
        </DescriptionList>
      </div>
      <div class="titleCont">
        <div class="title">家庭年支出</div>
        <DescriptionList :content="basicInfoData" class="m-l-20">
          <Description label="年支出">{{ basicInfoData.expend ? basicInfoData.expend + '万元' : '--' }}</Description>
        </DescriptionList>
      </div>
    </div>
    <div class="titleCont">
      <div class="title">家庭负债</div>
      <DescriptionList :content="creditApplyFamlilyFinanceOutDTO" class="m-l-20">
        <Description label="赊欠账款">{{ creditApplyFamlilyFinanceOutDTO.outstandingAccounts ? creditApplyFamlilyFinanceOutDTO.outstandingAccounts + '万元' : '--' }}</Description>
        <Description label="民间借贷">{{ creditApplyFamlilyFinanceOutDTO.privateLending ? creditApplyFamlilyFinanceOutDTO.privateLending + '万元' : '--' }}</Description>
        <Description label="银行贷款">{{ creditApplyFamlilyFinanceOutDTO.bankLoans ? creditApplyFamlilyFinanceOutDTO.bankLoans + '万元' : '--' }}</Description>
      </DescriptionList>
    </div>
    <div class="titleCont">
      <div class="title">家庭财产状况</div>
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <template v-for="item in tabPaneList">
            <el-tab-pane :key="item.name" :label="item.label" :name="item.name">
              <TableList border :columns="item.columns" :dataSource="item.dataSource" :options="options" />
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
    </div>
    <div v-if="customerEnterpriseOutDTOList.length" class="titleCont">
      <div class="title">名下企业</div>
      <template v-for="(item, index) in customerEnterpriseOutDTOList">
        <DescriptionList :content="item" :key="item.id" class="m-l-20">
          <Description label="企业类型">{{ item.entType$FICDictName }}</Description>
          <Description label="企业名称">{{ item.entName }}</Description>
          <Description label="成立时间">{{ item.entBuildTime }}</Description>
          <Description label="股东人数">{{ item.shareholdersNum }}</Description>
          <Description label="申请人占股比">{{ item.equityRatio }}</Description>
          <Description label="实缴金额">{{ item.capitalAmount }}</Description>
          <Description label="年总资产">{{ item.totalAssert }}</Description>
          <Description label="年总负债">{{ item.totalDebt }}</Description>
        </DescriptionList>
        <el-divider v-if="index !== customerEnterpriseOutDTOList.length - 1" :key="'divider' + item.id"></el-divider>
      </template>
    </div>
    <div v-if="creditApplyCustomerInfoOutDTO.famlilyIncome || creditApplyCustomerInfoOutDTO.famlilyExpend" class="titleCont">
      <div class="title">家庭银行流水统计</div>
      <DescriptionList :content="creditApplyCustomerInfoOutDTO" class="m-l-20">
        <Description label="流入净值">{{ creditApplyCustomerInfoOutDTO.famlilyIncome ? creditApplyCustomerInfoOutDTO.famlilyIncome + '万元' : '--' }}</Description>
        <Description label="流出净值">{{ creditApplyCustomerInfoOutDTO.famlilyExpend ? creditApplyCustomerInfoOutDTO.famlilyExpend + '万元' : '--' }}</Description>
      </DescriptionList>
    </div>
  </div>
</template>
<script>
import DescriptionList from '@/components/DescriptionList'
import TableList from '@/components/Tables/TableList'
export default {
  name: 'BasicInfo',
  components: {
    DescriptionList,
    TableList
  },
  // props: ['basicInfoData'],
  props: {
    basicInfoData: {
      type: Object
    },
    approveCreditOutDTO: {
      type: Object
    }
  },
  data() {
    return {
      basrc: {},
      creditApplyCustomerInfoOutDTO: {}, // 借款人基本信息
      creditApplyFamlilyFinanceOutDTO: {}, // 家庭负债信息
      finances: [], // 借款人家庭财产信息
      customerEnterpriseOutDTOList: [], // 借款人企业信息
      options: {
        index: true
      },
      columns: [
        { prop: 'linkmanName', label: '姓名', align: 'center' },
        { prop: 'linkmanMobile', label: '手机号', align: 'center' },
        { prop: 'relationship$FICDictName', label: '与借款人关系', align: 'center' }
      ],
      dataSource: [],
      activeName: '',
      tabPaneList: []
    }
  },
  watch: {
    basicInfoData: {
      handler(newVal, oldVal) {
        this.basicInfoDataHandle(newVal)
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.basicInfoDataHandle(this.basicInfoData)
  },
  methods: {
    basicInfoDataHandle(v) {
      this.basrc = v.basrc ? v.basrc : {}
      if (v.basicInformation) {
        this.creditApplyCustomerInfoOutDTO = v.basicInformation.creditApplyCustomerInfoOutDTO
          ? v.basicInformation.creditApplyCustomerInfoOutDTO
          : {}
        this.dataSource = v.basicInformation.customerLinkmanReq.cusLinkmanlist ? v.basicInformation.customerLinkmanReq.cusLinkmanlist : []
        this.creditApplyFamlilyFinanceOutDTO = v.basicInformation.creditApplyFamlilyFinanceOutDTO
          ? v.basicInformation.creditApplyFamlilyFinanceOutDTO
          : {}
        this.customerEnterpriseOutDTOList = v.basicInformation.customerEnterpriseOutDTOList
          ? v.basicInformation.customerEnterpriseOutDTOList
          : []
        this.finances = v.basicInformation.finances
          ? v.basicInformation.finances
          : []
        this.activeName = Object.keys(this.finances)[0] ? Object.keys(this.finances)[0] : ''
        this.tabPaneList = Object.keys(this.finances).map(item => {
          let name = ''
          let label = ''
          let columns = []
          if (item === '1') {
            label = '商品房'
            name = '1'
            columns = [
              {
                prop: 'housingAddress',
                label: '房产地址',
                align: 'center',
                formatter (row, column, cellValue) {
                  return `${row.housingProvince$FICDictName.split(',').join('')}${row.housingAddress}`
                }
              },
              { prop: 'housingArea', label: '房产面积(㎡)', align: 'center' },
              { prop: 'housingValue', label: '房产价值(万)', align: 'center' }
            ]
          } else if (item === '2') {
            label = '自建房'
            name = '2'
            columns = [
              {
                prop: 'housingAddress',
                label: '房产地址',
                align: 'center',
                formatter (row, column, cellValue) {
                  return `${row.housingProvince$FICDictName.split(',').join('')}${row.housingAddress}`
                }
              },
              { prop: 'housingStructure$FICDictName', label: '房屋结构', align: 'center' },
              { prop: 'housingArea', label: '房产面积(㎡)', align: 'center' },
              { prop: 'housingValue', label: '房产价值(万)', align: 'center' }
            ]
          } else if (item === '99') {
            label = '其他资产'
            name = '99'
            columns = [
              { prop: 'othreAssertType$FICDictName', label: '资产类型', align: 'center' },
              { prop: 'othreAssertValue', label: '房产价值(万)', align: 'center' }
            ]
          }
          return {
            label,
            name,
            columns,
            dataSource: this.finances[item]
          }
        })
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>
.basicInfo {
  color: #5a5a5a;
  .msgCont {
    display: flex;
    font-size: 12px;
    line-height: 22px;
    color: #5a5a5a;
    div {
      padding-left: 50px;
      padding-bottom: 10px;
      min-width: 150px;
      &:first-child {
        padding-left: 0;
      }
    }
    .bold {
      font-weight: 600;
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
  .inEx {
    display: flex;
    .titleCont {
      width: 50%;
    }
  }
}
</style>
