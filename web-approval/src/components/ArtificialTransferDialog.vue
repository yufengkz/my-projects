<template>
  <div class="artificialTransfer">
    <template>
      <el-button type="primary" size="mini" @click="show" :disabled="disabled">人工转案</el-button>
    </template>
    <el-dialog
      title="人工转案"
      :center="true"
      :close-on-press-escape="true"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="Form" :model="Form" :rules="FormRules" label-width="80px" size="mini">
        <el-form-item label="选择接受人" prop="caseReceiver">
          <el-select clearable v-model="Form.caseReceiver" placeholder="请选择案件接收人">
            <el-option v-for="(item,index) in optionData" :key="index" :label="item.value" :value="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { convertParams } from '@/utils/tool'
export default {
  name: 'ArtificialTransfer',
  props: {
    optionData: {
      type: Array
    },
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      dialogVisible: false,
      Form: {
        caseReceiver: ''
      },
      FormRules: { caseReceiver: [{ required: true, message: '请选择案件接收人', trigger: 'change' }] }
    }
  },
  created() { },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.$refs.Form.resetFields()
          done()
        })
        .catch(() => {})
    },
    // 确认
    onSubmit() {
      this.$refs.Form.validate(validate => {
        if (validate) {
          const obj = this.optionData.find(v => v.key === this.Form.caseReceiver)
          this.$emit('accepterVal', convertParams(Object.assign({}, obj)))
          this.dialogVisible = false
          this.$refs.Form.resetFields()
        }
      })
    },
    // 显示
    show() {
      this.dialogVisible = true
      this.$emit('showVisable')
    }
  }
}
</script>

<style lang='scss' scoped>
.artificialTransfer {
  .el-form-item {
    width: 90%;
  }
  /deep/ .el-form-item .el-form-item__label {
    padding-top: 5px;
    width: 30% !important;
  }
  /deep/ .el-form-item__content {
    padding: 5px 0;
    margin-left: 0px !important;
    text-align: center;
    .el-select {
      width: 70%;
    }
  }
  /deep/ .el-form-item__error {
    padding: 3px 0;
    margin-left: 50%;
    transform: translate(-50%);
  }
  /deep/ .el-dialog {
    margin-top: 35vh !important;
    width: 30%;
  }
}
</style>
