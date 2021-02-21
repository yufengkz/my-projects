<template>
  <div class="login-left">
    <div>
      <div class="left-title">MAP金农审批系统</div>
      <div class="left-dec">
        <span>服务产业</span>
        <div class="dot"></div>
        <span>极速到账</span>
        <div class="dot"></div>
        <span>安全可靠</span>
        <div class="dot"></div>
        <span>贴身服务</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentLeft',
  data() {
    return {}
  },
  methods: {
    // goHome() {
    //   this.$router.push('/')
    // }
  }
}
</script>

<style scoped lang="scss">
.login-left {
  color: #fff;
  text-align: center;
  .left-title {
    font-size: 48px;
    font-weight: bold;
    color: white;
    line-height: 60px;
  }
  .left-dec {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    span {
      color: white;
      font: 16px;
    }
    .dot {
      height: 6px;
      width: 6px;
      border-radius: 3px;
      background: white;
      margin-left: 20px;
      margin-right: 20px;
    }
  }
}
// @media screen and (max-width: 992px) {
//   .login-left {
//     width: 100%;
//     .left-title {
//       font-size: 20px;
//       font-weight: bold;
//       color: white;
//       line-height: 20px;
//     }
//     .left-dec {
//       display: flex;
//       flex-direction: row;
//       justify-content: center;
//       align-items: center;
//       margin-top: 16px;
//       span {
//         color: white;
//         font: 12px;
//       }
//       .dot {
//         height: 6px;
//         width: 6px;
//         border-radius: 3px;
//         background: white;
//         margin-left: 5px;
//         margin-right: 5px;
//       }
//     }
//   }
// }
</style>
