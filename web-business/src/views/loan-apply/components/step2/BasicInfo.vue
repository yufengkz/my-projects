<template>
  <div>
    <el-form
      ref="basicInformation"
      :model="basicInformation"
      :rules="basicFormRules"
      size="mini"
      class="m-t-20 p-l-10 block-el-select"
      label-position="right"
      label-width="140px"
      v-if="basicInformation.creditApplyCustomerInfoOutDTO"
    >
      <span class="all-title">借款人基本信息</span>
      <el-divider></el-divider>
      <DescriptionList class="m-l-20" :content="basicInformation.creditApplyCustomerInfoOutDTO">
        <Description label="姓名">{{basicInformation.creditApplyCustomerInfoOutDTO.customerName}}</Description>
        <Description label="身份证号">{{basicInformation.creditApplyCustomerInfoOutDTO.idCardNo}}</Description>
        <Description label="手机号">{{basicInformation.creditApplyCustomerInfoOutDTO.mobile}}</Description>
        <Description label="性别">{{basicInformation.creditApplyCustomerInfoOutDTO.sex$FICDictName}}</Description>
        <Description label="出生日期">{{basicInformation.creditApplyCustomerInfoOutDTO.birthday}}</Description>
        <Description label="民族">{{basicInformation.creditApplyCustomerInfoOutDTO.national}}</Description>
        <Description label="年龄">{{basicInformation.creditApplyCustomerInfoOutDTO.age}}</Description>
        <Description label="户籍地址">{{basicInformation.creditApplyCustomerInfoOutDTO.censusRegisterAddress}}</Description>
      </DescriptionList>
      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item prop="creditApplyCustomerInfoOutDTO.highestEdu" label="最高学历:" label-width="75px">
              <el-select
                v-model="basicInformation.creditApplyCustomerInfoOutDTO.highestEdu"
                placeholder="请选择"
                clearable
              >
                <el-option v-for="(item, key) in this.commonEnum.highestEdu" :key="key" :label="item" :value="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-col :span="15">
              <el-form-item prop="creditApplyCustomerInfoOutDTO.familyAddress" label="住址:" label-width="145px">
                <el-input v-model="basicInformation.creditApplyCustomerInfoOutDTO.familyAddress" placeholder="请输入住址" maxlength="50"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" class="wide-button" size="mini" @click="handleSameAddress">同户籍地址</el-button>
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="20" v-if="!addressHidden">
          <el-col :span="6">
            <el-form-item prop="creditApplyCustomerInfoOutDTO.liveLimitYear" label="居住年限:" label-width="75px">
              <el-input v-number-input.float="0" v-model="basicInformation.creditApplyCustomerInfoOutDTO.liveLimitYear" placeholder="居住年限" max="100"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <!-- 借款人家庭信息 -->
      <span class="all-title">借款人家庭信息</span>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item label="婚姻状况:" label-width="195px" required>
            <span>{{basicInformation.creditApplyCustomerInfoOutDTO.marriage$FICDictName}}</span>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="creditApplyCustomerInfoOutDTO.parentNum" label="赡养老人人数:" label-width="100px">
            <el-input
              v-model="basicInformation.creditApplyCustomerInfoOutDTO.parentNum"
              placeholder="请输入"
              min="0"
              maxlength="2"
              v-number-input.float="0"
              @change="changNum"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="creditApplyCustomerInfoOutDTO.minorPersonNum" label="未成年子女人数:" label-width="110px">
            <el-input
              v-model="basicInformation.creditApplyCustomerInfoOutDTO.minorPersonNum"
              placeholder="请输入"
              min="0"
              maxlength="2"
              v-number-input.float="0"
              @change="changNum"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item
            prop="creditApplyCustomerInfoOutDTO.minorPersonHigherEduNum"
            label="未成年子女正接受高等教育人数:"
            label-width="195px"
          >
            <el-input
              v-model="basicInformation.creditApplyCustomerInfoOutDTO.minorPersonHigherEduNum"
              placeholder="请输入"
              min="0"
              maxlength="2"
              v-number-input.float="0"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="creditApplyCustomerInfoOutDTO.adultPersonNum" label="成年子女人数:" label-width="100px">
            <el-input
              v-model="basicInformation.creditApplyCustomerInfoOutDTO.adultPersonNum"
              placeholder="请输入"
              min="0"
              maxlength="2"
              v-number-input.float="0"
              @change="changNum"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item
            prop="creditApplyCustomerInfoOutDTO.adultPersonHigherEduNum"
            label="成年子女正接受高等教育人数:"
            label-width="195px"
          >
            <el-input
              v-model="basicInformation.creditApplyCustomerInfoOutDTO.adultPersonHigherEduNum"
              placeholder="请输入"
              min="0"
              maxlength="2"
              v-number-input.float="0"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="creditApplyCustomerInfoOutDTO.familyNum" label="家庭成员总人数:" label-width="110px">
            <el-input
              v-model="basicInformation.creditApplyCustomerInfoOutDTO.familyNum"
              placeholder="请输入"
              min="0"
              maxlength="2"
              v-number-input.float="0"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 联系人信息-->
      <span class="all-title">联系人信息</span>
      <el-table :data="tableData" ref="table" border size="mini" class="m-t-20">
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-row v-if="scope.row.editStatus == true">
              <el-input size="mini" v-model="scope.row.linkmanName" placeholder="请输入" max="50"></el-input>
            </el-row>
            <el-row v-else>
              <span>{{ scope.row.linkmanName }}</span>
              <el-tag size="mini" v-show="scope.row.togBorrowerFlag === '1'">共借人</el-tag>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="手机号">
          <template slot-scope="scope">
            <el-row v-if="scope.row.editStatus == true">
              <el-input size="mini" v-model="scope.row.linkmanMobile" placeholder="请输入" maxlength="11" minlength="11"></el-input>
            </el-row>
            <el-row v-else>
              <span>{{ scope.row.linkmanMobile }}</span>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="与借款人关系">
          <template slot-scope="scope">
            <el-row v-if="scope.row.editStatus === true">
              <el-select size="mini" v-model="scope.row.relationship" filterable placeholder="请选择" clearable>
                <el-option v-for="(item, key) in commonEnum.relationship" :key="key" :label="item" :value="key"></el-option>
              </el-select>
            </el-row>
            <el-row v-else>
              <span v-show="scope.row.relationship$FICDictName && !scope.row.relationshipName">{{scope.row.relationship$FICDictName }}</span>
              <span v-show="scope.row.relationshipName">{{ scope.row.relationshipName }}</span>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="160">
          <template slot-scope="scope">
            <div v-if="scope.row.editStatus == false">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button v-show="linkePersonShowDel()" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>
            <div v-else>
              <el-button size="mini" @click="handleSave(scope.$index, scope.row)">保存</el-button>
              <el-button size="mini" @click="handleCancel(scope.$index, scope.row)">取消</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="btns-center-box">
        <el-button size="mini" icon="el-icon-plus" @click="handleAdd('contacts')">添加</el-button>
      </div>
      <div class="text-right">
        <el-button size="small" type="primary" class="wide-button" @click="handlePreservationContacts">保存基本信息</el-button>
      </div>
      <!-- 家庭年收入与支出 -->
      <span class="all-title span-tit"></span>
      <el-tabs v-model="activeName" class="m-l-5">
        <el-tab-pane label="家庭年收入与支出" name="first">
          <el-button
            type="primary"
            class="wide-button"
            icon="el-icon-plus"
            size="mini"
            @click="handleAddIncomeExpend"
          >添加收入</el-button>
          <FamilyIncomeTabs
            :tabsLabel="incomeTabsLabel"
            :TableLabel="incomeTableLabel"
            :TableProp="basicInformation.creditApplyFamlilyComeListDTO"
          ></FamilyIncomeTabs>
        </el-tab-pane>
        <el-tab-pane label="家庭负债" name="second">
          <el-tag>提示：若无相关负债金额，请填写"0"</el-tag>
          <el-row :gutter="20" class="m-t-30">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="creditApplyFamlilyFinanceOutDTO.outstandingAccounts" label="赊欠账款:" label-width="80px">
                <el-input
                  v-model="basicInformation.creditApplyFamlilyFinanceOutDTO.outstandingAccounts"
                  placeholder="请输入"
                  min="0"
                  maxlength="11"
                  v-number-input.float="2"
                  @input="numberChange($event,'creditApplyFamlilyFinanceOutDTO.outstandingAccounts',99999999999)"
                  @change="numberChange($event,'creditApplyFamlilyFinanceOutDTO.outstandingAccounts',99999999999)"
                >
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="creditApplyFamlilyFinanceOutDTO.privateLending" label="民间借贷:" label-width="80px">
                <el-input
                  v-model="basicInformation.creditApplyFamlilyFinanceOutDTO.privateLending" placeholder="请输入"
                  min="0"
                  maxlength="11"
                  v-number-input.float="2"
                  @input="numberChange($event,'creditApplyFamlilyFinanceOutDTO.privateLending',99999999999)"
                  @change="numberChange($event,'creditApplyFamlilyFinanceOutDTO.privateLending',99999999999)"
                >
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="creditApplyFamlilyFinanceOutDTO.bankLoans" label="银行贷款:" label-width="80px">
                <el-input
                  v-model="basicInformation.creditApplyFamlilyFinanceOutDTO.bankLoans" placeholder="请输入"
                  min="0"
                  maxlength="11"
                  v-number-input.float="2"
                  @input="numberChange($event,'creditApplyFamlilyFinanceOutDTO.bankLoans',99999999999)"
                  @change="numberChange($event,'creditApplyFamlilyFinanceOutDTO.bankLoans',99999999999)"
                >
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col class="text-right">
              <el-button type="primary" class="wide-button" size="mini" @click="handleFamliyInfo">保存</el-button>
              <!-- </el-form-item> -->
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="家庭财产状况" name="third">
          <el-tag>提示：商品房、自建房客户至少填写一种</el-tag>
          <br />
          <el-button
            type="primary"
            class="wide-button m-t-30"
            icon="el-icon-plus"
            size="mini"
            @click="guarantorPossessionsDialogVisible=true"
          >添加财产</el-button>
          <FamilyPropertyTabs
            :tabsLabel="propertyTabsLabel"
            :TableLabel="propertyTableLabel"
            :TableProp="basicInformation.finances"
          ></FamilyPropertyTabs>
        </el-tab-pane>
        <!-- 名下企业.... -->
        <el-tab-pane label="名下企业" name="fourth">
          <el-tag>提示：若借款人名下无企业，可不填此项内容</el-tag>
          <el-table :data="companyTableData" ref="companyTableData" border size="mini" class="m-t-20">
            <el-table-column label="企业类型">
              <template slot-scope="scope">
                <el-row v-if="scope.row.editStatus == true">
                  <el-select v-model="scope.row.entType" placeholder="请选择" clearable>
                    <el-option v-for="(item,key) in commonEnum.entType" :key="key" :label="item" :value="key"></el-option>
                  </el-select>
                </el-row>
                <el-row v-else>
                  <span v-show="scope.row.entType$FICDictName">{{ scope.row.entType$FICDictName }}</span>
                  <span v-show="!scope.row.entType$FICDictName">{{ scope.row.entTypeName }}</span>
                  <!-- <el-tag size="mini" v-if="scope.row.togBorrowerFlag === '1'">共借人</el-tag> -->
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="企业名称">
              <template slot-scope="scope">
                <el-row v-if="scope.row.editStatus == true">
                  <!-- <el-input size="mini" v-model="scope.row.linkmanMobile" placeholder="请输入"></el-input> -->
                  <el-input v-model="scope.row.entName" placeholder="请输入" maxlength="50"></el-input>
                </el-row>
                <el-row v-else>
                  <span>{{ scope.row.entName }}</span>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="成立时间">
              <template slot-scope="scope">
                <el-row v-if="scope.row.editStatus == true">
                  <el-date-picker
                    type="date"
                    placeholder="请选择"
                    v-model="scope.row.entBuildTime"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                    :picker-options="timePickerOptions"
                  ></el-date-picker>
                </el-row>
                <el-row v-else>
                  <span>{{ scope.row.entBuildTime }}</span>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="股东人数">
              <template slot-scope="scope">
                <el-row v-if="scope.row.editStatus == true">
                  <!-- <el-input size="mini" v-model="scope.row.linkmanMobile" placeholder="请输入"></el-input> -->
                  <el-input
                    v-model="scope.row.shareholdersNum"
                    placeholder="请输入"
                    min="0"
                    maxlength="11"
                    v-number-input.float="0"
                    @input="numberInsuranceChange($event, scope,'shareholdersNum',99999999999)"
                    @change="numberInsuranceChange($event, scope,'shareholdersNum',99999999999)"
                  ></el-input>
                </el-row>
                <el-row v-else>
                  <span>{{ scope.row.shareholdersNum }}</span>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="申请人占股比(%)">
              <template slot-scope="scope">
                <el-row v-if="scope.row.editStatus == true">
                  <el-input
                    v-model="scope.row.equityRatio"
                    placeholder="请输入"
                    min="0"
                    maxlength="5"
                    v-number-input.float="2"
                    @input="numberInsuranceChange($event, scope,'equityRatio',100)"
                    @change="numberInsuranceChange($event, scope,'equityRatio',100)"
                  ></el-input>
                </el-row>
                <el-row v-else>
                  <span>{{ scope.row.equityRatio }}</span>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="实缴金额(万元)">
              <template slot-scope="scope">
                <el-row v-if="scope.row.editStatus == true">
                  <el-input
                    v-model="scope.row.capitalAmount"
                    placeholder="请输入"
                    min="0"
                    maxlength="11"
                    v-number-input.float="2"
                    @input="numberInsuranceChange($event, scope,'capitalAmount',99999999999)"
                    @change="numberInsuranceChange($event, scope,'capitalAmount',99999999999)"
                  ></el-input>
                </el-row>
                <el-row v-else>
                  <span>{{ scope.row.capitalAmount }}</span>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="年总资产(万元)">
              <template slot-scope="scope">
                <el-row v-if="scope.row.editStatus == true">
                  <el-input
                    v-model="scope.row.totalAssert"
                    placeholder="请输入"
                    min="0"
                    maxlength="11"
                    v-number-input.float="2"
                     @input="numberInsuranceChange($event, scope,'totalAssert',99999999999)"
                    @change="numberInsuranceChange($event, scope,'totalAssert',99999999999)"
                  ></el-input>
                </el-row>
                <el-row v-else>
                  <span>{{ scope.row.totalAssert }}</span>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="年总负债(万元)">
              <template slot-scope="scope">
                <el-row v-if="scope.row.editStatus == true">
                  <el-input
                    v-model="scope.row.totalDebt"
                    placeholder="请输入"
                    min="0"
                    maxlength="11"
                    v-number-input.float="2"
                     @input="numberInsuranceChange($event, scope,'totalDebt',99999999999)"
                    @change="numberInsuranceChange($event, scope,'totalDebt',99999999999)"
                  ></el-input>
                </el-row>
                <el-row v-else>
                  <span>{{ scope.row.totalDebt }}</span>
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="160">
              <template slot-scope="scope">
                <div v-if="scope.row.editStatus == false">
                  <el-button size="mini" @click="handleCompanyEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleCompanyDelete(scope.$index, scope.row)">删除</el-button>
                </div>
                <div v-else>
                  <el-button size="mini" @click="handleCompanySave(scope.$index, scope.row)">保存</el-button>
                  <!-- <el-button size="mini" @click="handleCancel(scope.$index, scope.row)">取消</el-button> -->
                   <el-button size="mini" type="danger" @click="handleCompanyDelete(scope.$index, scope.row)">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="btns-center-box">
            <el-button size="mini" icon="el-icon-plus" @click="handleAdd('company')">添加</el-button>
          </div>
          <div class="text-right">
            <el-button size="small" type="primary" class="wide-button" @click="handlePreservationCompany">保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-divider></el-divider>
      <!-- 家庭银行流水统计-->
      <span class="all-title">家庭银行流水统计</span>
      <el-row :gutter="20" class="m-t-30 m-b-30">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="creditApplyCustomerInfoOutDTO.famlilyIncome" label="流入净值:" label-width="80px">
            <el-input
              v-model="basicInformation.creditApplyCustomerInfoOutDTO.famlilyIncome"
              placeholder="请输入"
              min="0"
              maxlength="11"
              v-number-input.float="2"
              @input="numberChange($event,'creditApplyCustomerInfoOutDTO.famlilyIncome',99999999999)"
              @change="numberChange($event,'creditApplyCustomerInfoOutDTO.famlilyIncome',99999999999)"
            >
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="creditApplyCustomerInfoOutDTO.famlilyExpend" label="流出净值:" label-width="80px">
            <el-input
              v-model="basicInformation.creditApplyCustomerInfoOutDTO.famlilyExpend"
              placeholder="请输入"
              min="0"
              maxlength="11"
              v-number-input.float="2"
               @input="numberChange($event,'creditApplyCustomerInfoOutDTO.famlilyExpend',99999999999)"
              @change="numberChange($event,'creditApplyCustomerInfoOutDTO.famlilyExpend',99999999999)"
            >
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <!-- <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item class="text-right">
            <el-button type="primary" class="wide-button" size="small" @click="handleWaterInfo">保存</el-button>
          </el-form-item>
        </el-col>-->
      </el-row>
      <!-- 保存信息 -->
      <div class="pertion">
        <el-button type="primary" class="wide-button el-btn" size="medium" @click="HandleBasicInfo">保存</el-button>
      </div>
      <el-divider></el-divider>
    </el-form>
    <GuarantorPossessionsDialog
      :dialogVisible="guarantorPossessionsDialogVisible"
      dialogTitle="家庭财产状况"
      @dialogCancel="guarantorPossessionsDialogClose"
      :outCheckSource="guarantorPossessionsData"
      :cascaderOptions="this.areaEnum.list"
      :outOtherpossessionsOptions="this.commonEnum.assertTypeOptions"
      :outHouseStructuralOptions="this.commonEnum.housingStructureOptions"
      @fuarantorPossessionsSave="fuarantorPossessionsSave"
      :sign="'basicInfo'"
      :ids="ids"
    ></GuarantorPossessionsDialog>
    <FamilyYearIncomeExpendDia
      :dialogVisible="familyIncomeExpendDialogVisible"
      dialogTitle="家庭收入与支出"
      @dialogCancel="familyIncomeExpendDialogClose"
      :outCheckSource="familyIncomeExpendData"
      @failyIncomeSave="failyIncomeSave"
      :ids="ids"
    ></FamilyYearIncomeExpendDia>
    <MortgageInfoDialog
      :dialogVisible="mortgageInfoDialogVisible"
      dialogTitle="担保人家庭财产状况"
      @dialogCancel="mortgageInfoDialogClose"
      :outCheckSource="mortgageInfoData"
      :cascaderOptions="this.commonEnum.contractTypeOptions"
    ></MortgageInfoDialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getLoanInfo, preserveBasicInfo, preserveContactsInfo, preserveCompanyInfo, preserveFamilyDebtInfo } from '@/api/loan-apply'
