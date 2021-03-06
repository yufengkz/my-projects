<template>
  <div class="forget">
    <ContentWrapper contentTitle="忘记密码">
      <div slot="content" class="forget-content">
        <div class="forget-content-form" v-if="!resetSuccess">
          <el-form :model="form" :rules="rules" ref="form" auto-complete="off">
            <div class="forget-content-form-input" :key="0">
              <el-form-item prop="mobileNo">
                <el-input type="text" v-model="form.mobileNo" placeholder="请输入手机号" maxlength="11"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="form.password" placeholder="请设置密码" auto-complete="new-password"></el-input>
              </el-form-item>
              <el-form-item prop="confirmPassword">
                <el-input
                  type="password"
                  v-model="form.confirmPassword"
                  placeholder="请确认新密码"
                  auto-complete="new-password"
                ></el-input>
              </el-form-item>
              <el-form-item prop="verifyCode">
                <el-input type="text" v-model="form.verifyCode" placeholder="请输入图形验证码" maxlength="4"></el-input>
                <span class="forget-imgUrl" @click="getImgCodeFunc">
                  <img :src="verifyImgUrl" alt="验证码">
                </span>
              </el-form-item>
              <el-form-item prop="smsVerCode">
                <el-input type="text" v-model="form.smsVerCode" placeholder="请输入短信验证码" maxlength="4">
                  <el-button slot="append" v-if="smsTime<60">{{smsTime+'秒后重新获取'}}</el-button>
                  <el-button slot="append" v-else @click="getSmsCodeFun">{{smsText}}</el-button>
                </el-input>
                <!-- <span class="smsbtn" v-if="smsTime<60">{{smsTime+'秒后重新获取'}}</span>
                <span class="smsbtn" v-else @click="getSmsCodeFun" style="cursor:pointer;">{{smsText}}</span> -->
              </el-form-item>
            </div>
          </el-form>
          <button class="forget-content-button" @click="submitForm">确定</button>
        </div>
        <div class="forget-success" v-else>
          <svg-icon icon-class="reset-password-success" class="icon" style="width:151px;height:186px"></svg-icon>
          <h3>密码重置成功</h3>
          <button class="forget-content-button" @click="jupmPageLogin">立即登录</button>
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>

<script>
import { getImgCode, checkImgCode, sendSmsCode, resetPassword } from '@/api/login.js'
import { validateMobile, validatePassword } from '@/utils/validate'
const Base64 = require('js-base64').Base64

export default {
  name: 'ForgetPage',
  components: {
    ContentWrapper: () => import('./components/ContentWrapper.vue')
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
    // 新密码校验
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value.length < 8 || value.length > 16) {
        callback(new Error('请录入8~16位密码'))
      } else if (!validatePassword(value)) {
        callback(new Error('密码至少包含英文字母和数字两种字符'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    }
    // 确认新密码校验
    const confirmPasswordValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认新密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致，请重新输入'))
      } else {
        callback()
      }
    }
    return {
      smsText: '获取短信验证码',
      resetSuccess: false,
      smsTime: 60, // 发送验证码倒计时
      timer: null,
      verifyImgUrl: '',
      verifyCodeId: '', // 图形验证码id
      form: {
        mobileNo: '',
        password: '',
        confirmPassword: '',
        smsVerCode: '', // 手机短信验证码
        verifyCode: '' // 图形验证码
      },
      rules: {
        mobileNo: [{ required: true, validator: validateMobileNo, trigger: 'blur' }],
        verifyCode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }, { min: 4, max: 4, message: '请输入四位图形验证码', trigger: 'blur' }],
        smsVerCode: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }, { min: 4, max: 4, message: '请输入四位手机短信验证码', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: confirmPasswordValidator, trigger: 'blur' }]
      }
    }
  },
  computed: {
    forgotDiseabled() {
      return this.form.password === '' || this.form.newpwd === ''
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
  methods: {
    // 获取图形验证码
    getImgCodeFunc() {
      getImgCode().then(res => {
        if (res.code === 200) {
          this.verifyImgUrl = res.data.imgBase64
          this.verifyCodeId = res.data.imgId
        }
      })
    },
    // 获取手机短信验证码
    getSmsCodeFun() {
      let isPhoneValid = true

      this.$refs.form.validateField('mobileNo', error => {
        if (error) {
          this.$message.warning({ message: '请输入正确的手机号' })
          isPhoneValid = false
        }
      })

      if (isPhoneValid) {
        this.checkImageCode()

        // checkPhoneExist({ mobileNo: this.form.mobileNo }).then(res => {
        //   if (res.status === 200 || res.status === '200') {
        //     this.checkImageCode()
        //   } else {
        //     this.$message.warning({ message: '该手机号未注册' })
        //   }
        // })
      }
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
          if (res.code === 200) {
            // 获取短信验证码
            sendSmsCode({ mobileNo: this.form.mobileNo }).then(res => {
              if (res.code === 200) {
                this.$message.success('短信验证码已发送')
                // 开始倒计时
                this.resetTime()
              } else {
                // 刷新图形验证码
                this.getImgCodeFunc()
                this.$message.error(res.message || '获取短信验证码异常')
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
          this.smsText = '重新发送验证码'
          this.timer = null
        }
      }, 1000)
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          resetPassword({ mobileNo: this.form.mobileNo, password: Base64.encode(this.form.password), smsVerCode: this.form.smsVerCode }).then(res => {
            if (res.code === 200) {
              this.$message.success('密码设置成功')
              this.$router.push('/login')
            } else {
              this.$message.error(res.message || '重置密码失败')
            }
          })
        } else {
          return false
        }
      })
    },
    jupmPageLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style solt-scope lang="scss">
$theme-font: #4a90e2;
$theme-font-color: #333333;
.forget {
  .forget-content {
    .forget-content-form {
      font-size: 14px;
      width: 100%;
      .forget-content-form-input {
        .el-form-item__content {
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
          .smsbtn {
            position: absolute;
            top: 5px;
            right: 5px;
            padding-left: 10px;
            padding-right: 10px;
            line-height: 30px;
            color: white;
            background-image: linear-gradient(-81deg, #0565ff 1%, #0099ff 100%);
          }
        }
      }
    }
    .forget-content-button {
      width: 100%;
      height: 50px;
      border: 0;
      color: white;
      text-align: center;
      margin: 20px 0 40px;
      cursor: pointer;
      font-size: 18px;
      background: #3461ff;
      box-shadow: 0px 6px 10px 0px #c9d6ff;
    }
    .forget-content-button:focus {
      outline: none;
    }
    .forget-success {
      text-align: center;
      h3 {
        text-align: center;
        font-weight: 500;
        font-size: 20px;
        color: rgba(51, 51, 51, 0.85);
      }
      .icon {
        font-size: 75px;
      }
    }
  }
}
</style>
