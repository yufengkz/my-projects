<template>
  <div class="container">
    <el-header height="100px" class="v-header">
      <div class="v-row">
        <h1 class="logo">
          <img src="../../assets/SinoCapital.png" alt="" />
        </h1>
        <!-- <span>智农运管业务平台</span> -->
      </div>
    </el-header>
    <el-row type="flex" justify="center" align="middle">
      <el-col :span="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>修改手机号</span>
            <el-button style="float: right; padding: 3px 0" type="text" v-show="step === 2" @click="step--">
              上一步
            </el-button>
          </div>
          <!-- 手机号、验证码验证 -->
          <el-form :model="form" status-icon ref="form" :rules="rules" label-width="30%" v-show="step === 1">
            <el-form-item label="原手机号" prop="mobileNo">
              <el-input v-model="form.mobileNo" maxlength="11" placeholder="请输入手机号"></el-input>
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
            <div class="btns-center-box">
              <el-button @click="goBack">返回</el-button>
              <el-button type="primary" @click="next('form')">下一步</el-button>
            </div>
          </el-form>
          <!-- 修改密码 -->
          <el-form :model="mobileForm" status-icon ref="mobileForm" :rules="mobileFormRules" label-width="30%" v-show="step === 2">
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
            <div class="btns-center-box">
              <el-button @click="goBack">返回</el-button>
              <el-button type="primary" @click="submitForm('mobileForm')">提交</el-button>
            </div>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getImgCode, checkImgCode, sendSmsCode, updatePasswordStepOne, updateMobileStepTwo } from '@/api/login.js'
import { validateMobile } from '@/utils/validate' // validatePassword
import { mapGetters } from 'vuex'

export default {
  name: 'ChangePwd',
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
    // 新密码校验
    // const validatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入新密码'))
    //   } else if (value.length < 8 || value.length > 16) {
    //     callback(new Error('请录入8~16位密码'))
    //   } else if (!validatePassword(value)) {
    //     callback(new Error('密码至少包含英文字母和数字两种字符'))
    //   } else {
    //     // if (this.mobileForm.newPassword !== '') {
    //     //   this.$refs.mobileForm.validateField('newPassword')
    //     // }
    //     callback()
    //   }
    // }
    // 确认新密码校验
    // const validatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请再次输入新密码'))
    //   } else if (value !== this.mobileForm.password) {
    //     callback(new Error('两次输入密码不一致，请重新输入'))
    //   } else {
    //     callback()
    //   }
    // }
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
    this.form.mobileNo = this.currentUser.mobileNo
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
            sendSmsCode({ mobileNo: mobile }).then(res => {
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
                location.href = '/home'
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
    goBack() {
      history.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100%;
  height: 100%;
  background: url(./../../assets/background_img.png) no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  text-align: center;
  color: #fff;
  .v-header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // background: #08b448;
    // border-left: 1px solid #55ca81;
    .v-row {
      max-width: 1290px;
      width: 1290px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: PingFangSC-Regular, PingFang SC;
      font-size: 24px;
      color: #fff;

      h1 {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        // text-indent: -999999px;
        font-size: 24px;
        color: #fff;
        img {
          width: 160px;
        }
        span {
          padding-left: 30px;
        }
      }
    }
  }
  .el-row {
    height: 100%;
    width: 560px;
    margin: 0 auto;
    padding: 0 50px;
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
  }
  .el-form-item__label {
    font-size: 14px;
    color: #59676f;
    line-height: 40px;
    padding: 0;
    width: 30%;
  }
  .el-form-item__content {
    width: 70%;
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
}
</style>
