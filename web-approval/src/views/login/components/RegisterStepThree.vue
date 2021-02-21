<template>
  <div>
    <!-- 非中化成员单位 -->
    <div v-if="sinochemOwned===0" class="outer">
      <svg-icon icon-class="成功" class="icon"></svg-icon>
      <h3>注册成功，{{time}}s后跳转至登录页</h3>
      <div class="register-content-button">
        <button @click="jupmPageLogin">立即登录</button>
      </div>
    </div>
    <!-- 中化成员单位 -->
    <div v-else-if="sinochemOwned===1" class="inner">
      <svg-icon icon-class="成功"></svg-icon>
      <h3>注册成功</h3>
      <h4>
        请等待
        <span>管理员</span>
        审核
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterStepThree',
  data() {
    return {
      time: 5, // 登录倒计时
      timer: null
    }
  },
  props: {
    // 0-否 1-是
    sinochemOwned: {
      type: Number
    }
  },
  created() {
    if (this.sinochemOwned === 0) {
      this.resetTime()
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    // 登录倒计时5s
    resetTime() {
      if (this.timer) this.timer = null
      this.timer = setInterval(() => {
        if (this.time > 1) {
          this.time -= 1
        } else {
          clearInterval(this.timer)
          this.$router.push('/login')
        }
      }, 1000)
    },
    // 立即登录
    jupmPageLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="scss">
h3 {
  font-weight: normal;
  font-size: 20px;
  margin-top: 70px;
  i {
    color: #fff;
    font-size: 20px;
    padding-right: 10px;
  }
}
.register-content-button {
  margin-top: 20px;
  button {
    width: 100%;
    height: 50px;
    margin-top: 40px;
    cursor: pointer;
    color: #ffffff;
    border: 0;
    font-size: 20px;
    background-image: linear-gradient(90deg, #0565ff 0%, #0099ff 100%);
  }
}
.inner {
  text-align: center;
  padding-top: 100px;
  .svg-icon {
    font-size: 148px;
  }
  h3 {
    margin-top: 45px;
  }
  h4 {
    font-weight: normal;
    span {
      color: #388af7;
    }
  }
}
.outer {
  text-align: center;
  padding-top: 70px;
  .svg-icon {
    font-size: 140px;
  }
  h3 {
    margin-top: 55px;
  }
}
</style>
