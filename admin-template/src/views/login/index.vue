<template>
  <div class="sign-in">
    <ContentWrapper contentTitle="登录">
      <div slot="content" class="login-content">
        <div class="login-form">
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" auto-complete="off" hide-required-asterisk>
            <div>
              <el-form-item prop="mobileNo">
                <el-input
                  type="text"
                  name="mobileNo"
                  auto-complete="off"
                  v-model="loginForm.mobileNo"
                  placeholder="请输入手机号"
                  maxlength="11"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item prop="verifyCode">
                <el-input
                  type="text"
                  v-model="loginForm.verifyCode"
                  placeholder="请输入图形验证码"
                  maxlength="4"
                  @keyup.enter.native="handleLogin"
                ></el-input>
                <span class="verify-img" @click="()=>getImgCodeFunc()">
                  <img :src="verifyImgUrl" alt="验证码">
                </span>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="singin-implantation">
          <p @click="toPageForget" class="singin-implantation-white">忘记密码？</p>
        </div>
        <button class="login-btn" ref="loginBtn" @click="handleLogin">登 录</button>
      </div>
    </ContentWrapper>
  </div>
</template>

<script>
import { getImgCode, doLogin, getCurrentInfo } from '@/api/login.js'
import { mapGetters } from 'vuex'
// import { routeInfo } from '@/store/modules/route-info'
import { setToken } from '@/utils/auth.js'
import { validateMobile, validatePassword } from '@/utils/validate'
const Base64 = require('js-base64').Base64

export default {
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
    // 密码校验
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 8 || value.length > 16) {
        callback(new Error('请录入8~16位密码'))
      } else if (!validatePassword(value)) {
        callback(new Error('密码至少包含英文字母和数字两种字符'))
      } else {
        callback()
      }
    }
    return {
      redirect: '/',
      loginForm: {
        mobileNo: '',
        password: '',
        verifyCodeId: '',
        verifyCode: ''
      },
      verifyImgUrl: '',
      loginRules: {
        mobileNo: [{ required: true, validator: validateMobileNo, trigger: 'blur' }],
        verifyCode: [{ required: true, message: '请输入图形验证码', trigger: 'blur' }, { min: 4, max: 4, message: '请输入四位图形验证码', trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  components: {
    ContentWrapper: () => import('./components/ContentWrapper.vue')
  },
  created() {
    // 获取图形验证码
    this.getImgCodeFunc()
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    // 获取图形验证码
    getImgCodeFunc() {
      getImgCode().then(res => {
        if (res.code === 200) {
          this.verifyImgUrl = res.data.imgBase64
          this.loginForm.verifyCodeId = res.data.imgId
        }
      })
    },
    toPageForget() {
      // 忘记密码
      this.$router.push('/forget')
    },
    // 点击登录时先做图形验证码校验
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 防止重复提交
          this.$refs.loginBtn.disabled = true
          const params = {
            password: Base64.encode(this.loginForm.password),
            // password: this.loginForm.password,
            mobileNo: this.loginForm.mobileNo,
            verifyCodeId: this.loginForm.verifyCodeId,
            verifyCode: this.loginForm.verifyCode
          }
          doLogin(params)
            .then(res => {
              if (res.code === 200) {
                // 将token存入cookie
                setToken(res.data)
                // 获取用户信息
                getCurrentInfo()
                  .then(res => {
                    if (res.code === 200) {
                      // 将用户信息存入Vuex
                      this.$store.dispatch('SetUserInfo', res.data)
                      this.generateRoutes(res.data.resourcesListTreeList)
                    } else {
                      this.getImgCodeFunc()
                      this.loginForm.verifyCode = ''
                      this.$message.error(res.message || '获取用户角色信息异常')
                    }
                    this.$refs.loginBtn.disabled = false
                  })
                  .catch(() => {
                    this.$refs.loginBtn.disabled = false
                    this.getImgCodeFunc()
                    this.loginForm.verifyCode = ''
                    this.$message.error('获取用户信息异常')
                  })
              } else {
                this.$refs.loginBtn.disabled = false
                this.getImgCodeFunc()
                this.$message.error(res.message || '登录失败')
              }
            })
            .catch(err => {
              this.$refs.loginBtn.disabled = false
              console.info(err)
              this.getImgCodeFunc()
              this.loginForm.verifyCode = ''
              this.$message.error('登录失败')
            })
        } else {
          return false
        }
      })
    },
    generateRoutes(menu) {
      this.$store.dispatch('GenerateRoutes', menu)
      this.$router.push({ path: this.redirect || menu[0].path })
    }
    // generateRoutesByFrontend(roleNo) {
    //   this.$store.dispatch('GenerateRoutes', routeInfo)
    //   this.$router.push({ path: this.redirect || routeInfo[0].path })
    // },
  }
}
</script>

<style lang="scss">
$theme-font: #4a90e2;
$theme-font-color: #333333;
.sign-in {
  .login-content {
    .login-form {
      font-size: 14px;
      width: 100%;
      a {
        color: #666;
        font-size: 14px;
        left: 5%;
        text-align: left;
        cursor: pointer;
        text-decoration: underline;
        position: absolute;
        bottom: 5px;
      }
    }
    .login-btn {
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
    .login-btn:focus {
      outline: none;
    }
    .singin-implantation {
      width: 100%;
      margin-top: -10px;
      p {
        font-size: 12px;
        text-align: center;
        cursor: pointer;
      }
      .singin-implantation-white {
        font-size: 12px;
        float: right;
        margin-top: 5px;
        color: #999999;
      }
    }
  }
  .el-form-item__content {
    font-size: 12px;
    position: relative;
    .verify-img {
      position: absolute;
      right: 5px;
      top: 5px;
      height: 30px;
      background: -webkit-linear-gradient(180deg, #d8d8d8, #eeeeee);
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.role-select-dialog {
  .el-dialog__body {
    border-top: 1px solid #f2f2f2;
  }
  ul {
    padding: 0 40px;
    margin-top: -10px;
  }
  ul li {
    list-style: none;
    display: inline-block;
    width: 100px;
    height: 100px;
    text-align: center;
    position: relative;
    > .svg-icon {
      font-size: 20px;
      position: absolute;
      top: 18px;
      right: 9px;
    }
    p:last-child {
      color: #999999;
      margin-top: -12px;
    }
    p {
      .svg-icon {
        cursor: pointer;
        font-size: 100px;
      }
    }
  }

  ul li:last-child {
    margin-left: 45px;
  }
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition-delay: 99999s;
  transition: color 99999s ease-out, background-color 99999s ease-out;
}
</style>
