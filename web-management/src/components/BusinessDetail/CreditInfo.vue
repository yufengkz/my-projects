/* 增信信息组件 */
<template>
  <div class="creditInfo" v-if="enhancementDetail.majorGuaranteeType">
    <!--自然人担保开始-->
    <div>
      <div class="titleCont" v-show="personDetailRepList.length > 0">
        <div class="title">自然人担保</div>
        <el-row>
          <el-col :span="24">
            <div class="tabsLarge">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <template v-for="item in personDetailRepList">
                  <el-tab-pane
                    :v-if="item.personBaseRep"
                    :key="item.customerId"
                    :label="item.personBaseRep.customerName"
                    :name="item.personBaseRep.customerName"
                  >
                    <DescriptionList :content="item.personBaseRep" class="m-l-20">
                      <Description label="姓名">{{ item.personBaseRep.customerName }}</Description>
                      <Description label="身份证号">{{ item.personBaseRep.idCardNo }}</Description>
                      <Description label="手机号">{{ item.personBaseRep.mobile }}</Description>
                      <Description label="性别">{{ item.personBaseRep.sex$FICDictName }}</Description>
                      <Description label="出生日期">{{ item.personBaseRep.birthday }}</Description>
                      <Description label="民族">{{ item.personBaseRep.national }}</Description>
                      <Description label="年龄">{{ item.personBaseRep.age }}</Description>
                      <Description label="婚姻状况">{{ item.personBaseRep.marriage$FICDictName }}</Description>
                      <Description label="最高学历">{{ item.personBaseRep.highestEdu$FICDictName }}</Description>
                      <Description label="户籍地址">{{ item.personBaseRep.censusRegisterAddress }}</Description>
                      <Description label="住址">{{ item.personBaseRep.familyAddress }}</Description>
                      <Description label="居住年限">{{ item.personBaseRep.liveLimitYear && item.personBaseRep.liveLimitYear + '年' }}</Description>
                    </DescriptionList>
                    <div class="titleCont" v-if="item.spouse">
                      <div class="titleSmall">配偶信息</div>
                      <DescriptionList class="m-l-20">
                        <Description label="姓名">{{ item.spouse.name }}</Description>
                        <Description label="身份证号">{{ item.spouse.idNo }}</Description>
                        <Description label="手机号">{{ item.spouse.mobile }}</Description>
                      </DescriptionList>
                    </div>
                    <div class="titleCont">
                      <div class="titleSmall">家庭年收入</div>
                      <el-tabs v-if="item.familyIncomeTabData.length > 0" v-model="familyIncomeActive" @tab-click="handleFamilyIncomeClick">
                        <template v-for="(element, index) in item.familyIncomeTabData">
                          <el-tab-pane :label="element.label" :name="element.incomeName" :key="element.incomeName">
                            <TableList
                              :key="index"
                              border
                              :columns="element.columns"
                              :dataSource="element.dataSource"
                              :options="options"
                            />
                          </el-tab-pane>
                        </template>
                      </el-tabs>
                      <div v-else  class="noData">暂无数据</div>
                    </div>
                    <div class="titleCont">
                      <div class="titleSmall">家庭负债</div>
                      <DescriptionList class="m-l-20">
                        <Description label="赊欠账款">
                          {{
                            ((item.liabilities && item.liabilities[0] && item.liabilities[0].outstandingAccounts) ? item.liabilities[0].outstandingAccounts : '0') + '万元'
                          }}
                        </Description>
                        <Description label="民间借贷">
                          {{
                            ((item.liabilities && item.liabilities[0] && item.liabilities[0].privateLending) ? item.liabilities[0].privateLending : '0') + '万元'
                          }}
                        </Description>
                        <Description label="银行贷款">
                          {{ ((item.liabilities && item.liabilities[0] && item.liabilities[0].bankLoans) ? item.liabilities[0].bankLoans : '0') + '万元' }}
                        </Description>
                      </DescriptionList>
                    </div>
                    <div class="titleCont">
                      <div class="titleSmall">家庭财产状况</div>
                      <div v-if="item.tabPaneList.length > 0">
                        <el-tabs v-model="cczkActiveName" @tab-click="cczkHandleClick">
                          <template v-for="cczk in item.tabPaneList">
                            <el-tab-pane :key="cczk.finanName" :label="cczk.label" :name="cczk.finanName">
                              <TableList
                                border
                                :columns="cczk.columns"
                                :dataSource="cczk.dataSource"
                                :options="options"
                              />
                            </el-tab-pane>
                          </template>
                        </el-tabs>
                      </div>
                      <div v-else  class="noData">暂无数据</div>
                    </div>
                    <div class="titleCont" v-show="item.guaranteeMortgages">
                      <div class="titleSmall">担保人抵押资产</div>
                      <div class="cont">
                        <div class="msgCont" v-for="(mort, index) in item.guaranteeMortgages" :key="index">
                          <div class="msg">
                            {{mortgagesTypeDetails(mort)}}
                          </div>
                          <div v-if="mort.twoLevelType === 'equipment'" class="msg">发动机编号：{{ mort.warrantNo }}</div>
                          <div v-else class="msg">地址：{{ mort.detailAddress }}</div>
                          <div class="msg">认定价值：{{ mort.identifyValue && mort.identifyValue + '万' || '--' }}</div>
                          <div class="link" @click="CognizanceFun(mort, 'DY')">查看详情</div>
                        </div>
                      </div>
                    </div>
                    <div class="titleCont" v-show="item.guaranteePledgeRepList">
                      <div class="titleSmall">担保人质押资产</div>
                      <div class="cont">
                        <div class="msgCont" v-for="(rep, index) in item.guaranteePledgeRepList" :key="index">
                          <div class="msg">{{ rep.twoLevelType$FICDictName }}</div>
                          <div v-if="rep.twoLevelType === 'legal_right'" class="msg">资产总额及占比：{{ rep.totalAssets }}万 , {{ rep.proportion }}%</div>
                          <div v-else class="msg">约定账期: {{ rep.accountStart }} - {{ rep.accountEnd }}</div>
                          <div class="msg">认定价值: {{ rep.identifyValue && rep.identifyValue + '万' || '--'}}</div>
                          <div class="link" @click="CognizanceFun(rep, 'ZY')">查看详情</div>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                </template>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--自然人担保结束-->
    <!--资产抵押-->
    <div class="titleCont" v-show="selfGuaranteeMortgages.length > 0">
      <div class="title">借款人资产抵押</div>
      <div class="cont">
        <div v-for="itemgu in selfGuaranteeMortgages" :key="itemgu.id" class="msgCont">
          <div class="msg">
             {{mortgagesTypeDetails(itemgu)}}
          </div>
          <div v-if="itemgu.twoLevelType === 'equipment'" class="msg">发动机编号：{{ itemgu.warrantNo }}</div>
          <div v-else class="msg">地址：{{ itemgu.detailAddress }}</div>
          <div class="msg">认定价值：{{ itemgu.identifyValue && itemgu.identifyValue + '万' }}</div>
          <div class="link" @click="CognizanceFun(itemgu, 'DY')">查看详情>></div>
        </div>
      </div>
    </div>
    <!--资产质押-->
    <div class="titleCont" v-show="selfGuaranteePledgeRepList.length > 0">
      <div class="title">借款人资产质押</div>
      <div class="cont">
        <div v-for="itemgp in selfGuaranteePledgeRepList" :key="itemgp.id" class="msgCont">
          <div class="msg">{{ itemgp.twoLevelType$FICDictName }}</div>
          <div v-if="itemgp.twoLevelType === 'legal_right'" class="msg">资产总额及占比：{{ itemgp.totalAssets }}万 , {{ itemgp.proportion }}%</div>
          <div v-else class="msg">约定账期：{{ itemgp.accountStart }} - {{ itemgp.accountEnd }}</div>
          <div class="msg">认定价值：{{ itemgp.identifyValue && itemgp.identifyValue + '万' }}</div>
          <div class="link" @click="CognizanceFun(itemgp, 'ZY')">查看详情>></div>
        </div>
      </div>
    </div>
    <!--法人担保-->
    <div class="titleCont" v-show="legalPersonDetailRepList.length > 0">
      <div class="title">
        <span>法人担保</span>
      </div>
      <template v-for="(item, index) in legalPersonDetailRepList">
        <DescriptionList :content="item" :key="item.id" class="m-l-20">
          <Description label="法人姓名">{{ item.legalName }}</Description>
          <Description label="证件号码">{{ item.legalIdNo }}</Description>
          <Description label="统一社会信用代码">{{ item.creditCode }}</Description>
          <Description label="机构名称">{{ item.organName }}</Description>
          <Description label="注册地址">{{ item.registerAddress }}</Description>
        </DescriptionList>
        <el-divider v-if="index !== legalPersonDetailRepList.length - 1" :key="'divider' + item.id"></el-divider>
      </template>
    </div>
    <!--担保公司担保-->
    <div class="titleCont" v-show="guaranteeCompanies.length > 0">
      <div class="title">担保公司担保</div>
      <template v-for="(item, index) in guaranteeCompanies">
        <DescriptionList :content="item" :key="item.id" class="m-l-20">
          <Description label="机构名称">{{ item.name }}</Description>
        </DescriptionList>
        <el-divider v-if="index !== guaranteeCompanies.length - 1" :key="'divider' + item.id"></el-divider>
      </template>
    </div>
    <MortgageInfoDetailsDialog
      :dialogVisible="mortgageInfoDetailsDialogVisible"
      dialogTitle="价值风险认定"
      @dialogCancel="mortgageInfoDetailsDialogClose"
      :outCheckSource="mortgageInfoDetailsData"
    ></MortgageInfoDetailsDialog>
    <PledgeInfoDetailsDialog
      :dialogVisible="pledgeInfoDetailsDialogVisible"
      dialogTitle="价值风险认定"
      @dialogCancel="pledgeInfoDetailsDialogClose"
      :outCheckSource="pledgeInfoDetailsData"
    ></PledgeInfoDetailsDialog>
  </div>
  <div v-else>暂无增信</div>
