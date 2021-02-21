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
        <Description v-if="basrc.loanCustomerType !== '1' && basrc.loanCustomerTypeOne !== '99'" label="站长类型">{{ basrc.loanCustomerTypeOne$FICDictName }}</Description>
        <Description label="婚姻状况">{{ basrc.marriage$FICDictName }}</Description>
        <Description label="产品类型">{{ basrc.productType$FICDictName }}</Description>
        <Description label="意向申请金额">{{ basrc.applySum ? basrc.applySum + '元' : '--'}}</Description>
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
        <Description label="最高学历">{{ creditApplyCustomerInfoOutDTO.highestEdu$FICDictName }}</Description>
        <Description label="住址">{{ creditApplyCustomerInfoOutDTO.familyAddress }}</Description>
        <Description label="户籍地址">{{ creditApplyCustomerInfoOutDTO.censusRegisterAddress }}</Description>
        <Description v-if="creditApplyCustomerInfoOutDTO.familyAddress !== creditApplyCustomerInfoOutDTO.censusRegisterAddress" label="居住年限">{{ creditApplyCustomerInfoOutDTO.liveLimitYear && creditApplyCustomerInfoOutDTO.liveLimitYear + '年' }}</Description>
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
         <el-table v-if="dataSource.length > 0" :data="dataSource" ref="table" border size="mini" class="m-t-20">
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
      <div v-else class="noData" >暂无数据</div>
    </div>
    <div class="titleCont">
      <div class="title">家庭年收入与支出</div>
      <el-tabs v-if="familyIncomeTabData.length > 0" v-model="familyIncomeActive" @tab-click="handleFamilyIncomeClick">
        <template v-for="(item,index) in familyIncomeTabData">
          <el-tab-pane :label="item.label" :name="item.name" :key="item.name">
            <TableList :key="index" border :columns="item.columns" :dataSource="item.dataSource" :options="options" />
          </el-tab-pane>
        </template>
      </el-tabs>
      <div v-else class="noData">暂无数据</div>
    </div>
    <div class="titleCont" >
      <div class="title">家庭负债</div>
      <DescriptionList :content="creditApplyFamlilyFinanceOutDTO" class="m-l-20">
        <Description label="赊欠账款">{{ (creditApplyFamlilyFinanceOutDTO.outstandingAccounts || '0') + '万元' }}</Description>
        <Description label="民间借贷">{{ (creditApplyFamlilyFinanceOutDTO.privateLending || '0') + '万元' }}</Description>
        <Description label="银行贷款">{{ (creditApplyFamlilyFinanceOutDTO.bankLoans || '0') + '万元' }}</Description>
      </DescriptionList>
    </div>
    <div class="titleCont">
      <div class="title">家庭财产状况</div>
      <div>
        <el-tabs v-if="tabPaneList.length > 0" v-model="activeName" @tab-click="handleClick">
          <template v-for="item in tabPaneList">
            <el-tab-pane :key="item.name" :label="item.label" :name="item.name">
              <TableList border :columns="item.columns" :dataSource="item.dataSource" :options="options" />
            </el-tab-pane>
          </template>
        </el-tabs>
        <div v-else class="noData">暂无数据</div>
      </div>
    </div>
    <div class="titleCont" v-if="customerEnterpriseOutDTOList.length > 0">
      <div class="title">名下企业</div>
      <template v-for="(item, index) in customerEnterpriseOutDTOList">
        <DescriptionList :content="item" :key="item.id" class="m-l-20">
          <Description label="企业类型">{{ item.entType$FICDictName }}</Description>
          <Description label="企业名称">{{ item.entName }}</Description>
          <Description label="成立时间">{{ item.entBuildTime }}</Description>
          <Description label="股东人数">{{ item.shareholdersNum }}</Description>
          <Description label="申请人占股比">{{ item.equityRatio ? item.equityRatio + '%' : '--' }}</Description>
          <Description label="实缴金额">{{ item.capitalAmount ? item.capitalAmount + '万元' : '--' }}</Description>
          <Description label="年总资产">{{ item.totalAssert ? item.totalAssert + '万元' : '--' }}</Description>
          <Description label="年总负债">{{ item.totalDebt ? item.totalDebt + '万元' : '--' }}</Description>
        </DescriptionList>
        <el-divider v-if="index !== customerEnterpriseOutDTOList.length - 1" :key="'divider' + item.id"></el-divider>
      </template>
    </div>
    <div class="titleCont" v-if="(creditApplyCustomerInfoOutDTO.famlilyIncome && creditApplyCustomerInfoOutDTO.famlilyIncome !== '0') || creditApplyCustomerInfoOutDTO.famlilyExpend && creditApplyCustomerInfoOutDTO.famlilyExpend !== '0'">
      <div class="title">家庭银行流水统计</div>
      <DescriptionList :content="creditApplyCustomerInfoOutDTO" class="m-l-20">
        <Description label="流入净值">{{ creditApplyCustomerInfoOutDTO.famlilyIncome ? creditApplyCustomerInfoOutDTO.famlilyIncome + '万元' : '--' }}</Description>
        <Description label="流出净值">{{ creditApplyCustomerInfoOutDTO.famlilyExpend ? creditApplyCustomerInfoOutDTO.famlilyExpend  + '万元' : '--'}}</Description>
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
    }
  },
  data() {
    return {
      basrc: {},
      creditApplyCustomerInfoOutDTO: {}, // 借款人基本信息
      creditApplyFamlilyFinanceOutDTO: {}, // 家庭负债信息
      finances: [], // 借款人家庭财产信息
      customerEnterpriseOutDTOList: [], // 借款人企业信息
      familyIncomeTabData: [], // 家庭年收入信息
      options: {
        index: true
      },
      dataSource: [],
      familyIncomeActive: 'first',
      activeName: 'first',
      tabPaneList: [],
      creditApplyFamlilyComeListDTO: {}
    }
  },
  watch: {
    basicInfoData(v) {
      this.basrc = v.basrc ? v.basrc : {}
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
      this.creditApplyFamlilyComeListDTO = v.basicInformation.creditApplyFamlilyComeListDTO || {}
      this.finances = v.basicInformation.finances
        ? v.basicInformation.finances
        : []
      let financesName = 'first'
      for (const key in this.finances) {
        if (Object.prototype.hasOwnProperty.call(this.finances, key)) {
          let label = ''
          let columns = []
          if (key === '1') {
            label = '商品房'
            columns = [
              { prop: 'wholeHousingAddress', label: '房产地址', align: 'center' },
              { prop: 'housingArea', label: '房产面积(㎡)', align: 'center' },
              { prop: 'housingValue', label: '房产价值(万)', align: 'center' }
            ]
          } else if (key === '2') {
            label = '自建房'
            columns = [
              { prop: 'wholeHousingAddress', label: '房产地址', align: 'center' },
              { prop: 'housingStructure$FICDictName', label: '房屋结构', align: 'center' },
              { prop: 'housingArea', label: '房产面积(㎡)', align: 'center' },
              { prop: 'housingValue', label: '房产价值(万)', align: 'center' }
            ]
          } else if (key === '99') {
            label = '其他资产'
            columns = [
              { prop: 'othreAssertType$FICDictName', label: '资产类型', align: 'center' },
              { prop: 'othreAssertValue', label: '资产价值(万)', align: 'center' }
            ]
          }
          this.tabPaneList.push({
            label,
            columns,
            name: financesName,
            dataSource: this.finances[key].map(houseInfo => {
              houseInfo.wholeHousingAddress = houseInfo.housingProvince$FICDictName + houseInfo.housingAddress
              return houseInfo
            })
          })
          financesName = financesName + '1'
        }
      }
      let comeListName = 'first'
      if (this.creditApplyFamlilyComeListDTO && this.creditApplyFamlilyComeListDTO.acquisitionAssetsDTOS) {
        this.creditApplyFamlilyComeListDTO.acquisitionAssetsDTOS.map(item => {
          item.incomeChildTypeDes = item.incomeChildType$FICDictName
          if (item.incomeChildType === '99') {
            item.incomeChildTypeDes = item.otherContent
          }
          return item
        })
      }
      for (const key in this.creditApplyFamlilyComeListDTO) {
        if (Object.prototype.hasOwnProperty.call(this.creditApplyFamlilyComeListDTO, key)) {
          let label = ''
          let columns = []
          if (key === 'acquisitionAssetsDTOS') {
            label = '购置资产'
            columns = [
              { prop: 'incomeChildTypeDes', label: '资产类型', align: 'center' },
              { prop: 'yearExpend', label: '支出金额（万）', align: 'center' }
            ]
          } else if (key === 'baseDTOS') {
            label = '基本支出'
            columns = [
              { prop: 'incomeChildType$FICDictName', label: '支出类型', align: 'center' },
              { prop: 'yearExpend', label: '支出金额（万元）', align: 'center' }
            ]
          } else if (key === 'breedCreateDTOS') {
            label = '养殖'
            columns = [
              { prop: 'incomeChildType', label: '养殖种类', align: 'center' },
              { prop: 'breedNum', label: '养殖数量', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万元）', align: 'center' },
              { prop: 'yearExpend', label: '年支出金额（万）', align: 'center' }
            ]
          } else if (key === 'businessCreateDTOS') {
            label = '经商'
            columns = [
              { prop: 'businessProject', label: '经商项目', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万元）', align: 'center' },
              { prop: 'yearExpend', label: '年支出金额（万元）', align: 'center' }
            ]
          } else if (key === 'machineryCreateDTOS') {
            label = '农机服务'
            columns = [
              { prop: 'incomeChildType$FICDictName', label: '服务类型', align: 'center' },
              { prop: 'machineNum', label: '农机数量', align: 'center' },
              { prop: 'serviceArea', label: '服务面积（亩/农机）', align: 'center' },
              { prop: 'yearIncome', label: '收入金额（万/农机）', align: 'center' },
              { prop: 'yearExpend', label: '年支出金额（万/农机）', align: 'center' }
            ]
          } else if (key === 'salaryCreateDTOS') {
            label = '固定工资'
            columns = [
              { prop: 'workCompany', label: '工作单位', align: 'center' },
              { prop: 'workYear', label: '工作年限', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万元）', align: 'center' }
            ]
          } else if (key === 'subsidiesCreateDTOS') {
            label = '政府补贴'
            columns = [
              { prop: 'governmentSubsidyContent', label: '补贴内容', align: 'center' },
              { prop: 'subsidyAmount', label: '年补贴金额（万元）', align: 'center' }
            ]
          } else if (key === 'workingCreateDTOS') {
            label = '打工'
            columns = [
              { prop: 'workNum', label: '打工人数', align: 'center' },
              { prop: 'workContent', label: '工作内容', align: 'center' },
              { prop: 'workArea', label: '打工地区', align: 'center' },
              { prop: 'yearIncome', label: '收入金额（万元/每）', align: 'center' }
            ]
          }
          if (this.creditApplyFamlilyComeListDTO[key]) {
            if (!Array.isArray(this.creditApplyFamlilyComeListDTO[key])) {
              this.creditApplyFamlilyComeListDTO[key] = Object.values(this.creditApplyFamlilyComeListDTO[key])
            }
            this.familyIncomeTabData.push({
              label,
              columns,
              name: comeListName,
              dataSource: this.creditApplyFamlilyComeListDTO[key]
            })
            comeListName = comeListName + '1'
          }
        }
      }
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name
    },
    // 家庭信息Tab 切换
    handleFamilyIncomeClick(tab, event) {
      this.familyIncomeActive = tab.name
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
    .noData {
      font-size: 12px;
      margin-left: 20px;
      padding-bottom: 16px;
    }
  }
  .inEx {
    display: flex;
    .titleCont {
      width: 40%;
    }
  }
}
</style>
