/* 审批详情页面 */
<template>
  <div class="approvalCreditDetail">
    <el-row :gutter="16">
      <el-col :span="17">
        <div class="leftMsg">
          <el-button class="downloadBtn" size="mini" @click="downloadPdf">下载授信申报意见pdf</el-button>
          <el-button class="btn" size="mini" @click="openOpinion">查看授信申报意见</el-button>
          <el-tabs v-model="msgActiveName" @tab-click="handleClick" ref="detailTabs">
            <el-tab-pane label="审批信息" name="first">
              <ApprovalInformation :responseData="repData"></ApprovalInformation>
            </el-tab-pane>
            <el-tab-pane label="征信报告" name="second" v-if="isShow">
              <CreditReport></CreditReport>
            </el-tab-pane>
            <el-tab-pane label="审批日志" name="third" >
              <ApprovalLog v-if="msgActiveName === 'third'"></ApprovalLog>
            </el-tab-pane>
            <el-tab-pane label="历史审批信息" name="fourth" v-if="isShow">
              <ApprovalHistory ></ApprovalHistory>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="rightApproval">
          <div class="title">风险审批</div>
          <el-form v-if="!isApproval" ref="form" size="mini" :model="form" :rules="rules" label-position="top" label-width="80px">
            <el-form-item label="审批结果" prop="examineResultNo">
              <el-select v-model="form.examineResultNo" placeholder="选择审批结果" @change="examineResultNoChange" style="width: 95%;">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.examineResultNo !== '4000' && form.examineResultNo !== '3000'" label="审批金额" prop="grantAmount">
              <el-input v-model="form.grantAmount" :disabled="form.examineResultNo === ''" style="width: 95%;">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="form.examineResultNo !== '4000' && form.examineResultNo !== '3000'" :label="approveRate" prop="grantRate">
              <el-input v-model="form.grantRate" :disabled="form.examineResultNo === ''" style="width: 95%;">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="form.examineResultNo !== '4000' && form.examineResultNo !== '3000'" label="贷款到期日" prop="date">
               <el-cascader style="width:95%" :disabled="form.examineResultNo === ''" v-model="form.date" :options="cascaderOptions" clearable @change="handleCascaderChange"  placeholder="选择日期"></el-cascader>
            </el-form-item>
            <el-form-item v-if="form.examineResultNo !== '3000'" label="审批意见" prop="examineOpinion">
              <el-input
                placeholder="请输入审批意见"
                type="textarea"
                :rows="4"
                :disabled="form.examineResultNo === ''"
                v-model="form.examineOpinion"
                style="width: 95%;"
              ></el-input>
            </el-form-item>
            <el-form-item v-if="form.examineResultNo === '3000'" label="退回目标" prop="returnApprovalLevel">
              <el-select v-model="form.returnApprovalLevel" placeholder="选择退回给谁" style="width: 95%;">
                <el-option v-for="(item,index) in sendBackData" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item v-if="form.examineResultNo === '3000'" label="退回原因" prop="examineOpinion"> -->
            <el-form-item v-if="form.examineResultNo === '3000'" label="审批意见" prop="examineOpinion">
              <el-input
                type="textarea"
                placeholder="请输入审批意见"
                :rows="4"
                :disabled="form.examineResultNo === ''"
                v-model="form.examineOpinion"
                style="width: 95%;"
              ></el-input>
            </el-form-item>
            <el-form-item class="btnRight">
              <el-button type="primary" @click="saveDrafts">保存草稿</el-button>
              <el-button type="primary" @click="onSubmit">确认提交</el-button>
            </el-form-item>
          </el-form>
          <div v-else class="approvalResult">
            <div v-if="status === '000' || status === '030' || status === '040'">
              <div class="result border">
                <span>审批结果</span>
                <span v-if="status === '000'|| status === '040'" class="green">{{ riskApprovalOfCreditTransferOutDTO.examineResult$FICDictName }}</span>
                <span v-if="status === '030'" class="green">{{ riskApprovalOfCreditTransferOutDTO.submitUserLevel$FICDictName + '中' }}</span>
              </div>
              <div class="border">
                <div class="black">借款人</div>
                <div class="result">
                  <span>审批金额</span>
                  <span class="black">{{ amountFormatter(riskApprovalOfCreditTransferOutDTO.grantAmount) }}（元）</span>
                </div>
                <div class="result">
                  <span>审批利率</span>
                  <span class="black">{{ riskApprovalOfCreditTransferOutDTO.grantRate }}%（年）</span>
                </div>
                <div class="result">
                  <span>贷款到期日</span>
                  <span
                    class="black"
                  >{{ riskApprovalOfCreditTransferOutDTO.grantRepayMonth }}月{{ riskApprovalOfCreditTransferOutDTO.grantRepayDate }}日</span>
                </div>
              </div>
              <div v-if="guarantee.length > 0" class="border">
                <template v-for="(item, index) in guarantee">
                  <div :key="item.id">
                    <div class="black">担保人{{ index + 1 }}</div>
                    <div class="result">
                      <span>担保金额</span>
                      <span class="black">{{ amountFormatter(riskApprovalOfCreditTransferOutDTO.grantAmount) }}（元）</span>
                    </div>
                  </div>
                </template>
              </div>
              <div>
                <div>审批意见</div>
                <div class="result">
                  <span class="examineOpinion">{{ riskApprovalOfCreditTransferOutDTO.examineOpinion }}</span>
                </div>
              </div>
            </div>
            <div v-if="status === '020'">
              <div class="result border">
                <span>审批结果</span>
                <!-- <span class="red">{{ riskApprovalOfCreditTransferOutDTO.examineResult$FICDictName }}</span> -->
                <span class="green" v-if="approveCreditOutDTO.status !== '11'">MAP中心处理中</span>
                <span class="red" v-else>{{ riskApprovalOfCreditTransferOutDTO.examineResult$FICDictName }}</span>
              </div>
              <div>
                <!-- <div>拒绝原因</div> -->
                <div>审批意见</div>
                <div class="result">
                  <span class="examineOpinion">{{ riskApprovalOfCreditTransferOutDTO.examineOpinion }}</span>
                </div>
              </div>
            </div>
            <div v-if="status === '010'">
              <div class="result border">
                <span>审批结果</span>
                <span class="green">{{ riskApprovalOfCreditTransferOutDTO.examineResult$FICDictName }}</span>
              </div>
              <div class="result">
                <span>退回目标</span>
                <span class="black">{{ riskApprovalOfCreditTransferOutDTO.submitUserLevel$FICDictName }}</span>
              </div>
              <div>
                <!-- <div>退回原因</div> -->
                <div>审批意见</div>
                <div class="result">
                  <span class="examineOpinion">{{ riskApprovalOfCreditTransferOutDTO.examineOpinion }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <CreditOpinion :repData="repData" @closeCreditOpinion="closeCreditOpinion" :dialogVisible="creditOpinionVisible"></CreditOpinion>
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
import { handelDigital } from '@/utils/format.js'
import { convertParams, getMonthDateCascaderOptions, ansFormatter } from '@/utils/tool'
import { getcreditApplyAdvice, naturalQuerySettingConfig, naturalSecretaryApproveList, naturalSubmitTraceStaging, creditSubmitForApproval, getApproveEnumList, getCreditApplicationDetail, getQueryReturnApprovalLevelStatus, getApproveTypeSelect } from '@/api/approval'
import { mapGetters } from 'vuex'
export default {
  name: 'ApprovalCreditDetail',
  components: {
    ApprovalInformation: () => import('./components/ApprovalInformation'),
    CreditReport: () => import('./components/CreditReport'),
    ApprovalLog: () => import('./components/ApprovalLog'),
    ApprovalHistory: () => import('./components/ApprovalHistory'),
    CreditOpinion: () => import('@/views/template/creditOpinion/index')
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
      creditOpinionVisible: false, // 授信审批意见弹窗是否展示
      optionData: [],
      dialogVisible: false,
      maxMoney: 0, // 建议申请担保金额
      secretaryForm: {
        secretary: ''
      },
      secretaryFormRules: {
        secretary: [
          { required: true, message: '请选择贷审会秘书', trigger: 'change' }
        ]
      },
      cascaderOptions: getMonthDateCascaderOptions(),
      msgActiveName: 'first',
      isApproval: false,
      isShow: true, // true 为显示历史记录 false 为影藏
      status: '',
      approvalResultTypeEnum: {},
      approvalRatingEnum: {},
      options: [],
      // 退回目标 下拉数组
      sendBackData: [],
      form: {
        examineOpinion: '', // 意见
        examineResultNo: '', // 审批结果code
        flowNo: '', // 业务类型
        grantAmount: '', // 金额
        grantRate: '', // 利率
        date: '',
        returnApprovalLevel: '' // 退回审批等级
      },
      rules: {
        examineOpinion: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        examineResultNo: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        grantAmount: [
          { required: true, message: '请输入', trigger: 'blur' },
          { pattern: /^([1-9]\d{3,})([.]\d{1,2})?$/, message: '输入金额最小为1000,支持小数点后两位', trigger: 'blur' },
          { validator: valiFile, message: '输入金额不能大于建议申请担保金额', trigger: 'blur' }
        ],
        grantRate: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        returnApprovalLevel: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      riskApprovalOfCreditTransferOutDTO: {},
      approveCreditOutDTO: {},
      approveRate: '',
      apply: {}, // 准入信息
      guarantee: [], // 担保人
      repData: {}
    }
  },
  created() {
    naturalSecretaryApproveList({ flowNo: 'C01' }).then(result => {
      if (result.status === 200) {
        this.optionData = result.data && result.data.map(item => {
          return {
            label: item.userName,
            value: item.id
          }
        })
      } else {
        this.optionData = []
      }
    })
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted() {
    this.getApproveEnumListFun()
    this.getSelectStatus()
    this.getApproveTypeSelectFun()
    // this.getCreditApplyInfoPc()
    this.isShowTab()
  },
  methods: {
    downloadPdf() {
      window.location.href = getcreditApplyAdvice({
        applyNo: this.$route.query.applyNo
        // applyNo: 'DK209400246055514112'
      })
    },
    // 弹框提交按钮
    submitForm() {
      return this.$refs['secretaryForm'].validate(valid => {
        if (valid) {
          this.dialogVisible = false
          const obj = {
            ...this.form,
            secretaryApproveUserId: this.secretaryForm.secretary
          }
          this.submitFun(convertParams(Object.assign({}, obj)))
          this.$refs.secretaryForm.resetFields()
        }
      })
    },
    // 保存草稿按钮
    saveDrafts() {
      return this.$refs['form'].validate(valid => {
        if (!valid) return false
        this.onSaveDrafts(convertParams(Object.assign({}, this.form)))
      })
    },
    onSaveDrafts(val) {
      // 获取审批结果编号
      const examineResultDesc = this.options.find(v => v.value === val.examineResultNo)
      const params = {
        ...val,
        flowNo: 'C01', // 业务类型
        applyNo: this.$route.query.applyNo,
        commitUserId: this.currentUser.id, // 当前提交人id
        commitUserName: this.currentUser.userName, // 当前提交人
        examineResultNo: this.form.examineResultNo, // 审批结果编号
        examineResultDesc: examineResultDesc.label // 审批结果编号
      }
      delete params.date
      naturalSubmitTraceStaging(params).then(res => {
        if (res.status === 200) {
          this.getCreditApplyInfoPc() // 保存草稿后 刷新详情页草稿回写数据
          this.$message.success(res.message || '成功')
        } else {
          this.$message.error(res.message || '失败')
        }
      })
    },
    // 关闭弹框事件
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          this.dialogVisible = false
          this.$refs.secretaryForm.resetFields()
          done()
        })
        .catch(() => {})
    },
    // 查看授信申报意见
    openOpinion() {
      this.creditOpinionVisible = true
    },
    closeCreditOpinion() {
      this.creditOpinionVisible = false
    },
    examineResultNoChange(v) {
      this.form = {
        examineOpinion: '', // 意见
        examineResultNo: v, // 审批结果code
        flowNo: '', // 业务类型
        grantAmount: '', // 金额
        grantRate: '', // 利率
        date: '',
        returnApprovalLevel: '' // 退回审批等级
      }
      const examineResultNo = this.options.find(v => this.riskApprovalOfCreditTransferOutDTO.examineResultDesc === v.label)
      if (v === '1000' || v === '2000') {
        if (!examineResultNo || v === examineResultNo.value) {
          this.form = {
            ...this.form,
            grantAmount: this.riskApprovalOfCreditTransferOutDTO.grantAmount ? this.grantAmountHandle(this.riskApprovalOfCreditTransferOutDTO.grantAmount) : this.basrc.proposedCreditLine,
            grantRate: this.riskApprovalOfCreditTransferOutDTO.grantRate ? this.riskApprovalOfCreditTransferOutDTO.grantRate : this.approveCreditOutDTO.approveRate,
            date: this.riskApprovalOfCreditTransferOutDTO.grantRepayMonth ? [this.riskApprovalOfCreditTransferOutDTO.grantRepayMonth, this.riskApprovalOfCreditTransferOutDTO.grantRepayDate] : [this.basrc.repayMonth, this.basrc.repayDate],
            examineOpinion: this.riskApprovalOfCreditTransferOutDTO.examineOpinion ? this.riskApprovalOfCreditTransferOutDTO.examineOpinion : ''
          }
        }
      } else if ((v === '3000' || v === '4000') && examineResultNo && v === examineResultNo.value) {
        // if (examineResultNo && v === examineResultNo.value) {
        this.form = {
          ...this.form,
          examineOpinion: this.riskApprovalOfCreditTransferOutDTO.examineOpinion ? this.riskApprovalOfCreditTransferOutDTO.examineOpinion : ''
        }
        // }
      }
      // if (examineResultNo && v === examineResultNo.value) {
      //   if (v === '1000' || v === '2000') {
      //     this.form = {
      //       ...this.form,
      //       grantAmount: this.riskApprovalOfCreditTransferOutDTO.grantAmount ? this.grantAmountHandle(this.riskApprovalOfCreditTransferOutDTO.grantAmount) : this.basrc.proposedCreditLine,
      //       grantRate: this.riskApprovalOfCreditTransferOutDTO.grantRate ? this.riskApprovalOfCreditTransferOutDTO.grantRate : this.approveCreditOutDTO.approveRate,
      //       date: this.riskApprovalOfCreditTransferOutDTO.grantRepayMonth ? [this.riskApprovalOfCreditTransferOutDTO.grantRepayMonth, this.riskApprovalOfCreditTransferOutDTO.grantRepayDate] : [this.basrc.repayMonth, this.basrc.repayDate],
      //       examineOpinion: this.riskApprovalOfCreditTransferOutDTO.examineOpinion ? this.riskApprovalOfCreditTransferOutDTO.examineOpinion : ''
      //     }
      //   } else if (v === '3000' || v === '4000') {
      //     this.form = {
      //       ...this.form,
      //       examineOpinion: this.riskApprovalOfCreditTransferOutDTO.examineOpinion ? this.riskApprovalOfCreditTransferOutDTO.examineOpinion : ''
      //     }
      //   }
      // }
      // if (!examineResultNo) {
      //   if (v === '1000' || v === '2000') {
      //     this.form = {
      //       ...this.form,
      //       grantAmount: this.riskApprovalOfCreditTransferOutDTO.grantAmount ? this.grantAmountHandle(this.riskApprovalOfCreditTransferOutDTO.grantAmount) : this.basrc.proposedCreditLine,
      //       grantRate: this.riskApprovalOfCreditTransferOutDTO.grantRate ? this.riskApprovalOfCreditTransferOutDTO.grantRate : this.approveCreditOutDTO.approveRate,
      //       date: this.riskApprovalOfCreditTransferOutDTO.grantRepayMonth ? [this.riskApprovalOfCreditTransferOutDTO.grantRepayMonth, this.riskApprovalOfCreditTransferOutDTO.grantRepayDate] : [this.basrc.repayMonth, this.basrc.repayDate],
      //       examineOpinion: this.riskApprovalOfCreditTransferOutDTO.examineOpinion ? this.riskApprovalOfCreditTransferOutDTO.examineOpinion : ''
      //     }
      //   }
      // }
    },
    getCreditApplyInfoPc() {
      getCreditApplicationDetail({
        applyNo: this.$route.query.applyNo
      }).then(rep => {
        if (rep.status === 200) {
          this.maxMoney = rep.data.data.basrc.proposedCreditLine
          this.repData = rep
          this.repDataHandler(rep)
        }
      })
    },
    repDataHandler(rep) {
      this.riskApprovalOfCreditTransferOutDTO = rep.data.riskApprovalOfCreditTransferOutDTO ? rep.data.riskApprovalOfCreditTransferOutDTO : {}
      this.approveCreditOutDTO = rep.data.approveCreditOutDTO ? rep.data.approveCreditOutDTO : {}
      this.basrc = rep.data.data.basrc ? rep.data.data.basrc : {}
      // this.approveRate = this.riskApprovalOfCreditTransferOutDTO.grantRate ? `审批利率(参考产品基准利率${this.approveCreditOutDTO.approveRate}%)` : '审批利率'
      this.approveRate = this.approveCreditOutDTO.approveRate ? `审批利率(参考产品基准利率${this.approveCreditOutDTO.approveRate}%)` : '审批利率'
      const examineResultNo = this.options.find(v => this.riskApprovalOfCreditTransferOutDTO.examineResultDesc === v.label)
      const formCopy = Object.assign({}, this.form)
      this.form = Object.assign(this.form, {
        grantAmount: this.riskApprovalOfCreditTransferOutDTO.grantAmount ? this.grantAmountHandle(this.riskApprovalOfCreditTransferOutDTO.grantAmount) : this.basrc.proposedCreditLine,
        grantRate: this.riskApprovalOfCreditTransferOutDTO.grantRate ? this.riskApprovalOfCreditTransferOutDTO.grantRate : this.approveCreditOutDTO.approveRate,
        date: this.riskApprovalOfCreditTransferOutDTO.grantRepayMonth ? [this.riskApprovalOfCreditTransferOutDTO.grantRepayMonth, this.riskApprovalOfCreditTransferOutDTO.grantRepayDate] : [this.basrc.repayMonth, this.basrc.repayDate],
        examineOpinion: this.riskApprovalOfCreditTransferOutDTO.examineOpinion ? this.riskApprovalOfCreditTransferOutDTO.examineOpinion : '',
        examineResultNo: examineResultNo ? examineResultNo.value : ''
      })
      if (formCopy.examineResultNo) {
        this.form = formCopy
      }
      this.apply = rep.data.data.apply ? rep.data.data.apply : []
      this.guarantee = []
      this.apply.relcustomerRiskOutVos.forEach(item => {
        if (item.authType === '2') {
          this.guarantee.push(item)
        }
      })
      if (rep.data.riskApprovalOfCreditTransferOutDTO.is === 'N') {
        this.isApproval = true
        this.status = rep.data.riskApprovalOfCreditTransferOutDTO.examineResult
      } else {
        this.isApproval = false
      }
    },
    grantAmountHandle(v) {
      let val = ''
      if (v.indexOf('.00') !== -1) {
        val = handelDigital(v, true, 0)
      } else {
        val = handelDigital(v, true, 2)
      }
      return val
    },
    getApproveEnumListFun() {
      getApproveEnumList().then(rep => {
        if (rep.status === 200) {
          this.approvalResultTypeEnum = rep.data.approvalResultTypeEnum
          this.approvalRatingEnum = rep.data.approvalRatingEnum
        }
      })
    },
    // 获取风险审批下拉框
    getApproveTypeSelectFun() {
      getApproveTypeSelect('C01').then(res => {
        if (res.status === 200) {
          this.options = Object.keys(res.data).length && Object.keys(res.data).map(item => {
            return {
              label: res.data[item],
              value: item
            }
          })
        }
      })
    },
    // 获取退回下拉框数据
    getSelectStatus() {
      getQueryReturnApprovalLevelStatus({ businessType: 'C01' }).then(res => {
        if (res.status === 200) {
          if (res.data) {
            this.sendBackData = Object.keys(res.data).map(item => {
              return {
                label: res.data[item],
                value: 'LV' + item
              }
            })
          } else {
            this.sendBackData = []
          }
        }
      })
    },
    /* 金额格式化 */
    amountFormatter(v) {
      return ansFormatter(v)
    },
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 表单确认提交按钮
    onSubmit() {
      const params = {
        grantAmount: this.form.grantAmount,
        flowNo: 'C01'
      }
      if (this.rules) {
        return this.$refs['form'].validate(valid => {
          if (!valid) return false
          const datas = ['1000', '2000']
          if (datas.includes(this.form.examineResultNo)) {
            // 获取是否展示弹框
            naturalQuerySettingConfig(
              params
            ).then(res => {
              if (res.status === 200) {
                if (res.data) {
                  this.dialogVisible = true
                } else {
                  this.submitFun(convertParams(Object.assign({}, this.form)))
                }
              }
            })
          } else {
            this.submitFun(convertParams(Object.assign({}, this.form)))
          }
        })
      }
    },
    submitFun(form) {
      const params = {
        ...form,
        applyNo: this.$route.query.applyNo,
        examineResultDesc: this.approvalResultTypeEnum[this.form.examineResultNo],
        grantRepayMonth: form.date[0],
        grantRepayDay: form.date[1]
      }
      delete params.date
      creditSubmitForApproval(params).then(rep => {
        if (rep.status === 200) {
          if (params.examineResultNo === 1000) {
            this.status = '000'
          }
          if (params.examineResultNo === 2000) {
            this.status = '040'
          }
          if (params.examineResultNo === 3000) {
            this.status = '010'
          }
          if (params.examineResultNo === 4000) {
            this.status = '020'
          }
          this.riskApprovalOfCreditTransferOutDTO = {
            grantAmount: this.form.grantAmount,
            grantRate: this.form.grantRate,
            grantRepayMonth: this.form.grantRepayMonth,
            grantRepayDay: this.form.grantRepayDay,
            examineOpinion: this.form.examineOpinion,
            examineLevel: this.form.returnApprovalLevel
          }
          this.$message.success(rep.message)
          this.getCreditApplyInfoPc()
        } else {
          this.$message.error(rep.message)
        }
      })
    },
    // 判断显示历史记录
    isShowTab() {
      if (this.$route.query.isShow === '2') { // 2 需要显示历史审批记录列表 1 不需要显示
        this.isShow = false
      } else {
        this.isShow = true
      }
      this.msgActiveName = 'first' // tab选项还原到第一个
      this.getCreditApplyInfoPc() // 重新请求详情页数据
    },
    handleCascaderChange(val) {
      this.form.grantRepayMonth = val[0] || ''
      this.form.grantRepayDay = val[1] || ''
    }
  },
  watch: {
    '$route.query': {
      handler (val, oldVal) {
        this.isShowTab()
      },
      deep: true // 深度观察监听
    },
    repData: {
      handler (val, oldVal) {
        this.repDataHandler(val)
      },
      deep: true // 深度观察监听
    }
  }
}
</script>
<style lang="scss" scoped>
.approvalCreditDetail {
  .leftMsg {
    background: #fff;
    padding: 10px 24px 0;
    position: relative;
    .downloadBtn {
      position: absolute;
      right: 160px;
      top: 12px;
      z-index: 7;
    }
    .btn {
      position: absolute;
      right: 24px;
      top: 12px;
      z-index: 7;
    }
  }
  .rightApproval {
    background: #fff;
    border: 2px solid #08b347;
    -webkit-border-radius: 1px;
    -moz-border-radius: 1px;
    border-radius: 1px;
    padding: 19px 24px;
    .title {
      font-size: 16px;
      color: #08b347;
      line-height: 24px;
      font-weight: 600;
      padding-bottom: 10px;
    }
    /deep/ .el-form-item {
      margin-bottom: 16px;
    }
    /deep/ .el-form-item__label {
      line-height: 22px;
      padding-bottom: 8px;
    }
  }
  .btnRight {
    display: flex;
    justify-content: flex-end;
    padding-right: 5%;
  }
}
.approvalResult {
  font-size: 12px;
  color: #5a5a5a;
  line-height: 30px;
  .result {
    display: flex;
    justify-content: space-between;
  }
  .examineOpinion {
    white-space:normal;
    word-break:break-all;
  }
  .green {
    color: #08b347;
  }
  .red {
    color: red;
  }
  .black {
    color: #333;
  }
  .border {
    padding-bottom: 5px;
    border-bottom: 1px solid #dcdfe6;
  }
}
</style>
