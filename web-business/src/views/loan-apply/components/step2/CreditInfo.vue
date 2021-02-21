<template>
  <div>
    <!-- <el-tabs></el-tabs> -->
    <el-form
      ref="basicForm"
      :model="basicForm"
      :rules="basicFormRules"
      size="mini"
      class="m-t-20 p-l-10 block-el-select"
      label-position="right"
      label-width="140px"
    >
      <el-button size="mini" type="primary" @click="creditChooseDialogVisible = true">选择增信类型</el-button>
      <el-tabs v-model="activeName" @tab-remove="removeTab">
        <el-tab-pane v-if="personDetailRepListCount > 0" name="person" :closable="false">
          <span slot="label">
            <el-tag v-show="creditChooseData.mainType === 'person'" size="mini">主征信</el-tag>
            自然人保证
          </span>
          <el-tabs type="border-card" @tab-click="clickChangePerson" v-model="personTabsValue">
            <el-tab-pane v-for="(item, index) in personDetailRepList" :key="item.personBaseRep.mobile">
              <span slot="label">担保人{{ item.personBaseRep.customerName }}</span>
              <!-- 担保人一 -->
              <span class="all-subtitle">担保人基本信息</span>
              <DescriptionList class="m-t-20 m-l-20">
                <Description label="姓名">{{ item.personBaseRep.customerName }}</Description>
                <Description label="身份证号">{{ item.idNo }}</Description>
                <Description label="手机号">{{ item.personBaseRep.mobile }}</Description>
                <Description label="性别">{{ item.personBaseRep.sex | sexFilter }}</Description>
                <Description label="出生日期">{{ item.personBaseRep.birthday }}</Description>
                <Description label="民族">{{ item.personBaseRep.national }}</Description>
                <Description label="年龄">{{ item.personBaseRep.age }}</Description>
                <Description label="婚姻状况">{{ item.personBaseRep.marriage$FICDictName }}</Description>
                <Description label="户籍地址">{{ item.personBaseRep.censusRegisterAddress }}</Description>
                <Description label="配偶姓名" v-if="item.spouse && item.spouse.name">{{ item.spouse.name }}</Description>
                <Description label="配偶手机号" v-if="item.spouse && item.spouse.mobile">{{ item.spouse.mobile }}</Description>
                <Description label="配偶身份证号" v-if="item.spouse && item.spouse.idNo">{{ item.spouse.idNo }}</Description>
              </DescriptionList>
              <div v-if="index === 0">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item prop="highestEdu" label="最高学历:" label-width="75px">
                      <el-select v-model="basicForm.highestEdu" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in commonEnum.highestEduOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                    <el-col :span="15">
                      <el-form-item prop="familyAddress" label="住址:" label-width="145px">
                        <el-input v-model="basicForm.familyAddress" placeholder="请输入住址" maxlength="50"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-button type="primary" class="wide-button" size="mini" @click="handleSameAddress(index)">同户籍地址</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item v-if="!addressHidden" prop="liveLimitYear" label="居住年限:" label-width="75px">
                      <el-input v-model="basicForm.liveLimitYear" placeholder="居住年限" maxlength="2"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col class="text-right">
                    <el-button type="primary" class="wide-button" size="mini" @click="handleBorrowerInfo(index)">保存</el-button>
                  </el-col>
                </el-row>
              </div>
              <div v-else>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item prop="highestEdu1" label="最高学历:" label-width="75px">
                      <el-select v-model="basicForm.highestEdu1" placeholder="请选择" clearable>
                        <el-option
                          v-for="item in commonEnum.highestEduOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="18">
                    <el-col :span="15">
                      <el-form-item prop="familyAddress1" label="住址:" label-width="145px">
                        <el-input v-model="basicForm.familyAddress1" placeholder="请输入住址" maxlength="50"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-button type="primary" class="wide-button" size="mini" @click="handleSameAddress(index)">同户籍地址</el-button>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item v-if="!addressHidden1" prop="liveLimitYear1" label="居住年限:" label-width="75px">
                      <el-input v-model="basicForm.liveLimitYear1" placeholder="居住年限"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" class="text-right">
                    <el-button type="primary" class="wide-button" size="mini" @click="handleBorrowerInfo(index)">保存</el-button>
                  </el-col>
                </el-row>
              </div>
              <!-- 家庭年收入...等的tabs -->
              <span class="all-title span-tit"></span>

              <el-tabs v-model="activeNameChild" class="m-l-5">
                <el-tab-pane label="家庭年收入" name="firstChild">
                  <el-button
                    type="primary"
                    class="wide-button"
                    icon="el-icon-plus"
                    @click="guarantorIncomeDialogVisible = true"
                    size="mini"
                  >
                    添加收入
                  </el-button>
                  <FamilyIncomeTabs
                    :TableProp="item.familyIncomeListDTO"
                    :tabsLabel="incomeTabsLabel"
                    :TableLabel="incomeTableLabel"
                  ></FamilyIncomeTabs>
                </el-tab-pane>
                <el-tab-pane label="家庭负债" name="secondChild">
                  <el-tag>提示：若无相关负债金额，请填写"0"</el-tag>
                  <div v-if="index === 0">
                    <el-row class="m-t-30">
                      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="outstandingAccounts" label="赊欠账款:" label-width="80px">
                          <el-input
                            v-model="basicForm.outstandingAccounts"
                            placeholder="请输入"
                            min="0"
                            maxlength="11"
                            v-number-input.float="2"
                            @input="numberChange($event, 'outstandingAccounts', 99999999999)"
                            @change="numberChange($event, 'outstandingAccounts', 99999999999)"
                          >
                            <template slot="append">万元</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="privateLending" label="民间借贷:" label-width="80px">
                          <el-input
                            v-model="basicForm.privateLending"
                            placeholder="请输入"
                            min="0"
                            maxlength="11"
                            v-number-input.float="2"
                            @input="numberChange($event, 'privateLending', 99999999999)"
                            @change="numberChange($event, 'privateLending', 99999999999)"
                          >
                            <template slot="append">万元</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="bankLoans" label="银行贷款:" label-width="80px">
                          <el-input
                            v-model="basicForm.bankLoans"
                            placeholder="请输入"
                            min="0"
                            maxlength="11"
                            v-number-input.float="2"
                            @input="numberChange($event, 'bankLoans', 99999999999)"
                            @change="numberChange($event, 'bankLoans', 99999999999)"
                          >
                            <template slot="append">万元</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="text-right">
                        <el-button type="primary" class="wide-button" size="mini" @click="handleFamliyInfo(index)">保存</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <div v-else>
                    <el-row class="m-t-30">
                      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="outstandingAccounts1" label="赊欠账款:" label-width="80px">
                          <el-input
                            v-model="basicForm.outstandingAccounts1"
                            placeholder="请输入"
                            min="0"
                            maxlength="11"
                            v-number-input.float="2"
                            @input="numberChange($event, 'outstandingAccounts1', 99999999999)"
                            @change="numberChange($event, 'outstandingAccounts1', 99999999999)"
                          >
                            <template slot="append">万元</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="privateLending1" label="民间借贷:" label-width="80px">
                          <el-input
                            v-model="basicForm.privateLending1"
                            placeholder="请输入"
                            min="0"
                            maxlength="11"
                            v-number-input.float="2"
                            @input="numberChange($event, 'privateLending1', 99999999999)"
                            @change="numberChange($event, 'privateLending1', 99999999999)"
                          >
                            <template slot="append">万元</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
                        <el-form-item prop="bankLoans1" label="银行贷款:" label-width="80px">
                          <el-input
                            v-model="basicForm.bankLoans1"
                            placeholder="请输入"
                            min="0"
                            maxlength="11"
                            v-number-input.float="2"
                            @input="numberChange($event, 'bankLoans1', 99999999999)"
                            @change="numberChange($event, 'bankLoans1', 99999999999)"
                          >
                            <template slot="append">万元</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="text-right">
                        <el-button type="primary" class="wide-button" size="mini" @click="handleFamliyInfo(index)">保存</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="家庭财产状况" name="thirdChild">
                  <el-tag>提示：商品房、自建房客户至少填写一种</el-tag>
                  <br />
                  <el-button
                    type="primary"
                    class="wide-button m-t-30"
                    icon="el-icon-plus"
                    size="mini"
                    @click="guaranteeAddPossessions(index)"
                  >
                    添加财产
                  </el-button>
                  <FamilyPropertyTabs
                    :TableProp="item.finances"
                    :tabsLabel="propertyTabsLabel"
                    :TableLabel="propertyTableLabel"
                  ></FamilyPropertyTabs>
                </el-tab-pane>
              </el-tabs>
              <!-- end -->
              <el-divider></el-divider>
              <span class="m-t-30 all-title">影像信息</span>
              <ImageInfoTabs
                :tabsData="tabsData"
                :imageData="personDetailRepList[index].listMap"
                @updateChild="updateImageData"
              ></ImageInfoTabs>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane v-if="creditChooseData.checkedTypes.includes('legal_person')" name="legal_person" :closable="legal_personCloseable">
          <span slot="label">
            <el-tag v-show="creditChooseData.mainType === 'legal_person'" size="mini">主征信</el-tag>
            法人保证
          </span>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="机构名称:" prop="companyName" label-width="80px">
                <el-input v-model="basicForm.companyName" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" class="text-right">
              <el-form-item>
                <el-button type="primary" class="wide-button" icon="el-icon-search" size="mini" @click="searchGuarannteeLegalPerson">
                  搜索添加
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <div v-show="searchAddHidden == true">
            <el-divider></el-divider>
            <DescriptionList :content="legalPersonDetailRepList" class="m-l-20">
              <Description label="统一信用社会代码">{{ legalPersonDetailRepList.creditCode }}</Description>
              <Description label="法人姓名">{{ legalPersonDetailRepList.legalName }}</Description>
              <Description label="证件号码">{{ legalPersonDetailRepList.legalIdNo }}</Description>
              <Description label="注册地址">{{ legalPersonDetailRepList.registerAddress }}</Description>
              <Description label="机构名称">{{ legalPersonDetailRepList.organName }}</Description>
            </DescriptionList>
          </div>
        </el-tab-pane>
        <el-tab-pane v-if="creditChooseData.checkedTypes.includes('company')" name="company" :closable="companyCloseable">
          <span slot="label">
            <el-tag v-show="creditChooseData.mainType === 'company'" size="mini">主征信</el-tag>
            担保公司保证
          </span>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="选择担保公司:" prop="guaranteeCompany" label-width="100px">
                <el-select v-model="basicForm.guaranteeCompany" placeholder="请选择" clearable :disabled="productCompanyStatus">
                  <el-option v-for="item in companyOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12" class="text-right">
              <el-button type="primary" class="wide-button" size="mini" @click="handleGuaranteeInfo">保存</el-button>
            </el-col> -->
          </el-row>
        </el-tab-pane>
        <el-tab-pane v-if="creditChooseData.checkedTypes.includes('mortgage')" name="mortgage" :closable="mortgageCloseable">
          <span slot="label">
            <el-tag v-show="creditChooseData.mainType === 'mortgage'" size="mini">主征信</el-tag>
            资产抵押
          </span>
          <Transfer
            :TranData="mortgageTranData"
            :checkTranData="checkedMortgageTranData"
            :title="mortgageTitle"
            @addNewInfo="addNewInfo('mortgage')"
            @infoDetails="mortgageInfoDetails"
            @transferChange="mortgageTransferChange"
          ></Transfer>
          <MortgageInfoDialog
            :dialogVisible="mortgageInfoDialogVisible"
            dialogTitle="抵押信息"
            @dialogCancel="mortgageInfoDialogClose"
            @mortgageSaveInfo="mortgageSaveInfo"
            :outCheckSource="mortgageInfoData"
            :outOwerTypeSource="owerTypeSource"
            :cascaderOptions="this.areaEnum.list"
          ></MortgageInfoDialog>
          <MortgageTypeChooseDialog
            :dialogVisible="mortgageTypeChooseDialogVisible"
            dialogTitle="抵押信息类型选择"
            @dialogCancel="mortgageTypeChooseDialogClose"
            @mortgageTypeChooseSave="mortgageTypeChooseSave"
          ></MortgageTypeChooseDialog>
          <MortgageInfoDetailsDialog
            :dialogVisible="mortgageInfoDetailsDialogVisible"
            dialogTitle="抵押信息"
            @dialogCancel="mortgageInfoDetailsDialogClose"
            :outCheckSource="mortgageInfoDetailsData"
          ></MortgageInfoDetailsDialog>
        </el-tab-pane>
        <el-tab-pane v-if="creditChooseData.checkedTypes.includes('pledge')" name="pledge" :closable="pledgeCloseable">
          <span slot="label">
            <el-tag v-show="creditChooseData.mainType === 'pledge'" size="mini">主征信</el-tag>
            资产质押
          </span>
          <TransferPledge
            :TranData="pledgeTranData"
            :checkTranData="checkedPledgeTranData"
            :title="pledgeTitle"
            @addNewInfo="addNewInfo('pledge')"
            @infoDetails="pledgeInfoDetails"
            @transferChange="pledgeTransferChange"
          ></TransferPledge>
          <PledgeInfoDialog
            :dialogVisible="pledgeInfoDialogVisible"
            dialogTitle="质押信息"
            @dialogCancel="pledgeInfoDialogClose"
            @pledgeSaveInfo="pledgeSaveInfo"
            :outCheckSource="pledgeInfoData"
            :outOwerTypeSource="owerTypeSource"
            :cascaderOptions="commonEnum.contractTypeOptions"
          ></PledgeInfoDialog>
          <PledgeTypeChooseDialog
            :dialogVisible="pledgeTypeChooseDialogVisible"
            dialogTitle="质押信息类型选择"
            @dialogCancel="pledgeTypeChooseDialogClose"
            @pledgeTypeChooseSave="pledgeTypeChooseSave"
          ></PledgeTypeChooseDialog>
          <PledgeInfoDetailsDialog
            :dialogVisible="pledgeInfoDetailsDialogVisible"
            dialogTitle="质押信息"
            @dialogCancel="pledgeInfoDetailsDialogClose"
            :outCheckSource="pledgeInfoDetailsData"
          ></PledgeInfoDetailsDialog>
        </el-tab-pane>
      </el-tabs>
      <!-- 保存基本信息 -->
      <el-row v-show="showCreditSaveButton" class="m-t-20">
        <el-col :span="24" class="text-right">
          <el-button type="primary" class="wide-button" size="small" @click="$store.dispatch('ToggleToastFlag', true), HandleCreditInfo()">保存增信信息</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </el-form>
    <CreditTypeChooseDialog
      :dialogVisible="creditChooseDialogVisible"
      dialogTitle="增信类型"
      @dialogCancel="creditChooseDialogClose"
      :outCheckSource="creditChooseData"
      @creditSave="creditChooseSave"
    ></CreditTypeChooseDialog>
    <!-- 搜索添加 弹窗-->
    <el-dialog
      title="添加法人保证增信"
      :visible.sync="searchAddDialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
      width="480"
    >
      <DescriptionList class="m-t-20">
        <Description label="法人姓名">{{ searchLegalPersonDetailRepList.legalName || '' }}</Description>
        <Description label="证件号码">{{ searchLegalPersonDetailRepList.legalIdNo || '' }}</Description>
        <Description label="统一社会信用代码">{{ searchLegalPersonDetailRepList.creditCode || '' }}</Description>
        <Description label="机构名称">{{ searchLegalPersonDetailRepList.organName || '' }}</Description>
        <Description label="注册地址">{{ searchLegalPersonDetailRepList.registerAddress || '' }}</Description>
      </DescriptionList>
      <div slot="footer" class="dialog-footer">
        <el-row>
          <el-button size="mini" type="primary" class="wide-button" @click="handleFixAdd">确定添加增信</el-button>
        </el-row>
      </div>
    </el-dialog>
    <GuarantorIncomeDialog
      v-if="personDetailRepListCount > 0"
      :dialogVisible="guarantorIncomeDialogVisible"
      dialogTitle="家庭年收入"
      @dialogCancel="guarantorIncomeDialogClose"
      :personId="currentPersonDetails.id || 0"
      :outCheckSource="guarantorIncomeData"
      :outOptions="{
        outCropTypeOptions: commonEnum.plantingCropTypeOptions,
        outMachineTypeOptions: commonEnum.agriculturalMachineryTypeOptions
      }"
      @failyIncomeSave="failyIncomeSave"
    ></GuarantorIncomeDialog>
    <GuarantorPossessionsDialog
      :dialogVisible="guarantorPossessionsDialogVisible"
      dialogTitle="家庭财产状况"
      @dialogCancel="guarantorPossessionsDialogClose"
      :outCheckSource="guarantorPossessionsData"
      :cascaderOptions="this.areaEnum.list"
      :outOtherpossessionsOptions="this.commonEnum.assertTypeOptions"
      :outHouseStructuralOptions="this.commonEnum.housingStructureOptions"
      @fuarantorPossessionsSave="fuarantorPossessionsSave"
      :ids="guarantorInfo"
    ></GuarantorPossessionsDialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { handelDigital } from '@/utils/format.js'
