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
      class="pledge-type-choose-dialog"
      @open="dialogOpen"
    >
    <el-select class="m-t-40 p-l-20" v-model="value" placeholder="请选择">
      <el-option
        v-for="item in outCheckSource"
        :key="item.value"
        :label="item.label"
        :value="item">
      </el-option>
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

  name: 'PledgeTypeChooseDialog',
  props: {
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  data() {
    return {
      outCheckSource: [
        {
          value: 'receivable_account',
          label: '应收账款质押'
        },
        {
          value: 'receivable_rent',
          label: '应收租金质押'
        },
        {
          value: 'legal_right',
          label: '法人股权质押'
        }
      ],
      value: {}
    }
  },

  created() {},
  methods: {
    // 弹窗打开时赋值
    dialogOpen() {},
    // 关闭弹窗触发
    dialogCancel() {
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
          this.$emit('pledgeTypeChooseSave', this.value)
        }
      }
    }
  }
}
</script>
<style lang="scss">
.Pledge-type-choose-dialog {
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
