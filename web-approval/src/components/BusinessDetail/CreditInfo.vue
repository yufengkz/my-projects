/* 增信信息组件 */
<template>
  <div class="creditInfo">
    <!--自然人担保开始-->
    <div>
      <div v-if="personDetailRepList.length" class="titleCont">
        <div class="title">自然人担保</div>
        <el-row>
          <el-col :span="24">
            <div class="tabsLarge">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <template v-for="(item, index) in personDetailRepList">
                  <el-tab-pane v-if="item.personBaseRep" :key="item.customerId" :label="item.personBaseRep.customerName" :name="item.customerId">
                    <DescriptionList :content="item" class="m-l-20">
                      <Description label="姓名">{{ item.personBaseRep.customerName }}</Description>
                      <Description label="身份证号">{{ item.idNo }}</Description>
                      <Description label="手机号">{{ item.personBaseRep.mobile }}</Description>
                      <Description label="性别">{{ item.personBaseRep.sex$FICDictName }}</Description>
                      <Description label="出生日期">{{ item.personBaseRep.birthday }}</Description>
                      <Description label="民族">{{ item.personBaseRep.national }}</Description>
                      <Description label="年龄">{{ item.personBaseRep.age }}</Description>
                      <!--<Description label="与借款人关系">{{ item.relationship$FICDictName }}</Description>-->
                      <Description label="婚姻状况">{{ item.personBaseRep.marriage$FICDictName }}</Description>
                      <Description label="最高学历">{{ item.personBaseRep.highestEdu$FICDictName }}</Description>
                      <Description label="户籍地址">{{ item.personBaseRep.censusRegisterAddress }}</Description>
                      <Description label="住址">{{ item.personBaseRep.familyAddress }}</Description>
                      <Description label="居住年限">{{ item.personBaseRep.liveLimitYear }}</Description>
                    </DescriptionList>
                    <div v-if="item.personBaseRep.marriage === '2'" class="titleCont">
                      <div class="titleSmall">配偶信息</div>
                      <DescriptionList v-if="item.spouse" :content="item.spouse" class="m-l-20">
                        <Description label="姓名">{{ item.spouse.name }}</Description>
                        <Description label="身份证号">{{ item.spouse.idNo }}</Description>
                        <Description label="手机号">{{ item.spouse.mobile }}</Description>
                      </DescriptionList>
                    </div>
                    <div v-if="item.familyIncomeSummaryResp" class="titleCont">
                      <div class="titleSmall">家庭年收入</div>
                      <DescriptionList :content="item.familyIncomeSummaryResp" class="m-l-20">
                        <Description label="年收入">{{ item.familyIncomeSummaryResp.incomeSum ? item.familyIncomeSummaryResp.incomeSum + '万元' : '--' }}</Description>
                      </DescriptionList>
                    </div>
                    <div v-if="item.liabilities[0]" class="titleCont">
                      <div class="titleSmall">家庭负债</div>
                      <DescriptionList :content="item.liabilities[0]" class="m-l-20">
                        <Description label="赊欠账款">{{ item.liabilities[0].outstandingAccounts ? item.liabilities[0].outstandingAccounts + '万元' : '--' }}</Description>
                        <Description label="民间借贷">{{ item.liabilities[0].privateLending ? item.liabilities[0].privateLending + '万元' : '--' }}</Description>
                        <Description label="银行贷款">{{ item.liabilities[0].bankLoans ? item.liabilities[0].bankLoans + '万元' : '--' }}</Description>
                      </DescriptionList>
                    </div>
                    <div v-if="item.finances" class="titleCont">
                      <div class="titleSmall">家庭财产状况</div>
                      <div>
                        <el-tabs v-model="obj['cczkActiveName' + index]" @tab-click="cczkHandleClick">
                          <template v-for="(itemfinance, key) in item.finances">
                            <el-tab-pane :key="key" :label="financeType[key]" :name="key">
                              <TableList
                                border
                                :columns="columusFun(key)"
                                :dataSource="itemfinance"
                                :options="options"
                              />
                            </el-tab-pane>
                          </template>
                        </el-tabs>
                      </div>
                    </div>
                    <div v-show="item.guaranteeMortgages && item.guaranteeMortgages.length" class="titleCont">
                      <div class="titleSmall">担保人抵押资产</div>
                      <div class="cont">
                        <template v-for="itemgu in item.guaranteeMortgages">
                          <div :key="itemgu.id" class="msgCont">
                            <div class="msg">
                              <span v-if="itemgu.oneLevelType$FICDictName">{{ itemgu.oneLevelType$FICDictName }}</span>
                              <span v-if="itemgu.twoLevelType$FICDictName"> - {{ itemgu.twoLevelType$FICDictName }}</span>
                              <span v-if="itemgu.threeLevelType$FICDictName"> - {{ itemgu.threeLevelType$FICDictName }}</span>
                              <span v-if="itemgu.fourLevelType$FICDictName"> - {{ itemgu.fourLevelType$FICDictName }}</span>
                              <span v-if="itemgu.fourLevelTypeOther"> - {{ itemgu.fourLevelTypeOther }}</span>
                            </div>
                            <div v-if="itemgu.twoLevelType === 'equipment'" class="msg">发动机编号：{{ itemgu.warrantNo }}</div>
                            <div v-else class="msg">地址：{{ itemgu.addressName }}{{ itemgu.detailAddress }}</div>
                            <div class="msg" v-if="itemgu.approveRiskValue">认定价值：{{ itemgu.approveRiskValue + '万元' }}</div>
                            <div class="msg" v-else>待认定价值：{{ itemgu.identifyValue + '万元' }}</div>
                            <div class="link" v-if="isApproval === 'Y'" @click="CognizanceFun(itemgu, 'person', 'mortgage', item.customerId)">抵押价值认定>></div>
                          </div>
                        </template>
                      </div>
                    </div>
                    <div v-show="item.guaranteePledgeRepList && item.guaranteePledgeRepList.length" class="titleCont">
                      <div class="titleSmall">担保人质押资产</div>
                      <div class="cont">
                        <template v-for="itemgp in item.guaranteePledgeRepList">
                          <div :key="itemgp.id" class="msgCont">
                            <div class="msg">
                              <span v-if="itemgp.oneLevelType$FICDictName">{{ itemgp.oneLevelType$FICDictName }}</span>
                              <span v-if="itemgp.twoLevelType$FICDictName"> - {{ itemgp.twoLevelType$FICDictName }}</span>
                              <span v-if="itemgp.threeLevelType$FICDictName"> - {{ itemgp.threeLevelType$FICDictName }}</span>
                              <span v-if="itemgp.fourLevelType$FICDictName"> - {{ itemgp.fourLevelType$FICDictName }}</span>
                              <span v-if="itemgp.fourLevelTypeOther"> - {{ itemgp.fourLevelTypeOther }}</span>
                            </div>
                            <div v-if="itemgp.twoLevelType === 'legal_right'" class="msg">资产总额及占比：{{ itemgp.totalAssets }}万 , {{ itemgp.proportion }}%</div>
                            <div v-else class="msg">约定账期：{{ splitTimeFun(itemgp.accountStart) }} -- {{ splitTimeFun(itemgp.accountEnd) }}</div>
                            <div class="msg" v-if="itemgp.approveRiskValue">认定价值：{{ itemgp.approveRiskValue + '万元' }}</div>
                            <div class="msg" v-else>待认定价值：{{ itemgp.identifyValue + '万元' }}</div>
                            <div class="link" v-if="isApproval === 'Y'" @click="CognizanceFun(itemgp, 'person', 'pledge', item.customerId)">质押价值认定>></div>
                          </div>
                        </template>
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
    <div v-show="guaranteeMortgages.length" class="titleCont">
      <div class="title">借款人资产抵押</div>
      <div class="cont">
        <div v-for="itemgu in guaranteeMortgages" :key="itemgu.id" class="msgCont">
          <div class="msg">
            <span v-if="itemgu.oneLevelType$FICDictName">{{ itemgu.oneLevelType$FICDictName }}</span>
            <span v-if="itemgu.twoLevelType$FICDictName"> - {{ itemgu.twoLevelType$FICDictName }}</span>
            <span v-if="itemgu.threeLevelType$FICDictName"> - {{ itemgu.threeLevelType$FICDictName }}</span>
            <span v-if="itemgu.fourLevelType$FICDictName"> - {{ itemgu.fourLevelType$FICDictName }}</span>
            <span v-if="itemgu.fourLevelTypeOther"> - {{ itemgu.fourLevelTypeOther }}</span>
          </div>
          <div v-if="itemgu.twoLevelType === 'equipment'" class="msg">发动机编号：{{ itemgu.warrantNo }}</div>
          <div v-else class="msg">地址：{{ itemgu.addressName }}{{ itemgu.detailAddress }}</div>
          <div class="msg" v-if="itemgu.approveRiskValue">认定价值：{{ itemgu.approveRiskValue + '万元' }}</div>
          <div class="msg" v-else>待认定价值：{{ itemgu.identifyValue + '万元' }}</div>
          <div class="link" v-if="isApproval === 'Y'" @click="CognizanceFun(itemgu, 'loan', 'mortgage')">抵押价值认定>></div>
        </div>
      </div>
    </div>
    <!--资产质押-->
    <div v-show="guaranteePledgeRepList.length" class="titleCont">
      <div class="title">借款人资产质押</div>
      <div class="cont">
        <div v-for="itemgp in guaranteePledgeRepList" :key="itemgp.id" class="msgCont">
          <div class="msg">
            <span v-if="itemgp.oneLevelType$FICDictName">{{ itemgp.oneLevelType$FICDictName }}</span>
            <span v-if="itemgp.twoLevelType$FICDictName"> - {{ itemgp.twoLevelType$FICDictName }}</span>
            <span v-if="itemgp.threeLevelType$FICDictName"> - {{ itemgp.threeLevelType$FICDictName }}</span>
            <span v-if="itemgp.fourLevelType$FICDictName"> - {{ itemgp.fourLevelType$FICDictName }}</span>
            <span v-if="itemgp.fourLevelTypeOther"> - {{ itemgp.fourLevelTypeOther }}</span>
          </div>
          <div v-if="itemgp.twoLevelType === 'legal_right'" class="msg">资产总额及占比：{{ itemgp.totalAssets }}万 , {{ itemgp.proportion }}%</div>
          <div v-else class="msg">约定账期：{{ splitTimeFun(itemgp.accountStart) }} -- {{ splitTimeFun(itemgp.accountEnd) }}</div>
          <div class="msg" v-if="itemgp.approveRiskValue">认定价值：{{ itemgp.approveRiskValue + '万元' }}</div>
          <div class="msg" v-else>待认定价值：{{ itemgp.identifyValue + '万元' }}</div>
          <div class="link" v-if="isApproval === 'Y'" @click="CognizanceFun(itemgp, 'loan', 'pledge')">质押价值认定>></div>
        </div>
      </div>
    </div>
    <!--法人担保-->
    <div v-show="legalPersonDetailRepList.length" class="titleCont">
      <div class="title">
        <span>法人担保</span>
        <div v-if="legalPersonDetailRepList.length > 0" @click="goLegal">查看详情>></div>
      </div>
      <template v-for="(item, index) in legalPersonDetailRepList">
        <DescriptionList :content="item" :key="item.id" class="m-l-20">
          <Description label="法人姓名">{{ item.legalName }}</Description>
          <Description label="证件号码">{{ item.legalIdNo }}</Description>
          <Description label="统一社会信用代码">{{ item.creditCode }}</Description>
          <Description label="机构名称">{{ item.organName }}</Description>
          <Description label="注册地址">{{ item.registerAddress }}</Description>
          <Description label="担保截至时间">{{ item.validTerm }}</Description>
          <Description label="可担保金额">{{ item.proposalLimit ? item.proposalLimit + '元' : '--' }}</Description>
        </DescriptionList>
        <el-divider v-if="index !== legalPersonDetailRepList.length - 1" :key="'divider' + item.id"></el-divider>
      </template>
    </div>
    <!--担保公司担保-->
    <div v-show="guaranteeCompanies.length" class="titleCont">
      <div class="title">担保公司担保</div>
      <template v-for="(item, index) in guaranteeCompanies">
        <DescriptionList :content="item" :key="item.id" class="m-l-20">
          <Description label="机构名称">{{ item.name }}</Description>
          <Description label="统一社会信用代码">{{ item.creditCode }}</Description>
          <Description label="合作截至日期">{{ item.endDate }}</Description>
          <Description label="可担保金额">{{ item.approvalLimit ? item.approvalLimit + '元' : '--' }}</Description>
        </DescriptionList>
        <el-divider v-if="index !== guaranteeCompanies.length - 1" :key="'divider' + item.id"></el-divider>
      </template>
    </div>

    <!--<CognizanceDialog-->
      <!--:dialogVisible="cognizanceDialogVisible"-->
      <!--:cognizanceDialogData="cognizanceDialogData"-->
      <!--:imageData="imageData"-->
      <!--:type="type"-->
      <!--@dialogCancel="dialogCancelFun"-->
      <!--@gcognizanceSaveInfo="cognizanceSaveInfo"-->
    <!--&gt;</CognizanceDialog>-->
    <MortgageInfoDetailsDialog
      :dialogVisible="mortgageInfoDetailsDialogVisible"
      dialogTitle="价值风险认定"
      @dialogCancel="dialogCancelFun"
      :imageData="imageData"
      :outCheckSource="cognizanceDialogData"
    ></MortgageInfoDetailsDialog>
    <PledgeInfoDetailsDialog
      :dialogVisible="pledgeInfoDetailsDialogVisible"
      dialogTitle="价值风险认定"
      @dialogCancel="dialogCancelFun"
      :imageData="imageData"
      :outCheckSource="cognizanceDialogData"
    ></PledgeInfoDetailsDialog>
  </div>
