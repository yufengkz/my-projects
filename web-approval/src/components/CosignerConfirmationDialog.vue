<template>
  <div class="confirmationDialog">
    <p>
      <el-button class="click" type="primary" size="mini" @click=" dialogVisible = true">{{buttonName}}</el-button>
    </p>
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
      type: String // 确定要提交
    },
    prop: { // 代金融经理提交
      type: String
    },
    buttonName: { // 确认展业
      type: String,
      default: '重新提交'
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      // 点击图标x的方法
      this.$confirm('确认关闭？')
        .then(() => {
          done()
          console.log('1111')
        })
        .catch(() => {})
    },
    // 确定按钮的回调
    submitOk() {
      this.dialogVisible = false
      this.$emit('submitOK', this.prop)
    }
  }
}
</script>

<style lang='scss' scoped>
.confirmationDialog {
  width: 90%;
  /deep/ .el-dialog__footer {
    text-align: center;
  }
  /deep/ .el-dialog__wrapper .el-dialog {
    margin-top: 50vh !important;
    width: 20% !important;
    transform: translateY(-50%) !important;
  }
  .click {
    background: #409eff;
    border: #409eff 1px solid ;
  }
  p {
    margin: 0;
  }
  p .el-button {
    width: 100%;
    margin-left: 0px;
    margin-top: 20px;
  }
  p .el-button:hover {
    color: #409eff;
    background: #d3e6fa;
  }
}
</style>
