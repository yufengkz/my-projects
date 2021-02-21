/* 影像信息组件 */
<template>
  <div v-if="JSON.stringify(realImage) !== '{}' || flag" class="imageInfo">
    <el-row>
      <el-col :span="24">
        <div class="tabsLarge">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="业务信息影像资料" name="first">
              <el-tabs v-if="JSON.stringify(realImage) !== '{}'" tab-position="left">
                <el-tab-pane v-for="(item, key) in realImage" :key="key">
                  <span class="spanSlot" slot="label">{{ fileTypeEnum[key] }}</span>
                  <ImageUploadDetail :fileList="item"></ImageUploadDetail>
                </el-tab-pane>
              </el-tabs>
              <div class="noData" v-else>业务信息暂无影像</div>
            </el-tab-pane>
            <el-tab-pane label="增信信息影像资料" name="second">
              <template v-if="flag">
                <template v-if="loanImageRep.loanMortgageFiles" v-for="(item, index) in loanImageRep.loanMortgageFiles">
                  <div class="tabsCont" :key="index">
                    <div class="title">借款人,{{mortgageTypeEnum[index]}}抵押影像资料</div>
                    <div class="cont">
                      <el-tabs tab-position="left" v-for="(imageMap, key) in item" :key="key">
                        <el-tab-pane v-for="(itemChild, keyChild) in imageMap" :key="keyChild">
                          <span class="spanSlot" slot="label">{{ mortgageImage[keyChild] }}</span>
                          <ImageUploadDetail :fileList="itemChild"></ImageUploadDetail>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                </template>
                <template v-if="loanImageRep.loanPledgeFiles" v-for="(item, index) in loanImageRep.loanPledgeFiles">
                  <div class="tabsCont" :key="index">
                    <div class="title">借款人,{{pledgeTypeEnum[index]}}质押影像资料</div>
                    <div class="cont">
                      <el-tabs tab-position="left" v-for="(imageMap, key) in item" :key="key">
                        <el-tab-pane v-for="(itemChild, keyChild) in imageMap" :key="keyChild">
                          <span class="spanSlot" slot="label">{{ pledgeImage[keyChild] }}</span>
                          <ImageUploadDetail :fileList="itemChild"></ImageUploadDetail>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </div>
                </template>
                <template v-if="personImageReps" v-for="(itemPir, keyPir) in personImageReps">
                  <div :key="keyPir">
                    <template v-if="JSON.stringify(itemPir.personFiles) !== '{}'">
                      <div class="tabsCont">
                        <div class="title">担保人_{{formatGuarantee(keyPir)}},基本影像资料</div>
                        <div class="cont">
                          <el-tabs tab-position="left">
                            <el-tab-pane v-for="(item, key) in itemPir.personFiles" :key="key">
                              <span class="spanSlot" slot="label">{{ personImage[key] }}</span>
                              <ImageUploadDetail :fileList="item"></ImageUploadDetail>
                            </el-tab-pane>
                          </el-tabs>
                        </div>
                      </div>
                    </template>
                    <template v-if="itemPir.personMortgageFiles" v-for="(item, index) in itemPir.personMortgageFiles">
                      <div class="tabsCont" :key="index">
                        <div class="title">担保人_{{formatGuarantee(keyPir)}},{{mortgageTypeEnum[index]}}抵押</div>
                        <div class="cont">
                          <el-tabs tab-position="left" v-for="(imageMap, key) in item" :key="key">
                            <el-tab-pane v-for="(itemChild, keyChild) in imageMap" :key="keyChild">
                              <span class="spanSlot" slot="label">{{ mortgageImage[keyChild] }}</span>
                              <ImageUploadDetail :fileList="itemChild"></ImageUploadDetail>
                            </el-tab-pane>
                          </el-tabs>
                        </div>
                      </div>
                    </template>
                    <template v-if="itemPir.personPledgeFiles" v-for="(item, index) in itemPir.personPledgeFiles">
                      <div class="tabsCont" :key="index">
                        <div class="title">担保人_{{formatGuarantee(keyPir)}},{{pledgeTypeEnum[index]}}质押</div>
                        <div class="cont">
                          <el-tabs tab-position="left" v-for="(imageMap, key) in item" :key="key">
                            <el-tab-pane v-for="(itemChild, keyChild) in imageMap" :key="keyChild">
                              <span class="spanSlot" slot="label">{{ pledgeImage[keyChild] }}</span>
                              <ImageUploadDetail :fileList="itemChild"></ImageUploadDetail>
                            </el-tab-pane>
                          </el-tabs>
                        </div>
                      </div>
                    </template>
                  </div>
                </template>
                <div v-if="JSON.stringify(legalFiles) !== '{}'" class="tabsCont">
                  <div class="title">法人担保,基本影像资料</div>
                  <div class="classifyList">
                    <template v-for="(item, key) in legalFiles">
                      <div :class="['item', { active: classifyActive === key }]" :key="key" @click="claaifyClick(key)">
                        {{ legalImage[key] }}
                      </div>
                    </template>
                  </div>
                  <div class="imgList">
                    <template v-for="(item, key) in legalFiles">
                      <ImageUploadDetail :key="key" v-show="classifyActive === key" :fileList="item"></ImageUploadDetail>
                    </template>
                  </div>
                </div>
              </template>
              <div class="noData" v-else>增信信息暂无影像</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
  <div v-else>暂无影像</div>