import { validateMobile } from '@/utils/validate'
import { handelDigital } from '@/utils/format.js'
import NP from 'number-precision'

export default {
  name: 'LoanApplyStep2BasicInfo',
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    FamilyYearIncomeExpendDia: () => import('@/components/FamilyYearIncomeExpendDia'),
    GuarantorPossessionsDialog: () => import('@/components/GuarantorPossessionsDialog'),
    MortgageInfoDialog: () => import('@/components/MortgageInfoDialog'),
    FamilyIncomeTabs: () => import('@/components/familyIncomeExpendTabs'),
    FamilyPropertyTabs: () => import('@/components/familyPropertyTabs')
  },
  computed: {
    ...mapGetters(['commonEnum', 'areaEnum'])
  },
  props: {
    datas: {
      type: Object,
      default: null
    }
  },
  data() {
    const validateLiveYear = (rule, value, callback) => {
      if (value !== this.basicInformation.creditApplyCustomerInfoOutDTO.censusRegisterAddress) {
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
      tableData: [], // 联系人信息
      companyTableData: [], // 名下企业
      addressHidden: false, // 控制 居住年限的显示隐藏
      activeName: 'first',
      familyIncomeExpendDialogVisible: false,
      guarantorPossessionsDialogVisible: false,
      mortgageInfoDialogVisible: false,
      timePickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      familyIncomeExpendData: {
        agriculturalData: [],
        baseExpendData: {}, // 基本支出 Map类型
        cultivateData: [],
        businessData: [],
        workIncomeData: [],
        basicSalaryData: [],
        governmentSubsidiesData: [],
        assetsData: []
      },
      // 担保人家庭财产状况
      guarantorPossessionsData: {
        commercialBuildingsData: [],
        homeBuildingData: [],
        otherPossessionsData: []
      },
      mortgageInfoData: {},
      basicInformation: {},
      basicFormRules: {
        'creditApplyCustomerInfoOutDTO.highestEdu': [{ required: true, message: '请选择最高学历', trigger: 'change' }],
        'creditApplyCustomerInfoOutDTO.familyAddress': [{ required: true, message: '请录入住址', trigger: ['blur', 'change'] }],
        'creditApplyCustomerInfoOutDTO.liveLimitYear': [{ required: true, validator: validateLiveYear, trigger: 'blur' }],
        'creditApplyCustomerInfoOutDTO.parentNum': [{ required: true, message: '请录入赡养老人人数', trigger: 'blur' }],
        'creditApplyCustomerInfoOutDTO.minorPersonNum': [{ required: true, message: '请录入未成年子女人数', trigger: 'blur' }],
        'creditApplyCustomerInfoOutDTO.minorPersonHigherEduNum': [{ required: true, message: '请录入未成年子女接受高等教育人数', trigger: 'blur' }],
        'creditApplyCustomerInfoOutDTO.adultPersonNum': [{ required: true, message: '请录入成年子女人数', trigger: 'blur' }],
        'creditApplyCustomerInfoOutDTO.familyNum': [{ required: true, message: '请录入家庭成员总人数', trigger: 'blur' }],
        'creditApplyCustomerInfoOutDTO.adultPersonHigherEduNum': [{ required: true, message: '请录入成年子女接受高等教育人数', trigger: 'blur' }],
        'creditApplyFamlilyFinanceOutDTO.outstandingAccounts': [{ required: true, message: '请录入赊账欠款', trigger: 'blur' }],
        'creditApplyFamlilyFinanceOutDTO.privateLending': [{ required: true, message: '请录入民间借贷', trigger: 'blur' }],
        'creditApplyFamlilyFinanceOutDTO.bankLoans': [{ required: true, message: '请录入银行贷款', trigger: 'blur' }],
        'creditApplyCustomerInfoOutDTO.famlilyIncome': [{ required: false, message: '请录入流入净值', trigger: 'blur' }],
        'creditApplyCustomerInfoOutDTO.famlilyExpend': [{ required: false, message: '请录入流出净值', trigger: 'blur' }]
      },
      familyIncomeData: [], // 家庭收入与支出的 表格
      familyPropertyData: [],
      // 同 增新信息一致
      incomeTabsLabel: {
        a: '农机服务',
        b: '经商',
        c: '养殖',
        d: '打工',
        e: '固定工资',
        f: '基本支出',
        g: '政府补贴',
        h: '购置资产'
      }, // 家庭收入表格 的tabs的标题
      incomeTableLabel: {
        farmingServiceLabel: {
          // 农机服务
          a: '服务类型',
          b: '农机数量',
          c: ' 服务面积(亩/农机)',
          d: '收入金额(万/农机)',
          e: '年支出金额(万/农机)'
        },
        businessLabel: {
          // 经商
          a: '经商项目',
          b: '年收入金额(万元)',
          c: '年支出金额(万元)'
        },
        breedLabel: {
          // 养殖
          a: '养殖种类',
          b: '养殖数量',
          c: '年收入金额(万元)',
          d: '年支出金额(万元)'
        },
        // assetsLabel: {
        //   a: '经商项目',
        //   b: '年收入金额(万元)',
        //   c: '年支出金额(万元)'
        // },
        // 打工
        WorkingLabel: {
          a: '打工人数',
          b: '工作内容',
          c: '打工地区',
          d: '收入金额(万元/人)'
        },
        // 固定工资
        fixedWageLabel: {
          a: '工作单位',
          b: '工作年限',
          c: '年收入金额(万元)'
        },
        // 基本支出
        basicExpendLabel: {
          a: '基本生活支出(万元)',
          b: '大病医疗支出金额(万元)',
          c: '婚丧嫁娶支出金额(万元)'
        },
        // 政府补贴
        subsidyLabel: {
          a: '是否领取政府低保',
          b: '补贴内容',
          c: '年补贴金额(万元)'
        },
        // 购置
        buyAssets: {
          a: '资产类型',
          // b: '其他资产类型',
          b: '支出金额(万元)'
        }
      },
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
          a: '资产类型',
          b: '资产价值(万)'
        }
      },
      ids: {
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      },
      stepInfo: {}
    }
  },
  watch: {
    // 监听 地址
    'basicInformation.creditApplyCustomerInfoOutDTO.familyAddress': {
      handler(val, oldVal) {
        if (this.basicInformation.creditApplyCustomerInfoOutDTO.familyAddress === this.basicInformation.creditApplyCustomerInfoOutDTO.censusRegisterAddress) {
          this.addressHidden = true
          this.basicInformation.creditApplyCustomerInfoOutDTO.liveLimitYear = ''
        } else {
          this.addressHidden = false
        }
      },
      deep: true
    }
  },
  created() {
    this.getInfo()
  },
  mounted() {},

  methods: {
    changNum() {
      this.basicInformation.creditApplyCustomerInfoOutDTO.familyNum = 1 + (this.basicInformation.creditApplyCustomerInfoOutDTO.parentNum * 1) + (this.basicInformation.creditApplyCustomerInfoOutDTO.minorPersonNum * 1) + (this.basicInformation.creditApplyCustomerInfoOutDTO.adultPersonNum * 1) + (this.basicInformation.creditApplyCustomerInfoOutDTO.marriage$FICDictName === '已婚' ? 1 : 0)
    },
    isObjectValueEqual(a, b) {
      // console.log(a, b)
      // 取对象a和b的属性名
      var aProps = Object.keys(a)
      var bProps = Object.keys(b)
      // 判断属性名的length是否一致
      if (aProps.length !== bProps.length) {
        return false
      }
      // 循环取出属性名，再判断属性值是否一致
      for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i]
        // console.log(a[propName])
        // arr.push(a[propName])
        // arr1.push(b[propName])
        if (a[propName] !== b[propName]) {
          return false
        }
      }
      return true
    },
    // 获取 基本信息
    getInfo() {
      const obj = {
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }
      getLoanInfo(obj).then(res => {
        if (res.status === 200) {
          this.stepInfo = JSON.parse(JSON.stringify(res.data)) // 按步骤保存需要用到
          this.basicInformation = res.data
          if (this.basicInformation.creditApplyFamlilyComeListDTO) {
            this.familyIncomeExpendData.agriculturalData = this.basicInformation.creditApplyFamlilyComeListDTO.machineryCreateDTOS
            this.familyIncomeExpendData.assetsData = this.basicInformation.creditApplyFamlilyComeListDTO.acquisitionAssetsDTOS
            this.familyIncomeExpendData.cultivateData = this.basicInformation.creditApplyFamlilyComeListDTO.breedCreateDTOS
            this.familyIncomeExpendData.businessData = this.basicInformation.creditApplyFamlilyComeListDTO.businessCreateDTOS
            this.familyIncomeExpendData.workIncomeData = this.basicInformation.creditApplyFamlilyComeListDTO.workingCreateDTOS
            this.familyIncomeExpendData.basicSalaryData = this.basicInformation.creditApplyFamlilyComeListDTO.salaryCreateDTOS
            this.familyIncomeExpendData.governmentSubsidiesData = this.basicInformation.creditApplyFamlilyComeListDTO.subsidiesCreateDTOS
            this.familyIncomeExpendData.baseExpendData = this.basicInformation.creditApplyFamlilyComeListDTO.baseDTOS
          }
          if (this.basicInformation.finances) {
            const allKeys = Object.keys(this.basicInformation.finances)
            if (allKeys.includes('1')) {
              this.guarantorPossessionsData.commercialBuildingsData = this.basicInformation.finances['1']
            } else {
              this.guarantorPossessionsData.commercialBuildingsData = []
            }
            if (allKeys.includes('2')) {
              this.guarantorPossessionsData.homeBuildingData = this.basicInformation.finances['2']
            } else {
              this.guarantorPossessionsData.homeBuildingData = []
            }
            if (allKeys.includes('99')) {
              this.guarantorPossessionsData.otherPossessionsData = this.basicInformation.finances['99']
            } else {
              this.guarantorPossessionsData.otherPossessionsData = []
            }
          }

          if (res.data.customerLinkmanReq.cusLinkmanlist !== null) {
            // 联系人信息 table 列表 每个list一个 editStatus
            // eg: 这里不能用push， 每次调用接口都会 push一条数据
            this.tableData = res.data.customerLinkmanReq.cusLinkmanlist.map((item, index) => {
              return {
                editStatus: false,
                ...item
              }
            })
          }
          if (res.data.customerEnterpriseOutDTOList !== null) {
            // 名下企业
            this.companyTableData = res.data.customerEnterpriseOutDTOList.map((item, index) => {
              return {
                editStatus: false,
                ...item
              }
            })
          }
        }
      })
    },
    // 同户籍地址
    handleSameAddress() {
      this.basicInformation.creditApplyCustomerInfoOutDTO.familyAddress = this.basicInformation.creditApplyCustomerInfoOutDTO.censusRegisterAddress
    },
    // 收入支出弹窗关闭
    familyIncomeExpendDialogClose() {
      this.familyIncomeExpendDialogVisible = false
    },
    guarantorPossessionsDialogClose() {
      this.guarantorPossessionsDialogVisible = false
    },
    mortgageInfoDialogClose() {
      this.mortgageInfoDialogVisible = false
    },
    // 添加家庭年收入与支出
    handleAddIncomeExpend() {
      // if (this.isObjectValueEqual(this.basicInformation.creditApplyCustomerInfoOutDTO, this.stepInfo.creditApplyCustomerInfoOutDTO)) {
      this.familyIncomeExpendDialogVisible = true
      // } else {
      // this.$message.error('请先保存基本信息')
      // }
    },
    // 家庭收入与支出保存
    failyIncomeSave(val) {
      this.getInfo()
      this.familyIncomeExpendDialogVisible = false
    },

    numberChange(e, val, max) {
      const newValue = handelDigital(e, true, '2')
      if (newValue === 0) {
        this.$set(this.basicInformation, val, parseFloat(newValue))
      } else if (parseFloat(newValue) >= max) {
        this.$nextTick(() => {
          this.$set(this.basicInformation, val, max)
        })
      } else {
        this.$nextTick(() => {
          this.$set(this.basicInformation, val, newValue)
        })
      }
    },
    // 家庭财产状况
    fuarantorPossessionsSave(value) {
      // this.familyPropertyData = value
      this.getInfo()
      this.guarantorPossessionsDialogVisible = false
    },
    // 添加联系人
    handleAdd(val) {
      if (val === 'contacts') {
        this.tableData.push({
          linkmanName: '',
          linkmanMobile: '',
          relationship: '',
          relationshipName: '',
          editStatus: true
        })
      } else if (val === 'company') {
        this.companyTableData.push({
          entType: '',
          entName: '',
          entBuildTime: '',
          equityRatio: '',
          shareholdersNum: '',
          totalAssert: '',
          totalDebt: '',
          capitalAmount: '',
          entTypeName: '',
          editStatus: true
        })
      }
    },
    linkePersonShowDel() {
      if (this.tableData.length <= 2) {
        return false
      } else {
        const a = this.tableData.length
        var tmpArray = []
        this.tableData.forEach(element => {
          if (element.editStatus === true) {
            tmpArray.push(element)
          }
        })
        const b = tmpArray.length
        const number = NP.minus(Number(a), Number(b))
        return number > 2
      }
    },
    // 联系人信息编辑
    handleEdit(index, item) {
      this.tableData = this.tableData.map(item1 => {
        if (item === item1) {
          item1.editStatus = true
        }
        return item1
      })
    },
    // 名下企业编辑
    handleCompanyEdit(index, item) {
      this.companyTableData = this.companyTableData.map(item1 => {
        if (item === item1) {
          item1.editStatus = true
        }
        return item1
      })
    },
    numberChangeTable(val, max) {
      const newValue = handelDigital(val, true, '2')
      if (newValue === 0) {
        return parseFloat(newValue)
      } else if (parseFloat(newValue) >= max) {
        return max
      } else {
        return newValue
      }
    },
    numberInsuranceChange(e, scope, val, max) {
      const newValue = handelDigital(e, true, '2')
      if (newValue === 0) {
        this.$set(this.companyTableData[scope.$index], val, parseFloat(newValue))
      } else if (parseFloat(newValue) >= max) {
        this.$nextTick(() => {
          this.$set(this.companyTableData[scope.$index], val, max)
        })
      } else {
        this.$nextTick(() => {
          this.$set(this.companyTableData[scope.$index], val, newValue)
        })
      }
    },
    // 名下企业 编辑后保存
    handleCompanySave(index, item) {
      item.entName = item.entName.replace(/\s+/g, '')
      let isVerifyCode = true
      if (item.entType.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入企业类型' })
      } else if (item.entName <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入企业名称' })
      } else if (item.entBuildTime.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入成立时间' })
      } else if (item.equityRatio.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入贷款申请人占股比' })
      } else if (item.shareholdersNum.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入企业股东人数' })
      } else if (item.capitalAmount.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入实缴资产' })
      } else if (item.totalAssert.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入年总资产' })
      } else if (item.totalDebt.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入年总负债' })
      }
      if (isVerifyCode) {
        // 不调接口 反显 根据字典过滤字段名字
        this.companyTableData.forEach(iton => {
          item.entTypeName = this.$store.state.app.commonEnum.entType[iton.entType]
        })
        this.companyTableData = this.companyTableData.map(item1 => {
          if (item === item1) {
            // item1.editStatus = false
            // item.customerId = '1d508a59053241149433cfaab415a78'
            // item.orderNo = '44aa4257-0b72-4fff-a359-50f6eee56dff'
            item.customerId = this.$route.query.customerId
            item.orderNo = this.$route.query.orderNo
            item.equityRatio = this.numberChangeTable(item.equityRatio, '100')
            item.capitalAmount = this.numberChangeTable(item.capitalAmount, '99999999999')
            item.totalAssert = this.numberChangeTable(item.totalAssert, '99999999999')
            item.totalDebt = this.numberChangeTable(item.totalDebt, '99999999999')
            item1.editStatus = false
          }
          return item1
        })
      }
    },
    // 联系人编辑后保存
    handleSave(index, item) {
      let isVerifyCode = true
      if (item.linkmanName.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入姓名' })
      } else if (item.linkmanMobile.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入手机号' })
      } else if (item.linkmanMobile.length !== 11) {
        isVerifyCode = false
        this.$message.error({ message: '请输入正确手机号' })
      } else if (item.linkmanMobile.length === 11 && !validateMobile(item.linkmanMobile)) {
        isVerifyCode = false
        this.$message.error({ message: '请输入正确手机号' })
      } else if (item.relationship.length <= 0) {
        isVerifyCode = false
        this.$message.error({ message: '请输入与借款人关系' })
      }
      if (isVerifyCode) {
        // 不调接口 反显 根据字典过滤字段名字
        // this.tableData.forEach(iton => {
        //   item.relationshipName = this.$store.state.app.commonEnum.relationship[iton.relationship]
        // })
        item.relationshipName = this.$store.state.app.commonEnum.relationship[item.relationship]
        this.tableData = this.tableData.map(item1 => {
          if (item === item1) {
            item1.customerId = this.$route.query.customerId
            item1.orderNo = this.$route.query.orderNo
            item1.editStatus = false
          }
          return item1
        })
      }
    },
    // 基本信息 保存包括联系人
    handlePreservationContacts() {
      // 不做动态校验表单的话 会被 elementui 校验表单卡住，警告：[Element Warn]please pass correct props!
      const arr =
        this.basicInformation.creditApplyCustomerInfoOutDTO.familyAddress !== this.basicInformation.creditApplyCustomerInfoOutDTO.censusRegisterAddress
          ? 'creditApplyCustomerInfoOutDTO.liveLimitYear'
          : null
      // const fieldList = ['creditApplyCustomerInfoOutDTO.highestEdu', arr, 'creditApplyCustomerInfoOutDTO.familyAddress', 'creditApplyCustomerInfoOutDTO.parentNum', 'creditApplyCustomerInfoOutDTO.minorPersonNum', 'creditApplyCustomerInfoOutDTO.minorPersonNum']
      const fieldList = [
        'creditApplyCustomerInfoOutDTO.highestEdu',
        arr,
        'creditApplyCustomerInfoOutDTO.familyAddress',
        'creditApplyCustomerInfoOutDTO.parentNum',
        'creditApplyCustomerInfoOutDTO.minorPersonNum',
        'creditApplyCustomerInfoOutDTO.minorPersonHigherEduNum',
        'creditApplyCustomerInfoOutDTO.adultPersonNum',
        'creditApplyCustomerInfoOutDTO.familyNum',
        'creditApplyCustomerInfoOutDTO.adultPersonHigherEduNum'
      ]
      for (let i = 0; i < fieldList.length; i++) {
        if (fieldList[i] === null) {
          fieldList.splice(i, 1) // 删除数组中是 null 的
        }
      }
      const _self = this
      Promise.all(
        fieldList.map(item => {
          return new Promise(function(resolve, reject) {
            _self.$refs['basicInformation'].validateField(item, error => {
              resolve(error)
            })
          })
        })
      ).then(data => {
        // data 里是各个字段的验证错误信息, 如果为空串则认为验证通过, 如果数组里全为空串则所有验证通过
        // 判断data 里是否全是空串
        const arr2 = data.every(i => i === '')
        if (arr2) {
          var tmp = []
          if (this.tableData.length > 0) {
            this.tableData.forEach(item => {
              if (item.editStatus === true) {
                tmp.push(item)
              }
            })
          }
          if (tmp.length > 0) {
            this.$message.warning('请保存联系人信息')
            return
          }
          const obj = {
            creditApplyCustomerInfoOutDTO: this.basicInformation.creditApplyCustomerInfoOutDTO,
            orderNo: this.$route.query.orderNo,
            customerLinkmanReq: {
              cusLinkmanlist: this.tableData,
              customerId: this.$route.query.customerId
            }
          }
          preserveContactsInfo(obj).then(res => {
            if (res.status === 200) {
              this.$message.success('基本信息保存成功')
              obj.customerLinkmanReq.cusLinkmanlist = []
            } else {
              this.$message.error(res.message || '保存失败，请稍后重试')
            }
          })
        }
      })
    },
    // 名下企业 保存 调接口
    handlePreservationCompany() {
      // // 按步骤--基本信息
      // if (this.isObjectValueEqual(this.basicInformation.creditApplyCustomerInfoOutDTO, this.stepInfo.creditApplyCustomerInfoOutDTO)) {
      //   // 家庭负债
      //   if (this.isObjectValueEqual(this.basicInformation.creditApplyFamlilyFinanceOutDTO, this.stepInfo.creditApplyFamlilyFinanceOutDTO)) {
      //   } else {
      //     this.$message.error('请先保存家庭负债信息')
      //   }
      // } else {
      //   this.$message.error('请先保存基本信息')
      // }
      var obj = []
      // if (this.companyTableData.length <= 0) {
      //   this.companyTableData.push({
      //     customerId: this.$route.query.customerId,
      //     orderNo: this.$route.query.orderNo
      //   })
      // } else {
      if (this.companyTableData.length > 0) {
        this.companyTableData.forEach(item => {
          if (item.editStatus === true) {
            obj.push(item)
          }
        })
      }
      if (obj.length > 0) {
        this.$message.warning('请保存名下企业')
        return
      }
      var array = this.companyTableData.length > 0 ? this.companyTableData : []
      preserveCompanyInfo({
        list: array,
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('保存成功')
        } else {
          this.$message.error(res.message)
        }
      })
    },
    // 取消
    handleCancel(index, item) {
      let isVerifyCode = true
      if (item.linkmanName.length <= 0) {
        isVerifyCode = false
      } else if (item.linkmanMobile.length <= 0) {
        isVerifyCode = false
      } else if (item.linkmanMobile.length !== 11) {
        isVerifyCode = false
      } else if (item.linkmanMobile.length === 11 && !validateMobile(item.linkmanMobile)) {
        isVerifyCode = false
      } else if (item.relationship.length <= 0) {
        isVerifyCode = false
      }
      if (isVerifyCode) {
        item.editStatus = false
      } else {
        this.tableData.splice(index, 1)
      }
    },
    // 联系人信息删除
    handleDelete(index, item) {
      this.tableData.splice(index, 1)
    },
    // 名下企业删除
    handleCompanyDelete(index, item) {
      this.companyTableData.splice(index, 1)
    },
    // 校验部分表单 -- 家庭负债
    handleFamliyInfo() {
      const p1 = new Promise((resolve, reject) => {
        this.$refs.basicInformation.validateField('creditApplyFamlilyFinanceOutDTO.outstandingAccounts', error => {
          if (!error) {
            resolve()
          } else {
            reject(error)
          }
        })
      })
      const p2 = new Promise((resolve, reject) => {
        this.$refs.basicInformation.validateField('creditApplyFamlilyFinanceOutDTO.privateLending', error => {
          if (!error) {
            resolve()
          } else {
            reject(error)
          }
        })
      })
      const p3 = new Promise((resolve, reject) => {
        this.$refs.basicInformation.validateField('creditApplyFamlilyFinanceOutDTO.bankLoans', error => {
          if (!error) {
            resolve()
          } else {
            reject(error)
          }
        })
      })
      Promise.all([p1, p2, p3])
        .then(() => {
          const obj = {
            outstandingAccounts: this.basicInformation.creditApplyFamlilyFinanceOutDTO.outstandingAccounts,
            privateLending: this.basicInformation.creditApplyFamlilyFinanceOutDTO.privateLending,
            bankLoans: this.basicInformation.creditApplyFamlilyFinanceOutDTO.bankLoans,
            customerId: this.$route.query.customerId,
            orderNo: this.$route.query.orderNo
          }
          preserveFamilyDebtInfo(obj).then(res => {
            if (res.status === 200) {
              this.$message.success(res.message || '保存成功')
            } else {
              this.$message.error(res.message || '保存失败，请稍后重试')
            }
          })
        })
        .catch(() => {
          this.$message.error('请填写必填字段')
        })
    },
    // 校验基本信
    HandleBasicInfo() {
      // !this.familyIncomeExpendData.agriculturalData || !this.familyIncomeExpendData.baseExpendData || !this.familyIncomeExpendData.cultivateData ||
      //   !this.familyIncomeExpendData.businessData || !this.familyIncomeExpendData.workIncomeData || !this.familyIncomeExpendData.basicSalaryData ||
      //   !this.familyIncomeExpendData.governmentSubsidiesData || !this.familyIncomeExpendData.assetsData
      if (!this.familyIncomeExpendData.baseExpendData) {
        this.$message.error('请至少完成家庭基本支出信息填写并保存')
        return false
      }
      if (this.basicInformation.finances['1'] || this.basicInformation.finances['2']) {
        this.basicInformation.creditApplyCustomerInfoOutDTO.customerId = this.$route.query.customerId
        this.basicInformation.creditApplyCustomerInfoOutDTO.orderNo = this.$route.query.orderNo
        /** 验证部分表单  用promise.all() 防止多次回调 */
        const arr1 = [
          'creditApplyFamlilyFinanceOutDTO.outstandingAccounts',
          'creditApplyFamlilyFinanceOutDTO.privateLending',
          'creditApplyFamlilyFinanceOutDTO.bankLoans'
        ]
        // 验证tabs 里的家庭负债
        const p1 = new Promise((resolve, reject) => {
          this.$refs.basicInformation.validateField(arr1, valid1 => {
            if (!valid1) {
              resolve()
            } else {
              this.activeName = 'second'
              reject()
            }
          })
        })
        // 验证全部表单
        const p3 = new Promise((resolve, reject) => {
          this.$refs.basicInformation.validate(valid3 => {
            if (valid3) {
              resolve()
            } else {
              reject()
            }
          })
        })
        Promise.all([p1, p3])
          .then(() => {
            var tmp = []
            if (this.tableData.length > 0) {
              this.tableData.forEach(item => {
                if (item.editStatus === true) {
                  tmp.push(item)
                }
              })
            }
            if (tmp.length > 0) {
              this.$message.warning('请保存联系人信息')
              return
            }
            var obj = []
            if (this.companyTableData.length > 0) {
              this.companyTableData.forEach(item => {
                if (item.editStatus === true) {
                  obj.push(item)
                }
              })
            }
            if (obj.length > 0) {
              this.$message.warning('请保存名下企业')
              return
            }

            this.basicInformation.customerLinkmanReq.cusLinkmanlist = this.tableData
            this.basicInformation.customerEnterpriseOutDTOList = this.companyTableData
            preserveBasicInfo(this.basicInformation).then(res => {
              if (res.status === 200) {
                this.$store.state.app.saveToastFlag && this.$message.success('保存成功')
                !this.$store.state.app.saveToastFlag && this.$emit('applyCredit')
                this.$store.dispatch('ToggleToastFlag', true)
              } else {
                this.$message.error(res.message)
                this.$store.dispatch('ToggleToastFlag', true)
              }
            })
          })
          .catch(() => {
            this.$message.error('请填写必填字段')
            this.$store.dispatch('ToggleToastFlag', true)
          })
      } else {
        this.$message.error('商品房、自建房客户至少填写一种')
        // 修复bug：点击借款申请--校验报错--修正点击保存会触发大保存 save. 异步问题 只能放4个
        this.$store.dispatch('ToggleToastFlag', true)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ #tab-first:before,
/deep/ #tab-second:before,
/deep/ #tab-third:before {
  content: '*';
  margin-right: 3px;
  color: rgba(247, 64, 64, 0.836);
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
.span-tit {
  top: 44px;
  position: relative;
  left: 0px;
}
.pertion {
  width: 100%;
  position: relative;
  .el-btn {
    position: absolute;
    margin-top: 25.8px;
    top: 27%;
    left: 40%;
    z-index: 999;
  }

}
</style>
