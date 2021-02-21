<template>
  <div class="app-container">
    <el-form
      ref="perfectPersonInfo"
      :model="perfectPersonInfo"
      :rules="basicFormRules"
      size="mini"
      class="m-t-20 p-l-10 block-el-select"
      label-position="right"
      label-width="140px"
      v-if="perfectPersonInfo.personBaseRep"
    >
      <span class="all-title">担保人基本信息</span>
      <el-divider></el-divider>
      <DescriptionList class="m-l-20" :content="perfectPersonInfo.personBaseRep">
        <Description label="姓名">{{perfectPersonInfo.personBaseRep.customerName}}</Description>
        <Description label="身份证号">{{perfectPersonInfo.idNo}}</Description>
        <Description label="手机号">{{perfectPersonInfo.personBaseRep.mobile}}</Description>
        <Description label="性别">{{perfectPersonInfo.personBaseRep.sex$FICDictName}}</Description>
        <Description label="出生日期">{{perfectPersonInfo.personBaseRep.birthday}}</Description>
        <Description label="民族">{{perfectPersonInfo.personBaseRep.national}}</Description>
        <Description label="年龄">{{perfectPersonInfo.personBaseRep.age}}</Description>
        <Description label="户籍地址">{{perfectPersonInfo.personBaseRep.censusRegisterAddress}}</Description>
        <Description label="婚姻状况">{{perfectPersonInfo.personBaseRep.marriage$FICDictName}}</Description>
      </DescriptionList>
      <DescriptionList class="m-l-20" v-if="perfectPersonInfo.spouse" :content="perfectPersonInfo.spouse">
        <Description label="配偶姓名">{{perfectPersonInfo.spouse.name}}</Description>
        <Description label="配偶手机号">{{perfectPersonInfo.spouse.mobile}}</Description>
        <Description label="配偶身份证号">{{perfectPersonInfo.spouse.idNo}}</Description>
      </DescriptionList>
      <template>
        <el-row :gutter="20">
          <el-col :span="7">
            <el-form-item prop="personBaseRep.highestEdu" label="最高学历:" label-width="100px">
              <el-select v-model="perfectPersonInfo.personBaseRep.highestEdu" placeholder="请选择" clearable>
                <el-option v-for="(item,key) in this.commonEnum.highestEdu" :key="key" :label="item" :value="key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-col :span="18">
              <el-form-item prop="personBaseRep.familyAddress" label="住址:" label-width="100px">
                <el-input maxlength=100  v-model="perfectPersonInfo.personBaseRep.familyAddress" placeholder="请输入住址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" class="wide-button" size="mini" @click="handleSameAddress">同户籍地址</el-button>
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="p-b-10">
          <!-- TODO：判断居住地址是否与户籍地址一致；
          1、一致，居住年限禁用不填
          2、不一致，居住年限启用，必填
          接口没返回居住年限字段 ：待改-->
          <el-col :span="7" v-if="!addressHidden">
            <!-- prop="personBaseRep.liveLimitYear" -->
            <el-form-item prop="personBaseRep.liveLimitYear" label="居住年限:" label-width="100px">
              <el-input v-model="perfectPersonInfo.personBaseRep.liveLimitYear" maxlength="3" :onkeyup="perfectPersonInfo.personBaseRep.liveLimitYear=perfectPersonInfo.personBaseRep.liveLimitYear && perfectPersonInfo.personBaseRep.liveLimitYear.replace(/\D/g,'')"  placeholder="居住年限"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="text-right">
            <el-button type="primary" class="wide-button" size="mini" @click="handleBasicInfo">保存</el-button>
          </el-col>
        </el-row>
      </template>

      <!-- 家庭年收入 -->
      <el-tabs type="border-card" v-model="activeName"  >
        <el-tab-pane label="家庭年收入" name="first"  >
          <el-button
            type="primary"
            class="wide-button"
            icon="el-icon-plus"
            @click="guarantorIncomeDialogVisible = true"
            size="mini"
          >添加收入</el-button>
          <FamilyIncomeTabs
            :tabsLabel="incomeTabsLabel"
            :TableLabel="incomeTableLabel"
            :TableProp="perfectPersonInfo.familyIncomeListDTO"
          ></FamilyIncomeTabs>
        </el-tab-pane>
        <el-tab-pane label="家庭负债" name="second"  >
          <el-tag>提示：若无相关负债金额，请填写"0"</el-tag>
          <el-row class="m-t-30">
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="liabilities.outstandingAccounts" label="赊欠账款:" label-width="80px">
                <el-input v-model="perfectPersonInfo.liabilities.outstandingAccounts" maxlength="11" placeholder="请输入">
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="liabilities.privateLending" label="民间借贷:" label-width="80px">
                <el-input v-model="perfectPersonInfo.liabilities.privateLending" maxlength="11" placeholder="请输入">
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
              <el-form-item prop="liabilities.bankLoans" label="银行贷款:" label-width="80px">
                <el-input v-model="perfectPersonInfo.liabilities.bankLoans" maxlength="11" placeholder="请输入">
                  <template slot="append">万元</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col class="text-right">
              <el-button type="primary" class="wide-button" size="mini" @click="handleFamliyInfo">保存</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="家庭财产状况" name="third"  >
          <el-tag>提示：商品房、自建房客户至少填写一种</el-tag>
          <br />
          <el-button
            type="primary"
            class="wide-button m-t-30"
            icon="el-icon-plus"
            size="mini"
            @click="guarantorPossessionsDialogVisible = true"
          >添加财产</el-button>
          <!-- <FamilyPropertyTabs :data="familyPropertyData"></FamilyPropertyTabs> -->
          <FamilyPropertyTabs
            :data="familyPropertyData"
            :tabsLabel="propertyTabsLabel"
            :TableLabel="propertyTableLabel"
            :TableProp="perfectPersonInfo.finances"
          ></FamilyPropertyTabs>
        </el-tab-pane>
      </el-tabs>
      <el-divider></el-divider>
      <!-- 影像资料 -->
      <el-tabs v-model="activeImageName" tab-position="left" @tab-click="clickTab">
        <el-tab-pane v-for="(item,index) in tabsData" :key="index" :name="item.code">
          <span slot="label">{{item.tabName}}</span>
          <div>
            <ImageUpload :imageList="imageData[item.code]" @updateChild="pushChild" />
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- 保存基本信息 -->
      <el-row>
        <el-col :span="24" class="text-right">
          <el-button type="primary" class="wide-button m-t-20" size="small" @click="handlePreserveInfo">保存信息</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!-- 担保额度 -->
      <div>
        <el-row :gutter="20" class="p-b-10">
          <el-col :span="6">
            <el-form-item prop="approvalLimit" label="建议担保额度:" label-width="120px">
              <el-input v-model="perfectPersonInfo.approvalLimit" maxlength="11" placeholder="担保额度"  >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="text-center p-b-30">
        <el-button @click="submitApproval" type="primary" class="wide-button" size="medium">提交审批</el-button>
      </div>
    </el-form>
    <GuarantorIncomeDialog
      :dialogVisible="guarantorIncomeDialogVisible"
      dialogTitle="家庭收入"
      @dialogCancel="guarantorIncomeDialogClose"
      :outCheckSource="guarantorIncomeData"
      @failyIncomeSave="failyIncomeSave"
      :outOptions="{outCropTypeOptions :commonEnum.plantingCropTypeOptions, outMachineTypeOptions : commonEnum.agriculturalMachineryTypeOptions}"
      :personId="perfectPersonInfo.id"
    ></GuarantorIncomeDialog>
    <GuarantorPossessionsDialog
      :dialogVisible="guarantorPossessionsDialogVisible"
      dialogTitle="担保人家庭财产状况"
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
import { handelDigital } from '@/utils/format'
import { mapGetters } from 'vuex'
import {
  guarantorDetail,
  perfectBasicInfo,
  perfectInfo,
  submitApprove,
  familyBatchSave,
  guaranteeFileBatchSave,
  releaseOccupyRemove
} from '@/api/cosigner-manage'
const money = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/ // 验证金钱额度
const length = /([1-9]\d{3})|([1-9]\d{4,})/ // 验证数字最小是1000