</template>
<script>
import { splitTime } from '@/utils/format'
import DescriptionList from '@/components/DescriptionList'
import TableList from '@/components/Tables/TableList'
export default {
  name: 'CreditInfo',
  components: {
    DescriptionList,
    TableList,
    MortgageInfoDetailsDialog: () => import('@/components/MortgageInfoDetailsDialog'),
    PledgeInfoDetailsDialog: () => import('@/components/PledgeInfoDetailsDialog')
    // CognizanceDialog: () => import('@/components/BusinessDetail/CognizanceDialog')
  },
  props: {
    enhancementDetail: {
      type: Object
    },
    realImageDtos: {
      type: Object
    },
    isApproval: {
      type: String
    }
  },
  data() {
    return {
      activeName: 'first', // 第一个tab
      personDetailRepList: [], // 自然人保证列表
      guaranteeMortgages: [], // 资产抵押列表
      guaranteePledgeRepList: [], // 资产质押列表
      legalPersonDetailRepList: [], // 法人保证列表
      guaranteeCompanies: {}, // 担保公司保证列表
      loanImageRep: {}, // 借款人影像
      personImageReps: {}, // 担保人影像
      options: {
        index: true
      },
      cognizanceDialogVisible: false,
      obj: {
        cczkActiveName0: '1',
        cczkActiveName1: '1'
      },
      cognizanceDialogData: {},
      imageData: {},
      type: '', // 抵押-mortgage 质押-pledge
      financeType: {
        1: '商品房',
        2: '自建房',
        99: '其他资产'
      },
      personApplyNo: '',
      mortgageInfoDetailsDialogVisible: false,
      pledgeInfoDetailsDialogVisible: false,
      mortgageInfoDetailsData: {},
      pledgeInfoDetailsData: {}

    }
  },
  watch: {
    enhancementDetail: {
      handler(newVal, oldVal) {
        this.enhancementDetailHandle(newVal)
      },
      deep: true
    },
    realImageDtos: {
      handler(newVal, oldVal) {
        this.realImageDtosHandle(newVal)
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.enhancementDetailHandle(this.enhancementDetail)
    this.realImageDtosHandle(this.realImageDtos)
  },
  methods: {
    realImageDtosHandle(v) {
      if (v.guaranteeImage) {
        this.loanImageRep = v.guaranteeImage.loanImageRep ? v.guaranteeImage.loanImageRep : {} // 借款人影像
        this.personImageReps = v.guaranteeImage.personImageReps ? v.guaranteeImage.personImageReps : [] // 担保人影像
      }
    },
    enhancementDetailHandle(v) {
      // 自然人保证列表
      this.personDetailRepList = v.personDetailRepList ? v.personDetailRepList : []
      if (this.personDetailRepList[0] && this.personDetailRepList[0].personBaseRep) {
        this.activeName = this.personDetailRepList[0].customerId ? this.personDetailRepList[0].customerId : ''
      }
      if (this.personDetailRepList.length) {
        this.personDetailRepList.forEach((item, index) => {
          this.obj['cczkActiveName' + index] = Object.keys(item.finances)[0]
        })
      }
      // 资产抵押列表
      this.guaranteeMortgages = v.selfGuaranteeMortgages ? v.selfGuaranteeMortgages : []
      // 资产质押列表
      this.guaranteePledgeRepList = v.selfGuaranteePledgeRepList ? v.selfGuaranteePledgeRepList : []
      // 法人保证列表
      this.legalPersonDetailRepList = v.legalPersonDetailRepList ? v.legalPersonDetailRepList : []
      if (this.legalPersonDetailRepList[0]) {
        this.personApplyNo = this.legalPersonDetailRepList[0].applyNo
      }
      // 担保公司保证列表
      this.guaranteeCompanies = v.guaranteeCompanies ? v.guaranteeCompanies : []
    },
    goLegal() {
      this.$router.push({ path: '/approval/credit/person', query: { applyNo: this.personApplyNo } })
    },
    splitTimeFun(v) {
      return splitTime(v, ' ')[0]
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    cczkHandleClick(tab, event) {
      // console.log(tab, event)
    },
    dialogCancelFun(obj) {
      if (obj.operation === 1) {
        this.cognizanceDialogData = Object.assign(this.cognizanceDialogData, {
          approveRiskValue: obj.value
        })
      }
      this.mortgageInfoDetailsDialogVisible = false
      this.pledgeInfoDetailsDialogVisible = false
    },
    // role 角色   loan-借款人  person-担保人
    // type 类型   mortgage-抵押  pledge-质押
    CognizanceFun(obj, role, type, customerId) {
      this.imageData = {}
      this.type = type
      if (role === 'loan') {
        if (type === 'mortgage') {
          this.imageData = this.loanImageRep.loanMortgageFiles[obj.twoLevelType][0]
        }
        if (type === 'pledge') {
          this.imageData = this.loanImageRep.loanPledgeFiles[obj.twoLevelType][0]
        }
      }
      if (role === 'person') {
        if (type === 'mortgage' && this.personImageReps[customerId]) {
          this.imageData = this.personImageReps[customerId].personMortgageFiles[obj.twoLevelType][0]
        }
        if (type === 'pledge' && this.personImageReps[customerId]) {
          this.imageData = this.personImageReps[customerId].personPledgeFiles[obj.twoLevelType][0]
        }
      }
      this.cognizanceDialogData = obj
      if (type === 'mortgage') {
        this.mortgageInfoDetailsDialogVisible = true
      } else if (type === 'pledge') {
        this.pledgeInfoDetailsDialogVisible = true
      }
    },
    columusFun(type) {
      let columns = []
      if (type === '1') {
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
      } else if (type === '2') {
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
      } else if (type === '99') {
        columns = [
          { prop: 'othreAssertType$FICDictName', label: '资产类型', align: 'center' },
          { prop: 'othreAssertValue', label: '房产价值(万)', align: 'center' }
        ]
      }
      return columns
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
      div {
        cursor: pointer;
      }
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
      flex-wrap: wrap;
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