import {
  getAvailabelMortgageList,
  getAvailabelPledgeList,
  getGuaranteeMortgageList,
  getGuaranteePledgeList,
  getCreditAppleRelciustomer
} from '@/api/business-common'
import {
  getGuaranteePersonCreditApplyInfo,
  getGuaranteePersonDetailInfo,
  getCreditGuaranteeLegalPersonLegalPerson,
  getCreditGuaranteeCompanyList,
  saveGuaranteePersonBaseInfo,
  saveGuaranteePersonFamilyLiabilitites,
  // creditApplyDelGuaranteeForm,
  creditApplyUpdateMajorGuarantee,
  creditApplySaveGuaranteeeAllInfo,
  creditApplyGuaranteePersonBetchSaveFileInfo,
  getOrderCreditApplyInfoProductInfo
} from '@/api/loan-apply'
// import { getLegalImageList } from '@/api/cosigner-manage'
export default {
  name: 'LoanApplyStep2CreditInfo',
  filters: {
    sexFilter(val) {
      return val === '1' ? '男' : '女'
    }
  },
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    ImageInfoTabs: () => import('@/components/ImageInfoTabs'),
    Transfer: () => import('@/components/Transfer'),
    TransferPledge: () => import('@/components/TransferPledge'),
    MortgageInfoDialog: () => import('@/components/MortgageInfoDialog'),
    CreditTypeChooseDialog: () => import('@/components/CreditTypeChooseDialog.vue'),
    GuarantorIncomeDialog: () => import('@/components/GuarantorIncomeDialog'),
    MortgageInfoDetailsDialog: () => import('@/components/MortgageInfoDetailsDialog'),
    MortgageTypeChooseDialog: () => import('@/components/MortgageTypeChooseDialog'),
    PledgeInfoDialog: () => import('@/components/PledgeInfoDialog'),
    PledgeInfoDetailsDialog: () => import('@/components/PledgeInfoDetailsDialog'),
    PledgeTypeChooseDialog: () => import('@/components/PledgeTypeChooseDialog'),
    GuarantorPossessionsDialog: () => import('@/components/GuarantorPossessionsDialog'),
    FamilyIncomeTabs: () => import('@/components/familyIncomeTabs'),
    FamilyPropertyTabs: () => import('@/components/familyPropertyTabs')
  },
  computed: {
    ...mapGetters(['commonEnum', 'areaEnum', 'guanranteeEnum'])
  },
  watch: {
    // 监听 地址
    'basicForm.familyAddress': {
      handler(val, oldVal) {
        if (this.basicForm.familyAddress === this.personDetailRepList[0].personBaseRep.censusRegisterAddress) {
          this.addressHidden = true
          this.basicForm.liveLimitYear = ''
        } else {
          this.addressHidden = false
        }
      },
      deep: true
    },
    // 担保人二
    'basicForm.familyAddress1': {
      handler(val, oldVal) {
        if (this.basicForm.familyAddress1 === this.personDetailRepList[1].personBaseRep.censusRegisterAddress) {
          this.addressHidden1 = true
          this.basicForm.liveLimitYear1 = ''
        } else {
          this.addressHidden1 = false
        }
      },
      deep: true
    }
  },
  data() {
    const validateLiveYear = (rule, value, callback) => {
      if (value !== this.personDetailRepList[0].personBaseRep.censusRegisterAddress) {
        if (value === '') {
          callback(new Error('请输入居住年限'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const validateLiveYear1 = (rule, value, callback) => {
      if (value !== this.personDetailRepList[1].personBaseRep.censusRegisterAddress) {
        if (value === '') {
          callback(new Error('请输入居住年限'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      addressHidden: false,
      addressHidden1: false,
      orderNo: '',
      customerId: '',
      activeName: 'person',
      activeNameChild: 'firstChild',
      // 当前自然人
      currentPersonIndex: 0,
      // 权属
      owerTypeSource: [],
      personTabsValue: '',
      // 自然担保人数量
      personDetailRepListCount: 0,
      // 当前自然人
      currentPersonDetails: {},
      // 自然人保证
      personDetailRepList: [],
      // 搜索到的法人信息
      searchLegalPersonDetailRepList: {},
      // 法人保证
      legalPersonDetailRepList: {},
      // 资产抵押列表
      guaranteePledgeRepList: [],
      guarantorInfo: {},
      /**
       * 选择增信方式
       */
      creditChooseDialogVisible: false,
      // 是否显示保存增信按钮
      showCreditSaveButton: false,
      creditChooseData: {
        haveNatural: false, // 是否有自然人保证
        productCompanyStatus: false, // 产品是否绑定农担公司 如果绑定农担公司 不可以修改主征信
        checkedTypes: [],
        mainType: ''
      },
      // 产品是否绑定农担公司
      productCompanyStatus: false,
      legal_personCloseable: true,
      companyCloseable: true,
      mortgageCloseable: true,
      pledgeCloseable: true,
      /**
       * breedCreateDTOS 养殖收入列表
       * businessCreateDTOS 经商收入列表
       * machineryCreateDTOS 农机服务收入列表
       * plantCreateDTOS 种植收入列表
       * salaryCreateDTOS 固定工资收入列表
       * subsidiesCreateDTOS 政府补贴收入列表
       * workingCreateDTOS 打工收入列表
       *
       *  // 农机服务收入
      agriculturalData: [],
      // 种植收入
      growIncomeData: [],
      // 养殖收入
      cultivateData: [],
      // 经商收入
      businessData: [],
      // 打工收入
      workIncomeData: [],
      // 固定工资
      basicSalaryData: [],
      // 政府补贴
      governmentSubsidiesData: [],
       */
      guarantorIncomeData: {
        agriculturalData: [],
        growIncomeData: [],
        cultivateData: [],
        businessData: [],
        workIncomeData: [],
        basicSalaryData: [],
        governmentSubsidiesData: []
      },
      /** 抵押相关 */
      mortgageInfoDialogVisible: false,
      mortgageTypeChooseDialogVisible: false,
      mortgageInfoDetailsDialogVisible: false,
      mortgageInfoData: {},
      mortgageInfoDetailsData: {},
      pledgeInfoDetailsData: {},
      // mortgageTypeChooseData: [],
      /**
       * 质押相关
       */
      pledgeInfoDialogVisible: false,
      pledgeTypeChooseDialogVisible: false,
      pledgeInfoDetailsDialogVisible: false,
      pledgeInfoData: {},
      basicForm: {
        highestEdu: '',
        familyAddress: '',
        liveLimitYear: '',
        highestEdu1: '',
        familyAddress1: '',
        liveLimitYear1: '',
        outstandingAccounts: '',
        privateLending: '',
        bankLoans: '',
        outstandingAccounts1: '',
        privateLending1: '',
        bankLoans1: '',
        guaranteeCompany: '' // 担保公司
      },
      basicFormRules: {
        highestEdu: [{ required: true, message: '请选择最高学历', trigger: 'change' }],
        familyAddress: [{ required: true, message: '请录入住址', trigger: 'blur' }],
        liveLimitYear: [{ required: true, validator: validateLiveYear, trigger: 'blur' }],
        highestEdu1: [{ required: true, message: '请选择最高学历', trigger: 'change' }],
        familyAddress1: [{ required: true, message: '请录入住址', trigger: 'blur' }],
        liveLimitYear1: [{ required: true, validator: validateLiveYear1, trigger: 'blur' }],
        outstandingAccounts: [{ required: true, message: '请录入赊账欠款', trigger: 'blur' }],
        privateLending: [{ required: true, message: '请录入民间借贷', trigger: 'blur' }],
        bankLoans: [{ required: true, message: '请录入银行贷款', trigger: 'blur' }],
        outstandingAccounts1: [{ required: true, message: '请录入赊账欠款', trigger: 'blur' }],
        privateLending1: [{ required: true, message: '请录入民间借贷', trigger: 'blur' }],
        bankLoans1: [{ required: true, message: '请录入银行贷款', trigger: 'blur' }],
        guaranteeCompany: [{ required: true, message: '请选择担保公司', trigger: 'change' }]
      },
      companyOptions: [],
      tabsData: [
        {
          code: 'person_marriage_certificate',
          tabName: '婚姻证明'
        },
        {
          code: 'person_account_book',
          tabName: '户口本'
        },
        {
          code: 'person_bank_statement',
          tabName: '银行流水'
        },
        {
          code: 'person_family_assets',
          tabName: '家庭资产证明'
        }
      ],
      imageData: {},
      // 穿梭框组件 抵押 数据信息
      mortgageTranData: [],
      checkedMortgageTranData: [],
      mortgageTitle: ['全部未占用抵押信息', '增信抵押信息'],
      // 穿梭框组件 质押 数据信息
      pledgeTranData: [],
      checkedPledgeTranData: [],
      pledgeTitle: ['全部未占用质押信息', '增信质押信息'],
      // 担保人家庭财产状况
      guarantorPossessionsData: {
        commercialBuildingsData: [],
        homeBuildingData: [],
        otherPossessionsData: []
      },
      guarantorIncomeDialogVisible: false,
      guarantorPossessionsDialogVisible: false,
      searchAddDialogVisible: false,
      searchAddHidden: false,
      familyPropertyData: [],
      /**
       * eg: 这个是 tabs 里面label的名字，incomeTabsLabel 与 incomeTableLabel
       * 是相对应的 例如：i 是  "种植" ，对应的就是 incomeTableLabel 里面的 ‘plantLabel’
       * 与基本信息页面是一样的
       */
      incomeTabsLabel: {
        i: '种植',
        a: '农机服务',
        c: '养殖',
        b: '经商',
        d: '打工',
        e: '固定工资',
        g: '政府补贴收入'
      }, // 家庭收入表格 的tabs的标题
      incomeTableLabel: {
        plantLabel: {
          a: '作物类型',
          b: '种植面积(亩)',
          c: '年收入金额(万元)'
        },
        farmingServiceLabel: {
          a: '服务类型',
          b: '农机数量',
          c: '服务面积(亩/农机)',
          d: '收入金额(万/农机)'
        },
        breedLabel: {
          a: '养殖种类',
          b: '养殖数量',
          c: '年收入金额(万元)'
        },
        businessLabel: {
          a: '经商项目',
          b: '年收入金额(万元)'
        },
        WorkingLabel: {
          a: '打工人数',
          b: '工作内容',
          c: '打工地区',
          d: '收入金额(万元/人)'
        },
        fixedWageLabel: {
          a: '工作单位',
          b: '工作年限',
          c: '年收入金额(万元)'
        },
        basicExpendLabel: {
          a: '基本生活支出(万元)',
          b: '大病医疗支出金额(万元)',
          c: '婚丧嫁娶支出金额(万元)'
        },

        subsidyLabel: {
          a: '是否领取政府低保',
          b: '补贴内容',
          c: '年补贴金额(万元)'
        }
      },
      // 同基本信息页面
      propertyTabsLabel: {
        a: '商品房',
        b: '自建房',
        c: '其他资产'
      }, // 家庭财产状况
      propertyTableLabel: {
        commodityHouse: {
          a: '房产地址',
          b: '详细地址',
          c: '房产面积(㎡)',
          d: '房产价值(万)'
        },
        buildHouse: {
          a: '房产地址',
          b: '详细地址',
          c: '房屋结构',
          d: '房产面积(㎡)',
          e: '房产价值(万)'
        },
        otherAssets: {
          a: '选择资产类型',
          b: '房产价值(万)'
        }
      }
    }
  },
  mounted() {
    this.orderNo = this.$route.query.orderNo
    this.customerId = this.$route.query.customerId
    this.getGuaranteePersonCreditApplyInfo()
    this.getCreditGuaranteeCompanyList()
    this.getGuaranteeMortgageListFun()
    this.getGuaranteePledgeListFun()
    this.getOrderCreditApplyInfoProductInfoFun()
    this.getCreditAppleRelciustomer({ orderNo: this.orderNo })
    // getLegalImageList(7).then(res => {
    //   if (res.status === 200) {
    //     this.imageData = res.data.fileMap
    //   } else {
    //     this.$message.error(res.message || '获取影像资料信息失败')
    //   }
    // })
  },
  methods: {
    /**
     * 查询产品是否绑定农担公司
     */
    getOrderCreditApplyInfoProductInfoFun() {
      getOrderCreditApplyInfoProductInfo({ orderNo: this.orderNo }).then(res => {
        if (res.status === 200) {
          if (res.data && res.data.guaranteeFlag === 'Y') {
            this.productCompanyStatus = true
          } else {
            this.productCompanyStatus = false
          }
          this.creditChooseData.productCompanyStatus = this.productCompanyStatus
        }
      })
    },
    /**
     * 查询担保公司
     */
    getCreditGuaranteeCompanyList() {
      getCreditGuaranteeCompanyList().then(res => {
        if (res.status === 200) {
          this.companyOptions = res.data
        }
      })
    },
    /**
     * 根据机构名称查询法人保证
     */
    searchGuarannteeLegalPerson() {
      if (this.basicForm.companyName) {
        getCreditGuaranteeLegalPersonLegalPerson({ organName: this.basicForm.companyName }).then(res => {
          if (res.status === 200) {
            if (res.data && res.data !== null && res.data !== undefined) {
              this.searchLegalPersonDetailRepList = res.data || {}
              this.searchAddDialogVisible = true
            } else {
              this.$message.error('未查询到相关信息')
            }
          } else {
            this.$message.error(res.message || '查询失败，请稍后重试')
          }
        })
      } else {
        this.$message.warning('请输入机构名称')
      }
    },
    // 查询增信信息
    /**
     * personDetailRepList 自然人保证
     *
     * { code: 'person', value: '自然人保证' },
     *  { code: 'legal_person', value: '法人保证' },
     * { code: 'company', value: '担保公司担保' },
     * { code: 'mortgage', value: '资产抵押' },
     * { code: 'pledge', value: '资产质押' }
     */
    getGuaranteePersonCreditApplyInfo() {
      getGuaranteePersonCreditApplyInfo(this.orderNo).then(res => {
        if (res.status === 200) {
          // 判断是否默认显示法人保证 担保公司保证 资产抵押 资产质押
          // 是否含有担保法人
          this.creditChooseData.mainType = res.data.majorGuaranteeType
          this.activeName = this.creditChooseData.mainType
          if (res.data.legalPersonList.length > 0) {
            this.creditChooseData.checkedTypes.push('legal_person')
            this.searchAddHidden = true
            this.legalPersonDetailRepList = res.data.legalPersonList[0]
          }
          // 是否含有担保公司
          if (res.data.companyList.length > 0) {
            this.creditChooseData.checkedTypes.push('company')
            this.basicForm.guaranteeCompany = res.data.companyList[0].id
          }
          // 是否含有抵押物列表
          if (res.data.mortgageList.length > 0) {
            this.creditChooseData.checkedTypes.push('mortgage')
          }
          // 是否含有质押物列表
          if (res.data.pledgeList.length > 0) {
            this.creditChooseData.checkedTypes.push('pledge')
          }
          if (
            res.data.personList.length > 0 ||
            res.data.legalPersonList.length > 0 ||
            res.data.companyList.length > 0 ||
            res.data.mortgageList.length > 0 ||
            res.data.pledgeList.length > 0
          ) {
            this.showCreditSaveButton = true
          } else {
            this.showCreditSaveButton = false
          }
          if (res.data.personList) {
            this.personDetailRepListCount = res.data.personList.length
            this.creditChooseData.haveNatural = this.personDetailRepListCount > 0
            if (res.data.personList.length > 0) {
              for (let index = 0; index < res.data.personList.length; index++) {
                const subInfo = res.data.personList[index]
                this.currentPersonIndex = 0
                this.getGuaranteePersonDetailInfoFun(subInfo.applyNo, index, true)
              }
            }
          }

          this.tabClosable()
          this.getAvailabelMortgageListFun(res.data.personList)
          this.getAvailabelPledgeListFun(res.data.personList)
        } else {
          this.$message.error(res.message || '查询失败，请稍后重试')
        }
      })
    },
    /**
     * 担保人详情
     * applyNo申请编号
     *
     */
    getGuaranteePersonDetailInfoFun(val, index, createStatus) {
      getGuaranteePersonDetailInfo({ applyNo: val }).then(res => {
        if (res.status === 200) {
          if (createStatus === true) {
            this.personDetailRepList.push(res.data)
          } else {
            this.$set(this.personDetailRepList, index, res.data)
          }
          // 最多两个自然人担保
          // if (index + 1 > this.personDetailRepList.length) {
          //   this.personDetailRepList.push(res.data)
          // } else {
          //   this.$set(this.personDetailRepList, index, res.data)
          //   // this.personDetailRepList[index] = res.data
          // }
          if (index === this.currentPersonIndex && this.personDetailRepList) {
            this.currentPersonDetails = this.personDetailRepList[this.currentPersonIndex]
            this.guarantorIncomeData.agriculturalData =
              this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.machineryCreateDTOS || []
            this.guarantorIncomeData.growIncomeData =
              this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.plantCreateDTOS || []
            this.guarantorIncomeData.cultivateData =
              this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.breedCreateDTOS || []
            this.guarantorIncomeData.businessData =
              this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.businessCreateDTOS || []
            this.guarantorIncomeData.workIncomeData =
              this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.workingCreateDTOS || []
            this.guarantorIncomeData.basicSalaryData =
              this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.salaryCreateDTOS || []
            this.guarantorIncomeData.governmentSubsidiesData = this.personDetailRepList[
              this.currentPersonIndex
            ].familyIncomeListDTO.subsidiesCreateDTOS.map(item => {
              // item.governmentSubsidyFlag = this.$store.state.app.commonEnum.authFlag[item.governmentSubsidyFlag]
              this.$store.state.app.commonEnum.authFlagOptions &&
                this.$store.state.app.commonEnum.authFlagOptions.map(v => {
                  if (v.label === item.governmentSubsidyFlag$FICDictName) {
                    item.governmentSubsidyFlag = v.value
                  }
                })
              return item
            })
            if (this.personDetailRepList[this.currentPersonIndex].finances) {
              const allKeys = Object.keys(this.personDetailRepList[this.currentPersonIndex].finances)
              if (allKeys.includes('1')) {
                this.guarantorPossessionsData.commercialBuildingsData = this.personDetailRepList[this.currentPersonIndex].finances['1']
              } else {
                this.guarantorPossessionsData.commercialBuildingsData = []
              }
              if (allKeys.includes('2')) {
                this.guarantorPossessionsData.homeBuildingData = this.personDetailRepList[this.currentPersonIndex].finances['2']
              } else {
                this.guarantorPossessionsData.homeBuildingData = []
              }
              if (allKeys.includes('99')) {
                this.guarantorPossessionsData.otherPossessionsData = this.personDetailRepList[this.currentPersonIndex].finances['99']
              } else {
                this.guarantorPossessionsData.otherPossessionsData = []
              }
            }
          }
          if (this.personDetailRepList.length === 1) {
            if (this.personDetailRepList[0].liabilities && this.personDetailRepList[0].liabilities.length > 0) {
              this.basicForm.outstandingAccounts = this.personDetailRepList[0].liabilities[0].outstandingAccounts
              this.basicForm.privateLending = this.personDetailRepList[0].liabilities[0].privateLending
              this.basicForm.bankLoans = this.personDetailRepList[0].liabilities[0].bankLoans
            }
            this.basicForm.familyAddress = this.personDetailRepList[0].personBaseRep.familyAddress
            this.basicForm.liveLimitYear = this.personDetailRepList[0].personBaseRep.liveLimitYear
            this.basicForm.highestEdu = this.personDetailRepList[0].personBaseRep.highestEdu
          } else if (this.personDetailRepList.length === 2) {
            if (this.personDetailRepList[0].liabilities && this.personDetailRepList[0].liabilities.length > 0) {
              this.basicForm.outstandingAccounts = this.personDetailRepList[0].liabilities[0].outstandingAccounts
              this.basicForm.privateLending = this.personDetailRepList[0].liabilities[0].privateLending
              this.basicForm.bankLoans = this.personDetailRepList[0].liabilities[0].bankLoans
            }
            this.basicForm.familyAddress = this.personDetailRepList[0].personBaseRep.familyAddress
            this.basicForm.liveLimitYear = this.personDetailRepList[0].personBaseRep.liveLimitYear
            this.basicForm.highestEdu = this.personDetailRepList[0].personBaseRep.highestEdu
            if (this.personDetailRepList[1].liabilities && this.personDetailRepList[1].liabilities.length > 0) {
              this.basicForm.outstandingAccounts1 = this.personDetailRepList[1].liabilities[0].outstandingAccounts
              this.basicForm.privateLending1 = this.personDetailRepList[1].liabilities[0].privateLending
              this.basicForm.bankLoans1 = this.personDetailRepList[1].liabilities[0].bankLoans
            }
            this.basicForm.familyAddress1 = this.personDetailRepList[1].personBaseRep.familyAddress
            this.basicForm.liveLimitYear1 = this.personDetailRepList[1].personBaseRep.liveLimitYear
            this.basicForm.highestEdu1 = this.personDetailRepList[1].personBaseRep.highestEdu
          }
        } else {
          this.$message.error(res.message || '查询失败，请稍后重试')
        }
      })
    },

    /**
     * 未使用担保物列表
     */
    getAvailabelMortgageListFun(val) {
      var obj = []
      val.forEach(item => {
        obj.push(item.id)
      })
      getAvailabelMortgageList({ guaranteePersonIds: obj.toString(), loanPersonId: this.customerId }).then(res => {
        if (res.status === 200) {
          this.mortgageTranData.push(
            ...res.data.map(item => {
              item.label = item.createTime
              item.key = item.id
              return item
            })
          )
        } else {
          this.$message.error(res.message || '查询失败，请稍后重试')
        }
      })
    },
    /**
     * 已关联担保物列表
     */
    getGuaranteeMortgageListFun() {
      getGuaranteeMortgageList({ orderNo: this.orderNo }).then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            item.label = item.createTime
            item.key = item.id
            this.mortgageTranData.push(item)
            this.checkedMortgageTranData.push(item.key)
          })
        }
      })
    },
    /**
     * 已关联质押物
     */
    getGuaranteePledgeListFun() {
      getGuaranteePledgeList({ orderNo: this.orderNo }).then(res => {
        if (res.status === 200) {
          res.data.forEach(item => {
            item.label = item.createTime
            item.key = item.id
            this.pledgeTranData.push(item)
            this.checkedPledgeTranData.push(item.key)
          })
        }
      })
    },
    /**
     * 未使用质押列表
     */
    getAvailabelPledgeListFun(val) {
      var obj = []
      val.forEach(item => {
        if (item.id) {
          obj.push(item.id)
        }
      })
      getAvailabelPledgeList({ guaranteePersonIds: obj, loanPersonId: this.customerId }).then(res => {
        if (res.status === 200) {
          // this.$message.success('查询')
          this.pledgeTranData.push(
            ...res.data.map(item => {
              item.label = item.createTime
              item.key = item.id
              return item
            })
          )
        } else {
          this.$message.error(res.message || '查询失败，请稍后重试')
        }
      })
    },
    /**
     * 删除增信信息
     */
    creditApplyDelGuaranteeFormFun(val) {
      // var params = {}
      // if (val === 'legal_person') {
      //   params = {
      //     guaranteeType: val,
      //     orderNo: this.orderNo,
      //     foreignIds: [this.personDetailRepList.id]
      //   }
      // } else if (val === 'company') {
      //   params = {
      //     guaranteeType: val,
      //     orderNo: this.orderNo,
      //     foreignIds: [this.basicForm.guaranteeCompany]
      //   }
      // } else if (val === 'mortgage') {
      //   params = {
      //     guaranteeType: val,
      //     orderNo: this.orderNo,
      //     foreignIds: this.checkedMortgageTranData
      //   }
      // } else if (val === 'pledge') {
      //   params = {
      //     guaranteeType: val,
      //     orderNo: this.orderNo,
      //     foreignIds: this.checkedPledgeTranData
      //   }
      // }
      // if (params.foreignIds.length > 0) {
      // creditApplyDelGuaranteeForm(params).then(res => {
      //   if (res.status === 200) {
      //     this.creditChooseData.checkedTypes.forEach(function(item, index, arr) {
      //       if (item === val) {
      //         arr.splice(index, 1)
      //       }
      //     })
      //   } else {
      //     this.$message.error(res.message || '删除失败，请稍后重试')
      //   }
      // })
      // } else {
      this.creditChooseData.checkedTypes.forEach(function(item, index, arr) {
        if (item === val) {
          arr.splice(index, 1)
        }
      })
      // }
    },
    /**
     * 更新主征信
     */
    creditApplyUpdateMajorGuaranteeFun(val) {
      creditApplyUpdateMajorGuarantee({ orderNo: this.orderNo, guaranteeType: val }).then(res => {
        if (res.status === 200) {
          this.creditChooseData.mainType = val
        } else {
          // this.$message.error(res.message || '更新失败，请稍后重试')
        }
      })
    },
    /**
     * 增信保存
     */
    creditApplySaveGuaranteeeAllInfoFun() {
      // var params = {}
      let changeEnabel = false
      let hasDatas = true // 有任何一条数据
      if (this.creditChooseData.mainType === 'person' && this.personDetailRepList.length > 0) {
        changeEnabel = true
      } else if (
        this.creditChooseData.mainType === 'legal_person' &&
        this.legalPersonDetailRepList &&
        this.legalPersonDetailRepList.creditCode &&
        this.legalPersonDetailRepList.creditCode.length > 0
      ) {
        changeEnabel = true
      } else if (
        this.creditChooseData.mainType === 'company' &&
        this.basicForm.guaranteeCompany &&
        this.basicForm.guaranteeCompany.length > 0
      ) {
        changeEnabel = true
      } else if (this.creditChooseData.mainType === 'mortgage' && this.checkedMortgageTranData.length > 0) {
        changeEnabel = true
      } else if (this.creditChooseData.mainType === 'pledge' && this.checkedPledgeTranData.length > 0) {
        changeEnabel = true
      }
      // 如果全部数据为空 则可以提交
      if (this.creditChooseData.checkedTypes) {
        hasDatas = false
      }

      if (!changeEnabel && hasDatas) {
        this.$store.dispatch('ToggleToastFlag', true)
        return this.$message.error('请添加主增信数据')
      }

      var array = []
      // 处理保存数据
      if (this.personDetailRepList.length > 0 && this.creditChooseData.haveNatural === true) {
        const obj = this.personDetailRepList.map(item => {
          return { foreignId: item.id }
        })
        array.push({
          guaranteeType: 'person',
          majorGuarantee: this.creditChooseData.mainType === 'person' ? 'Y' : 'N',
          relationItemList: obj
        })
      }

      if (
        this.legalPersonDetailRepList &&
        this.legalPersonDetailRepList.id &&
        this.creditChooseData.checkedTypes.includes('legal_person')
      ) {
        array.push({
          guaranteeType: 'legal_person',
          majorGuarantee: this.creditChooseData.mainType === 'legal_person' ? 'Y' : 'N',
          relationItemList: [
            {
              foreignId: this.legalPersonDetailRepList.id
            }
          ]
        })
      }
      if (this.basicForm.guaranteeCompany && this.creditChooseData.checkedTypes.includes('company')) {
        array.push({
          guaranteeType: 'company',
          majorGuarantee: this.creditChooseData.mainType === 'company' ? 'Y' : 'N',
          relationItemList: [
            {
              foreignId: this.basicForm.guaranteeCompany
            }
          ]
        })
      }

      if (this.checkedMortgageTranData.length > 0 && this.creditChooseData.checkedTypes.includes('mortgage')) {
        const obj = this.checkedMortgageTranData.map(item => {
          return { foreignId: item }
        })
        array.push({
          guaranteeType: 'mortgage',
          majorGuarantee: this.creditChooseData.mainType === 'mortgage' ? 'Y' : 'N',
          relationItemList: obj
        })
      }

      if (this.checkedPledgeTranData.length > 0 && this.creditChooseData.checkedTypes.includes('pledge')) {
        const obj = this.checkedPledgeTranData.map(item => {
          return { foreignId: item }
        })
        array.push({
          guaranteeType: 'pledge',
          majorGuarantee: this.creditChooseData.mainType === 'pledge' ? 'Y' : 'N',
          relationItemList: obj
        })
      }
      creditApplySaveGuaranteeeAllInfo({ itemList: array, orderNo: this.orderNo, customerId: this.customerId }).then(res => {
        if (res.status === 200) {
          this.$store.state.app.saveToastFlag && this.$message.success(res.message || '保存成功')
          !this.$store.state.app.saveToastFlag && this.$emit('applyCredit')
          this.$store.dispatch('ToggleToastFlag', true)
        } else {
          this.$message.error(res.message || '更新失败，请稍后重试')
          this.$store.dispatch('ToggleToastFlag', true)
        }
      })
    },
    /**
     * 切换担保人
     */
    clickChangePerson(val) {
      this.currentPersonIndex = Number(val.index)
      this.activeNameChild = 'firstChild'
      if (this.personDetailRepList) {
        this.guarantorIncomeData.agriculturalData =
          this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.machineryCreateDTOS || []
        this.guarantorIncomeData.growIncomeData =
          this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.plantCreateDTOS || []
        this.guarantorIncomeData.cultivateData = this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.breedCreateDTOS || []
        this.guarantorIncomeData.businessData =
          this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.businessCreateDTOS || []
        this.guarantorIncomeData.workIncomeData =
          this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.workingCreateDTOS || []
        this.guarantorIncomeData.basicSalaryData =
          this.personDetailRepList[this.currentPersonIndex].familyIncomeListDTO.salaryCreateDTOS || []
        this.guarantorIncomeData.governmentSubsidiesData = this.personDetailRepList[
          this.currentPersonIndex
        ].familyIncomeListDTO.subsidiesCreateDTOS.map(
          item => item
          // item.governmentSubsidyFlag = this.commonEnum.authFlag[item.governmentSubsidyFlag]
        )
        this.currentPersonDetails = this.personDetailRepList[this.currentPersonIndex]
        if (this.personDetailRepList[this.currentPersonIndex].finances) {
          const allKeys = Object.keys(this.personDetailRepList[this.currentPersonIndex].finances)
          if (allKeys.includes('1')) {
            this.guarantorPossessionsData.commercialBuildingsData = this.personDetailRepList[this.currentPersonIndex].finances['1']
          } else {
            this.guarantorPossessionsData.commercialBuildingsData = []
          }

          if (allKeys.includes('2')) {
            this.guarantorPossessionsData.homeBuildingData = this.personDetailRepList[this.currentPersonIndex].finances['2']
          } else {
            this.guarantorPossessionsData.homeBuildingData = []
          }
          if (allKeys.includes('99')) {
            this.guarantorPossessionsData.otherPossessionsData = this.personDetailRepList[this.currentPersonIndex].finances['99']
          } else {
            this.guarantorPossessionsData.otherPossessionsData = []
          }
        }
      }
    },
    // 担保人添加家庭财产状况
    // TODO 添加担保人财产状况 切换担保人后  家庭年收入 家庭负债 家庭财产状况 Tab显示便宜
    guaranteeAddPossessions(index) {
      this.guarantorInfo = {
        id: this.currentPersonDetails.id,
        customerId: this.currentPersonDetails.customerI
      }
      this.guarantorPossessionsDialogVisible = true
    },
    /**
     * 保存自然担保人影像信息
     */
    creditApplyGuaranteePersonBetchSaveFileInfoFun() {
      creditApplyGuaranteePersonBetchSaveFileInfo({
        id: this.currentPersonDetails.id,
        fileMap: this.personDetailRepList[this.currentPersonIndex].listMap
      }).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message || '删除失败，请稍后重试')
        }
      })
    },
    // 影像资料上传成功时触发
    updateImageData(params) {
      this.$set(this.personDetailRepList[this.currentPersonIndex].listMap, params.key, params.val)
      this.creditApplyGuaranteePersonBetchSaveFileInfoFun()
    },
    // 同户籍地址
    handleSameAddress(index) {
      if (index === 0) {
        this.basicForm.familyAddress = this.personDetailRepList[index].personBaseRep.censusRegisterAddress
      } else {
        this.basicForm.familyAddress1 = this.personDetailRepList[index].personBaseRep.censusRegisterAddress
      }
    },
    /** 增信方式选择 */
    creditChooseDialogClose() {
      this.creditChooseDialogVisible = false
    },
    /**
     * 标签是否可以删除
     */
    tabClosable() {
      if (this.productCompanyStatus) {
        this.companyCloseable = false
      } else {
        this.companyCloseable = true
      }
      this.legal_personCloseable = true
      this.mortgageCloseable = true
      this.pledgeCloseable = true
      // if (this.creditChooseData.mainType === 'legal_person') {
      //   this.legal_personCloseable = false
      //   this.companyCloseable = true
      //   this.mortgageCloseable = true
      //   this.pledgeCloseable = true
      // } else if (this.creditChooseData.mainType === 'company') {

      //   this.companyCloseable = false
      //   this.mortgageCloseable = true
      //   this.pledgeCloseable = true
      // } else if (this.creditChooseData.mainType === 'mortgage') {
      //   this.legal_personCloseable = true
      //   this.companyCloseable = true
      //   this.mortgageCloseable = false
      //   this.pledgeCloseable = true
      // } else if (this.creditChooseData.mainType === 'pledge') {
      //   this.legal_personCloseable = true
      //   this.companyCloseable = true
      //   this.mortgageCloseable = true
      //   this.pledgeCloseable = false
      // }
    },
    /** 增信方式选择确认 */
    creditChooseSave(val) {
      // 处理
      this.creditChooseDialogVisible = false

      // if (this.creditChooseData.mainType && this.creditChooseData.mainType.length > 0) {
      // 判断当前mainType 对应的数据有值
      // if ((this.creditChooseData.mainType === 'legal_person' && this.legalPersonDetailRepList && this.legalPersonDetailRepList.id) || (this.creditChooseData.mainType === 'company' && )) {
      // this.creditApplyUpdateMajorGuaranteeFun(val.mainType)
      // }
      // }
      var changeEnabel = false
      if (val.mainType === 'person' && this.personDetailRepList.length > 0) {
        changeEnabel = true
      } else if (
        val.mainType === 'legal_person' &&
        this.legalPersonDetailRepList &&
        this.legalPersonDetailRepList.creditCode &&
        this.legalPersonDetailRepList.creditCode.length > 0
      ) {
        changeEnabel = true
      } else if (val.mainType === 'company' && this.basicForm.guaranteeCompany && this.basicForm.guaranteeCompany.length > 0) {
        changeEnabel = true
      } else if (val.mainType === 'mortgage' && this.checkedMortgageTranData.length > 0) {
        changeEnabel = true
      } else if (val.mainType === 'pledge' && this.checkedPledgeTranData.length > 0) {
        changeEnabel = true
      }

      if (changeEnabel) {
        this.creditApplyUpdateMajorGuaranteeFun(val.mainType)
      }

      this.creditChooseData.mainType = val.mainType

      this.activeName = this.creditChooseData.mainType
      this.creditChooseData.checkedTypes = val.checkedTypes
      this.tabClosable()
      this.showCreditSaveButton = true
    },
    removeTab(val) {
      var targetName = this.guanranteeEnum.guaranteeTypeEnum[val]
      this.$confirm(`是否移除${targetName}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.creditApplyDelGuaranteeFormFun(val)
        // const tabs = this.checkedIncomeTypes
        // let activeName = this.editableTabsValue
        // if (activeName === targetName) {
        //   tabs.forEach((tab, index) => {
        //     if (tab.value === targetName) {
        //       const nextTab = tabs[index + 1] || tabs[index - 1]
        //       if (nextTab) {
        //         activeName = nextTab.value
        //       }
        //     }
      })
    },
    addNewInfo(val) {
      if (val === 'mortgage') {
        this.mortgageTypeChooseDialogVisible = true
      } else {
        this.pledgeTypeChooseDialogVisible = true
      }
    },
    // 穿梭框变化
    mortgageTransferChange(val) {
      this.checkedMortgageTranData = val
    },
    pledgeTransferChange(val) {
      this.checkedPledgeTranData = val
    },
    // 抵押详情
    mortgageInfoDetails(val) {
      this.mortgageInfoDetailsData = val
      this.mortgageInfoDetailsDialogVisible = true
    },
    // 抵押关闭弹框
    mortgageInfoDialogClose() {
      this.mortgageInfoDialogVisible = false
    },
    mortgageInfoDetailsDialogClose() {
      this.mortgageInfoDetailsDialogVisible = false
    },
    mortgageTypeChooseDialogClose() {
      this.mortgageTypeChooseDialogVisible = false
    },
    // or 质押
    pledgeInfoDialogClose() {
      this.pledgeInfoDialogVisible = false
    },
    mortgageTypeChooseSave(value) {
      this.mortgageInfoData = value
      this.mortgageTypeChooseDialogVisible = false
      this.mortgageInfoDialogVisible = true
    },
    // 新添加的抵押物信息
    mortgageSaveInfo(value) {
      if (value.length > 0) {
        const arr1 = []
        const arr = value.map(item => {
          item.label = item.createTime
          item.key = item.id
          arr1.push(item.key)
          return item
        })
        this.mortgageTranData = this.mortgageTranData.concat(arr)
        this.checkedMortgageTranData = this.checkedMortgageTranData.concat(arr1)
      }

      this.mortgageInfoDialogVisible = false
    },
    // 质押详情
    pledgeInfoDetails(val) {
      this.pledgeInfoDetailsData = val
      this.pledgeInfoDetailsDialogVisible = true
    },
    pledgeInfoDetailsDialogClose() {
      this.pledgeInfoDetailsDialogVisible = false
    },
    pledgeTypeChooseDialogClose() {
      this.pledgeTypeChooseDialogVisible = false
    },
    pledgeTypeChooseSave(value) {
      this.pledgeInfoData = value
      this.pledgeTypeChooseDialogVisible = false
      this.pledgeInfoDialogVisible = true
    },
    pledgeSaveInfo(value) {
      // if (value.length > 0) {
      //   value.forEach(item => {
      //     item.label = item.createTime
      //     item.key = item.id
      //     this.checkedPledgeTranData.push(item)
      //   })
      // }
      if (value.length > 0) {
        const arr1 = []
        const arr = value.map(item => {
          item.label = item.createTime
          item.key = item.id
          arr1.push(item.key)
          return item
        })
        this.pledgeTranData = this.pledgeTranData.concat(arr)
        this.checkedPledgeTranData = this.checkedPledgeTranData.concat(arr1)
      }
      this.pledgeInfoDialogVisible = false
    },
    // 保存担保人基本信息
    handleBorrowerInfo(index) {
      var arr = []
      if (index === 0) {
        const liveLimitYear =
          this.basicForm.familyAddress !== this.personDetailRepList[0].personBaseRep.censusRegisterAddress ? 'liveLimitYear' : null
        arr = ['highestEdu', 'familyAddress', liveLimitYear]
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === null) {
            arr.splice(i, 1) // 删除数组中是 null 的
          }
        }
      } else {
        const liveLimitYear1 =
          this.basicForm.familyAddress1 !== this.personDetailRepList[1].personBaseRep.censusRegisterAddress ? 'liveLimitYear1' : null
        arr = ['highestEdu1', 'familyAddress1', liveLimitYear1]
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === null) {
            arr.splice(i, 1) // 删除数组中是 null 的
          }
        }
      }
      Promise.all(
        arr.map(item => {
          return new Promise((resolve, reject) => {
            this.$refs.basicForm.validateField(item, valid => {
              if (!valid) {
                resolve()
              } else {
                reject()
              }
            })
          })
        })
      )
        .then(() => {
          if (index === 0) {
            saveGuaranteePersonBaseInfo({
              address: this.basicForm.familyAddress,
              highestEdu: this.basicForm.highestEdu,
              liveLimitYear: this.basicForm.liveLimitYear,
              personId: this.personDetailRepList[index].id
            }).then(res => {
              if (res.status === 200) {
                this.$message.success(res.message || '保存成功')
                this.getGuaranteePersonDetailInfoFun(this.personDetailRepList[index].applyNo, Number(index), false)
              } else {
                this.$message.error(res.message || '保存失败，请稍后重试')
              }
            })
          } else {
            saveGuaranteePersonBaseInfo({
              address: this.basicForm.familyAddress1,
              highestEdu: this.basicForm.highestEdu1,
              liveLimitYear: this.basicForm.liveLimitYear1,
              personId: this.personDetailRepList[index].id
            }).then(res => {
              if (res.status === 200) {
                this.$message.success(res.message || '保存成功')
                this.getGuaranteePersonDetailInfoFun(this.personDetailRepList[index].applyNo, Number(index), false)
              } else {
                this.$message.error(res.message || '保存失败，请稍后重试')
              }
            })
          }
        })
        .catch(() => {
          console.log('失败')
        })
    },
    // 保存{{家庭负债}}中 的三个信息
    handleFamliyInfo(index) {
      var arr = []
      if (index === 0) {
        arr = ['outstandingAccounts', 'privateLending', 'bankLoans']
      } else {
        arr = ['outstandingAccounts1', 'privateLending1', 'bankLoans1']
      }
      Promise.all(
        arr.map(item => {
          return new Promise((resolve, reject) => {
            this.$refs.basicForm.validateField(item, valid => {
              if (!valid) {
                resolve()
              } else {
                reject()
              }
            })
          })
        })
      )
        .then(() => {
          if (index === 0) {
            saveGuaranteePersonFamilyLiabilitites({
              liabilities: [
                {
                  outstandingAccounts: this.basicForm.outstandingAccounts,
                  privateLending: this.basicForm.privateLending,
                  bankLoans: this.basicForm.bankLoans
                }
              ],
              personId: this.personDetailRepList[index].id
            }).then(res => {
              if (res.status === 200) {
                this.$message.success(res.message || '保存成功')
                this.getGuaranteePersonDetailInfoFun(this.personDetailRepList[index].applyNo, Number(index), false)
              } else {
                this.$message.error(res.message || '保存失败，请稍后重试')
              }
            })
          } else {
            saveGuaranteePersonFamilyLiabilitites({
              liabilities: [
                {
                  outstandingAccounts: this.basicForm.outstandingAccounts1,
                  privateLending: this.basicForm.privateLending1,
                  bankLoans: this.basicForm.bankLoans1
                }
              ],
              personId: this.personDetailRepList[index].id
            }).then(res => {
              if (res.status === 200) {
                this.$message.success(res.message || '保存成功')
                this.getGuaranteePersonDetailInfoFun(this.personDetailRepList[index].applyNo, Number(index), false)
              } else {
                this.$message.error(res.message || '保存失败，请稍后重试')
              }
            })
          }
        })
        .catch(() => {
          console.log('失败')
        })
    },
    guarantorPossessionsDialogClose() {
      this.guarantorPossessionsDialogVisible = false
    },
    guarantorIncomeDialogClose() {
      this.guarantorIncomeDialogVisible = false
      // 清空数据
      // this.guarantorIncomeData = {
      //   agriculturalData: [],
      //   growIncomeData: [],
      //   cultivateData: [],
      //   businessData: [],
      //   workIncomeData: [],
      //   basicSalaryData: [],
      //   governmentSubsidiesData: []
      // }
    },
    // 家庭收入
    failyIncomeSave(value) {
      this.guarantorIncomeDialogVisible = false
      // 保存成功 接口刷新数据
      const applyNo = this.personDetailRepList[this.currentPersonIndex].applyNo
      this.getGuaranteePersonDetailInfoFun(applyNo, Number(this.currentPersonIndex), false)
    },
    // 家庭财产状况
    fuarantorPossessionsSave(value) {
      this.familyPropertyData = value
      const applyNo = this.personDetailRepList[this.currentPersonIndex].applyNo
      this.getGuaranteePersonDetailInfoFun(applyNo, Number(this.currentPersonIndex), false)
      this.guarantorPossessionsDialogVisible = false
    },
    numberChange(e, val, max) {
      const newValue = handelDigital(e, true, '2')
      if (newValue === 0) {
        this.$set(this.basicForm, val, parseFloat(newValue))
      } else if (parseFloat(newValue) >= max) {
        this.$nextTick(() => {
          this.$set(this.basicForm, val, max)
        })
      } else {
        this.$nextTick(() => {
          this.$set(this.basicForm, val, newValue)
        })
      }
    },
    // 确定添加增信
    handleFixAdd() {
      this.searchAddDialogVisible = false
      this.legalPersonDetailRepList = Object.assign({}, this.searchLegalPersonDetailRepList)
      this.searchAddHidden = true
    },
    // 获取所属权属类型
    getCreditAppleRelciustomer(params) {
      getCreditAppleRelciustomer(params).then(res => {
        if (res.status === 200) {
          this.owerTypeSource = res.data
        }
      })
    },
    // 保存担保 部分公司信息
    handleGuaranteeInfo() {
      new Promise((resolve, reject) => {
        this.$refs.basicForm.validateField('guaranteeCompany', valid => {
          if (!valid) {
            resolve()
          } else {
            this.reject()
          }
        })
      })
        .then(() => {
          console.log('通过')
        })
        .catch(() => {
          console.log('失败')
        })
    },
    // 保存增信信息
    // TODO 必填项校验不通过 不调用接口  并且跳转到必填项界面
    HandleCreditInfo() {
      if (this.personDetailRepList.length > 0) {
        const repList = this.personDetailRepList
        for (let index = 0; index < repList.length; index++) {
          const element = repList[index]
          if (
            !(
              element.familyIncomeListDTO.breedCreateDTOS.length > 0 ||
              element.familyIncomeListDTO.businessCreateDTOS.length > 0 ||
              element.familyIncomeListDTO.machineryCreateDTOS.length > 0 ||
              element.familyIncomeListDTO.plantCreateDTOS.length > 0 ||
              element.familyIncomeListDTO.salaryCreateDTOS.length > 0 ||
              element.familyIncomeListDTO.subsidiesCreateDTOS.length > 0 ||
              element.familyIncomeListDTO.workingCreateDTOS.length > 0
            )
          ) {
            this.$message.error('至少填写一项家庭年收入')
            return false
          }
        }
      }
      if (this.personDetailRepList.length > 0) {
        const repList = this.personDetailRepList
        for (let index = 0; index < repList.length; index++) {
          const element = repList[index]
          if (!element.finances['1'] && !element.finances['2']) {
            this.$message.error('商品房、自建房至少填写一种')
            return false
          }
        }
      }
      // 家庭负债
      var arr = []
      if (this.personDetailRepList.length === 1) {
        const liveLimitYear =
          this.basicForm.familyAddress !== this.personDetailRepList[0].personBaseRep.censusRegisterAddress ? 'liveLimitYear' : null
        arr = ['outstandingAccounts', 'privateLending', 'bankLoans', 'highestEdu', 'familyAddress', liveLimitYear]
      } else if (this.personDetailRepList.length === 2) {
        const liveLimitYear =
          this.basicForm.familyAddress !== this.personDetailRepList[0].personBaseRep.censusRegisterAddress ? 'liveLimitYear' : null
        const liveLimitYear1 =
          this.basicForm.familyAddress1 !== this.personDetailRepList[1].personBaseRep.censusRegisterAddress ? 'liveLimitYear1' : null
        arr = [
          'outstandingAccounts',
          'privateLending',
          'bankLoans',
          'outstandingAccounts1',
          'privateLending1',
          'bankLoans1',
          'highestEdu',
          'familyAddress',
          liveLimitYear,
          'highestEdu1',
          'familyAddress1',
          liveLimitYear1
        ]
      }

      if (this.creditChooseData.checkedTypes.includes('company')) {
        arr.push('guaranteeCompany')
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === null) {
          arr.splice(i, 1) // 删除数组中是 null 的
        }
      }
      Promise.all(
        arr.map(item => {
          return new Promise((resolve, reject) => {
            this.$refs.basicForm.validateField(item, valid => {
              if (!valid) {
                resolve()
              } else {
                if (
                  item === 'outstandingAccounts' ||
                  item === 'privateLending' ||
                  item === 'bankLoans' ||
                  item === 'highestEdu' ||
                  item === 'familyAddress' ||
                  item === 'liveLimitYear'
                ) {
                  this.activeName = 'person'
                  this.personTabsValue = '0'
                  if (item === 'outstandingAccounts' || item === 'privateLending' || item === 'bankLoans') {
                    this.activeNameChild = 'secondChild'
                  }
                } else if (
                  item === 'outstandingAccounts1' ||
                  item === 'privateLending1' ||
                  item === 'bankLoans1' ||
                  item === 'highestEdu1' ||
                  item === 'familyAddress1' ||
                  item === 'liveLimitYear1'
                ) {
                  this.activeName = 'person'
                  this.personTabsValue = '1'
                  if (item === 'outstandingAccounts1' || item === 'privateLending1' || item === 'bankLoans1') {
                    this.activeNameChild = 'secondChild'
                  }
                } else if (item === 'guaranteeCompany') {
                  this.activeName = 'company'
                }
                reject()
              }
            })
          })
        })
      )
        .then(() => {
          this.creditApplySaveGuaranteeeAllInfoFun()
        })
        .catch(() => {
          this.$message.error('请填写增信信息的全部必填字段')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ #tab-firstChild:before,
/deep/ #tab-secondChild:before,
/deep/ #tab-thirdChild:before,
/deep/ #tab-fourthChild:before {
  content: '*';
  margin-right: 3px;
  color: rgba(247, 64, 64, 0.836);
}
.span-tit {
  top: 44px;
  position: relative;
  left: 0px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>
