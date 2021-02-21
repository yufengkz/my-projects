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
      class="guarantor-income-dialog"
      @open="dialogOpen"
    >
      <!-- <el-divider></el-divider> -->
      <el-steps class="m-t-20" :active="this.currentStep" finish-status="success" simple>
        <el-step title="选择家庭收入类型"></el-step>
        <el-step title="填写收入情况"></el-step>
      </el-steps>
      <!-- 第一步：选择家庭收入类型 -->
      <div v-show="this.currentStep === 0" class="step1-container">
        <el-checkbox
          style="margin-left:30px; margin-top:40px"
          :indeterminate="isIndeterminate"
          v-model="step1CheckAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkedIncomeTypes" @change="handleCheckedTypesChange">
          <el-checkbox v-for="item in incomeTypes" :label="item" :key="item.code" @change="handleCheckedTypeChange">{{item.value}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- 第二步：填写收入情况 -->
      <div v-show="this.currentStep === 1">
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
          <el-tab-pane :key="item.code" v-for="(item) in checkedIncomeTypes" :label="item.value" :name="item.value">
            <div v-if="exchangeTitleToType(item.value) === 'agricultural'">
              <TableEdit
                ref="agriculturalTable"
                :columns="agricultural"
                :data="agriculturalData"
                :buttons="agriculturalButtons"
                row-key="tmpid"
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
                        v-for="item in outOptions.outMachineTypeOptions"
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
            <div v-else-if="exchangeTitleToType(item.value) === 'growIncome'">
              <TableEdit
                ref="growIncomeTable"
                :columns="growIncome"
                :data="growIncomeData"
                :buttons="growIncomeButtons"
                row-key="tmpid"
                 @cell-mouse-enter="growIncomeCellMouseEnter"
              ></TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('growIncome')">添加</el-button>
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

import { guaranteePersonFamilyIncomeSave } from '@/api/business-common'
import TableEdit from '@/components/TableEdit'
import { v4 as uuidv4 } from 'uuid'
import { validateNum } from '@/utils/validate'

const incomeTypeOptions = [
  {
    type: 'guaranteeIncomeType',
    typeDesc: '担保人家庭年收入类型',
    code: 'agricultural_machinery',
    value: '农机服务收入'
  },
  {
    type: 'guaranteeIncomeType',
    typeDesc: '担保人家庭年收入类型',
    code: 'doing_business',
    value: '经商收入'
  },
  {
    type: 'guaranteeIncomeType',
    typeDesc: '担保人家庭年收入类型',
    code: 'fixed_salary',
    value: '固定工资收入'
  },
  {
    type: 'guaranteeIncomeType',
    typeDesc: '担保人家庭年收入类型',
    code: 'breed',
    value: '养殖收入'
  },
  {
    type: 'guaranteeIncomeType',
    typeDesc: '担保人家庭年收入类型',
    code: 'government_subsidies',
    value: '政府补贴收入'
  },
  {
    type: 'guaranteeIncomeType',
    typeDesc: '担保人家庭年收入类型',
    code: 'working',
    value: '打工收入'
  },
  {
    type: 'guaranteeIncomeType',
    typeDesc: '担保人家庭年收入类型',
    code: 'planting',
    value: '种植收入'
  }
]

const governmentSubsidiesOptions = [{ code: 1, value: '是' }, { code: 0, value: '否' }]

export default {
  components: {
    TableEdit
  },
  name: 'GuarantorIncomeDialog',
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
        growIncomeData: this.growIncomeData,
        cultivateData: this.cultivateData,
        businessData: this.businessData,
        workIncomeData: this.workIncomeData,
        basicSalaryData: this.basicSalaryData,
        governmentSubsidiesData: this.governmentSubsidiesData
      }
     */
    outCheckSource: {
      type: Object
    },
    // 外部传入的枚举类型 outCropTypeOptions:作物类型 outMachineTypeOptions：农机类型
    outOptions: {
      type: Object
    },
    personId: {
      type: Number
    }
  },
  mounted() { },
  watch: {
    outOptions (newVal, oldVal) {
      if (newVal) {
        this.growIncome[0].field.options = newVal.outCropTypeOptions || []
      }
    }
  },
  data() {
    // 其他资产校验
    const validateAssetTypePass = (rule, value, callback) => {
      if (this.currentChooseGrowIncome.incomeChildType === '99') {
        if (value === '') {
          callback(new Error('请输入其他作物类型'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    // 输入数字校验
    const validateNumRule = (rule, value, callback) => {
      var message = ''
      if (rule.field === 'machineNum') {
        message = '农机数量'
      } else if (rule.field === 'serviceArea') {
        message = '服务面积'
      } else if (rule.field === 'yearIncome' && this.exchangeTitleToType(this.editableTabsValue) !== 'governmentSubsidies') {
        message = '收入金额'
      } else if (rule.field === 'yearIncome' && this.exchangeTitleToType(this.editableTabsValue) === 'governmentSubsidies') {
        message = '补贴金额'
      } else if (rule.field === 'plantArea') {
        message = '种植面积'
      } else if (rule.field === 'workYear') {
        message = '工作年限'
      } else if (rule.field === 'breedNum') {
        message = '养殖数量'
      } else if (rule.field === 'workNum') {
        message = '打工人数'
      }
      if (value === '') {
        callback(new Error('请输入' + message))
      } else if (parseFloat(value) <= 0) {
        callback(new Error(`请输入正确的${message}(不能输入负数或0)`))
      } else if (!validateNum(value)) {
        callback(new Error(`请输入正确的${message}(不能输入负数或0)`))
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
      governmentSubsidiesStatus: governmentSubsidiesOptions,
      isIndeterminate: false,
      // 农机服务收入
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
      /**
       * 农机服务收入
        incomeChildType:服务类型
        machineNum:农机数量
        serviceArea: 服务面积
        yearIncome: 收入
        editStatus: true, // 是否可编辑
      */
      agricultural: Object.freeze([
        {
          label: '服务类型',
          prop: 'incomeChildType',
          // 格式化表格,与element-ui 的表格属性相同
          // formatter: (row, column, cellValue) => {
          //   const obj = this.outOptions.outMachineTypeOptions.find(item => {
          //     if (item.value === cellValue) {
          //       return item
          //     }
          //   })
          //   return obj.label
          // },
          // editable: true,
          useSlot: true,
          field: {
            componentType: 'select',
            // options: this.outOptions.outMachineTypeOptions,
            rules: [
              {
                required: true,
                message: '请选择服务类型'
              }
            ]
          }
        },
        {
          label: '农机数量',
          prop: 'machineNum',
          editable: true,
          field: {
            componentType: 'number',
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
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入服务面积',
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
       * 经商收入
        businessProject:'',//经商项目
        yearIncome:'',//经商收入
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
            ]
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
       * 固定工资收入
       * company: 工作单位
       * limit :工作年限
       * yearIncome: 年收入
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
      cultivate: Object.freeze([
        {
          label: '养殖种类',
          prop: 'breedType',
          editable: true,
          field: {
            componentType: 'input',
            placeholder: '请输入养殖种类',
            rules: [
              {
                required: true,
                message: '请输入养殖种类'
              }
            ]
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
      ]), // 养殖收入
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
          prop: 'yearIncome',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入年补贴金额',
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
       * // 打工收入
       * count 打工人数
       * des 工作内容
       * area 打工地区
       * yearIncome 收入
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
       * 种植收入
       *  type : 作物类型
       *  area ; 种植面积
       */
      growIncome: Object.freeze([
        {
          label: '作物类型',
          prop: 'incomeChildType',
          formatter: (row, column, cellValue) => {
            const obj = this.outOptions.outCropTypeOptions.find(item => {
              if (item.value === cellValue) {
                return item
              }
            })
            return obj.label
          },
          editable: true,
          field: {
            events: {
              input: (value, child) => {
                if (!child) {
                  return
                }
                this.growIncomeData = this.growIncomeData.map(item => {
                  if (item.tmpid === child.rowId) {
                    this.currentChooseGrowIncome = child.row
                    if (value === '99') {
                      return { ...item, incomeChildType: value }
                    } else {
                      return { ...item, incomeChildType: value, otherInfo: '' }
                    }
                  } else {
                    return item
                  }
                })
              }
              // change: value => {
              //   if (value !== '99') {
              //     this.$set(this.currentChooseGrowIncome, 'otherInfo', '')
              //   }
              //   this.$set(this.currentChooseGrowIncome, 'incomeChildType', value)
              // }
            },
            componentType: 'select',
            options: this.outOptions.outCropTypeOptions && this.outOptions.outCropTypeOptions,
            rules: [
              {
                required: true,
                message: '请选择作物类型'
              }
            ],
            maxLength: '50'
          }
        },
        {
          label: '其他作物类型',
          prop: 'otherInfo',
          editable: true,
          formatter: (row, column, cellValue) => cellValue || '--',
          beforeEdit: (row, column, cellValue, index) => this.growIncomeData[index].incomeChildType === '99',
          field: {
            componentType: 'input',
            placeholder: '请输入作物类型',
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
          label: '种植面积(亩)',
          prop: 'plantArea',
          editable: true,
          field: {
            componentType: 'number',
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
              id: 'edit',
              text: '编辑',
              before: row => !this.growIncomeEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'growIncome')
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.growIncomeEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'growIncome')
            },
            {
              id: 'edit',
              text: '删除',
              click: row => this.$_handleDel(row, 'growIncome')
            }
          ]
        }
      ]), // 种植收入
      currentChooseGrowIncome: {},
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
      growIncomeEditIds: [],
      growIncomeButtons: Object.freeze([])
    }
  },
  created() {},
  methods: {
    // 弹窗打开时赋值
    dialogOpen() {
      this.checkedIncomeTypesFun()
      // 农机服务收入
      this.agriculturalData = (this.outCheckSource.agriculturalData && this.outCheckSource.agriculturalData.map(item => {
        if (!item.tmpid) {
          item.tmpid = uuidv4()
        }
        return item
      })) || []
      // 种植收入
      this.growIncomeData = (this.outCheckSource.growIncomeData && this.outCheckSource.growIncomeData.map(item => {
        if (!item.tmpid) {
          item.tmpid = uuidv4()
        }
        return item
      })) || []
      // 养殖收入
      this.cultivateData = (this.outCheckSource.cultivateData && this.outCheckSource.cultivateData.map(item => {
        if (!item.tmpid) {
          item.tmpid = uuidv4()
        }
        return item
      })) || []
      // 经商收入
      this.businessData = (this.outCheckSource.businessData && this.outCheckSource.businessData.map(item => {
        if (!item.tmpid) {
          item.tmpid = uuidv4()
        }
        return item
      })) || []
      // 打工收入
      this.workIncomeData = (this.outCheckSource.workIncomeData && this.outCheckSource.workIncomeData.map(item => {
        if (!item.tmpid) {
          item.tmpid = uuidv4()
        }
        return item
      })) || []
      // 固定工资
      this.basicSalaryData = (this.outCheckSource.basicSalaryData && this.outCheckSource.basicSalaryData.map(item => {
        if (!item.tmpid) {
          item.tmpid = uuidv4()
        }
        return item
      })) || []
      // 政府补贴
      this.governmentSubsidiesData = (this.outCheckSource.governmentSubsidiesData && this.outCheckSource.governmentSubsidiesData.map(item => {
        if (!item.tmpid) {
          item.tmpid = uuidv4()
        }
        return item
      })) || []
    },
    checkedIncomeTypesFun() {
      const types = []
      const obj = []
      for (const item in this.outCheckSource) {
        if (this.outCheckSource[item].length > 0) {
          obj.push(item)
        }
      }
      for (const resultIndex in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, resultIndex)) {
          const resultItem = obj[resultIndex]
          var subObject = {}
          if (resultItem.indexOf('agricultural') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === 'agricultural_machinery')
          } else if (resultItem.indexOf('business') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === 'doing_business')
          } else if (resultItem.indexOf('alary') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === 'fixed_salary')
          } else if (resultItem.indexOf('cultivate') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === 'breed')
          } else if (resultItem.indexOf('governmentSubsidies') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === 'government_subsidies')
          } else if (resultItem.indexOf('workIncome') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === 'working')
          } else if (resultItem.indexOf('growIncome') >= 0) {
            subObject = this.incomeTypes.find(subItem => subItem.code === 'planting')
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
      if (title !== undefined) {
        if (title.indexOf('农机服务') >= 0) {
          return 'agricultural'
        } else if (title.indexOf('经商') !== -1) {
          return 'business'
        } else if (title.indexOf('固定工资') !== -1) {
          return 'basicSalary'
        } else if (title.indexOf('养殖') !== -1) {
          return 'cultivate'
        } else if (title.indexOf('政府补贴') !== -1) {
          return 'governmentSubsidies'
        } else if (title.indexOf('打工') !== -1) {
          return 'workIncome'
        } else if (title.indexOf('种植') !== -1) {
          return 'growIncome'
        }
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
    growIncomeCellMouseEnter(row) {
      // this.currentChooseGrowIncome = row
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
      for (const item in this.checkedIncomeTypes) {
        if (Object.prototype.hasOwnProperty.call(this.checkedIncomeTypes, item)) {
          const type = this.exchangeTitleToType(this.checkedIncomeTypes[item].value)
          obj[type] = this[`${type}EditIds`].find(subItem => subItem)
        }
      }
      for (const resultItem in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, resultItem) && obj[resultItem]) {
          var messageStr = ''
          if (resultItem === 'agricultural') {
            messageStr = '农机服务'
          } else if (resultItem === 'business') {
            messageStr = '经商'
          } else if (resultItem === 'basicSalary') {
            messageStr = '固定工资'
          } else if (resultItem === 'cultivate') {
            messageStr = '养殖'
          } else if (resultItem === 'governmentSubsidies') {
            messageStr = '政府补贴'
          } else if (resultItem === 'workIncome') {
            messageStr = '打工'
          } else if (resultItem === 'growIncome') {
            messageStr = '种植'
          }
          this.$message.warning({ message: '请保存' + messageStr })
          this.editableTabsValue = messageStr + '收入'
          return
        }
      }

      /**
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
      governmentSubsidiesData: []
 */
      // 判断哪些类型选择 如果没有被选择 设置为空
      if (!Object.keys(obj).includes('agricultural')) {
        this.agriculturalData = []
      }
      if (!Object.keys(obj).includes('cultivate')) {
        this.cultivateData = []
      }
      if (!Object.keys(obj).includes('business')) {
        this.businessData = []
      }
      if (!Object.keys(obj).includes('workIncome')) {
        this.workIncomeData = []
      }
      if (!Object.keys(obj).includes('basicSalary')) {
        this.basicSalaryData = []
      }
      if (!Object.keys(obj).includes('governmentSubsidies')) {
        this.governmentSubsidiesData = []
      }
      if (!Object.keys(obj).includes('growIncome')) {
        this.growIncomeData = []
      }
      var saveDict = {
        machineryCreateDTOS: this.agriculturalData,
        plantCreateDTOS: this.growIncomeData,
        breedCreateDTOS: this.cultivateData,
        businessCreateDTOS: this.businessData,
        workingCreateDTOS: this.workIncomeData,
        salaryCreateDTOS: this.basicSalaryData,
        subsidiesCreateDTOS: this.governmentSubsidiesData
      }
      guaranteePersonFamilyIncomeSave({ familyIncomeListDTO: saveDict, personId: this.personId }).then(res => {
        if (res.status === 200) {
          this.currentStep = 0
          this.$emit('failyIncomeSave', saveDict)
          this.closeEmptEditData()
        } else {
          this.$message.error(res.message || '创建失败，请稍后重试')
        }
      })
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
    closeEmptEditData() {
      for (const item in this.incomeTypes) {
        if (Object.prototype.hasOwnProperty.call(this.incomeTypes, item)) {
          const type = this.exchangeTitleToType(this.incomeTypes[item].value)
          this[`${type}EditIds`] = []
        }
      }
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
          if (row.incomeChildType === 'other' && !row.incomeChildTypeInfo) {
            this.$message.error('其它服务类型不能为空')
          } else {
            this.saveData(row, type)
          }
        } else {
          this.$message.error('服务类型不能为空')
        }
      } else {
        this.saveData(row, type)
      }
    },
    saveData(row, type) {
      this.$refs[`${type}Table`][0].endEditRow(row.tmpid, (valid, result, oldRow) => {
        result = { ...result, incomeChildTypeInfo: row.incomeChildTypeInfo, incomeChildType: row.incomeChildType }
        if (valid) {
          const index = this[`${type}EditIds`].findIndex(item => item === row.tmpid)
          this[`${type}EditIds`].splice(index, 1)
          // 添加到新的数组中
          this[`${type}Data`] = this[`${type}Data`].map(item => {
            if (result.tmpid === item.tmpid) {
              if (result.incomeChildType !== '99') {
                return { ...result, otherInfo: '' } // 不是其他类型需要清空字段 要不会渲染页面
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
    },
    // 添加一行
    $_handleAdd(type) {
      if (type === 'agricultural') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          incomeType: 'agricultural_machinery',
          incomeChildType: '',
          incomeChildTypeInfo: '',
          machineNum: '',
          serviceArea: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'business') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          businessName: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'basicSalary') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          workCompany: '',
          workYear: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'cultivate') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          breedType: '',
          breedNum: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'governmentSubsidies') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          governmentSubsidyFlag: 'Y',
          governmentSubsidyContent: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'workIncome') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          workNum: '',
          workContent: '',
          workArea: '',
          yearIncome: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'growIncome') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          incomeChildType: '',
          otherInfo: '',
          plantArea: '',
          yearIncome: ''
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
.guarantor-income-dialog {
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