</template>
<script>
import ImageUploadDetail from '@/components/ImageUpload/Detail'
export default {
  name: 'ImageInfo',
  components: {
    ImageUploadDetail
  },
  props: {
    realImageDtos: {
      type: Object
    },
    guarantee: {
      type: Array
    }
  },
  data() {
    return {
      activeName: 'first',
      realImage: {}, // 业务信息影像资料
      guaranteeImage: {}, // 增信信息影像资料
      loanImageRep: {}, // 借款人影像
      personImageReps: {}, // 担保人影像
      legalFiles: {}, // 担保法人基本影像
      fileTypeEnum: {
        1: '婚姻证明',
        2: '户口本',
        3: '银行流水',
        4: '耕作土地证明',
        5: '家庭资产证明',
        6: '家庭收入证明',
        7: '个人征信报告',
        8: '现场尽调合影',
        9: 'MAP技术服务合同',
        10: '定金交付凭据',
        11: '其他'
      },
      pledgeTypeEnum: {
        receivable_account: '应收账款',
        receivable_rent: '应收租金',
        legal_right: '法人股权'
      },
      mortgageTypeEnum: {
        // 抵押物二级类型
        house: '房产',
        build_land: '建设用地使用权',
        countryside_land: '农村土地',
        special_machine: '专用设备',
        agriculture_product: '农副产品',
        equipment: '机器设备',
        breed: '生物资产',
        land_contract: '农村土地承包经营权',
        forestry: '林权'
      },
      personImage: {
        // 担保人影像
        person_marriage_certificate: '婚姻证明',
        person_account_book: '户口本',
        person_bank_statement: '银行流水',
        person_family_assets: '家庭资产证明'
      },
      mortgageImage: {
        // 抵押物影像
        mortgage_file: '抵押物照片',
        mortgage_warrant: '权证照片',
        mortgage_receipt: '入押回执',
        mortgage_other_warrant: '他项权利证书照片',
        mortgage_contract_invoice: '购买合同及发票',
        mortgage_drive_license: '驾驶证照片',
        mortgage_buy_receipt: '购买凭证或自有凭证',
        mortgage_breed_insure: '生物资产投保证明'
      },
      pledgeImage: {
        // 质押物影像
        pledge_contract: '合同照片',
        pledge_receivable_receipt: '人行征信中心应收账款质押登记受理截图',
        pledge_other_warrant: '他项权利证书照片',
        pledge_license: '营业执照',
        pledge_receipt: '入押回执'
      },
      legalImage: {
        // 法人影像
        legal_company_constitution: '企业章程及变更决议',
        legal_id_card: '法人身份证',
        legal_controller_id_card: '实际控制人身份证',
        legal_shareholder_id_card: '股东身份证',
        legal_resolution: '同意担保股东/股东会（成员）决议',
        legal_marriage_certificate: '法人及配偶结婚证明',
        legal_verification_report: '企业验资报告',
        legal_controller_marriage_certificate: '实际控制人及配偶结婚证明',
        legal_group_photo: '金融经理及法定代表人合影',
        legal_scene_photo: '现场调查照片',
        legal_company_introduction: '企业简介',
        legal_account_details: '开户明细',
        legal_loan_details: '借贷明细',
        legal_guarantee_details: '担保明细',
        legal_credit_apply: '企业征信申请书',
        legal_investment_details: '投资明细',
        legal_trade_investment: '上下游交易明细',
        legal_month_report: '最新阅读财务报表',
        legal_year_report: '最近连续两年年度报告',
        legal_stock_details: '库存明细',
        legal_bank_statement: '银行流水',
        legal_company_credit_report: '企业征信查询授权书或《企业征信报告》',
        legal_credit_report: '法定代表人、实际控制人征信查询授权书或《详版人行个人征信报告》',
        legal_other: '其他',
        legal_guarantee_subject_report: '法人担保主体调查报告',
        legal_license: '营业执照'
      },
      classifyActive: 'qyzcjbgjy',
      fileList: [],
      loanMortgageFiles: {},
      loanPledgeFiles: {},
      flag: false
    }
  },
  watch: {
    realImageDtos: {
      handler(newVal, oldVal) {
        this.realImageDtosHandle(newVal)
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    this.realImageDtosHandle(this.realImageDtos)
  },
  methods: {
    realImageDtosHandle(v) {
      this.realImage = v.realImage ? v.realImage : {}
      this.guaranteeImage = v.guaranteeImage ? v.guaranteeImage : {}
      if (v.guaranteeImage) {
        this.loanImageRep = v.guaranteeImage.loanImageRep ? v.guaranteeImage.loanImageRep : {} // 借款人影像
        this.loanMortgageFiles = v.guaranteeImage.loanImageRep ? v.guaranteeImage.loanImageRep.loanMortgageFiles : {}
        this.loanPledgeFiles = v.guaranteeImage.loanImageRep ? v.guaranteeImage.loanImageRep.loanPledgeFiles : {}
        this.personImageReps = v.guaranteeImage.personFiles ? v.guaranteeImage.personFiles : [] // 担保人影像
        this.legalFiles = v.guaranteeImage.legalFiles ? v.guaranteeImage.legalFiles : {} // 担保法人基本影像
        if (this.legalFiles) {
          this.classifyActive = Object.keys(this.legalFiles)[0] ? Object.keys(this.legalFiles)[0] : ''
          this.fileList = this.legalFiles[this.classifyActive] ? this.legalFiles[this.classifyActive] : []
        }
        if (JSON.stringify(this.loanMortgageFiles) !== '{}' || JSON.stringify(this.loanPledgeFiles) !== '{}' || (JSON.stringify(this.personImageReps) !== '{}' && Object.keys(this.personImageReps).some(item => item !== '')) || JSON.stringify(this.legalFiles) !== '{}') {
          this.flag = true
        }
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    formatGuarantee(id) {
      const filter = this.guarantee.filter(element => {
        if (id === element.relatedCustomerId) {
          return element
        }
      })
      return filter[0] && filter[0].customerName
    },
    claaifyClick(v) {
      this.classifyActive = v
      this.fileList = this.legalFiles[v]
    }
  }
}
</script>
<style lang="scss" scoped>
.tabsLarge {
  position: relative;
  padding-left: 15px;
  color: #5a5a5a;
  .noData {
    font-size: 12px;
    // margin-left: 20px;
    padding-bottom: 16px;
  }
}
.tabsCont {
  padding-bottom: 15px;
  .title {
    font-size: 14px;
    color: #333;
    line-height: 40px;
  }
  .cont {
    min-height: 200px;
    padding: 10px 0;
    border: 1px solid #d7d7d7;
    .spanSlot {
      min-width: 260px;
      display: inline-block;
    }
  }
  .classifyList {
    display: flex;
    flex-wrap: wrap;
    .item {
      font-size: 12px;
      height: 34px;
      line-height: 32px;
      border: 1px solid #d7d7d7;
      padding: 0 15px;
      margin-right: 15px;
      margin-bottom: 15px;
      cursor: pointer;
      &.active {
        color: #08b448;
        border: 2px solid #08b448;
        height: 34px;
        line-height: 30px;
        padding: 0 14px;
      }
    }
  }
  .imgList {
    padding: 15px;
    border: 1px solid #d7d7d7;
  }
}
</style>
