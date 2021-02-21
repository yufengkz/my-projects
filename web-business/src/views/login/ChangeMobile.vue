<template>
  <div>
    <el-dialog
      :visible="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="518px"
      class="change-mobile"
      @close="clearDialog"
    >
      <div slot="title" class="clearfix el-dialog__title">
        <span>修改手机号</span>
        <el-button style="float: right; padding: 3px 33px 3px 0;" type="text" v-show="step === 2" @click="step--">
          上一步
        </el-button>
      </div>
      <!-- 手机号、验证码验证 -->
      <el-form :model="form" status-icon ref="form" :rules="rules" label-width="30%" v-show="step === 1" label-position="top">
        <el-form-item label="原手机号" prop="mobileNo">
          <el-input v-model="form.mobileNo" maxlength="11" placeholder="请输入手机号" disabled></el-input>
        </el-form-item>
        <el-form-item label="图形验证码" prop="verifyCode">
          <el-input v-model="form.verifyCode" placeholder="请输入图形验证码" maxlength="4"></el-input>
          <span class="forget-imgUrl" @click="getImgCodeFunc">
            <img :src="verifyImgUrl" alt="刷新验证码" />
          </span>
        </el-form-item>
        <el-form-item label="短信验证码" prop="smsVerifyCode" scope-slot="error">
          <el-input v-model="form.smsVerifyCode" autocomplete="off" placeholder="请输入4位验证码" maxlength="4">
            <el-button slot="append" v-if="smsTime < 60">{{ smsTime + '秒后重新获取' }}</el-button>
            <el-button slot="append" v-else @click="checkImageCode">{{ smsText }}</el-button>
          </el-input>
        </el-form-item>
        <div class="footer">
          <el-button type="primary" @click="next('form')">下一步</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </div>
      </el-form>
      <!-- 修改密码 -->
      <el-form
        :model="mobileForm"
        status-icon
        ref="mobileForm"
        :rules="mobileFormRules"
        label-width="30%"
        v-show="step === 2"
        label-position="top"
      >
        <el-form-item label="新手机号" prop="mobileNo">
          <el-input v-model="mobileForm.mobileNo" maxlength="11" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="图形验证码" prop="verifyCode">
          <el-input v-model="mobileForm.verifyCode" placeholder="请输入图形验证码" maxlength="4"></el-input>
          <span class="forget-imgUrl" @click="getImgCodeFunc">
            <img :src="verifyImgUrl" alt="刷新验证码" />
          </span>
        </el-form-item>
        <el-form-item label="短信验证码" prop="smsVerifyCode" scope-slot="error">
          <el-input v-model="mobileForm.smsVerifyCode" autocomplete="off" placeholder="请输入短信验证码" maxlength="6">
            <el-button slot="append" v-if="smsTime < 60">{{ smsTime + '秒后重新获取' }}</el-button>
            <el-button slot="append" v-else @click="checkImageCode">{{ smsText }}</el-button>
          </el-input>
        </el-form-item>
        <div class="footer">
          <el-button type="primary" @click="submitForm('mobileForm')">确定</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getImgCode, checkImgCode, sendSmsCode1, updatePasswordStepOne, updateMobileStepTwo } from '@/api/login'
import { validateMobile } from '@/utils/validate' // validatePassword
import { mapGetters } from 'vuex'
// const Base64 = require('js-base64').Base64
// const md5 = require('js-md5')

