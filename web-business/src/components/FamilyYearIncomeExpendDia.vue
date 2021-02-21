<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="880px"
      class="family-income-expend-dialog"
      @open="dialogOpen"
    >
      <!-- <el-divider></el-divider> -->
      <el-steps class="m-t-20" :active="this.currentStep" finish-status="success" simple>
        <el-step title="选择家庭收入与支出类型"></el-step>
        <el-step title="填写收入支出情况"></el-step>
      </el-steps>
      <!-- 第一步：选择家庭收入类型 -->
      <div v-show="this.currentStep === 0" class="step1-container">
        <el-checkbox
          style="margin-left:30px; margin-top:40px"
          :indeterminate="isIndeterminate"
          v-model="step1CheckAll"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group v-model="checkedIncomeTypes" @change="handleCheckedTypesChange">
          <el-checkbox v-for="item in incomeTypes" :label="item" :key="item.code" @change="handleCheckedTypeChange">
            {{ item.value }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- 第二步：填写收入情况 -->
      <div v-show="this.currentStep === 1">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane :key="item.code" v-for="item in checkedIncomeTypes" :label="item.value" :name="item.value">
            <div v-if="exchangeTitleToType(item.value) === 'agricultural'">
              <TableEdit
                ref="agriculturalTable"
                :columns="agricultural"
                :data="agriculturalData"
                :buttons="agriculturalButtons"
                row-key="tmpid"
                :border="true"
              >
                <template #column="scope">
                  <template v-if="scope.prop === 'incomeChildType'">
                    <!-- {{scope.field.rules}} -->
                    <el-select
                      size="mini"
                      v-model="scope.row.incomeChildType"
                      filterable
                      placeholder="请选择"
                      clearable
                      :rules="scope.field.rules"
                      :disabled="scope.row.incomeChildType !== '' && !agriculturalEditIds.includes(scope.row.tmpid)"
                      @change="changeSelect(scope.row)"
                    >
                      <el-option
                        v-for="item in machineTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <br>
                    <el-input
                      :disabled="scope.row.incomeChildType !== '' && !agriculturalEditIds.includes(scope.row.tmpid)"
                      v-show="scope.row.incomeChildType === 'other'"
                      placeholder="请输入其他服务类型"
                      maxlength="50"
                      size="mini"
                      v-model="scope.row.incomeChildTypeInfo"
                    ></el-input>
                    <!-- <div>{{scope.row.tmpid}}11</div> -->
                    <!-- <span>{{scope.row.incomeChildType}} 岁</span> -->
                  </template>
                </template>
              </TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('agricultural')">添加</el-button>
              </div>
            </div>
            <div v-else-if="exchangeTitleToType(item.value) === 'business'">
              <TableEdit
                ref="businessTable"
                :columns="business"
                :data="businessData"
                :buttons="businessButtons"
                row-key="tmpid"
                border
              ></TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('business')">添加</el-button>
              </div>
            </div>
            <div v-else-if="exchangeTitleToType(item.value) === 'basicSalary'">
              <TableEdit
                ref="basicSalaryTable"
                :columns="basicSalary"
                :data="basicSalaryData"
                :buttons="basicSalaryButtons"
                row-key="tmpid"
              ></TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('basicSalary')">添加</el-button>
              </div>
            </div>
            <!-- 养殖收入 -->
            <div v-else-if="exchangeTitleToType(item.value) === 'cultivate'">
              <TableEdit
                ref="cultivateTable"
                :columns="cultivate"
                :data="cultivateData"
                :buttons="cultivateButtons"
                row-key="tmpid"
              ></TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('cultivate')">添加</el-button>
              </div>
            </div>
            <div v-else-if="exchangeTitleToType(item.value) === 'governmentSubsidies'">
              <TableEdit
                ref="governmentSubsidiesTable"
                :columns="governmentSubsidies"
                :data="governmentSubsidiesData"
                :buttons="governmentSubsidiesButtons"
                row-key="tmpid"
              ></TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('governmentSubsidies')">添加</el-button>
              </div>
            </div>
            <div v-else-if="exchangeTitleToType(item.value) === 'assets'">
              <TableEdit
                ref="assetsTable"
                :columns="assets"
                :data="assetsData"
                :buttons="assetsButtons"
                row-key="tmpid"
              ></TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('assets')">添加</el-button>
              </div>
            </div>
            <div v-else-if="exchangeTitleToType(item.value) === 'workIncome'">
              <TableEdit
                ref="workIncomeTable"
                :columns="workIncome"
                :data="workIncomeData"
                :buttons="workIncomeButtons"
                row-key="tmpid"
              ></TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('workIncome')">添加</el-button>
              </div>
            </div>
            <div v-else-if="exchangeTitleToType(item.value) === 'baseExpend'">
              <TableEdit
                ref="baseExpendTable"
                :columns="baseExpend"
                :data="baseExpendData"
                :buttons="baseExpendButtons"
                row-key="tmpid"
              ></TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" v-show="baseExpendData.length !== 1" @click="$_handleAdd('baseExpend')">
                  添加
                </el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-row>
          <el-col v-if="this.currentStep === 0">
            <el-button size="mini" type="primary" class="wide-button" @click="nextStep()">下一步</el-button>
            <el-button size="mini" class="wide-button" @click="dialogCancel">关闭</el-button>
          </el-col>
          <el-col v-else>
            <el-button size="mini" class="wide-button" @click="backStep()">上一步</el-button>
            <el-button size="mini" type="primary" class="wide-button" @click="submitForm()">保存</el-button>
            <el-button size="mini" class="wide-button" @click="dialogCancel">关闭</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TableEdit from '@/components/TableEdit'
import { v4 as uuidv4 } from 'uuid'
import { validateNum } from '@/utils/validate'
import { mapGetters } from 'vuex'
import { addApplyCreditApplyFamlilyComeInfo } from '@/api/business-common'

const incomeTypeOptions = [
  {
    type: 'incomeType',
    typeDesc: '家庭年收入与支出类型',
    code: '01',
    value: '政府补贴收入'
  },
  {
    type: 'incomeType',
    typeDesc: '家庭年收入与支出类型',
    code: '02',
    value: '打工收入'
  },
  {
    type: 'incomeType',
    typeDesc: '家庭年收入与支出类型',
    code: '03',
    value: '固定工资收入'
  },
  {
    type: 'incomeType',
    typeDesc: '家庭年收入与支出类型',
    code: '04',
    value: '基本支出'
  },
  {
    type: 'incomeType',
    typeDesc: '家庭年收入与支出类型',
    code: '05',
    value: '购置资产支出'
  },
  {
    type: 'incomeType',
    typeDesc: '家庭年收入与支出类型',
    code: '06',
    value: '养殖收入与支出'
  },
  {
    type: 'incomeType',
    typeDesc: '家庭年收入与支出类型',
    code: '07',
    value: '农机服务收入与支出'
  },
  {
    type: 'incomeType',
    typeDesc: '家庭年收入与支出类型',
    code: '08',
    value: '经商收入与支出'
  }
]

export default {
  components: {
    TableEdit
  },
  name: 'familyIncomeExpendDialog',
  props: {
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    /**
     * 外部传入所有收入的对象
     * {
        agriculturalData: this.agriculturalData,
        baseExpendData: this.baseExpendData,
        cultivateData: this.cultivateData,
        businessData: this.businessData,
        workIncomeData: this.workIncomeData,
        basicSalaryData: this.basicSalaryData,
        governmentSubsidiesData: this.governmentSubsidiesData
        assetsData:this.assetsData
      }
     */
    outCheckSource: {
      type: Object
    },
    /**
     * 联级选择数据源
     * 内部mapGetters获取报无法找到属性和方法
     * 现只能通过属性外部传值
     */
    // TODO: 尝试别的方式
    // 资产类型
    assetsTypeOptions: {
      type: Array,
      default() {
        return [
          {
            value: '01',
            label: '家用汽车'
          },
          {
            value: '02',
            label: '商品房'
          },
          {
            value: '03',
            label: '机械设备'
          },
          {
            value: '99',
            label: '其他'
          }
        ]
      }
    },
    // 服务类型
    // machineTypeOptions: {
    //   type: Array,
    //   default() {
    //     return [
    //       {
    //         value: 'power',
    //         label: '动力'
    //       },
    //       {
    //         value: 'cultivated',
    //         label: '耕地'
    //       },
    //       {
    //         value: 'sow',
    //         label: '播种'
    //       },
    //       {
    //         value: 'medicine',
    //         label: '打药'
    //       },
    //       {
    //         value: 'harvest',
    //         label: '收割'
    //       },
    //       {
    //         value: 'threshing',
    //         label: '脱粒'
    //       },
    //       {
    //         value: 'dry',
    //         label: '烘干'
    //       },
    //       {
    //         value: 'other',
    //         label: '其他'
    //       }
    //     ]
    //   }
    // },
    // machineTypeOptions: [],
    ids: {
      type: Object
    }
  },
  data() {
    // 输入数字校验
    const validateNumRule = (rule, value, callback) => {
      var message = ''
      if (rule.field === 'machineNum') {
        message = '农机数量'
      } else if (rule.field === 'serviceArea') {
        message = '服务面积'
      } else if (rule.field === 'yearIncome') {
        message = '收入金额'
      } else if (rule.field === 'yearExpend') {
        message = '支出金额'
      } else if (rule.field === 'workYear') {
        message = '工作年限'
      } else if (rule.field === 'breedNum') {
        message = '养殖数量'
      } else if (rule.field === 'subsidyAmount') {
        message = '年补贴金额'
      } else if (rule.field === 'workNum') {
        message = '打工人数'
      } else if (rule.field === 'yearExpend01') {
        message = '基本生活支出'
      } else if (rule.field === 'yearExpend02') {
        message = '大病医疗支出'
      } else if (rule.field === 'yearExpend03') {
        message = '婚丧嫁娶支出'
      }
      if ((rule.field === 'yearExpend03' || rule.field === 'yearExpend02') && parseFloat(value) >= 0) {
        callback()
      } else if ((rule.field === 'yearExpend03' || rule.field === 'yearExpend02') && parseFloat(value) < 0) {
        callback(new Error(`请输入正确的${message}(不能输入负数)`))
      } else {
        if (value === '') {
          callback(new Error('请输入' + message))
        } else if (parseFloat(value) <= 0) {
          callback(new Error(`请输入正确的${message}(不能输入负数或0)`))
        } else if (!validateNum(value)) {
          callback(new Error(`请输入正确的${message}不能输入负数或0)`))
        } else {
          callback()
        }
      }
    }
    // 服务类型校验
    const validateType = (rule, value, callback) => {
      if (this.agriculturalData[0].incomeChildType === '') {
        callback(new Error('请选择服务类型'))
      } else {
        callback()
      }
    }
    // 其他资产校验
    const validateAssetTypePass = (rule, value, callback) => {
      // editableTabsValue
      // 获取当前tab
      // const subTab = this.exchangeTitleToType(this.editableTabsValue)
      if (this.currentChooseAssets.incomeChildType === '99') {
        if (value) {
          callback()
        } else {
          callback(new Error('请输入其他资产类型'))
        }
      } else {
        callback()
      }
    }
    return {
      currentStep: 0,
      editableTabsValue: '',
      checkedIncomeTypes: [],
      step1CheckAll: false,
      incomeTypes: incomeTypeOptions,
      isIndeterminate: false,
      currentChooseAssets: {},
      // 农机服务收入
      agriculturalData: [],
      // 基本支出
      baseExpendData: [],
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
      // 购置资产
      assetsData: [],
      /**
       * 农机服务收入与支出、
       * TODO:待改
        machineType:服务类型
        machineCount:农机数量
        area: 服务面积
        Income: 收入
      */
      agricultural: Object.freeze([
        {
          label: '服务类型',
          prop: 'incomeChildType',
          // 格式化表格,与element-ui 的表格属性相同
          // formatter: (row, column, cellValue) => {
          //   const obj = this.machineTypeOptions.find(item => {
          //     if (item.value === cellValue) {
          //       return item
          //     }
          //   })
          //   return (obj && obj.label) || cellValue
          // },
          // editable: true,
          useSlot: true,
          field: {
            componentType: 'select',
            // options: this.machineTypeOptions,
            rules: [
              {
                required: true,
                validator: validateType,
                trigger: 'change'
              }
            ]
          }
        },
        {
          label: '农机数量',
          prop: 'machineNum',
          // 格式化表格,与element-ui 的表格属性相同
          // formatter: (row, column, cellValue) => {
          //   return cellValue === '1' ? '男' : '女'
          // },
          editable: true,
          field: {
            componentType: 'number',
            options: '请输入农机数量',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 0
          }
        },
        {
          label: '服务面积(亩/农机)',
          prop: 'serviceArea',
          // 格式化表格,与element-ui 的表格属性相同
          // formatter: (row, column, cellValue) => {
          //   return cellValue === '1' ? '男' : '女'
          // },
          editable: true,
          field: {
            componentType: 'number',
            options: '请输入服务面积',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '收入金额(万/农机)',
          prop: 'yearIncome',
          // 格式化表格,与element-ui 的表格属性相同
          // formatter: (row, column, cellValue) => {
          //   return cellValue === '1' ? '男' : '女'
          // },
          editable: true,
          field: {
            componentType: 'number',
            options: '请输入收入金额',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '年支出金额(万/农机)',
          prop: 'yearExpend',
          // 格式化表格,与element-ui 的表格属性相同
          // formatter: (row, column, cellValue) => {
          //   return cellValue === '1' ? '男' : '女'
          // },
          editable: true,
          field: {
            componentType: 'number',
            options: '请输入年支出金额',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '操作',
          actions: [
            {
              id: 'edit',
              rowKey: 'tmpid',
              text: '编辑',
              before: row => !this.agriculturalEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'agricultural')
            },
            {
              id: 'save',
              rowKey: 'tmpid',
              text: '保存',
              before: row => this.agriculturalEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'agricultural')
            },
            {
              id: 'edit',
              rowKey: 'tmpid',
              text: '删除',
              click: row => this.$_handleDel(row, 'agricultural')
            }
          ]
        }
      ]),
      /**
       * 经商收入与支出
        businessProject:'',//经商项目
        businessIncome:'',//经商收入
      */
      business: Object.freeze([
        {
          label: '经商项目',
          prop: 'businessProject',
          editable: true,
          field: {
            componentType: 'input',
            placeholder: '请输入经商项目',
            rules: [
              {
                required: true,
                message: '请输入经商项目'
              }
            ],
            maxLength: '50'
          }
        },
        {
          label: '年收入金额(万元)',
          prop: 'yearIncome',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入收入金额',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '年支出金额(万)',
          prop: 'yearExpend',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入年支出金额',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '操作',
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => !this.businessEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'business')
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.businessEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'business')
            },
            {
              id: 'edit',
              text: '删除',
              click: row => this.$_handleDel(row, 'business')
            }
          ]
        }
      ]),
      /**
       * 固定工资收入与支出
       */
      basicSalary: Object.freeze([
        {
          label: '工作单位',
          prop: 'workCompany',
          editable: true,
          field: {
            componentType: 'input',
            placeholder: '请输入工作单位',
            rules: [
              {
                required: true,
                message: '请输入工作单位'
              }
            ],
            maxLength: '50'
          }
        },
        {
          label: '工作年限',
          prop: 'workYear',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入工作年限',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            max: 100,
            precision: 1
          }
        },
        {
          label: '年收入金额(万元)',
          prop: 'yearIncome',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入收入金额',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '操作',
          actions: [
            {
              rowKey: 'tmpid',
              id: 'edit',
              text: '编辑',
              before: row => !this.basicSalaryEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'basicSalary')
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.basicSalaryEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'basicSalary')
            },
            {
              id: 'edit',
              text: '删除',
              click: row => this.$_handleDel(row, 'basicSalary')
            }
          ]
        }
      ]),
      // 养殖
      cultivate: Object.freeze([
        {
          label: '养殖种类',
          prop: 'incomeChildType',
          editable: true,
          field: {
            componentType: 'input',
            placeholder: '请输入养殖种类',
            rules: [
              {
                required: true,
                message: '请输入养殖种类'
              }
            ],
            maxLength: '50'
          }
        },
        {
          label: '养殖数量',
          prop: 'breedNum',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入养殖数量',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 0
          }
        },
        {
          label: '年收入金额(万元)',
          prop: 'yearIncome',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入收入金额',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '年支出金额(万)',
          prop: 'yearExpend',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入年支出金额',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '操作',
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => !this.cultivateEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'cultivate')
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.cultivateEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'cultivate')
            },
            {
              id: 'edit',
              text: '删除',
              click: row => this.$_handleDel(row, 'cultivate')
            }
          ]
        }
      ]),
      // 政府补贴
      governmentSubsidies: Object.freeze([
        {
          label: '补贴内容',
          prop: 'governmentSubsidyContent',
          editable: true,
          field: {
            componentType: 'input',
            placeholder: '请输入补贴内容',
            rules: [
              {
                required: true,
                message: '请输入补贴内容'
              }
            ],
            maxLength: '100'
          }
        },
        {
          label: '年补贴金额(万元)',
          prop: 'subsidyAmount',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '操作',
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => !this.governmentSubsidiesEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'governmentSubsidies')
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.governmentSubsidiesEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'governmentSubsidies')
            },
            {
              id: 'edit',
              text: '删除',
              click: row => this.$_handleDel(row, 'governmentSubsidies')
            }
          ]
        }
      ]), // 政府补贴
      /**
       *  购置资产
       *  assetsData
       */
      assets: Object.freeze([
        {
          label: '资产类型',
          prop: 'incomeChildType',
          formatter: (row, column, cellValue) => {
            const obj = this.assetsTypeOptions.find(item => {
              if (item.value === cellValue) {
                return item
              }
            })
            return (obj && obj.label) || cellValue
          },
          editable: true,
          field: {
            // events: {
            //   change: value => {
            //     if (value !== '99') {
            //       this.$set(this.currentChooseAssets, 'otherContent', '')
            //     }
            //     this.$set(this.currentChooseAssets, 'incomeChildType', value)
            //   }
            // },
            events: {
              input: (value, child) => {
                if (!child) {
                  return
                }
                this.currentChooseAssets = child.row
                this.assetsData = this.assetsData.map(item => {
                  if (item.tmpid === child.rowId) {
                    if (value === '99') {
                      return { ...item, incomeChildType: value }
                    } else {
                      return { ...item, incomeChildType: value, otherContent: '' }
                    }
                  } else {
                    return item
                  }
                })
              }
            },
            componentType: 'select',
            options: this.assetsTypeOptions,
            rules: [
              {
                required: true,
                message: '请选择资产类型'
              }
            ]
          }
        },
        {
          label: '其他资产类型',
          prop: 'otherContent',
          editable: true,
          formatter: (row, column, cellValue) => cellValue || '--',
          beforeEdit: (row, column, cellValue, index) => this.assetsData[index].incomeChildType === '99',
          field: {
            componentType: 'input',
            placeholder: '请输入资产类型',
            maxlength: 50,
            rules: [
              {
                required: true,
                validator: validateAssetTypePass
                // message: '请输入资产类型'
              }
            ]
          }
        },
        {
          label: '支出金额(万元)',
          prop: 'yearExpend',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入支出金额',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '操作',
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => !this.assetsEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'assets')
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.assetsEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'assets')
            },
            {
              id: 'edit',
              text: '删除',
              click: row => this.$_handleDel(row, 'assets')
            }
          ]
        }
      ]),
      /**
       * // 打工收入
       * count 打工人数
       * des 工作内容
       * area 打工地区
       * income 收入
       */
      workIncome: Object.freeze([
        {
          label: '打工人数',
          prop: 'workNum',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入打工人数',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 0
          }
        },
        {
          label: '工作内容',
          prop: 'workContent',
          editable: true,
          field: {
            componentType: 'input',
            placeholder: '请输入工作内容',
            rules: [
              {
                required: true,
                message: '请输入工作内容'
              }
            ],
            maxLength: '100'
          }
        },
        {
          label: '打工地区',
          prop: 'workArea',
          editable: true,
          field: {
            componentType: 'input',
            placeholder: '请输入打工地区',
            rules: [
              {
                required: true,
                message: '请输入打工地区'
              }
            ],
            maxLength: '50'
          }
        },
        {
          label: '收入金额(万元/人)',
          prop: 'yearIncome',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入收入金额',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '操作',
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => !this.workIncomeEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'workIncome')
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.workIncomeEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'workIncome')
            },
            {
              id: 'edit',
              text: '删除',
              click: row => this.$_handleDel(row, 'workIncome')
            }
          ]
        }
      ]),
      /**
       * 基本支出
       *  life : 基本生活支出
       *  medical ; 大病医疗支出金额
       * weddingsFunerals: 婚丧嫁娶支出金额(万元)
       */
      baseExpend: Object.freeze([
        {
          label: '基本生活支出(万元)',
          prop: 'yearExpend01',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入',
            rules: [
              {
                required: true,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '大病医疗支出金额(万元)',
          prop: 'yearExpend02',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入',
            rules: [
              {
                required: false,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '婚丧嫁娶支出金额(万元)',
          prop: 'yearExpend03',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入',
            rules: [
              {
                required: false,
                validator: validateNumRule,
                trigger: 'blur'
              }
            ],
            precision: 2
          }
        },
        {
          label: '操作',
          actions: [
            {
              id: 'edit',
              text: '编辑',
              before: row => !this.baseExpendEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'baseExpend')
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.baseExpendEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'baseExpend')
            },
            {
              id: 'edit',
              text: '删除',
              click: row => this.$_handleDel(row, 'baseExpend')
            }
          ]
        }
      ]), // 种植收入

      agriculturalEditIds: [],
      agriculturalButtons: Object.freeze([]),
      businessEditIds: [],
      businessButtons: Object.freeze([]),
      basicSalaryEditIds: [],
      basicSalaryButtons: Object.freeze([]),
      cultivateEditIds: [],
      cultivateButtons: Object.freeze([]),
      governmentSubsidiesEditIds: [],
      governmentSubsidiesButtons: Object.freeze([]),
      workIncomeEditIds: [],
      workIncomeButtons: Object.freeze([]),
      baseExpendEditIds: [],
      baseExpendButtons: Object.freeze([]),
      assetsEditIds: [], // TODO：关闭弹窗目前未清空
      assetsButtons: Object.freeze([])
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(['commonEnum']),
    machineTypeOptions: function() {
      return this.commonEnum.agriculturalMachineryTypeOptions
    }
  },
  methods: {
    // 弹窗打开时赋值
    dialogOpen() {
      this.checkedIncomeTypesFun()
      // 农机服务收入
      this.agriculturalData =
        (this.outCheckSource.agriculturalData &&
          this.outCheckSource.agriculturalData.map(item => {
            if (!item.tmpid) {
              item.tmpid = uuidv4()
            }
            return item
          })) ||
        []
      // 基本支出
      // {01: {id: value: }, 02: {id:1, value: }}
      // [{01: value, 02: value, 03: value}]
      if (this.outCheckSource.baseExpendData) {
        this.baseExpendData[0] = {
          '01': {},
          '02': {},
          '03': {},
          tmpid: ''
        }
        Object.keys(this.outCheckSource.baseExpendData).forEach(item => {
          this.baseExpendData[0][item] = this.outCheckSource.baseExpendData[item]

          this.baseExpendData[0][`yearExpend${item}`] = this.outCheckSource.baseExpendData[item]['yearExpend']

          this.baseExpendData[0]['tmpid'] = uuidv4()
        })
      }
      // this.baseExpendData =
      //   (this.outCheckSource.baseExpendData &&
      //     this.outCheckSource.baseExpendData.map(item => {
      //       if (!item.tmpid) {
      //         item.tmpid = uuidv4()
      //       }
      //       return item
      //     })) ||
      //   []
      // 养殖收入
      this.cultivateData =
        (this.outCheckSource.cultivateData &&
          this.outCheckSource.cultivateData.map(item => {
            if (!item.tmpid) {
              item.tmpid = uuidv4()
            }
            return item
          })) ||
        []
      // 经商收入
      this.businessData =
        (this.outCheckSource.businessData &&
          this.outCheckSource.businessData.map(item => {
            if (!item.tmpid) {
              item.tmpid = uuidv4()
            }
            return item
          })) ||
        []
      // 打工收入
      this.workIncomeData =
        (this.outCheckSource.workIncomeData &&
          this.outCheckSource.workIncomeData.map(item => {
            if (!item.tmpid) {
              item.tmpid = uuidv4()
            }
            return item
          })) ||
        []
      // 固定工资
      this.basicSalaryData =
        (this.outCheckSource.basicSalaryData &&
          this.outCheckSource.basicSalaryData.map(item => {
            if (!item.tmpid) {
              item.tmpid = uuidv4()
            }
            return item
          })) ||
        []
      // 政府补贴
      this.governmentSubsidiesData =
        (this.outCheckSource.governmentSubsidiesData &&
          this.outCheckSource.governmentSubsidiesData.map(item => {
            if (!item.tmpid) {
              item.tmpid = uuidv4()
            }
            return item
          })) ||
        []

      this.assetsData =
        (this.outCheckSource.assetsData &&
          this.outCheckSource.assetsData.map(item => {
            if (!item.tmpid) {
              item.tmpid = uuidv4()
            }
            return item
          })) ||
        []
    },
    // assetsCellMouseEnter(row, column, cell, event) {
    //   this.currentChooseAssets = row
    // },
    checkedIncomeTypesFun() {
      const types = []
      const obj = []
      for (const item in this.outCheckSource) {
        if (item !== 'baseExpendData') {
          if (this.outCheckSource[item] && this.outCheckSource[item].length > 0) {
            obj.push(item)
          }
        } else {
          if (this.outCheckSource[item] && Object.values(this.outCheckSource[item]).length > 0) {
            obj.push(item)
          }
        }
      }
      for (const resultIndex in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, resultIndex)) {
          const resultItem = obj[resultIndex]
          var subObject = {}
          if (resultItem.indexOf('agricultural') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === '07')
          } else if (resultItem.indexOf('business') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === '08')
          } else if (resultItem.indexOf('basicSalary') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === '03')
          } else if (resultItem.indexOf('cultivate') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === '06')
          } else if (resultItem.indexOf('governmentSubsidies') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === '01')
          } else if (resultItem.indexOf('workIncome') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === '02')
          } else if (resultItem.indexOf('baseExpend') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === '04')
          } else if (resultItem.indexOf('assets') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === '05')
          }
          if (subObject !== undefined) {
            types.push(subObject)
          }
        }
      }
      this.checkedIncomeTypes = types
      for (const item in this.checkedIncomeTypes) {
        if (Object.prototype.hasOwnProperty.call(this.checkedIncomeTypes, item)) {
          const type = this.exchangeTitleToType(this.checkedIncomeTypes[item].value)
          this[`${type}EditIds`] = []
        }
      }
      const checkedCount = this.checkedIncomeTypes.length
      this.step1CheckAll = checkedCount === this.incomeTypes.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.incomeTypes.length
    },
    exchangeTitleToType(title) {
      if (title.includes('农机服务')) {
        return 'agricultural'
      } else if (title.includes('经商')) {
        return 'business'
      } else if (title.includes('固定工资')) {
        return 'basicSalary'
      } else if (title.includes('养殖')) {
        return 'cultivate'
      } else if (title.includes('政府补贴')) {
        return 'governmentSubsidies'
      } else if (title.includes('打工')) {
        return 'workIncome'
      } else if (title.includes('基本支出')) {
        return 'baseExpend'
      } else if (title.includes('购置资产')) {
        return 'assets'
      }
    },
    handleCheckAllChange(val) {
      this.checkedIncomeTypes = val ? incomeTypeOptions : []
      this.isIndeterminate = false
    },
    handleCheckedTypesChange(value) {
      const checkedCount = value.length
      this.step1CheckAll = checkedCount === this.incomeTypes.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.incomeTypes.length
    },
    handleCheckedTypeChange(value) {
      const checkedCount = this.checkedIncomeTypes.length
      this.step1CheckAll = checkedCount === this.incomeTypes.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.incomeTypes.length
    },
    // 关闭弹窗触发
    dialogCancel() {
      this.$confirm('关闭弹窗将丢失当前维护数据，是否关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 初始化数据
        this.currentStep = 0
        this.checkedIncomeTypes = []
        this.closeEmptEditData()
        this.step1CheckAll = false
        this.isIndeterminate = false
        // 通知父组件关闭
        this.$emit('dialogCancel')
      })
    },
    // 上一步按钮触发
    backStep() {
      this.currentStep = 0
    },
    // 下一步按钮触发
    nextStep() {
      if (this.checkedIncomeTypes.length <= 0) {
        this.$message.error({ message: '请选择收入类型' })
      } else {
        this.currentStep = 1
        this.editableTabsValue = this.checkedIncomeTypes[0].value
      }
    },
    /** 保存 */
    submitForm() {
      const obj = {}
      const objCodeArray = []

      for (const item in this.checkedIncomeTypes) {
        if (Object.prototype.hasOwnProperty.call(this.checkedIncomeTypes, item)) {
          objCodeArray.push(this.checkedIncomeTypes[item].code)
          const type = this.exchangeTitleToType(this.checkedIncomeTypes[item].value)
          if (type) {
            obj[type] = this[`${type}EditIds`].find(subItem => subItem)
          }
        }
      }
      for (const resultItem in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, resultItem) && obj[resultItem]) {
          var messageStr = ''
          if (resultItem === 'agricultural') {
            messageStr = '农机服务收入与支出'
          } else if (resultItem === 'business') {
            messageStr = '经商收入与支出'
          } else if (resultItem === 'basicSalary') {
            messageStr = '固定工资收入'
          } else if (resultItem === 'cultivate') {
            messageStr = '养殖收入与支出'
          } else if (resultItem === 'governmentSubsidies') {
            messageStr = '政府补贴收入'
          } else if (resultItem === 'workIncome') {
            messageStr = '打工收入'
          } else if (resultItem === 'baseExpend') {
            messageStr = '基本支出'
          } else if (resultItem === 'assets') {
            messageStr = '购置资产支出'
          }
          this.$message.warning({ message: '请保存' + messageStr })
          this.editableTabsValue = messageStr
          return
        }
      }

      /**
 *  // 农机服务收入
      agriculturalData: [],
      // 种植收入
      baseExpendData: [],
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
      // 资产
      assetsData:[]
 */

      // var saveDict = {
      //   agriculturalData: this.agriculturalData,
      //   baseExpendData: this.baseExpendData,
      //   cultivateData: this.cultivateData,
      //   businessData: this.businessData,
      //   workIncomeData: this.workIncomeData,
      //   basicSalaryData: this.basicSalaryData,
      //   governmentSubsidiesData: this.governmentSubsidiesData,
      //   assetsData: this.assetsData
      // }
      // // 初始化数据
      // this.currentStep = 0
      // this.checkedIncomeTypes = []
      // this.step1CheckAll = false
      // this.isIndeterminate = false
      // this.$emit('failyIncomeSave', saveDict)
      var commitBaseExpend = {}
      if (this.baseExpendData.length > 0) {
        var tmpBaseExpend = {}
        tmpBaseExpend = this.baseExpendData[0]
        tmpBaseExpend['01'].yearExpend = this.baseExpendData[0].yearExpend01
        tmpBaseExpend['02'].yearExpend = this.baseExpendData[0].yearExpend02
        tmpBaseExpend['03'].yearExpend = this.baseExpendData[0].yearExpend03
        commitBaseExpend['01'] = tmpBaseExpend['01']
        commitBaseExpend['02'] = tmpBaseExpend['02']
        commitBaseExpend['03'] = tmpBaseExpend['03']
      }

      var saveDict = {
        customerId: this.ids.customerId,
        orderNo: this.ids.orderNo,
        machineryCreateDTOS: objCodeArray.includes('07') ? this.agriculturalData : [],
        baseDTOS: objCodeArray.includes('04') ? commitBaseExpend : {},
        breedCreateDTOS: objCodeArray.includes('06') ? this.cultivateData : [],
        businessCreateDTOS: objCodeArray.includes('08') ? this.businessData : [],
        workingCreateDTOS: objCodeArray.includes('02') ? this.workIncomeData : [],
        salaryCreateDTOS: objCodeArray.includes('03') ? this.basicSalaryData : [],
        subsidiesCreateDTOS: objCodeArray.includes('01') ? this.governmentSubsidiesData : [],
        acquisitionAssetsDTOS: objCodeArray.includes('05') ? this.assetsData : []
      }
      addApplyCreditApplyFamlilyComeInfo(saveDict).then(res => {
        if (res.status === 200) {
          this.currentStep = 0
          this.closeEmptEditData()
          this.$emit('failyIncomeSave', saveDict)
        } else {
          this.$message.error(res.message || '创建失败，请稍后重试')
        }
      })
    },
    closeEmptEditData() {
      for (const item in this.incomeTypes) {
        if (Object.prototype.hasOwnProperty.call(this.incomeTypes, item)) {
          const type = this.exchangeTitleToType(this.incomeTypes[item].value)
          this[`${type}EditIds`] = []
        }
      }
    },
    // 删除tab
    // todo 删除时第一步全选状态修改
    removeTab(targetName) {
      this.$confirm(`是否移除${targetName}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tabs = this.checkedIncomeTypes
        let activeName = this.editableTabsValue
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.value === targetName) {
              const nextTab = tabs[index + 1] || tabs[index - 1]
              if (nextTab) {
                activeName = nextTab.value
              }
            }
          })
        }
        this.editableTabsValue = activeName
        this.checkedIncomeTypes = tabs.filter(tab => tab.value !== targetName)
        // 第一步选择状态联动
        this.isIndeterminate = false
        // 同时删除掉所有的table数据
        var modelName = this.exchangeTitleToType(targetName)
        this[`${modelName}EditIds`] = []
        this[`${modelName}Data`] = []
        // 处理第一页全选
        const checkedCount = this.checkedIncomeTypes.length
        this.step1CheckAll = checkedCount === this.incomeTypes.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.incomeTypes.length

        if (this.checkedIncomeTypes.length === 0) {
          this.currentStep = 0
        }
      })
    },
    // 编辑表格  👇👇👇👇👇👇👇👇👇
    $_handleEdit(row, type) {
      this.$refs[`${type}Table`][0].startEditRow(row.tmpid)
      this[`${type}EditIds`].push(row.tmpid)
      // if (type === 'agricultural') {
      //   // 通过调用 startEditRow 可以开启行编辑
      //   this.$refs.agriculturalTable[0].startEditRow(row.id)
      //   // 记录开启了行编辑的id
      //   this.agriculturalEditIds.push(row.id)
      // } else {
      //   // 通过调用 startEditRow 可以开启行编辑
      //   this.$refs.table.startEditRow(row.id)
      //   // 记录开启了行编辑的id
      //   this.editIds.push(row.id)
      // }
    },
    // 保存一行
    $_handleSave(row, type) {
      if (type === 'agricultural') {
        if (row.incomeChildType) {
          if (type === 'agricultural' && (row.incomeChildType === 'other' && !row.incomeChildTypeInfo)) {
            this.$message.error('其它服务类型不能为空')
          } else {
            this.$refs[`${type}Table`][0].endEditRow(row.tmpid, (valid, result, oldRow) => {
              result = { ...result, incomeChildTypeInfo: row.incomeChildTypeInfo, incomeChildType: row.incomeChildType }
              if (valid) {
                const index = this[`${type}EditIds`].findIndex(item => item === row.tmpid)
                this[`${type}EditIds`].splice(index, 1)
                // 添加到新的数组中
                this[`${type}Data`] = this[`${type}Data`].map(item => {
                  if (result.tmpid === item.tmpid) {
                    return result
                  }
                  return item
                })
              } else {
                // 如果校验失败，则返回校验的第一个输入框的异常信息
                this.$message.error(result.message)
              }
            })
          }
        } else {
          this.$message.error('服务类型不能为空')
        }
      } else {
        this.$refs[`${type}Table`][0].endEditRow(row.tmpid, (valid, result, oldRow) => {
          if (valid) {
            const index = this[`${type}EditIds`].findIndex(item => item === row.tmpid)
            this[`${type}EditIds`].splice(index, 1)
            // 添加到新的数组中
            this[`${type}Data`] = this[`${type}Data`].map(item => {
              if (result.tmpid === item.tmpid) {
                if (result.incomeChildType !== '99') {
                  return { ...result, otherContent: '' }
                } else {
                  return result
                }
              }
              return item
            })
          } else {
            // 如果校验失败，则返回校验的第一个输入框的异常信息
            this.$message.error(result.message)
          }
        })
      }
    },
    // 添加一行
    $_handleAdd(type) {
      if (type === 'agricultural') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          customerId: this.ids.customerId,
          orderNo: this.ids.orderNo,
          incomeChildType: '',
          incomeChildTypeInfo: '',
          incomeType: 'agricultural_machinery',
          machineNum: '',
          serviceArea: '',
          yearExpend: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'business') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          customerId: this.ids.customerId,
          orderNo: this.ids.orderNo,
          incomeType: 'doing_business',
          businessProject: '',
          yearExpend: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'basicSalary') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          customerId: this.ids.customerId,
          orderNo: this.ids.orderNo,
          incomeType: 'fixed_salary',
          workCompany: '', // 工作单位
          workYear: '', // 工作年限
          yearExpend: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'cultivate') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          customerId: this.ids.customerId,
          orderNo: this.ids.orderNo,
          breedNum: '',
          incomeChildType: '',
          incomeType: 'breed',

          yearExpend: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'governmentSubsidies') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          customerId: this.ids.customerId,
          orderNo: this.ids.orderNo,
          governmentSubsidyContent: '',
          governmentSubsidyFlag: 'Y',
          incomeType: 'government_subsidies',
          subsidyAmount: '',
          yearExpend: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'workIncome') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          customerId: this.ids.customerId,
          orderNo: this.ids.orderNo,
          incomeType: 'working',
          workArea: '',
          workContent: '',
          workNum: '',
          yearExpend: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'baseExpend') {
        // TODO : 基本 生活有问题
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          // incomeChildType: '',
          // incomeType: 'base',
          // yearExpend: 0,
          // yearIncome: 0,
          // customerId: '1d508a59053241149433cfaab415a78',
          // orderNo: '44aa4257-0b72-4fff-a359-50f6eee56dff'
          '01': {
            incomeChildType: '01',
            incomeType: 'base',
            yearExpend: 0,
            yearIncome: 0,
            customerId: this.ids.customerId,
            orderNo: this.ids.orderNo
          },
          '02': {
            incomeChildType: '02',
            incomeType: 'base',
            yearExpend: 0,
            yearIncome: 0,
            customerId: this.ids.customerId,
            orderNo: this.ids.orderNo
          },
          '03': {
            incomeChildType: '03',
            incomeType: 'base',
            yearExpend: 0,
            yearIncome: 0,
            customerId: this.ids.customerId,
            orderNo: this.ids.orderNo
          }
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'assets') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          // type: '',
          // other: '',
          // amount: ''
          customerId: this.ids.customerId,
          orderNo: this.ids.orderNo,
          incomeChildType: '',
          incomeType: 'acquisition_assets',
          otherContent: '',
          yearExpend: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else {
        this.data.push({
          tmpid: uuidv4(),
          name: null,
          sex: '1',
          age: null
        })
      }
    },
    // 删除一行
    $_handleDel(row, type) {
      this.$confirm('是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this[`${type}Data`] = this[`${type}Data`].filter(item => {
          if (item.tmpid !== row.tmpid) {
            return item
          }
        })
        const index = this[`${type}EditIds`].findIndex(item => item === row.tmpid)
        this[`${type}EditIds`].splice(index, 1)
      })
    },
    changeSelect(e) {
      if (e.incomeChildType !== 'other') {
        e.incomeChildTypeInfo = ''
      }
    }
  }
}
</script>
<style lang="scss">
.family-income-expend-dialog {
  // 对话框样式调整
  .el-dialog {
    border-radius: 8px;
  }
  .el-dialog__header {
    height: 0px;
  }
  .el-dialog__title {
    color: #59676f;
  }
  .el-dialog__body {
    padding: 0 20px 20px 20px;
  }
  .app-container {
    padding: 10px;
  }
  .step1-container {
    padding: 40px 20px 30px 20px;
  }
  // .dialog-section-bar {
  //   color: $primary;
  // }
  // .dialog-section {
  //   color: black;
  // }
  // .el-row {
  //   margin-bottom: 20px;
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
  // // 表单样式调整
  // .el-form-item {
  //   margin-bottom: 0;
  //   margin-left: 10px;
  // }
  // .el-form-item__label {
  //   font-size: 14px;
  //   color: #59676f;
  //   line-height: 40px;
  //   padding: 0;
  // }

  .el-checkbox-group {
    .el-checkbox {
      // margin-right: 5px;
      margin-left: 30px;
      margin-top: 30px;
      width: 200px;
    }
  }

  .footer {
    margin-top: 40px;
    padding-bottom: 34px;
    button {
      width: 135px;
    }
    .el-button + .el-button {
      margin-left: 40px;
    }
  }
}
</style>
