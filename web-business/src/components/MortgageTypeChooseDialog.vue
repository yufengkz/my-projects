<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="440px"
      top= "30vh"
      class="mortgage-type-choose-dialog"
      @open="dialogOpen"
    >
    <el-select class="m-t-40 p-l-20" v-model="value" placeholder="请选择">
    <el-option-group
      v-for="group in outCheckSource"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item">
      </el-option>
    </el-option-group>
  </el-select>
      <div slot="footer" class="dialog-footer">
        <el-row>
            <el-button size="mini" type="primary" class="wide-button" @click="submitForm()">确定</el-button>
            <el-button size="mini" class="wide-button" @click="dialogCancel">关闭</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {

  name: 'MortgageTypeChooseDialog',
  props: {
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
    // /**
    //  * 外部传入选择对象
    //  */
    // outCheckSource: {
    //   type: Array
    // }
  },
  mounted() {},
  data() {
    return {
      outCheckSource: [{
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
      }],
      value: {}
    }
  },

  created() {},
  methods: {
    // 弹窗打开时赋值
    dialogOpen() {},
    // 关闭弹窗触发
    dialogCancel() {
      // this.$confirm('关闭弹窗将丢失当前维护数据，是否关闭？', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   // 初始化数据
      //   this.currentStep = 0
      //   this.checkedPossessionsTypes = []
      //   this.isIndeterminate = false
      //   this.step1CheckAll = false
      //   // 通知父组件关闭
      //   this.$emit('dialogCancel')
      // })
      this.$emit('dialogCancel')
    },
    /** 保存 */
    submitForm() {
      if (this.outCheckSource.length === 0) {
        this.$emit('dialogCancel')
      } else {
        if (!this.value.value) {
          this.$message.warning({ message: '请选择' })
        } else {
          // this.outCheckSource.forEach(item => {
          //   item.options
          // })
          let obj = {}
          for (const item of this.outCheckSource) {
            if (obj.value) return
            const array = item.options.map(item => item.value)
            if (array.includes(this.value.value)) {
              obj = item
              break
            }
          }
          this.$emit('mortgageTypeChooseSave', {
            group: obj.value,
            value: this.value.value,
            label: this.value.label
          })
        }
      }
    }
  }
}
</script>
<style lang="scss">
.mortgage-type-choose-dialog {
  // 对话框样式调整
  .el-dialog {
    border-radius: 8px;
    // height:360px
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
}
</style>
