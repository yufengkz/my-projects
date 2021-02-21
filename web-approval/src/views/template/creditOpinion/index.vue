<template>
  <div class="creditOpinion">
    <el-dialog
      title="授信申报意见"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose">
      <div class="opinionBody">
        <div class="title">授信申报意见（自然人客户）</div>
        <div>
          <div class="smallTitle">一、基础情况</div>
          <div class="mt5">
            1.借款人{{ creditApplyCustomerInfoOutDTO.customerName }}，
            {{ creditApplyCustomerInfoOutDTO.age }}岁，
            {{ creditApplyCustomerInfoOutDTO.marriage$FICDictName }}，
            家庭人口数量{{ creditApplyCustomerInfoOutDTO.familyNum }}人，
            成年子女人数{{ creditApplyCustomerInfoOutDTO.adultPersonNum }}人，
            其中{{ creditApplyCustomerInfoOutDTO.adultPersonHigherEduNum }}人正在接受高等教育，
            未成年子女人数{{ creditApplyCustomerInfoOutDTO.minorPersonNum }}人，
            其中正在接受高等教育人数{{ creditApplyCustomerInfoOutDTO.minorPersonHigherEduNum }}人；
            共借人{{ coBorrower.customerName }}，{{ apply.common && apply.common.age  }}岁，
            与借款人关系为{{ coBorrower.relation$FICDictName }}；
          </div>
          <div class="mt5">
            2.{{ basrc.centerName }}{{ apply ? isYOHandler(apply.newMapFlag) : '' }}客户；为{{ basrc.loanCustomerType$FICDictName }}{{ basrc.loanCustomerTypeOne$FICDictName ? '_' + basrc.loanCustomerTypeOne$FICDictName : '' }}；
          </div>
        </div>
        <div>
          <div class="smallTitle">二、经营情况</div>
          <div class="mt5">
            <div v-for="(item, index) in plants" :key="item.id">
              <span v-show="index === 0">1.</span>
              上年度种植{{ item.varietyType$FICDictName }}作物，
              种植面积{{ item.lastYearPlantarea }}亩，
              本年度种植面积{{ item.thisYearPlanarea }}亩，
              {{ isYNHandler(item.insuranceFlag) }}投保险，
              农产品销售方式为：{{ item.salesModeOfAgriculturalProducts$FICDictName }}；
            </div>
          </div>
          <!--<div class="mt5">-->
            <!--2.(字段有问题)-->
            <!--上年度种植收入=200万元，-->
            <!--种植投入=50万元，-->
            <!--种植毛收入=150万元；-->
          <!--</div>-->
          <div class="mt5">
            2.家庭年收入{{ basicInfoData.income }}万元，家庭年支出{{ basicInfoData.expend }}万元；
          </div>
          <div class="mt5">
            3.家庭银行流水流入净值：{{ creditApplyCustomerInfoOutDTO.famlilyIncome ? creditApplyCustomerInfoOutDTO.famlilyIncome + '万元' : '无'  }}
          </div>
          <div class="mt5">
            4.名下企业名称：
            <template v-if="customerEnterpriseOutDTOList.length">
              <span :key="item.id" v-for="item in customerEnterpriseOutDTOList">{{ item.entName }}；</span>
            </template>
            <span v-else>无</span>
          </div>
        </div>
        <div>
          <div class="smallTitle">三、资产负债情况</div>
          <div class="mt5" v-if="basicInformation.finances">
            <span>1.</span>
            <span v-for="(arr, key) in basicInformation.finances" :key="key">
              <span v-if="key === '1' || key === '2'">
                <template v-for="item in arr">
                  <span :key="item.id">
                    {{ item.financeType$FICDictName }}，
                    地址：{{ item.housingProvince$FICDictName.split(',').join('') }}{{ item.housingAddress }}，
                    面积{{ item.housingArea }}㎡，
                    房产价值{{ item.housingValue }}万元；<br>
                  </span>
                </template>
              </span>
              <span v-if="key === '99'">
                <span>其他资产：</span>
                <template v-for="item in arr">
                  <span :key="item.id">
                    {{ item.othreAssertType$FICDictName }}，
                    资产价值{{ item.othreAssertValue }}万元；<br>
                  </span>
                </template>
              </span>
            </span>
          </div>
          <div class="mt5" v-if="basicInformation.creditApplyFamlilyFinanceOutDTO">
            <div>2.负债</div>
            <div>
              银行贷款：{{ basicInformation.creditApplyFamlilyFinanceOutDTO.bankLoans }}万元，
              民间借贷：{{ basicInformation.creditApplyFamlilyFinanceOutDTO.privateLending }}万元，
              赊欠账款：{{ basicInformation.creditApplyFamlilyFinanceOutDTO.outstandingAccounts }}万元。
              <br>
              净资产：{{basicInformation.borrowerNetAssets || 0}}万元
            </div>
          </div>
        </div>
        <div>
          <div class="smallTitle">四、增信措施</div>
          <template v-if="!guaranteeCompanies.length && !personDetailRepList.length && !legalPersonDetailRepList.length && !mortgagesIsShow && !pledgeIsShow">
            <span>无</span>
          </template>
          <template v-else>
            <div class="mt5">
              1.担保公司：
              <template v-if="guaranteeCompanies.length">
                <span v-for="item in guaranteeCompanies" :key="item.id">{{ item.name }}</span>；
              </template>
              <span v-else>无</span>
            </div>
            <div class="mt5">
              <span>2.</span>
              <template v-if="personDetailRepList.length">
                <span v-for="(person, key) in personDetailRepList" :key="key">
                  <span>
                    担保人{{ person.personBaseRep.customerName }}，
                    {{ person.personBaseRep.age }}岁，
                    与借款人关系为{{ person.relationship$FICDictName }}；
                  </span>
                  <span v-if="person.finances">担保人资产：</span>
                  <span v-for="(arr, key) in person.finances" :key="key">
                    <span v-if="key === '1' || key === '2'">
                      <template v-for="item in arr">
                        <span :key="item.id">
                          {{ item.financeType$FICDictName }}，
                          地址：{{ item.housingProvince$FICDictName.split(',').join('') }}{{ item.housingAddress }}，
                          面积{{ item.housingArea }}㎡，
                          房产价值{{ item.housingValue }}万元；
                        </span>
                      </template>
                    </span>
                    <span v-if="key === '99'">
                      <span>其他资产：</span>
                      <template v-for="item in arr">
                        <span :key="item.id">
                          {{ item.othreAssertType$FICDictName }}，
                          资产价值{{ item.othreAssertValue }}万元；
                        </span>
                      </template>
                    </span>
                  </span>
                  <br>
                </span>
              </template>
              <span v-else>无</span>
            </div>
            <div class="mt5">
              <div>3.担保企业：</div>
              <template v-if="legalPersonDetailRepList.length">
                <div v-for="item in legalPersonDetailRepList" :key="item.id">
                  {{ item.organName ? item.organName : '无' }}，
                  <template v-if="item.finances.length">
                    企业总资产：{{ item.finances[0].totalAssets }}万元，
                    企业总负债：{{ item.finances[0].totalLiabilities }}万元，
                    营业收入：{{ item.finances[0].businessIncome }}万元，
                    营业成本：{{ item.finances[0].businessCost }}万元，
                    利润总额：{{ item.finances[0].totalProfit }}万元。
                  </template>
                </div>
              </template>
              <span v-else>无</span>
            </div>
            <div class="mt5">
              <div>4.抵押：</div>
              <template v-if="mortgagesIsShow">
                <div v-if="selfGuaranteeMortgages.length" v-for="item in selfGuaranteeMortgages" :key="item.id">
                  <Mortgage :data="item"></Mortgage>
                </div>
                <template v-if="personDetailRepList.length">
                  <div v-for="(person, key) in personDetailRepList" :key="key">
                    <div v-if="person.guaranteeMortgages.length" v-for="item in person.guaranteeMortgages" :key="item.id">
                      <Mortgage :data="item"></Mortgage>
                    </div>
                  </div>
                </template>
              </template>
              <span v-else>无</span>
            </div>
            <div class="mt5">
              <div>5.质押：</div>
              <template v-if="pledgeIsShow">
                <div v-if="selfGuaranteePledgeRepList.length" v-for="item in selfGuaranteePledgeRepList" :key="item.id">
                  <Pledge :data="item"></Pledge>
                </div>
                <template v-if="personDetailRepList.length">
                  <div v-for="(person, key) in personDetailRepList" :key="key">
                    <div v-if="person.guaranteePledgeRepList.length" v-for="item in person.guaranteePledgeRepList" :key="item.id">
                      <Pledge :data="item"></Pledge>
                    </div>
                  </div>
                </template>
              </template>
              <span v-else>无</span>
            </div>
          </template>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'CreditOpinion',
  components: {
    Mortgage: () => import('@/views/template/creditOpinion/mortgage'),
    Pledge: () => import('@/views/template/creditOpinion/pledge')
  },
  props: {
    dialogVisible: {
      type: Boolean
    },
    repData: {
      type: Object
    }
  },
  watch: {
    repData: {
      handler (val, oldVal) {
        this.reponseHandler(val)
      },
      deep: true // 深度观察监听
    }
  },
  data() {
    return {
      creditApplyCustomerInfoOutDTO: {},
      customerEnterpriseOutDTOList: [],
      basrc: {},
      apply: {},
      basicInformation: {},
      enhancementDetail: {},
      selfGuaranteeMortgages: [],
      selfGuaranteePledgeRepList: [],
      mortgagesIsShow: false,
      pledgeIsShow: false,
      guaranteeCompanies: {},
      legalPersonDetailRepList: [],
      personDetailRepList: [],
      basicInfoData: {},
      creditApplyPlant: {},
      plants: [],
      guarantee: [],
      coBorrower: {}
    }
  },
  mounted() {
  },
  methods: {
    reponseHandler(rep) {
      this.basicInfoData = rep.data.data
      this.basicInformation = rep.data.data.basicInformation ? rep.data.data.basicInformation : {}
      this.basrc = rep.data.data.basrc ? rep.data.data.basrc : {}
      this.creditApplyCustomerInfoOutDTO = rep.data.data.basicInformation.creditApplyCustomerInfoOutDTO ? rep.data.data.basicInformation.creditApplyCustomerInfoOutDTO : {}
      this.customerEnterpriseOutDTOList = rep.data.data.basicInformation.customerEnterpriseOutDTOList
        ? rep.data.data.basicInformation.customerEnterpriseOutDTOList
        : []
      this.enhancementDetail = rep.data.data.enhancementDetail ? rep.data.data.enhancementDetail : {}
      // 担保人列表
      this.personDetailRepList = this.enhancementDetail.personDetailRepList ? this.enhancementDetail.personDetailRepList : []
      this.personDetailRepList.forEach(item => {
        if (item.guaranteeMortgages && item.guaranteeMortgages.length) {
          this.mortgagesIsShow = true
        }
        if (item.guaranteePledgeRepList && item.guaranteePledgeRepList.length) {
          this.pledgeIsShow = true
        }
      })
      // 担保公司保证列表
      this.guaranteeCompanies = this.enhancementDetail.guaranteeCompanies ? this.enhancementDetail.guaranteeCompanies : []
      // 法人保证列表
      this.legalPersonDetailRepList = this.enhancementDetail.legalPersonDetailRepList ? this.enhancementDetail.legalPersonDetailRepList : []
      // 资产抵押列表
      this.selfGuaranteeMortgages = this.enhancementDetail.selfGuaranteeMortgages ? this.enhancementDetail.selfGuaranteeMortgages : []
      this.selfGuaranteeMortgages.length > 0 ? this.mortgagesIsShow = true : this.mortgagesIsShow = false
      // 资产质押列表
      this.selfGuaranteePledgeRepList = this.enhancementDetail.selfGuaranteePledgeRepList ? this.enhancementDetail.selfGuaranteePledgeRepList : []
      this.selfGuaranteePledgeRepList.length > 0 ? this.pledgeIsShow = true : this.pledgeIsShow = false
      this.creditApplyPlant = rep.data.data.creditApplyPlant ? rep.data.data.creditApplyPlant : {}
      this.plants = this.creditApplyPlant.plants
      this.plantInfoFun(this.plants)
      this.apply = rep.data.data.apply ? rep.data.data.apply : {}
      this.guarantee = []
      this.apply.relcustomerRiskOutVos.forEach(item => {
        if (item.riskTipsOutDTO.data) {
          if (item.authType === '2') {
            this.guarantee.push(item)
          }
          if (item.authType === '1') {
            this.coBorrower = item
          }
        }
      })
    },
    // 返回数据为YN的处理
    isYNHandler(v) {
      let val = ''
      if (v === 'Y') {
        val = '已'
      }
      if (v === 'N') {
        val = '未'
      }
      return val
    },
    isYOHandler(v) {
      let val = ''
      if (v === 'Y') {
        val = '新'
      }
      if (v === 'N') {
        val = '老'
      }
      return val
    },
    plantInfoFun(plants) {
      if (plants) {
        plants.forEach(item => {
          item.machineTypeDes = ''
          if (item.machineType) {
            if (item.machineType.includes('99')) {
              const re = /其他/gi
              item.machineTypeDes = item.machineType$FICDictName.replace(re, item.machineOtherInfo)
            } else {
              item.machineTypeDes = item.machineType$FICDictName
            }
          }
          if (item.disease) {
            if (item.disease.includes('99')) {
              const re1 = /其他/gi
              item.diseaseTypeDes = item.disease$FICDictName.replace(re1, item.diseaseOther)
            } else {
              item.diseaseTypeDes = item.disease$FICDictName
            }
          }
          if (item.cropsType === '2' && item.processingMode) {
            if (item.processingMode.includes('99')) {
              const re2 = /其他/gi
              item.processingModeDes = item.processingMode$FICDictName.replace(re2, item.processingModeOtherInfo)
            } else {
              item.processingModeDes = item.processingMode$FICDictName
            }
          }
          if (item.plantAreas) {
            item.plantAreas.forEach(subItem => {
              subItem.plantArea =
                subItem.plantAreaProvince$FICDictName +
                '-' +
                subItem.plantAreaCity$FICDictName +
                '-' +
                subItem.plantAreaCounty$FICDictName +
                '-' +
                subItem.plantAreaTown$FICDictName
              if (subItem.landRentStart && subItem.landRentStart.length > 0) {
                subItem.landRent = subItem.landRentStart + '至' + subItem.landRentEnd
              } else {
                subItem.landRent = ''
              }
              if (subItem.landNature !== '99') {
                subItem.landNatureDes = subItem.landNature$FICDictName
              } else {
                subItem.landNatureDes = subItem.landNatureOtherInfo
              }

              if (subItem.waterNature !== '99') {
                subItem.waterNatureDes = subItem.waterNature$FICDictName
              } else {
                subItem.waterNatureDes = subItem.waterNatureOtherInfo
              }
            })
          }
          if (item.plantInsuranceList) {
            item.plantInsuranceList.forEach(subItem => {
              if (subItem.insuranceCompanyCode !== '99') {
                subItem.insuranceCompanyDes = subItem.insuranceCompanyCode$FICDictName
              } else {
                subItem.insuranceCompanyDes = subItem.insuranceCompanyOther
              }
            })
          }
        })
      }
    },
    handleClose() {
      this.$emit('closeCreditOpinion')
    }
  }
}
</script>

<style lang="scss" scoped>
.opinionBody {
  max-height: 400px;
  overflow: auto;
  font-size: 14px;
  line-height: 24px;
  .title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
  .smallTitle {
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
  }
  .mt5 {
    margin-top: 5px;
  }
}
/*/deep/ .el-dialog {*/
  /*margin-bottom: 0;*/
/*}*/
</style>