export default {
  name: 'ChangeMobile',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    userMobile: {
      type: String
    }
  },
  watch: {
    dialogVisible(newVal, oldVal) {
      if (!newVal) {
        this.clear()
      }
    }
  },
  data() {
    // 手机号校验
    const validateMobileNo = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!validateMobile(value)) {
        callback(new Error('请输入正确的手机号'))
      } else {
        callback()
      }
    }
    return {
      step: 1,
      verifyImgUrl: '',
      verifyCodeId: '', // 图形验证码id
      smsToken: '',
      oneStepToken: '',
      dialogTitle: '修改密码', // 对话框标题
      // getCodeBtn: true, // 获取验证码按钮是否可点
      smsTime: 60, // 倒计时时间
      smsText: '获取短信验证码',
      timer: null, // 倒计时计时器
      form: {
        mobileNo: '',
        smsVerifyCode: '',
        verifyCode: '' // 图形验证码
      },
      rules: {
        mobileNo: [{ required: true, validator: validateMobileNo, trigger: 'blur' }],
        verifyCode: [
          { required: true, message: '请输入图形验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入四位图形验证码', trigger: 'blur' }
        ],
        smsVerifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, message: '请输入四位验证码', trigger: 'blur' }
        ]
      },
      mobileForm: {
        mobileNo: '',
        smsVerifyCode: '',
        verifyCode: '' // 图形验证码
      },
      mobileFormRules: {
        mobileNo: [{ required: true, validator: validateMobileNo, trigger: 'blur' }],
        verifyCode: [
          { required: true, message: '请输入图形验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '请输入四位图形验证码', trigger: 'blur' }
        ],
        smsVerifyCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, message: '请输入四位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 获取图形验证码
    this.getImgCodeFunc()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'loginType'])
  },
  mounted() {
    this.form.mobileNo = this.userMobile || this.currentUser.userMobile
  },
  methods: {
    // next
    next(formName) {
      // updatePasswordStepOne
      this.$refs[formName].validate(async valid => {
        // 获取图形验证码
        this.getImgCodeFunc()
        if (valid) {
          const { status, data, message } = await updatePasswordStepOne({
            mobileNo: this.form.mobileNo,
            smsToken: this.smsToken,
            smsVerifyCode: this.form.smsVerifyCode
          })
          if (+status === 200) {
            this.oneStepToken = data.stepToken
            this.smsToken = ''
            this.step += 1
            this.clear()
          } else {
            this.$message.warning(message)
          }
        } else {
          return false
        }
      })
    },
    // 对话框关闭时触发，清空表单数据，重置验证码按钮和计时器
    clear() {
      // 清空计时器
      if (this.timer) {
        window.clearInterval(this.timer)
        this.timer = null
        this.smsTime = 60
      }
    },
    // 获取图形验证码
    getImgCodeFunc() {
      getImgCode().then(res => {
        if (res.status === 200) {
          this.verifyImgUrl = res.data.imgBase64
          this.verifyCodeId = res.data.imgId
        }
      })
    },
    // 校验图形验证码，并获取短信验证码
    checkImageCode() {
      let isVerifyCode = true
      this.$refs.form.validateField('verifyCode', error => {
        if (error) {
          this.$message.warning({ message: '请输入正确的图形验证码' })
          isVerifyCode = false
        }
      })
      if (isVerifyCode) {
        checkImgCode({
          verifyCodeId: this.verifyCodeId,
          verifyCode: this.form.verifyCode
        }).then(res => {
          if (res.status === 200) {
            // 获取短信验证码
            const mobile = this.step === 1 ? this.form.mobileNo : this.mobileForm.mobileNo
            sendSmsCode1({ mobileNo: mobile }).then(res => {
              if (+res.status === 200) {
                this.$message.success('手机验证码已发送')
                this.smsToken = res.data.smsToken
                // 开始倒计时
                this.resetTime()
              } else {
                // 刷新图形验证码
                this.getImgCodeFunc()
                this.$message.error(res.message || '获取手机验证码异常')
              }
            })
          } else {
            this.$message.error(res.message || '图形验证码错误，请重新输入')
            this.getImgCodeFunc()
          }
        })
      }
    },
    // 手机验证码倒计时60s
    resetTime() {
      if (this.timer) this.timer = null
      this.timer = setInterval(() => {
        if (this.smsTime > 1) {
          this.smsTime -= 1
        } else {
          clearInterval(this.timer)
          this.smsTime = 60
          this.smsText = '发送验证码'
          this.timer = null
        }
      }, 1000)
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateMobileStepTwo({
            newMobileNo: this.mobileForm.mobileNo,
            oldMobileNo: this.form.mobileNo,
            smsVerifyCode: this.mobileForm.smsVerifyCode,
            smsToken: this.smsToken,
            oneStepToken: this.oneStepToken
          }).then(res => {
            if (+res.status === 200) {
              this.$message.success('操作成功')
              // 登出重新登陆
              this.$store.dispatch('LogOut').then(() => {
                setTimeout(() => {
                  location.href = '/home'
                }, 1000)
              })
            } else {
              this.$message.error(res.message || ' 重置密码失败')
            }
          })
        } else {
          return false
        }
      })
    },
    // 点击取消按钮，关闭对话框
    closeDialog() {
      this.$emit('closeDialog')
    },
    // 对话框关闭时触发，清空表单数据，重置验证码按钮和计时器
    clearDialog() {
      this.step = 1
      this.$refs.form.resetFields()
      this.$refs.mobileForm.resetFields()
      this.passError = '' // 重置
      // this.getCodeBtn = true
      this.countDown = 60
      // 清空计时器
      if (this.countDownInterval) {
        window.clearInterval(this.countDownInterval)
        this.countDownInterval = null
      }
    }
  }
}
</script>
<style lang="scss">
.change-mobile {
  // 对话框样式调整
  .el-dialog {
    border-radius: 8px;
  }
  .el-dialog__title {
    padding-left: 33px; // 53 - 20
    font-size: 20px;
    line-height: 34px;
    color: #59676f;
  }
  .el-dialog__body {
    padding: 0 54px 0 53px;
  }
  // 表单样式调整
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item__label {
    font-size: 14px;
    color: #59676f;
    line-height: 40px;
    padding: 0;
  }
  // 校验信息样式：居右、文字大小
  .el-form-item__error {
    right: 0;
    text-align: right;
    font-size: 14px;
  }
  .footer {
    margin-top: 40px;
    padding-bottom: 34px;
    text-align: center;
    button {
      width: 135px;
    }
    .el-button + .el-button {
      margin-left: 40px;
    }
  }
  .forget-imgUrl {
    position: absolute;
    line-height: 10px;
    top: 5px;
    right: 5px;
    background: -webkit-linear-gradient(180deg, #d8d8d8, #eeeeee);
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // .el-form :nth-last-child(1) {
  //   margin: 20px 0;
  // }
}
</style>
