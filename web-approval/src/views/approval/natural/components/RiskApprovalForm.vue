/* [自然人担保审批详情] 风险审批表单组件 */
<template>
  <div class="riskApprovalForm">
    <el-form
      ref="basicForm"
      :model="basicForm"
      :rules="basicFormRules"
      label-width="120px"
      size="mini"
    >
      <el-form-item label="审批结果" prop="examineResultDesc">
        <el-select
          v-model="basicForm.examineResultDesc"
          placeholder="请选择审批结果"
          @change="changeIndex"
        >
          <el-option
            v-for="(item, index) in resultOptions"
            :key="index"
            :label="item.label"
            :value="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 2 拒绝 3 退回 她两条件存在时 不显示 -->
      <el-form-item
        v-if="
          basicForm.examineResultDesc !== '审批拒绝' &&
            basicForm.examineResultDesc !== '审批退回'
        "
        label="可担保金额"
        prop="grantAmount"
      >
        <el-input
          :disabled="basicForm.examineResultDesc === ''"
          v-model="basicForm.grantAmount"
          placeholder="请选择可担保金额"
          maxlength="11"
        >
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <!-- 2 拒绝 3 退回 她两条件存在时 不显示 -->
      <!-- <el-form-item
        v-if="basicForm.examineResultDesc !== '审批拒绝' && basicForm.examineResultDesc !== '审批退回'"
        label="审批利率"
        prop="grantRate"
      >
        <el-input
          :disabled="basicForm.examineResultDesc === ''"
          v-model="basicForm.grantRate"
          placeholder="请选择审批利率"
        >
          <template slot="append">%</template>
        </el-input>
      </el-form-item> -->
      <!-- 2 拒绝 3 退回 她两条件存在时 不显示 -->
      <!-- <el-form-item
        v-if="basicForm.examineResultDesc !== '审批拒绝' && basicForm.examineResultDesc !== '审批退回'"
        label="贷款到期日"
        prop="grantRepayDate"
      >
        <el-cascader
          style="width:100%"
          :disabled="basicForm.examineResultDesc === ''"
          v-model="basicForm.grantRepayDate"
          :options="cascaderOptions"
          clearable
          @change="handleCascaderChange"
          placeholder="请选择贷款到期日"
        ></el-cascader>
      </el-form-item> -->
      <!-- 退回条件存在时 显示 -->
      <el-form-item
        v-if="basicForm.examineResultDesc === '审批退回'"
        label="退回目标"
        prop="returnApprovalLevel"
      >
        <el-select
          :disabled="basicForm.examineResultDesc === ''"
          v-model="basicForm.returnApprovalLevel"
          placeholder="请选择退回目标"
        >
          <el-option
            v-for="(item, index) in sendBackOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="审批意见" prop="examineOpinion">
        <el-input
          type="textarea"
          :disabled="basicForm.examineResultDesc === ''"
          v-model="basicForm.examineOpinion"
          placeholder="请输入审批意见"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveDrafts">保存草稿</el-button>
        <el-button type="primary" @click="onSubmit">确认提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      title="提示:由于审批金额较大,需要贷审会决议"
      size="mini"
      center
    >
      <el-form
        title="提示"
        ref="secretaryForm"
        :model="secretaryForm"
        :rules="secretaryFormRules"
        label-width="80px"
        size="mini"
        class="secretary-dialog"
      >
        <el-form-item
          label="选择贷审会秘书"
          prop="secretary"
          label-width="125px"
        >
          <el-select
            clearable
            v-model="secretaryForm.secretary"
            placeholder="请选择贷审会秘书"
          >
            <el-option
              v-for="(item, index) in optionData"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          size="mini"
          style="display: flex; justify-content: center; margin-top:30px;"
        >
          <el-button type="primary" @click="submitForm">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { convertParams, getMonthDateCascaderOptions } from '@/utils/tool'
import { naturalQuerySettingConfig, naturalSecretaryApproveList } from '@/api/approval'
const length = /^([1-9]\d{3,})([.]\d{1,2})?$/

