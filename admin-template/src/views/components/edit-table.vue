<template>
  <div class="app-container">
    <TableEdit
      ref="editTable"
      :columns="editColumns"
      :data="editData"
      :buttons="editButtons"
      :sequence = "true"
      row-key="tmpid"
      :border="true"
      @cell-mouse-enter="editTableCellMouseEnter">
    </TableEdit>
    <div class="btns-center-box">
      <el-button size="mini" icon="el-icon-plus" @click="$_handleAdd('edit')">添加</el-button>
    </div>
  </div>
</template>
<script>
import TableEdit from '@/components/TableEdit'
import { v4 as uuidv4 } from 'uuid'
import { validateNum } from '@/utils/validate'
import { getEditTabelList } from '@/api/mock'
const cascaderOptions = [
  {
    label: '不动产抵押',
    value: 'unmovable',
    options: [
      {
        value: 'house',
        label: '房产'
      },
      {
        value: 'build_land',
        label: '建设用地使用权'
      },
      {
        value: 'countryside_land',
        label: '农村地产'
      },
      {
        value: 'special_machine',
        label: '专业设备'
      }
    ]
  },
  {
    label: '动产抵押',
    value: 'movable',
    options: [
      {
        value: 'agriculture_product',
        label: '农副产品'
      },
      {
        value: 'equipment',
        label: '机器设备'
      },
      {
        value: 'breed',
        label: '生物资产'
      }
    ]
  },
  {
    label: '权力抵押',
    value: 'power',
    options: [
      {
        value: 'land_contract',
        label: '农村土地承包经营权'
      },
      {
        value: 'forestry',
        label: '林权'
      }
    ]
  }
]
const incomeTypeOptions = [
  {
    code: '01',
    value: '政府补贴收入'
  },
  {
    code: '02',
    value: '打工收入'
  },
  {
    code: '03',
    value: '固定工资收入'
  },
  {
    code: '04',
    value: '基本支出'
  },
  {
    code: '05',
    value: '购置资产支出'
  },
  {
    code: '06',
    value: '养殖收入与支出'
  },
  {
    code: '07',
    value: '农机服务收入与支出'
  },
  {
    code: '08',
    value: '经商收入与支出'
  }
]
const dataPickerOptions = {
  disabledDate(time) {
    return time.getTime() > Date.now()
  },
  shortcuts: [{
    text: '今天',
    onClick(picker) {
      picker.$emit('pick', new Date())
    }
  }, {
    text: '昨天',
    onClick(picker) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24)
      picker.$emit('pick', date)
    }
  }, {
    text: '一周前',
    onClick(picker) {
      const date = new Date()
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', date)
    }
  }]
}

