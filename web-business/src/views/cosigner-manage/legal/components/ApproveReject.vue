<template>
  <div class="app-container1">
    <el-button @click="dialogVisible = true" type="danger" size="mini">审批驳回</el-button>
    <el-dialog title="审批驳回" :center="true" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :inline="true" :model="form" ref="form" :rules="rule" class="demo-form-inline">
        <el-form-item label="驳回原因" prop="text">
          <el-input type="textarea" v-model="form.text" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        text: ''
      },
      rule: {
        text: [{ required: true, message: '请输入', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    // 提交按钮的回调
    onSubmit() {
      this.$refs.form.validate(validate => {
        if (validate) {
          this.dialogVisible = false
          this.$emit('submitVal', { context: this.form.text })
        }
      })
    }
  }
}
</script>

<style lang='scss' socped>
.app-container1 {
  width: 100%;
  .el-button {
    width: 100%;
    height: 40px;
    margin-left: 0px;
    margin-top: 20px;
  }
  .el-form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .el-form-item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      .el-textarea__inner {
        min-width: 350px;
        min-height: 100px !important;
      }
      .el-button {
        width: 300px;
        height: 40px;
        margin-left: 0px;
        margin-top: 20px;
      }
    }
  }
  /deep/ .el-dialog__wrapper .el-dialog {
    margin-top: 50vh !important;
    width: 30% !important;
    transform: translateY(-50%) !important;
    .el-dialog__body {
      padding: 20px 25px;
    }
  }
}
</style>
