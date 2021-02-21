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
      class="credit-choose-dialog"
      @open="dialogOpen"
    >
      <div class="step1-container">
        <div class="m-t-20 p-l-20">
          <span class="all-main-tit all-tit-bar"></span>
          <span class="all-main-tit all-tit-con">选择增信类型</span>
        </div>
        <div>
          <el-checkbox
            style="margin-left:30px; margin-top:10px"
            :indeterminate="isIndeterminate"
            v-model="step1CheckAll"
            :disabled="outCheckSource.checkedTypes.length > 0"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group v-model="checkedTypes" @change="handleCheckedTypesChange">
            <el-checkbox
              v-for="item in creditTypes"
              :label="item"
              :key="item.code"
              @change="handleCheckedTypeChange"
              :disabled="outCheckSource.checkedTypes.includes(item.code)"
            >
              {{ item.value }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <div class="m-t-20 p-l-20">
            <span class="all-main-tit all-tit-bar"></span>
            <span class="all-main-tit all-tit-con">选择主增信</span>
          </div>
          <div class="m-t-20 p-l-20">
            <el-radio-group v-model="mainType" :disabled='outCheckSource.productCompanyStatus'>
              <el-radio v-for="item in mainTypeChoosOptions" :key="item.code" :label="item.code">{{ item.value }}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-row>
          <el-col>
            <el-button size="mini" type="primary" class="wide-button" @click="submitForm()">保存</el-button>
            <el-button size="mini" class="wide-button" @click="dialogCancel">关闭</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const creditTypeOptions = [
  { code: 'person', value: '自然人保证' },
  { code: 'legal_person', value: '法人保证' },
  { code: 'company', value: '担保公司担保' },
  { code: 'mortgage', value: '资产抵押' },
  { code: 'pledge', value: '资产质押' }
]
// const creditTypeOptions = [
//   '自然人保证',
//   '资产抵押',
//   '法人保证',
//   '合作机构保证',
//   '资产质押'
// ]

export default {
  name: 'CreditChooseDialog',
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
     */
    outCheckSource: {
      type: Object
    }
  },
  mounted() {},
  data() {
    return {
      haveNatural: true, // 是否有自然人保证
      mainType: '',
      step1CheckAll: false,
      creditTypes: creditTypeOptions,
      checkedTypes: [],
      mainTypeChoosOptions: [],
      isIndeterminate: false
    }
  },
  created() {},
  methods: {
    // 弹窗打开时赋值
    dialogOpen() {
      this.checkedTypesFun()
    },
    checkedTypesFun() {
      this.haveNatural = this.outCheckSource.haveNatural
      // if (this.haveNatural === true) {
      //   this.creditTypes = creditTypeOptions
      // } else {
      const optionstypes = []
      // const mainChooseOptions = []
      for (let index = 0; index < creditTypeOptions.length; index++) {
        const element = creditTypeOptions[index]
        // mainChooseOptions.push(element)
        if (element.code !== 'person') {
          optionstypes.push(element)
        }
      }
      this.creditTypes = optionstypes
      // }
      // this.checkedTypes = this.outCheckSource.checkedTypes
      // const checkedCount = this.checkedTypes.length
      // this.step1CheckAll = checkedCount === this.creditTypes.length
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.creditTypes.length
      const types = []

      for (var i = 0; i < this.outCheckSource.checkedTypes.length; i++) {
        const resultItem = this.outCheckSource.checkedTypes[i]
        var subObject = {}
        if (resultItem) {
          subObject = this.creditTypes.find(subItem => subItem.code === resultItem)
        }
        if (subObject) {
          types.push(subObject)
        }
      }
      this.mainType = this.outCheckSource.mainType
      this.checkedTypes = types
      const checkedCount = this.checkedTypes.length
      this.step1CheckAll = checkedCount === this.creditTypes.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.creditTypes.length
      this.exchangeMainTypeWithCheckedTypes()
    },

    handleCheckAllChange(val) {
      this.checkedTypes = val ? this.creditTypes : []
      this.isIndeterminate = false
      this.exchangeMainTypeWithCheckedTypes()
    },
    handleCheckedTypesChange(value) {
      const checkedCount = value.length
      this.step1CheckAll = checkedCount === this.creditTypes.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.creditTypes.length
      this.exchangeMainTypeWithCheckedTypes()
    },
    handleCheckedTypeChange(value) {
      const checkedCount = this.checkedTypes.length
      this.step1CheckAll = checkedCount === this.creditTypes.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.creditTypes.length
      this.exchangeMainTypeWithCheckedTypes()
    },
    exchangeMainTypeWithCheckedTypes() {
      this.mainTypeChoosOptions = []
      this.mainTypeChoosOptions = this.checkedTypes.map(item => item)
      if (this.haveNatural === true) {
        for (let index = 0; index < creditTypeOptions.length; index++) {
          const element = creditTypeOptions[index]
          if (element.code === 'person') {
            this.mainTypeChoosOptions.push(element)
          }
        }
      }
      if (this.mainType && this.mainTypeChoosOptions.length > 0) {
        const obj = this.mainTypeChoosOptions.find(subItem => subItem.code === this.mainType)
        if (!obj) {
          this.mainType = ''
        }
      }
    },
    // 关闭弹窗触发
    dialogCancel() {
      this.$confirm('关闭弹窗将丢失当前维护数据，是否关闭？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 初始化数据
        this.checkedTypes = []
        this.step1CheckAll = false
        this.isIndeterminate = false
        this.mainType = ''
        // 通知父组件关闭
        this.$emit('dialogCancel')
      })
    },
    /** 保存 */
    submitForm() {
      if (this.haveNatural === false && this.checkedTypes.length === 0) {
        this.$message.warning({ message: '请选择增信类型' })
        return
      }
      if (!this.mainType) {
        this.$message.warning({ message: '请选择主增信类型' })
        return
      }
      var tmpArray = []
      this.checkedTypes.forEach(item => {
        tmpArray.push(item.code)
      })
      var saveDict = {
        checkedTypes: tmpArray,
        mainType: this.mainType
      }
      this.$emit('creditSave', saveDict)
    }
  }
}
</script>
<style lang="scss">
.credit-choose-dialog {
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