export default {
  name: 'CosignerManageStep2',
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    GuarantorIncomeDialog: () => import('@/components/GuarantorIncomeDialog'),
    GuarantorPossessionsDialog: () => import('@/components/GuarantorPossessionsDialog'),
    FamilyIncomeTabs: () => import('@/components/familyIncomeTabs'),
    FamilyPropertyTabs: () => import('@/components/familyPropertyTabs'),
    ImageUpload: () => import('@/components/ImageUpload')
  },
  computed: {
    ...mapGetters(['commonEnum', 'areaEnum'])
  },
  data() {
    const validateLiveYear = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入居住年限'))
      } else {
        callback()
      }
    }

    return {
      imageData: {
        person_marriage_certificate: [],
        person_account_book: [],
        legal_bank_statement: [],
        person_family_assets: []
      },
      perfectPersonInfo: {},
      guarantorInfo: {},
      addressHidden: false, // 控制 居住年限的显示隐藏
      activeName: 'first',
      activeImageName: 'person_marriage_certificate',
      basicFormRules: {
        approvalLimit: [{ required: true, message: '请选择担保额度', trigger: 'blur' }, { pattern: length, message: '输入金额最小为1000', trigger: 'blur' }],
        'personBaseRep.highestEdu': [{ required: true, message: '请选择最高学历', trigger: 'change' }],
        'personBaseRep.familyAddress': [{ required: true, message: '请录入住址', trigger: ['blur', 'change'] }],
        'personBaseRep.liveLimitYear': [{ required: true, validator: validateLiveYear, message: '请录入居住年限', trigger: 'blur' }],
        'liabilities.outstandingAccounts': [{ required: true, message: '请录入赊欠账款', trigger: 'blur' }, { pattern: money, message: '请输入合理的金额', trigger: 'blur' }],
        'liabilities.privateLending': [{ required: true, message: '请录入民间借贷', trigger: 'blur' }, { pattern: money, message: '请输入合理的金额', trigger: 'blur' }],
        'liabilities.bankLoans': [{ required: true, message: '请录入银行贷款', trigger: 'blur' }, { pattern: money, message: '请输入合理的金额', trigger: 'blur' }]
      },
      academicOptions: [
        {
          value: 6,
          label: '本科'
        },
        {
          value: 7,
          label: '硕士'
        }
      ],
      tabsData: [
        { tabName: '婚姻证明', code: 'person_marriage_certificate' },
        { tabName: '户口本', code: 'person_account_book' },
        { tabName: '银行流水', code: 'person_bank_statement' },
        { tabName: '家庭资产证明', code: 'person_family_assets' }
      ],
      guarantorIncomeDialogVisible: false,
      guarantorPossessionsDialogVisible: false,
      guarantorIncomeData: {
        agriculturalData: [],
        growIncomeData: [],
        cultivateData: [],
        businessData: [],
        workIncomeData: [],
        basicSalaryData: [],
        governmentSubsidiesData: []
      },
      // 担保人家庭财产状况
      guarantorPossessionsData: {
        commercialBuildingsData: [],
        homeBuildingData: [],
        otherPossessionsData: []
      },
      familyIncomeData: [], // 家庭收入的 表格
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
      },
      incomeTableProp: []
    }
  },
  watch: {
    'perfectPersonInfo.personBaseRep.familyAddress': {
      handler(val, oldVal) {
        if (this.perfectPersonInfo.personBaseRep.familyAddress === this.perfectPersonInfo.personBaseRep.censusRegisterAddress) {
          this.addressHidden = true
          this.perfectPersonInfo.personBaseRep.liveLimitYear = ''
        } else {
          this.addressHidden = false
        }
      },
      deep: true
    },
    'perfectPersonInfo.approvalLimit': {
      handler(newVal, oldVal) {
        this.perfectPersonInfo.approvalLimit = handelDigital(newVal, true, 2)
      }
    },
    'perfectPersonInfo.liabilities.outstandingAccounts': {
      handler(newVal, oldVal) {
        this.perfectPersonInfo.liabilities.outstandingAccounts = handelDigital(newVal, true, 2)
      }
    },
    'perfectPersonInfo.liabilities.privateLending': {
      handler(newVal, oldVal) {
        this.perfectPersonInfo.liabilities.privateLending = handelDigital(newVal, true, 2)
      }
    },
    'perfectPersonInfo.liabilities.bankLoans': {
      handler(newVal, oldVal) {
        this.perfectPersonInfo.liabilities.bankLoans = handelDigital(newVal, true, 2)
      }
    }
  },
  created() {},
  mounted() {
    this.getInfo()
  },
  methods: {
    // 获取担保人详情
    getInfo() {
      guarantorDetail(this.$route.query.applyNo).then(res => {
        if (res.status === 200) {
          const obj = Object.assign({}, res.data)
          // 处理负债信息数据格式 [{}] => {}
          obj.liabilities = {
            ...res.data.liabilities[0],
            outstandingAccounts: res.data.liabilities[0] && res.data.liabilities[0].outstandingAccounts,
            privateLending: res.data.liabilities[0] && res.data.liabilities[0].privateLending,
            bankLoans: res.data.liabilities[0] && res.data.liabilities[0].bankLoans
          }
          this.perfectPersonInfo = obj
          this.guarantorInfo = {
            id: res.data.id,
            customerId: res.data.customerId
          }
          this.imageData = {
            person_marriage_certificate: res.data.listMap.person_marriage_certificate,
            person_account_book: res.data.listMap.person_account_book,
            legal_bank_statement: res.data.listMap.legal_bank_statement,
            person_family_assets: res.data.listMap.person_family_assets
          }
          this.guarantorPossessionsData = {
            commercialBuildingsData: res.data.finances['1'] || [],
            homeBuildingData: res.data.finances['2'] || [],
            otherPossessionsData: res.data.finances['99'] || []
          }
          this.guarantorIncomeData.agriculturalData = res.data.familyIncomeListDTO.machineryCreateDTOS
          this.guarantorIncomeData.growIncomeData = res.data.familyIncomeListDTO.plantCreateDTOS
          this.guarantorIncomeData.cultivateData = res.data.familyIncomeListDTO.breedCreateDTOS
          this.guarantorIncomeData.businessData = res.data.familyIncomeListDTO.businessCreateDTOS
          this.guarantorIncomeData.workIncomeData = res.data.familyIncomeListDTO.workingCreateDTOS
          this.guarantorIncomeData.basicSalaryData = res.data.familyIncomeListDTO.salaryCreateDTOS
          this.guarantorIncomeData.governmentSubsidiesData = res.data.familyIncomeListDTO.subsidiesCreateDTOS
        }
      })
    },
    // 同户籍地址
    handleSameAddress() {
      this.perfectPersonInfo.personBaseRep.liveLimitYear = ''
      if (this.perfectPersonInfo.personBaseRep.censusRegisterAddress) {
        this.perfectPersonInfo.personBaseRep.familyAddress = this.perfectPersonInfo.personBaseRep.censusRegisterAddress
      }
    },
    // 保存用户信息
    handleBasicInfo() {
      // 不做动态校验表单的话 会被 elementui 校验表单卡住，警告：[Element Warn]please pass correct props!
      const arr =
        this.perfectPersonInfo.personBaseRep.familyAddress !== this.perfectPersonInfo.personBaseRep.censusRegisterAddress ? 'personBaseRep.liveLimitYear' : null
      const fieldList = ['personBaseRep.highestEdu', arr, 'personBaseRep.familyAddress']
      for (let i = 0; i < fieldList.length; i++) {
        if (fieldList[i] === null) {
          fieldList.splice(i, 1) // 删除数组中是 null 的
        }
      }
      const _self = this
      Promise.all(
        fieldList.map(item => {
          return new Promise(function(resolve, reject) {
            _self.$refs['perfectPersonInfo'].validateField(item, error => {
              if (!error) {
                resolve(error)
              } else {
                reject(error)
              }
            })
          })
        })
      )
        .then(data => {
          const arr2 = data.every(i => i === '')
          if (arr2) {
            const obj = JSON.parse(JSON.stringify(this.perfectPersonInfo.personBaseRep).replace(/familyAddress/g, 'address'))
            this.$set(obj, 'personId', this.perfectPersonInfo.id)
            perfectBasicInfo(obj).then(res => {
              if (res.status === 200) {
                this.$message.success(res.message || '成功')
              } else {
                this.$message.error(res.message || '失败')
              }
            })
          }
        })
        .catch(error => {
          console.log('失败', error)
        })
    },
    // 校验部分表单 -- 家庭负债
    handleFamliyInfo() {
      const obj = {
        liabilities: [
          {
            outstandingAccounts: this.perfectPersonInfo.liabilities.outstandingAccounts,
            privateLending: this.perfectPersonInfo.liabilities.privateLending,
            bankLoans: this.perfectPersonInfo.liabilities.bankLoans
          }
        ],
        personId: this.perfectPersonInfo.id
      }
      const arr = ['liabilities.outstandingAccounts', 'liabilities.privateLending', 'liabilities.bankLoans']
      new Promise((resolve, reject) => {
        this.$refs.perfectPersonInfo.validateField(arr, valid => {
          if (!valid) {
            resolve()
          } else {
            reject()
          }
        })
      }).then(() => {
        familyBatchSave(obj).then(res => {
          if (res.status === 200) {
            this.$message.success(res.message || '成功')
          } else {
            this.$message.error(res.message || '失败')
          }
        })
      })
    },
    // 保存信息
    handlePreserveInfo() {
      const map = {
        address: this.perfectPersonInfo.personBaseRep.familyAddress,
        applyNo: this.perfectPersonInfo.applyNo,
        highestEdu: this.perfectPersonInfo.personBaseRep.highestEdu,
        personId: this.perfectPersonInfo.id,
        familyIncomeListDTO: {
          // 家庭年收入
          breedCreateDTOS: [],
          businessCreateDTOS: [],
          machineryCreateDTOS: [],
          plantCreateDTOS: [],
          salaryCreateDTOS: [],
          subsidiesCreateDTOS: [],
          workingCreateDTOS: []
        },
        finances: {
          1: [{}],
          2: [{}],
          99: [{}]
        },
        // 家庭负债
        liabilities: [
          {
            outstandingAccounts: this.perfectPersonInfo.liabilities.outstandingAccounts,
            privateLending: this.perfectPersonInfo.liabilities.privateLending,
            bankLoans: this.perfectPersonInfo.liabilities.bankLoans
          }
        ]
      }
      map.familyIncomeListDTO = this.perfectPersonInfo.familyIncomeListDTO
      map.finances = this.perfectPersonInfo.finances
      const p1 = new Promise((resolve, reject) => {
        this.$refs.perfectPersonInfo.validateField('liabilities.outstandingAccounts', error => {
          if (!error) {
            resolve()
          } else {
            reject(error)
          }
        })
      })
      const p2 = new Promise((resolve, reject) => {
        this.$refs.perfectPersonInfo.validateField('liabilities.privateLending', error => {
          if (!error) {
            resolve()
          } else {
            this.activeName = 'second'
            reject(error)
          }
        })
      })
      const p3 = new Promise((resolve, reject) => {
        this.$refs.perfectPersonInfo.validateField('liabilities.bankLoans', error => {
          if (!error) {
            resolve()
          } else {
            this.activeName = 'second'
            reject(error)
          }
        })
      })
      const flag = Object.keys(map.familyIncomeListDTO).some(v => map.familyIncomeListDTO[v].length && map.familyIncomeListDTO[v].length > 0)
      if (!flag) {
        this.activeName = 'first'
        this.$message.error('家庭年收入至少填写一项')
        return
      }
      const flag1 = Object.keys(map.finances).some(v => map.finances[v].length && map.finances[v].length > 0)
      if (!flag1) {
        this.activeName = 'third'
        this.$message.error('家庭财产状况至少填写一项')
        return
      }

      Promise.all([p1, p2, p3])
        .then(() => {
          perfectInfo(map).then(res => {
            this.handleGuaranteeBatchSave() // 调用保存影像信息接口
            if (res.status === 200) {
              this.$message.success(res.message || '通过')
            } else {
              this.$message.error(res.message || '失败')
            }
          })
        })
        .catch(() => {
          this.$message.error('请填写必填字段')
        })
    },
    // 保存影像信息
    handleGuaranteeBatchSave() {
      const params = {
        fileMap: this.imageData,
        id: this.perfectPersonInfo.id
      }
      guaranteeFileBatchSave(params).then(res => {
        if (res.status !== 200) {
          this.$message.error(res.message)
        }
      })
    },
    // 提交审批
    submitApproval() {
      const obj = {
        applyNo: this.perfectPersonInfo.applyNo,
        approvalLimit: this.perfectPersonInfo.approvalLimit,
        highestEdu: this.perfectPersonInfo.personBaseRep.highestEdu,
        address: this.perfectPersonInfo.personBaseRep.familyAddress,
        liveLimitYear: this.perfectPersonInfo.personBaseRep.liveLimitYear,
        fileMap: this.imageData,
        finances: this.perfectPersonInfo.finances,
        familyIncomeListDTO: this.perfectPersonInfo.familyIncomeListDTO,
        liabilities: [
          {
            outstandingAccounts: this.perfectPersonInfo.liabilities.outstandingAccounts,
            privateLending: this.perfectPersonInfo.liabilities.privateLending,
            bankLoans: this.perfectPersonInfo.liabilities.bankLoans
          }
        ]
      }
      /** 验证部分表单  用promise.all() 防止多次回调 */
      const arr1 = ['liabilities.outstandingAccounts', 'liabilities.privateLending', 'liabilities.bankLoans']
      // 验证tabs 里的家庭负债
      const p1 = new Promise((resolve, reject) => {
        this.$refs.perfectPersonInfo.validateField(arr1, valid1 => {
          if (!valid1) {
            resolve()
          } else {
            this.activeName = 'second'
            reject()
          }
        })
      })

      const p2 = new Promise((resolve, reject) => {
        this.$refs.perfectPersonInfo.validate(valid1 => {
          if (valid1) {
            resolve()
          } else {
            reject()
          }
        })
      })
      const flag = Object.keys(obj.familyIncomeListDTO).some(v => obj.familyIncomeListDTO[v].length && obj.familyIncomeListDTO[v].length > 0)
      if (!flag) {
        this.activeName = 'first'
        this.$message.error('家庭年收入至少填写一项')
        return
      }
      const flag1 = Object.keys(obj.finances).some(v => obj.finances[v].length && obj.finances[v].length > 0)
      if (!flag1) {
        this.activeName = 'third'
        this.$message.error('家庭财产状况至少填写一项')
        return
      }

      Promise.all([p1, p2])
        .then(res => {
          submitApprove(obj).then(res => {
            if (res.status === 200) {
              this.$message.success('通过')
              this.$emit('approval', 2)
              releaseOccupyRemove(this.$route.query.applyNo).then(result => {
                if (result.status === 200) {
                  this.$message.success(result.message)
                }
              })
            } else {
              this.$message.error(res.message || '失败')
            }
          })
        })
        .catch(() => {
          this.$message.error('请填写必填字段')
        })
    },
    guarantorIncomeDialogClose() {
      this.guarantorIncomeDialogVisible = false
    },
    guarantorPossessionsDialogClose() {
      this.guarantorPossessionsDialogVisible = false
    },
    // 家庭收入
    failyIncomeSave(value) {
      if (value) {
        this.getInfo()
      }
      this.guarantorIncomeDialogVisible = false
    },
    // 家庭财产状况
    fuarantorPossessionsSave(value) {
      // this.perfectPersonInfo.finances = value
      if (value) {
        this.getInfo()
      }
      this.guarantorPossessionsDialogVisible = false
    },
    // 添加图片
    pushChild(list) {
      this.imageData[this.activeImageName] = list
    },
    // 切换影像资料tab
    clickTab(target, event) {
      this.activeImageName = target.name
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
</style>