export default {
  components: {
    TableEdit
  },
  name: 'EditTable',
  props: {
    /**
     * 选择数据源
     * 内部mapGetters获取报无法找到属性和方法
     * 现只能通过属性外部传值
     */
    // 服务类型
    machineTypeOptions: {
      type: Array,
      default() {
        return [
          {
            value: 'power',
            label: '动力'
          },
          {
            value: 'cultivated',
            label: '耕地'
          },
          {
            value: 'sow',
            label: '播种'
          },
          {
            value: 'medicine',
            label: '打药'
          },
          {
            value: 'harvest',
            label: '收割'
          },
          {
            value: 'threshing',
            label: '脱粒'
          },
          {
            value: 'dry',
            label: '烘干'
          },
          {
            value: '99',
            label: '其他'
          }
        ]
      }
    }
  },
  mounted() {},
  data() {
    // 输入数字校验
    const validateNumRule = (rule, value, callback) => {
      var message = ''
      if (rule.field === 'typeB') {
        message = '数字输入框'
      }
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
    // 其他资产校验
    const validateAssetTypePass = (rule, value, callback) => {
      if (this.currentChooseEidtRow.typeAOther === '99') {
        if (value) {
          callback()
        } else {
          callback(new Error('请输入'))
        }
      } else {
        callback()
      }
    }
    return {
      outCheckSource: [], // 网络获取的数据
      incomeTypes: incomeTypeOptions,
      cascaderOptions: cascaderOptions,
      currentChooseEidtRow: {}, // 当前处理的表格数据
      editData: [],
      editColumns: Object.freeze([
        {
          label: '普通选择框',
          prop: 'typeA',
          // 格式化表格,与element-ui 的表格属性相同
          formatter: (row, column, cellValue) => {
            const obj = this.machineTypeOptions.find(item => {
              if (item.value === cellValue) {
                return item
              }
            })
            return (obj && obj.label) || cellValue
          },
          editable: true,
          field: {
            componentType: 'select',
            options: this.machineTypeOptions,
            rules: [
              {
                required: true,
                message: '请选择普通选择框'
              }
            ],
            events: {
              change: value => {
                if (value !== '99') {
                  this.$set(this.currentChooseEidtRow, 'typeAOther', '')
                }
                this.$set(this.currentChooseEidtRow, 'typeA', value)
              }
            }
          }
        },
        {
          label: '普通选择框关联输入框',
          prop: 'typeAOther',
          editable: true,
          formatter: (row, column, cellValue) => cellValue || '--',
          beforeEdit: (row, column, cellValue, index) => this.editData[index].typeA === '99',
          field: {
            componentType: 'input',
            placeholder: '请输入',
            rules: [
              {
                required: true,
                validator: validateAssetTypePass
              }
            ]
          }
        },
        {
          label: '数字输入框',
          prop: 'typeB',
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
          label: '输入框',
          prop: 'typeC',
          editable: true,
          field: {
            componentType: 'input',
            placeholder: '请输入',
            rules: [
              {
                required: true,
                trigger: 'blur'
              }
            ],
            events: {
              blur: value => {
                console.log('blur')
              },
              change: value => {
                console.log('change')
              },
              input: value => {
                console.log('input')
              },
              clear: value => {
                console.log('clear')
              }
            }
          }
        },
        {
          label: '联级选择框',
          prop: 'typeD',
          formatter: (row, column, cellValue) => {
            if (cellValue) {
              var tmp = []
              var subChild = []
              for (var i = 0; i < cellValue.length; i++) {
                const subValue = cellValue[i]
                if (i === 0) {
                  const obj = this.cascaderOptions.find(item => {
                    if (String(item.value) === String(subValue)) {
                      return item
                    }
                  })
                  if (obj) {
                    subChild = obj.options
                    tmp.push(obj.label)
                  }
                } else if (subChild && (i === 1 || i === 2 || i === 3)) {
                  const obj = subChild.find(item => {
                    if (String(item.value) === String(subValue)) {
                      return item
                    }
                  })
                  if (obj) {
                    subChild = obj.options
                    tmp.push(obj.label)
                  }
                }
              }
              return tmp.toString()
            }
          },
          editable: true,
          field: {
            componentType: 'cascader',
            options: cascaderOptions,
            props: {
              children: 'options',
              label: 'label',
              value: 'value'
            },
            events: {
              change: value => {
              }
            },
            rules: [
              {
                required: true,
                message: '请选择'
              }
            ]
          }
        },
        {
          label: '日期',
          prop: 'typeE',
          editable: true,
          field: {
            componentType: 'date',
            placeholder: '请输入',
            'value-format': 'yyyy-MM-dd',
            rules: [
              {
                required: true,
                message: '请输入'
              }
            ],
            'picker-options': dataPickerOptions
          }
        },
        {
          label: '时间',
          prop: 'typeF',
          editable: true,
          field: {
            componentType: 'time',
            placeholder: '请输入',
            rules: [
              {
                required: true,
                message: '请输入'
              }
            ]
          }
        },
        {
          label: '操作',
          actions: [
            {
              id: 'edit',
              rowKey: 'tmpid',
              text: '编辑',
              before: row => !this.editEditIds.includes(row.tmpid),
              click: row => this.$_handleEdit(row, 'edit')
            },
            {
              id: 'save',
              rowKey: 'tmpid',
              text: '保存',
              before: row => this.editEditIds.includes(row.tmpid),
              click: row => this.$_handleSave(row, 'edit')
            },
            {
              id: 'edit',
              rowKey: 'tmpid',
              text: '删除',
              click: row => this.$_handleDel(row, 'edit')
            },
            {
              id: 'edit',
              rowKey: 'tmpid',
              text: '取消',
              before: row => this.editEditIds.includes(row.tmpid) && (row.typeA.length > 0), // 举例 以typeA是否有值判断出现取消
              click: row => this.$_handleCancel(row, 'edit')
            }
          ]
        }
      ]),
      editEditIds: [], // 存储当前正在编辑的
      editButtons: Object.freeze([]) // 配置按钮
      // editButtons: Object.freeze([
      //   {
      //     // id 必须有而且是在当前按钮数组里面是唯一的
      //     id: 'add',
      //     text: '新增',
      //     type: 'primary',
      //     icon: 'el-icon-circle-plus',
      //     click: this.$_handleTableAdd
      //   }
      // ]) // 配置按钮
    }
  },
  created() {
    this.getDataInfo()
  },
  methods: {
    getDataInfo() {
      getEditTabelList().then(res => {
        this.handleServiceData(res.data.records)
      })
    },
    // 初始化数据 获取历史数据后对数据初始化
    handleServiceData(data) {
      // 农机服务收入
      this.editData =
        (data &&
          data.map(item => {
            if (!item.tmpid) {
              item.tmpid = uuidv4()
            }
            return item
          })) ||
        []
    },
    editTableCellMouseEnter(row) {
      this.currentChooseEidtRow = row
    },
    closeEmptEditData() {
      this.editEditIds = []
    },
    // 编辑表格  👇👇👇👇👇👇👇👇👇
    $_handleEdit(row, type) {
      this.$refs[`${type}Table`].startEditRow(row.tmpid)
      this[`${type}EditIds`].push(row.tmpid)
    },
    /**
     * 保存一行  可以处理一些保存之前的校验
     */
    $_handleSave(row, type) {
      // console.log(this.$refs.plansTable.editRowsData[row.tmpid])
      // const tmpResult = this.$refs.plansTable.editRowsData[row.tmpid]
      // if (tmpResult.startDate && tmpResult.endDate && !timeSafe(tmpResult.startDate, tmpResult.endDate)) {
      //   this.$message.warning('终止日期应晚于起始日期')
      //   return
      // }
      this.$refs[`${type}Table`].endEditRow(row.tmpid, (valid, result, oldRow) => {
        if (valid) {
          const index = this[`${type}EditIds`].findIndex(item => item === row.tmpid)
          this[`${type}EditIds`].splice(index, 1)
          // 添加到新的数组中
          this[`${type}Data`] = this[`${type}Data`].map(item => {
            if (result.tmpid === item.tmpid) {
              if (type === 'assets' && result.incomeChildType !== '99') {
                result.otherContent = ''
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
      if (type === 'edit') {
        const tmpid = uuidv4()
        this[`${type}Data`].push({
          tmpid,
          typeA: '',
          typeAOther: '',
          typeB: '',
          typeC: '',
          typeD: '',
          typeE: '',
          typeF: '',
          typeG: '',
          typeH: ''
        })
        this.$refs[`${type}Table`].startEditRow(tmpid)
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
    $_handleCancel(row, type) {
      this.$refs[`${type}Table`].cancelEditRow(row.tmpid)
      const index = this[`${type}EditIds`].findIndex(item => item === row.tmpid)
      if (index >= 0) {
        this[`${type}EditIds`].splice(index, 1)
      }
    },
    // 新增
    $_handleTableAdd() {
      this.$alert('点击了新增按钮')
    }
  }
}
</script>
<style lang="scss">
// 表格编辑类
.btns-center-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}
</style>