export default {
  name: 'RiskApprovalForm',
  props: {
    resultOptions: {
      type: Array
    },
    sendBackOptions: {
      type: Array
    },
    approveAmount: {
      type: String
    },
    riskApprovaResult: {
      type: Object
    },
    maxMoney: {
      type: Number
    }
  },
  data() {
    const valiFile = (rule, value, callback) => {
      if (+value <= +this.maxMoney) {
        return callback()
      } else {
        callback(new Error('输入金额不能大于建议申请担保金额'))
      }
    }
    return {
      optionData: [],
      cascaderOptions: getMonthDateCascaderOptions(),
      dialogVisible: false,
      basicForm: {
        grantAmount: '', // 金额
        examineResultDesc: '', // 结果
        // grantRate: '', // 利率
        // grantRepayDate: '', // 日期
        examineOpinion: '', // 意见
        returnApprovalLevel: '' // 退回目标
      },
      basicFormRules: {
        returnApprovalLevel: [
          { required: true, message: '请输入退回目标', trigger: 'change' }
        ],
        examineResultDesc: [
          { required: true, message: '请选择审批结果', trigger: 'change' }
        ],
        // grantRate: [{ required: true, message: '请输入利率', trigger: 'blur' }],
        // grantRepayDate: [{ required: true, message: '请输入日期', trigger: 'blur' }],
        grantAmount: [
          { required: true, message: '请输入金额', trigger: 'change' },
          {
            pattern: length,
            message: '输入金额最小为1000,支持小数点后两位',
            trigger: 'blur'
          },
          {
            validator: valiFile,
            message: '输入金额不能大于建议申请担保金额',
            trigger: 'blur'
          }
        ],
        examineOpinion: [
          { required: true, message: '请输入审批意见', trigger: 'blur' }
        ]
      },
      secretaryForm: {
        secretary: ''
      },
      secretaryFormRules: {
        secretary: [
          { required: true, message: '请选择贷审会秘书', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    riskApprovaResult(newVal) {
      // const str = newVal.examineResultDesc === '待审批' ? '' : newVal.examineResultDesc
      this.changeIndex(newVal.examineResultDesc)
      // this.basicForm.examineOpinion = newVal.examineOpinion || ''
      // this.basicForm.examineResultDesc = newVal.examineResultDesc === '待审批' ? '' : newVal.examineResultDesc
    }
  },
  created() {
    naturalSecretaryApproveList({ flowNo: 'C02' }).then(result => {
      if (result.status === 200) {
        this.optionData = result.data && result.data.map(item => {
          return {
            label: item.userName,
            value: item.id
          }
        })
      } else {
        this.optionData = []
        this.$message.error(result.message || '失败')
      }
    })
  },
  methods: {
    // 保存草稿按钮
    saveDrafts() {
      if (this.basicFormRules) {
        return this.$refs['basicForm'].validate(valid => {
          if (!valid) return false
          this.$emit(
            'onSaveDrafts',
            convertParams(Object.assign({}, this.basicForm))
          )
        })
      }
    },
    // 弹框提交按钮
    submitForm() {
      return this.$refs['secretaryForm'].validate(valid => {
        if (valid) {
          this.dialogVisible = false
          const obj = {
            ...this.basicForm,
            secretaryApproveUserId: this.secretaryForm.secretary
          }
          this.$emit('onSubmit', convertParams(Object.assign({}, obj)))
          this.$refs.secretaryForm.resetFields()
        }
      })
    },
    // 表单确认提交按钮
    onSubmit() {
      const params = {
        grantAmount: this.basicForm.grantAmount,
        flowNo: 'C02'
      }
      if (this.basicFormRules) {
        return this.$refs['basicForm'].validate(valid => {
          if (!valid) return false
          // const flag = true
          // if (flag) {
          //   this.dialogVisible = true
          // } else {
          //   this.$emit(
          //     'onSubmit',
          //     convertParams(Object.assign({}, this.basicForm))
          //   )
          // }
          if (this.basicForm.examineResultDesc === '审批通过') {
            // 获取是否展示弹框
            naturalQuerySettingConfig(
              params
            ).then(res => {
              if (res.status === 200) {
                if (res.data) {
                  this.dialogVisible = true
                } else {
                  this.$emit('onSubmit', convertParams(Object.assign({}, this.basicForm)))
                }
              } else {
                this.$message.error(res.message || '失败')
              }
            })
          } else {
            this.$emit('onSubmit', convertParams(Object.assign({}, this.basicForm)))
          }
        })
      }
    },
    // 关闭弹框事件
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.$refs.secretaryForm.resetFields()
          this.dialogVisible = false
          done()
        })
        .catch(() => {})
    },
    // 判断修改的select 来清空表单的值
    changeIndex(e) {
      console.log(this.riskApprovaResult.examineResultDesc, e)

      // 清除正则校验提示
      this.$refs.basicForm.clearValidate('grantAmount')
      this.$refs.basicForm.clearValidate('returnApprovalLevel')
      if (this.riskApprovaResult.examineResultDesc === '待审批') {
        if (e === '待审批') {
          this.basicForm = {
            ...this.basicForm,
            grantAmount: this.riskApprovaResult.grantAmount || this.approveAmount,
            examineOpinion: ''
          }
        } else {
          this.basicForm = {
            ...this.basicForm,
            examineOpinion: ''
          }
        }
      } else if (this.riskApprovaResult.examineResultDesc === e) {
        this.basicForm = {
          ...this.basicForm,
          examineOpinion: this.riskApprovaResult.examineOpinion,
          examineResultDesc: this.riskApprovaResult.examineResultDesc,
          grantAmount: this.riskApprovaResult.grantAmount || this.approveAmount
        }
      } else {
        this.basicForm = {
          ...this.basicForm,
          returnApprovalLevel: '',
          examineOpinion: '',
          grantAmount: ''
          // grantAmount: this.riskApprovaResult.grantAmount || this.approveAmount
          // grantRepayDate: '',
          // grantRate: ''
        }
      }
    }
    // handleCascaderChange(val) {
    //   this.basicForm.grantRepayMonth = val[0] || ''
    //   this.basicForm.grantRepayDay = val[1] || ''
    // }
  }
}
</script>

<style lang="scss" scoepd>
.riskApprovalForm {
  .el-form{
    padding: 0;
  }
  .el-form-item__content {
    margin-left: 0 !important;
  }
  .el-select {
    width: 100%;
  }
  .el-form-item {
    text-align: center;
  }
  .el-textarea__inner {
    min-height: 130px !important;
  }
  .secretary-dialog {
    /deep/ .el-form-item {
      text-align: center;
      display: flex;
      flex-direction: none !important;
      justify-content: center;
    }
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
