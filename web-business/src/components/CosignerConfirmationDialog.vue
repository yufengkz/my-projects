<template>
  <div :class="prop==='loan-bth' ? 'loan-bth': prop==='confirmationDialog' ? 'confirmationDialog' : 'giveUpDialog'" :style="myStyle">
    <p>
      <el-button :disabled="showBtn || disabled" class="click" type="primary" size="mini" @click=" dialogVisible = true">{{buttonName}}</el-button>
    </p>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <h5 style="textAlign:center">{{title}}</h5>
      <span slot="footer" class="dialog-footer" style="textAlign:center">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submitOk" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    prop: {
      type: String || Number
    },
    buttonName: {
      type: String
      // default: '重新提交'
    },
    myStyle: {
      type: String
    },
    showBtn: {
      type: Boolean
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    // 确定按钮的回调
    submitOk() {
      this.dialogVisible = false
      if (this.prop === 'confirmationDialog') {
        this.$emit('resubmit')
      } else {
        this.$emit('giveUpInfo')
      }
      // if (this.prop === '3') {
      //   this.$emit('submitOK', this.prop)
      // } else if (this.prop === '6' || this.prop === '7') {
      //   this.$emit('resubmit')
      // } else {
      //   this.$emit('giveUpInfo')
      // }
    }
  }
}
</script>

<style lang='scss' scoped>
.confirmationDialog {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: center;
  margin: 0 auto;
  /deep/ .el-dialog__footer {
    text-align: center;
  }
  /deep/ .el-dialog__wrapper .el-dialog {
    margin-top: 50vh !important;
    width: 30% !important;
    transform: translateY(-50%) !important;
    .el-dialog__body {
      font-size: 18px;
      padding: 20px;
      text-align: center;
    }
    .el-button {
      width: 40%;
      height: 40px;
      margin-left: 10px;
      // margin-top: 20px;
    }
  }
  .click {
    background: #409eff;
    border: #409eff 1px solid;
  }
  p {
    margin: 0 auto;
  }
  p .el-button {
    width: 100%;
    height: 40px;
    margin-left: 0px;
    margin-top: 20px;
  }
}
.giveUpDialog {
  float: right;
  margin-top: -55px;
  padding: 0 30px;
  p {
    margin-block-end: 0px !important;
  }
  /deep/ .el-dialog__footer {
    text-align: center;
  }
  /deep/ .el-dialog__wrapper .el-dialog {
    margin-top: 50vh !important;
    width: 30% !important;
    transform: translateY(-50%) !important;
    .el-dialog__body {
      font-size: 18px;
      padding: 20px;
      text-align: center;
    }
    .el-button {
      width: 40%;
      height: 40px;
      margin-left: 10px;
      // margin-top: 20px;
    }
  }
}
.loan-bth {
  margin-top: -16px;
  padding: 0 30px;
  /deep/ .el-dialog__footer {
    text-align: center;
  }
  /deep/ .el-dialog__wrapper .el-dialog {
    margin-top: 50vh !important;
    width: 30% !important;
    transform: translateY(-50%) !important;
    .el-dialog__body {
      font-size: 18px;
      padding: 20px;
      text-align: center;
    }
    .el-button {
      width: 40%;
      height: 40px;
      // margin-left: 10px;
      // margin-top: 20px;
    }
  }
}
</style>