</template>
<script>
import DescriptionList from '@/components/DescriptionList'
import TableList from '@/components/Tables/TableList'
// import { creditApplyInfoPc } from '@/api/loan-apply-lilin'

export default {
  name: 'CreditInfo',
  components: {
    DescriptionList,
    TableList,
    MortgageInfoDetailsDialog: () => import('@/components/MortgageInfoDetailsDialog'),
    PledgeInfoDetailsDialog: () => import('@/components/PledgeInfoDetailsDialog')
  },
  props: {
    enhancementDetail: {
      type: Object
    }
  },
  data() {
    return {
      activeName: 'first', // 第一个tab
      personDetailRepList: [], // 自然人保证列表
      selfGuaranteeMortgages: [], // 资产抵押列表
      selfGuaranteePledgeRepList: [], // 资产质押列表
      legalPersonDetailRepList: [], // 法人保证列表
      guaranteeCompanies: {}, // 担保公司保证列表
      options: {
        index: true
      },
      mortgageInfoDetailsDialogVisible: false,
      pledgeInfoDetailsDialogVisible: false,
      cczkActiveName: 'first',
      familyIncomeActive: 'first',
      mortgageInfoDetailsData: {},
      pledgeInfoDetailsData: {},
      firstTabPaneList: []
    }
  },
  watch: {
    enhancementDetail(v) {
      this.personDetailRepList = v.personDetailRepList ? v.personDetailRepList : []
      if (this.personDetailRepList[0]) {
        this.activeName = this.personDetailRepList[0].personBaseRep.customerName
          ? this.personDetailRepList[0].personBaseRep.customerName
          : ''
      }
      this.selfGuaranteeMortgages = v.selfGuaranteeMortgages ? v.selfGuaranteeMortgages : []
      this.selfGuaranteePledgeRepList = v.selfGuaranteePledgeRepList ? v.selfGuaranteePledgeRepList : []
      this.legalPersonDetailRepList = v.legalPersonDetailRepList ? v.legalPersonDetailRepList : []
      this.guaranteeCompanies = v.guaranteeCompanies ? v.guaranteeCompanies : []
      this.personDetailRepList.forEach(element => {
        element.familyIncomeTabData = this.formatFamilyIncome(element)
        element.tabPaneList = this.formatFinances(element)
      })
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    cczkHandleClick(tab, event) {
      this.cczkActiveName = tab.name
    },
    CognizanceFun(value, type) {
      if (type === 'DY') {
        this.mortgageInfoDetailsData = value
        this.mortgageInfoDetailsDialogVisible = true
      } else if (type === 'ZY') {
        this.pledgeInfoDetailsData = value
        this.pledgeInfoDetailsDialogVisible = true
      }
    },
    mortgagesTypeDetails(val) {
      var obj = val.oneLevelType$FICDictName
      if (val.twoLevelType$FICDictName) {
        obj = obj + '-' + val.twoLevelType$FICDictName
      }
      if (val.threeLevelType$FICDictName) {
        obj = obj + '-' + val.threeLevelType$FICDictName
      }
      if (val.fourLevelType$FICDictName) {
        obj = obj + '-' + val.fourLevelType$FICDictName
      }
      if (val.fourLevelTypeOther) {
        obj = obj + '-' + val.fourLevelTypeOther
      }
      return obj
    },
    mortgageInfoDetailsDialogClose(val) {
      this.mortgageInfoDetailsDialogVisible = false
      // this.firstTabPaneList = []
    },
    pledgeInfoDetailsDialogClose(val) {
      this.pledgeInfoDetailsDialogVisible = false
      // this.firstTabPaneList = []
    },
    handleFamilyIncomeClick(tab, event) {
      this.familyIncomeActive = tab.name
    },
    formatFamilyIncome(familyIncomeTabData) {
      let incomeName = 'first'
      const currentData = []
      for (const key in familyIncomeTabData.familyIncomeListDTO) {
        if (Object.prototype.hasOwnProperty.call(familyIncomeTabData.familyIncomeListDTO, key)) {
          let label = ''
          let columns = []

          if (key === 'acquisitionAssetsDTOS') {
            label = '购置资产'
            columns = [
              { prop: 'incomeChildTypeDes', label: '选择资产类型', align: 'center' },
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
              { prop: 'breedType', label: '养殖种类', align: 'center' },
              { prop: 'breedNum', label: '养殖数量', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万元）', align: 'center' }
            ]
          } else if (key === 'businessCreateDTOS') {
            label = '经商'
            columns = [
              { prop: 'businessProject', label: '经商项目', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万元）', align: 'center' }
            ]
          } else if (key === 'machineryCreateDTOS') {
            label = '农机服务'
            columns = [
              { prop: 'incomeChildType$FICDictName', label: '服务类型', align: 'center' },
              { prop: 'machineNum', label: '农机数量', align: 'center' },
              { prop: 'serviceArea', label: '服务面积（亩/农机）', align: 'center' },
              { prop: 'yearIncome', label: '收入金额（万/农机）', align: 'center' }
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
              { prop: 'yearIncome', label: '年补贴金额（万元）', align: 'center' }
            ]
          } else if (key === 'workingCreateDTOS') {
            label = '打工'
            columns = [
              { prop: 'workNum', label: '打工人数', align: 'center' },
              { prop: 'workContent', label: '工作内容', align: 'center' },
              { prop: 'workArea', label: '打工地区', align: 'center' },
              { prop: 'yearIncome', label: '收入金额（万元/每）', align: 'center' }
            ]
          } else if (key === 'plantCreateDTOS') {
            label = '种植'
            columns = [
              { prop: 'incomeChildTypeDes', label: '作物类型', align: 'center' },
              { prop: 'plantArea', label: '种植面积（亩）', align: 'center' },
              { prop: 'yearIncome', label: '年收入金额（万元）', align: 'center' }
            ]
          }
          if (key === 'plantCreateDTOS') {
            familyIncomeTabData.familyIncomeListDTO[key].map(item => {
              if (item.incomeChildType === '99') {
                item.incomeChildTypeDes = item.otherInfo
              } else {
                item.incomeChildTypeDes = item.incomeChildType$FICDictName
              }
            })
          }
          if (familyIncomeTabData.familyIncomeListDTO[key].length > 0) {
            if (!Array.isArray(familyIncomeTabData.familyIncomeListDTO[key])) {
              familyIncomeTabData.familyIncomeListDTO[key] = Object.values(familyIncomeTabData.familyIncomeListDTO[key])
            }
            currentData.push({
              label,
              name,
              columns,
              incomeName,
              dataSource: familyIncomeTabData.familyIncomeListDTO[key]
            })
            incomeName = incomeName + '1'
          }
        }
      }
      return currentData
    },
    formatFinances(item) {
      let finanName = 'first'
      var sourceArray = []
      for (const key in item.finances) {
        if (Object.prototype.hasOwnProperty.call(item.finances, key)) {
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
              { prop: 'othreAssertValue', label: '房产价值(万)', align: 'center' }
            ]
          }
          sourceArray.push({
            label,
            name,
            finanName,
            columns,
            dataSource: item.finances[key].map(houseInfo => {
              houseInfo.wholeHousingAddress = houseInfo.housingProvince$FICDictName + houseInfo.housingAddress
              return houseInfo
            })
          })
          finanName = finanName + '1'
        }
      }
      return sourceArray
    }
  }
}
</script>
<style lang="scss" scoped>
.tabsLarge {
  position: relative;
  padding-left: 15px;
  color: #5a5a5a;
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
    display: flex;
    justify-content: space-between;
  }
  .noData {
    font-size: 12px;
    margin-left: 20px;
    padding-bottom: 16px;
  }
  .titleSmall {
    font-size: 13px;
    padding-left: 6px;
    line-height: 14px;
    border-left: 2px solid #08b448;
    color: #59676f;
    font-weight: 500;
    margin: 10px 0;
  }
  .cont {
    display: flex;
    flex-flow: wrap;
  }
  .msgCont {
    position: relative;
    border: 1px solid rgba(215, 215, 215, 1);
    padding: 8px;
    width: 45%;
    margin-right: 30px;
    margin-bottom: 16px;
    .msg {
      font-size: 12px;
      color: #5a5a5a;
      line-height: 12px;
      padding: 7px 0;
      &:first-child {
        color: #333;
      }
    }
    .link {
      position: absolute;
      right: 8px;
      bottom: 8px;
      color: #08b448;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }
  }
}
</style>
