<template>
  <el-form ref="form" class="register-content-form step-one" :rules="rules" :model="form">
    <el-form-item prop="mobileNo">
      <svg-icon icon-class="手机-灰色" class="icon"></svg-icon>
      <el-input type="text" v-model="form.mobileNo" ref="getTel" placeholder="请输入手机号" maxlength="11"></el-input>
    </el-form-item>
    <el-form-item prop="verifyCode">
      <svg-icon icon-class="验证码-灰色" class="icon"></svg-icon>
      <el-input type="text" v-model="form.verifyCode" placeholder="请输入图片验证码 " maxlength="4"></el-input>
      <span class="register-imgUrl" @click="getImgCodeFun">
        <img :src="verifyImgUrl" alt="验证码" />
      </span>
    </el-form-item>
    <el-form-item prop="smsVerCode">
      <svg-icon icon-class="验证码-灰色" class="icon"></svg-icon>
      <el-input
        type="text"
        v-model="form.smsVerCode"
        placeholder="请输入手机验证码"
        maxlength="4"
        @keyup.enter.native="submitForm"
      ></el-input>
      <span class="smsbtn" v-if="smsTime<60">{{smsTime+'秒后获取'}}</span>
      <span v-else class="smsbtn" @click="getSmsCodeFun">获取验证码</span>
    </el-form-item>
    <div class="register-content-button">
      <button type="button" @click="submitForm">下一步</button>
    </div>
  </el-form>
</template>

<script>
import { getImgCode, getSmsCode, doVerifyMobile } from '@/api/login.js'
export default {
  name: 'RegisterStepOne',
  data() {
    return {
      smsTime: 60, // 发送验证码倒计时
      timer: null, // 倒计时定时器
      verifyImgUrl: '',
      verifyCodeId: '', // 图形验证码id
      form: {
        mobileNo: '',
        verifyCode: '', // 输入的图形验证码
        smsVerCode: '' // 输入的手机验证码
      },
      rules: {
        mobileNo: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '请输入正确的手机号', trigger: 'blur' }],
        verifyCode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }, { min: 4, max: 4, message: '请输入四位图形验证码', trigger: 'blur' }],
        smsVerCode: [{ required: true, message: '请输入手机短信验证码', trigger: 'blur' }, { min: 4, max: 4, message: '请输入四位手机短信验证码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    // smsBtnDisable() {
    //   if (this.form.mobileNo.length === 11) {
    //     return this.form.verifyCode === '' || this.form.mobileNo === ''
    //   } else {
    //     return true
    //   }
    // },
    // nextBtnDisabled() {
    //   if (this.form.mobileNo.length === 11) {
    //     return this.form.mobileNo === '' || this.form.verifyCode === '' || this.form.smsVerCode === ''
    //   } else {
    //     return true
    //   }
    // }
  },
  created() {
    this.getImgCodeFun()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      this.smsTime = 60
    }
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          return false
        }
        const { mobileNo: mobile, smsVerCode } = this.form
        doVerifyMobile({ mobile, smsVerCode })
          .then(res => {
            if (res.status === 200) {
              const { userId, version } = res.data
              this.$emit('step-one-success', { userId, version })
            } else {
              this.getImgCodeFun()
              this.$message.error(res.message || '手机验证失败')
            }
          })
          .catch(() => {
            this.getImgCodeFun()
            this.$message.error('手机验证失败')
          })
      })
    },
    // 获取手机验证码
    getSmsCodeFun() {
      let isPhoneValid = true
      let isVerifyCode = true

      this.$refs.form.validateField('mobileNo', error => {
        if (error) {
          this.$message.warning({ message: '请输入正确的手机号' })
          isPhoneValid = false
        }
      })

      if (isPhoneValid) {
        this.$refs.form.validateField('verifyCode', error => {
          if (error) {
            this.$message.warning({ message: '请输入正确的图形验证码' })
            isVerifyCode = false
          }
        })
      }

      if (isPhoneValid && isVerifyCode) {
        const { mobileNo, verifyCode } = this.form
        const verifyCodeId = this.verifyCodeId
        getSmsCode({ mobileNo, verifyCode, verifyCodeId })
          .then(res => {
            if (res.status === 200) {
              this.$message.success('手机验证码已发送')
              // 开始倒计时
              this.resetTime()
            } else {
              // 刷新图片验证码
              this.getImgCodeFun()
              this.$message.error(res.message || '获取手机验证码异常')
            }
          })
          .catch(() => {
            // 刷新图片验证码
            this.getImgCodeFun()
            this.$message.error('获取手机验证码异常')
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
          this.timer = null
          this.smsTime = 60
        }
      }, 1000)
    },
    // 获取图形验证码
    getImgCodeFun() {
      getImgCode()
        .then(res => {
          if (res.status === 200) {
            this.verifyImgUrl = res.data.imgBase64
            this.verifyCodeId = res.data.imgId
          } else {
            this.$message.error(res.message || '获取图形验证码失败')
          }
        })
        .catch(() => {
          this.$message.error('获取图形验证码失败')
        })
    }
  }
}
</script>

<style scoped lang="scss">
.register-content-form.step-one {
  padding-top: 30px;
  .register-imgUrl {
    position: absolute;
    top: 17px;
    right: 20px;
    line-height: 10px;
    background: -webkit-linear-gradient(180deg, #d8d8d8, #eeeeee);
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .smsbtn {
    position: absolute;
    top: 17px;
    right: 20px;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 30px;
    color: white;
    border-width: 0px;
    background-image: linear-gradient(81deg, #0565ff 1%, #0099ff 100%);
    cursor: pointer;
  }
  .smsbtn-disabled {
    background-image: linear-gradient(54deg, rgba(33, 119, 255, 0.6) 0%, rgba(107, 164, 255, 0.6) 100%);
  }

  .register-content-button {
    margin-top: 30px;
    .button-disabled {
      background-image: linear-gradient(54deg, rgba(33, 119, 255, 0.6) 0%, rgba(107, 164, 255, 0.6) 100%);
      color: white;
    }
    button {
      width: 100%;
      height: 50px;
      margin-top: 20px;
      cursor: pointer;
      color: #ffffff;
      border: 0;
      font-size: 20px;
      background-image: linear-gradient(90deg, #0565ff 0%, #0099ff 100%);
    }
  }
}
</style>
