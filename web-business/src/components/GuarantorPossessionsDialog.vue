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
      class="guarantor-possessions-dialog"
      @open="dialogOpen"
    >
      <!-- <el-divider></el-divider> -->
      <el-steps class="m-t-20" :active="this.currentStep" finish-status="success" simple>
        <el-step title="选择家庭财产类型"></el-step>
        <el-step title="填写资产情况"></el-step>
      </el-steps>
      <!-- 第一步：选择家庭收入类型 -->
      <div v-show="this.currentStep === 0" class="step1-container">
        <el-col>
          <el-tag>提示：商品房、自建房客户至少填写一种</el-tag>
        </el-col>

        <el-checkbox
          style="margin-left:30px; margin-top:20px"
          :indeterminate="isIndeterminate"
          v-model="step1CheckAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="checkedPossessionsTypes" @change="handleCheckedTypesChange">
          <el-checkbox
            v-for="item in possessionsTypes"
            :label="item"
            :key="item.code"
            @change="handleCheckedTypeChange"
          >{{item.value}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- 第二步：填写收入情况 -->
      <div v-show="this.currentStep === 1">
        <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab">
          <el-tab-pane
            :key="item.code"
            v-for="(item) in checkedPossessionsTypes"
            :label="item.value"
            :name="item.value"
            :closable="tabClosable(item)"
          >
            <div v-if="exchangeTitleToType(item.value) === 'commercialBuildings'">
              <TableEdit
                ref="commercialBuildingsTable"
                :columns="commercialBuildings"
                :data="commercialBuildingsData"
                :buttons="commercialBuildingsButtons"
                row-key="tmpid"
                @cell-mouse-enter="assetsCellMouseEnter"
              ></TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('commercialBuildings')">添加</el-button>
              </div>
            </div>
            <div v-else-if="exchangeTitleToType(item.value) === 'homeBuilding'">
              <TableEdit
                ref="homeBuildingTable"
                :columns="homeBuilding"
                :data="homeBuildingData"
                :buttons="homeBuildingButtons"
                row-key="tmpid"
                @cell-mouse-enter="assetsCellMouseEnter"
              ></TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('homeBuilding')">添加</el-button>
              </div>
            </div>
            <div v-else-if="exchangeTitleToType(item.value) === 'otherPossessions'">
              <TableEdit
                ref="otherPossessionsTable"
                :columns="otherPossessions"
                :data="otherPossessionsData"
                :buttons="otherPossessionsButtons"
                row-key="tmpid"
              ></TableEdit>
              <div class="btns-center-box">
                <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('otherPossessions')">添加</el-button>
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
// import { getcentral } from '@/api/core-enterprise'
import { mapGetters } from 'vuex'
import TableEdit from '@/components/TableEdit'
import { v4 as uuidv4 } from 'uuid'
import { saveFamilyAssetInfo } from '@/api/business-common'
import { validateNum } from '@/utils/validate'
// import { preserveFamilyAssetsInfo } from '@/api/loan-apply'
// const possessionsTypeOptions = [
//   {
//     type: 'financeType',
//     typeDesc: '财产类型',
//     code: '1',
//     value: '商品房'
//   },
//   {
//     type: 'financeType',
//     typeDesc: '财产类型',
//     code: '2',
//     value: '自建房'
//   },
//   {
//     type: 'financeType',
//     typeDesc: '财产类型',
//     code: '99',
//     value: '其他资产'
//   }
// ]

export default {
  components: {
    TableEdit
  },
  name: 'GuarantorPossessionsDialog',
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
        commercialBuildingsData: //商品房
        homeBuildingData: 自建房
        otherPossessionsData: 其他资产
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
    cascaderOptions: {
      type: Array
    },
    // 其他资产类型
    outOtherpossessionsOptions: {
      type: Array
    },
    // // 房屋结构
    outHouseStructuralOptions: {
      type: Array
    },
    // 用于判断哪个使用哪个接口
    sign: String,
    // 传入担保人的id customerId
    ids: {
      type: Object
    }
  },
  mounted() {},
  data() {
    // 输入数字校验
    const validateNumRule = (rule, value, callback) => {
      var message = ''
      if (rule.field === 'housingValue') {
        message = '房产价值'
      } else if (rule.field === 'housingArea') {
        message = '房产面积'
      } else if (rule.field === 'othreAssertValue') {
        message = '资产价值'
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
      // cascaderOptions: this.authResultOptions, // 省市区三级联动
      currentStep: 0,
      editableTabsValue: '',
      currentChooseAssets: {},
      checkedPossessionsTypes: [],
      step1CheckAll: false,
      possessionsTypes: [
        {
          type: 'financeType',
          typeDesc: '财产类型',
          code: '1',
          value: '商品房'
        },
        {
          type: 'financeType',
          typeDesc: '财产类型',
          code: '2',
          value: '自建房'
        },
        {
          type: 'financeType',
          typeDesc: '财产类型',
          code: '99',
          value: '其他资产'
        }
      ],
      isIndeterminate: false,
      // 商品房
      commercialBuildingsData: [],
      // 自建房
      homeBuildingData: [],
      // 其他资产
      otherPossessionsData: [],
      /**
       * 商品房
        address:省市区
        housingAddress:详情地址
        housingArea: 面积
        value: 价值
        editStatus: true, // 是否可编辑
      */
      commercialBuildings: Object.freeze([
        {
          label: '房产地址',
          prop: 'address',
          // width: 220,
          // 格式化表格,与element-ui 的表格属性相同
          // formatter: (row, column, cellValue) => {
          //   return cellValue === '1' ? '男' : '女'
          // },
          formatter: (row, column, cellValue) => {
            if (cellValue) {
              var tmp = []
              var subChild = []
              for (var i = 0; i < cellValue.length; i++) {
                const subValue = cellValue[i]
                if (i === 0) {
                  const obj = this.cascaderOptions.find(item => {
                    if (String(item.areaId) === String(subValue)) {
                      return item
                    }
                  })
                  if (obj) {
                    subChild = obj.list
                    tmp.push(obj.areaName)
                  }
                } else if (subChild && (i === 1 || i === 2 || i === 3)) {
                  const obj = subChild.find(item => {
                    if (String(item.areaId) === String(subValue)) {
                      return item
                    }
                  })
                  if (obj) {
                    subChild = obj.list
                    tmp.push(obj.areaName)
                  }
                }
              }
              return tmp.toString()
            }
          },
          editable: true,
          field: {
            componentType: 'cascader',
            options: this.cascaderOptions,
            props: {
              // checkStrictly: true,
              children: 'list',
              label: 'areaName',
              value: 'areaId'
            },
            events: {
              change: value => {
                // this.commercialBuildingsData.forEach(item => {
                //   if (item.tmpid === this.currentChooseAssets.tmpid) {
                //     item.housingProvince = value.toString()
                //   }
                // })
                // this.$set(this.currentChooseAssets, 'housingProvince', value[0])
                // this.currentChooseAssets.housingProvince = value.toString()
                // this.$set(this.currentChooseAssets, 'type', value)
                // const cascaderAddr = this.$refs['cascaderAddr'].getCheckedNodes()[0].pathLabels
                // this.addForm.relevanceDTOs[0].centralId = value[1]
                // this.addForm.relevanceDTOs[0].profitId = value[2]
                // this.addForm.relevanceDTOs[0].centralName = cascaderAddr[1]
                // this.addForm.relevanceDTOs[0].profitName = cascaderAddr[2]
              }
            },
            rules: [
              {
                required: true,
                message: '请选择房产地址'
              }
            ]
          }
        },
        {
          label: '详细地址',
          prop: 'housingAddress',
          // width: 220,
          editable: true,
          field: {
            componentType: 'input',
            placeholder: '请输入详细地址',
            rules: [
              {
                required: true,
                message: '请输入详细地址'
              }
            ]
          }
        },
        {
          label: '房产面积',
          prop: 'housingArea',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入房产面积',
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
          label: '房产价值(万)',
          prop: 'housingValue',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入房产价值',
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
              before: row => !this.commercialBuildingsEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'commercialBuildings')
            },
            {
              id: 'save',
              rowKey: 'tmpid',
              text: '保存',
              before: row => this.commercialBuildingsEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'commercialBuildings')
            },
            {
              id: 'edit',
              rowKey: 'tmpid',
              text: '删除',
              click: row => this.$_handleDel(row, 'commercialBuildings')
            }
          ]
        }
      ]),
      /**
       * 自建房
        address:省市区
        housingAddress:详情地址
         housingStructure: 结构
        housingArea: 面积
        housingValue: 价值
        editStatus: true, // 是否可编辑
      */
      homeBuilding: Object.freeze([
        {
          label: '房产地址',
          prop: 'address',
          // 格式化表格,与element-ui 的表格属性相同
          // formatter: (row, column, cellValue) => {
          //   return cellValue === '1' ? '男' : '女'
          // },
          formatter: (row, column, cellValue) => {
            if (cellValue) {
              var tmp = []
              var subChild = []
              for (var i = 0; i < cellValue.length; i++) {
                const subValue = cellValue[i]
                if (i === 0) {
                  const obj = this.cascaderOptions.find(item => {
                    if (String(item.areaId) === String(subValue)) {
                      return item
                    }
                  })
                  if (obj) {
                    subChild = obj.list
                    tmp.push(obj.areaName)
                  }
                } else if (subChild && (i === 1 || i === 2 || i === 3)) {
                  const obj = subChild.find(item => {
                    if (String(item.areaId) === String(subValue)) {
                      return item
                    }
                  })
                  if (obj) {
                    subChild = obj.list
                    tmp.push(obj.areaName)
                  }
                }
              }
              return tmp.toString()
            }
          },
          editable: true,
          field: {
            componentType: 'cascader',
            options: this.cascaderOptions,
            props: {
              // checkStrictly: true,
              children: 'list',
              label: 'areaName',
              value: 'areaId'
            },
            events: {
              change: value => {
                // this.$set(this.currentChooseAssets, 'housingProvince', value[0])
                // this.currentChooseAssets.housingProvince = value.toString()
                // this.homeBuildingData
                // this.$set(this.currentChooseAssets, 'type', value)
                // const cascaderAddr = this.$refs['cascaderAddr'].getCheckedNodes()[0].pathLabels
                // debugger
                // this.addForm.relevanceDTOs[0].centralName = cascaderAddr[1]
                // this.addForm.relevanceDTOs[0].profitName = cascaderAddr[2]
              }
            },
            rules: [
              {
                required: true,
                message: '请选择房产地址'
              }
            ]
          }
        },
        {
          label: '详细地址',
          prop: 'housingAddress',
          editable: true,
          field: {
            componentType: 'input',
            placeholder: '请输入详细地址',
            rules: [
              {
                required: true,
                message: '请输入详细地址'
              }
            ]
          }
        },
        {
          label: '房屋结构',
          prop: 'housingStructure',
          editable: true,
          formatter: (row, column, cellValue) => {
            const obj = this.outHouseStructuralOptions.find(item => {
              if (item.value === cellValue) {
                return item
              }
            })
            if (obj) {
              return obj.label
            }
          },
          field: {
            componentType: 'select',
            placeholder: '请选择',
            options: this.outHouseStructuralOptions,
            rules: [
              {
                required: true,
                message: '请选择房屋结构'
              }
            ]
          }
        },
        {
          label: '房产面积',
          prop: 'housingArea',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入房产面积',
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
          label: '房产价值(万)',
          prop: 'housingValue',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入房产价值',
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
              before: row => !this.homeBuildingEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'homeBuilding')
            },
            {
              id: 'save',
              rowKey: 'tmpid',
              text: '保存',
              before: row => this.homeBuildingEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'homeBuilding')
            },
            {
              id: 'edit',
              rowKey: 'tmpid',
              text: '删除',
              click: row => this.$_handleDel(row, 'homeBuilding')
            }
          ]
        }
      ]),
      /**
       * 其他资产
       * type: 类型
       * housingValue :价值
       */
      otherPossessions: Object.freeze([
        {
          label: '资产类型',
          prop: 'othreAssertType',
          editable: true,
          formatter: (row, column, cellValue) => {
            if (cellValue) {
              const obj = this.outOtherpossessionsOptions.find(item => {
                if (item.value === cellValue) {
                  return item
                }
              })
              return obj.label
            }
          },
          field: {
            componentType: 'select',
            placeholder: '请选择',
            options: this.outOtherpossessionsOptions,
            rules: [
              {
                required: true,
                message: '请选择资产类型'
              }
            ]
          }
        },
        {
          label: '资产价值(万)',
          prop: 'othreAssertValue',
          editable: true,
          field: {
            componentType: 'number',
            placeholder: '请输入资产价值',
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
              before: row => !this.otherPossessionsEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'otherPossessions')
            },
            {
              id: 'save',
              text: '保存',
              before: row => this.otherPossessionsEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'otherPossessions')
            },
            {
              id: 'edit',
              text: '删除',
              click: row => this.$_handleDel(row, 'otherPossessions')
            }
          ]
        }
      ]),

      commercialBuildingsEditIds: [],
      commercialBuildingsButtons: Object.freeze([]),
      homeBuildingEditIds: [],
      homeBuildingButtons: Object.freeze([]),
      otherPossessionsEditIds: [],
      otherPossessionsButtons: Object.freeze([])
    }
  },
  computed: {
    ...mapGetters(['commonEnum', 'areaEnum'])
  },
  created() {
    // getcentral().then(res => {
    //   if (res.code === 200) {
    //     this.cascaderOptions = res.data
    //   }
    // })
  },
  watch: {
    cascaderOptions(newVal, oldVal) {
      if (newVal) {
        this.commercialBuildings[0].field.options = newVal
        this.homeBuilding[0].field.options = newVal
      }
    },
    outOtherpossessionsOptions(newVal, oldVal) {
      if (newVal) {
        this.otherPossessions[0].field.options = newVal
      }
    }
  },
  methods: {
    tabClosable(item) {
      if (!this.checkedPossessionsTypes) {
        return false
      }
      // 遍历标签页判断
      if (this.checkedPossessionsTypes.length === 1) {
        return false
      } else {
        if (item.code === '99') {
          return true
        }
        const obj = []
        this.checkedPossessionsTypes.forEach(item => {
          if (item.code === '1' || item.code === '2') {
            obj.push(item)
          }
        })
        if (obj.length === 1) {
          return false
        }
        return true
      }
    },
    assetsCellMouseEnter(row) {
      this.currentChooseAssets = row
    },
    // 弹窗打开时赋值
    dialogOpen() {
      this.checkedPossessionsTypesFun()
      // 商品房
      this.commercialBuildingsData =
        (this.outCheckSource.commercialBuildingsData &&
          this.outCheckSource.commercialBuildingsData.map(item => {
            if (!item.tmpid) {
              item.tmpid = uuidv4()
            }
            if (item.housingProvince) {
              item.address = item.housingProvince.split(',').map(item => Number(item))
            }
            return item
          })) ||
        []
      // 自建房
      this.homeBuildingData =
        (this.outCheckSource.homeBuildingData &&
          this.outCheckSource.homeBuildingData.map(item => {
            if (!item.tmpid) {
              item.tmpid = uuidv4()
            }
            if (item.housingProvince) {
              item.address = item.housingProvince.split(',').map(item => Number(item))
            }
            return item
          })) ||
        []
      // 其他资产
      this.otherPossessionsData =
        (this.outCheckSource.otherPossessionsData &&
          this.outCheckSource.otherPossessionsData.map(item => {
            if (!item.tmpid) {
              item.tmpid = uuidv4()
            }
            return item
          })) ||
        []
    },
    closeEmptEditData() {
      for (const item in this.possessionsTypes) {
        if (Object.prototype.hasOwnProperty.call(this.possessionsTypes, item)) {
          const type = this.exchangeTitleToType(this.possessionsTypes[item].value)
          this[`${type}EditIds`] = []
        }
      }
    },
    checkedPossessionsTypesFun() {
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
          if (resultItem.indexOf('commercialBuildings') >= 0) {
            subObject = this.possessionsTypes.find(subItem => subItem.code === '1')
          } else if (resultItem.indexOf('homeBuilding') >= 0) {
            subObject = this.possessionsTypes.find(subItem => subItem.code === '2')
          } else if (resultItem.indexOf('otherPossessions') >= 0) {
            subObject = this.possessionsTypes.find(subItem => subItem.code === '99')
          }
          if (subObject !== undefined) {
            types.push(subObject)
          }
        }
      }

      this.checkedPossessionsTypes = types
      const checkedCount = this.checkedPossessionsTypes.length
      this.step1CheckAll = checkedCount === this.possessionsTypes.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.possessionsTypes.length
    },
    exchangeTitleToType(title) {
      if (title.indexOf('商品房') >= 0) {
        return 'commercialBuildings'
      } else if (title.indexOf('自建房') !== -1) {
        return 'homeBuilding'
      } else if (title.indexOf('其他资产') !== -1) {
        return 'otherPossessions'
      }
    },
    handleCascaderChange(valueArr) {
      this.searchForm.buId = valueArr[0]
      this.searchForm.enterpriseId = valueArr[1]
      this.searchForm.profitId = valueArr[2]
    },
    handleCheckAllChange(val) {
      this.checkedPossessionsTypes = val ? this.possessionsTypes : []
      this.isIndeterminate = false
    },
    handleCheckedTypesChange(value) {
      const checkedCount = value.length
      this.step1CheckAll = checkedCount === this.possessionsTypes.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.possessionsTypes.length
    },
    handleCheckedTypeChange(value) {
      const checkedCount = this.checkedPossessionsTypes.length
      this.step1CheckAll = checkedCount === this.possessionsTypes.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.possessionsTypes.length
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
        this.checkedPossessionsTypes = []
        this.closeEmptEditData()
        this.isIndeterminate = false
        this.step1CheckAll = false
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
      if (this.checkedPossessionsTypes.length <= 0) {
        this.$message.error({ message: '请选择家庭财产类型' })
      } else if (this.checkedPossessionsTypes.length === 1 && this.checkedPossessionsTypes[0].value.indexOf('其他资产') >= 0) {
        this.$message.error({ message: '请商品房、自建房至少选一种' })
      } else {
        this.currentStep = 1
        this.editableTabsValue = this.checkedPossessionsTypes[0].value
      }
    },
    /** 保存 */
    submitForm() {
      const obj = {}
      for (const item in this.checkedPossessionsTypes) {
        if (Object.prototype.hasOwnProperty.call(this.checkedPossessionsTypes, item)) {
          const type = this.exchangeTitleToType(this.checkedPossessionsTypes[item].value)
          obj[type] = this[`${type}EditIds`].find(subItem => subItem)
        }
      }
      for (const resultItem in obj) {
        if (obj[resultItem]) {
          var messageStr = ''
          if (resultItem === 'commercialBuildings') {
            messageStr = '商品房'
          } else if (resultItem === 'homeBuilding') {
            messageStr = '自建房'
          } else if (resultItem === 'otherPossessions') {
            messageStr = '其他资产'
          }
          this.$message.warning({ message: '请保存' + messageStr })
          this.editableTabsValue = messageStr
          return
        }
      }

      if (this.commercialBuildingsData.length === 0 && this.homeBuildingData.length === 0) {
        this.$message.warning({ message: '商品房、自建房客户至少填写一种' })
        return
      }
      // 判断哪些类型选择 如果没有被选择 设置为空
      if (!Object.keys(obj).includes('commercialBuildings')) {
        this.commercialBuildingsData = []
      }
      if (!Object.keys(obj).includes('homeBuilding')) {
        this.homeBuildingData = []
      }
      if (!Object.keys(obj).includes('otherPossessions')) {
        this.otherPossessionsData = []
      }
      // 保存
      var saveDict = {
        1: this.commercialBuildingsData,
        2: this.homeBuildingData,
        99: this.otherPossessionsData
      }
      // console.log()
      saveFamilyAssetInfo({
        finances: saveDict,
        personId: this.ids.id,
        customerId: this.ids.customerId,
        orderNo: this.ids.orderNo
      }, this.sign).then(res => {
        if (res.status === 200) {
          this.currentStep = 0
          this.editableTabsValue = ''
          this.commercialBuildingsData = []
          this.homeBuildingData = []
          this.otherPossessionsData = []
          this.$emit('fuarantorPossessionsSave', saveDict)
          this.closeEmptEditData()
        } else {
          this.$message.error(res.message || '创建失败，请稍后重试')
        }
      })
      // preserveFamilyAssetsInfo({
      //   finances: saveDict,
      //   customerInfo: '1d508a59053241149433cfaab415a78'
      // }).then(res => {
      //   if (res.status === 200) {
      //   }
      // })
    },
    // 删除tab
    // todo 删除时第一步全选状态修改
    removeTab(targetName) {
      // 判断是否可以移除
      this.$confirm(`是否移除${targetName}？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const tabs = this.checkedPossessionsTypes
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
        this.checkedPossessionsTypes = tabs.filter(tab => tab.value !== targetName)
        // 第一步选择状态联动
        this.isIndeterminate = false
        // 同时删除掉所有的table数据
        var modelName = this.exchangeTitleToType(targetName)
        this[`${modelName}EditIds`] = []
        this[`${modelName}Data`] = []
        console.log(this[`${modelName}EditIds`], this[`${modelName}Data`])
        // 处理第一页全选
        const checkedCount = this.checkedPossessionsTypes.length
        this.step1CheckAll = checkedCount === this.possessionsTypes.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.possessionsTypes.length

        if (this.checkedPossessionsTypes.length === 0) {
          this.currentStep = 0
        }
      })
    },
    // 编辑表格  👇👇👇👇👇👇👇👇👇
    $_handleEdit(row, type) {
      this.$refs[`${type}Table`][0].startEditRow(row.tmpid)
      this[`${type}EditIds`].push(row.tmpid)
    },
    // 保存一行
    $_handleSave(row, type) {
      this.$refs[`${type}Table`][0].endEditRow(row.tmpid, (valid, result, oldRow) => {
        if (valid) {
          console.log('修改之后的数据', result)
          console.log('原始数据', oldRow)
          const index = this[`${type}EditIds`].findIndex(item => item === row.tmpid)
          this[`${type}EditIds`].splice(index, 1)
          // 添加到新的数组中
          this[`${type}Data`] = this[`${type}Data`].map(item => {
            if (result.tmpid === item.tmpid) {
              if (result.address) {
                result.housingProvince = result.address.toString()
              }
              return result
            }
            return item
          })
        } else {
          // 如果校验失败，则返回校验的第一个输入框的异常信息
          console.log(result)
          this.$message.error(result.message)
        }
      })
    },
    // 添加一行
    $_handleAdd(type) {
      if (type === 'commercialBuildings') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          address: '',
          housingAddress: '',
          housingArea: '',
          housingValue: '',
          housingProvince: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'homeBuilding') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          address: '',
          housingAddress: '',
          housingStructure: '',
          housingArea: '',
          housingValue: '',
          housingProvince: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
      } else if (type === 'otherPossessions') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          othreAssertValue: '',
          othreAssertType: ''
        })
        this.$refs[`${type}Table`][0].startEditRow(tmpid)
        this[`${type}EditIds`].push(tmpid)
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
        if (index >= 0) {
          this[`${type}EditIds`].splice(index, 1)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.guarantor-possessions-dialog {
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
