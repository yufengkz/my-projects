// 登录、注册、忘记密码的主内容区
<template>
  <div class="wrapper-bg">
    <!-- <HeadersNav/> -->
    <div class="wrapper">
      <div class="wrapper-content">
        <div @click="goBack">
          <svg-icon icon-class="返回箭头" class="back" v-show="$route.path.includes('forget')"/>
        </div>
        <img class="leftImg" src="@/assets/login-left.png" alt="">
        <div class="wrapper-right">
          <slot name="content"></slot>
        </div>
      </div>
      <!-- <el-row class="wrapper-content">
        <el-col :xs="24" :sm="24" :md="14">
          <ContentLeft/>
        </el-col>
        <el-col>
          <img class="leftImg" src="../../../assets/registerBack.png" alt="">
        </el-col>
        <el-col class="flexible">
          <div class="wrapper-right">
            <div class="wrapper-title">{{contentTitle}}</div>
            <slot name="content"></slot>
          </div>
        </el-col>
      </el-row>-->
    </div>
    <Footer/>
  </div>
</template>

<script>
export default {
  name: 'ContentWrapper',
  components: {
    // HeadersNav: () => import('./HeadersNav.vue')
    // ContentLeft: () => import('./ContentLeft.vue'),
    Footer: () => import('./Footer.vue')
  },
  data() {
    return {}
  },
  // props: {
  //   contentTitle: {
  //     type: String,
  //     default: ''
  //   }
  // },
  methods: {
    loginTypeChange(type) {
      this.$store.dispatch('ToggleLoginType', type)
    },
    goBack() {
      this.$router.push('login')
    }
  }
}
</script>

<style scoped lang="scss">
.wrapper-bg {
  background-image: url('~@/assets/login-background.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  min-height: 100vh;
  height: 100%;
}
.wrapper {
  width: 100%;
  min-height: 100%;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.wrapper-content {
  position: relative;
  width: 799px;
  margin: 0 auto;
  background: #fff;
  height: 583px;
  margin-top: 10vh;
  // box-shadow: 0px 18px 0 0 rgba(20, 64, 145, 0.66);
  border-radius: 10px;
  // position: absolute;;
  // top: calc(50% - 290px);
  // left: calc(50% - 400px);
}
// .wrapper-content {
//   height: 100vh;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
// }
.wrapper-right {
  float: right;
  width: 468px;
  height: 583px;
  background: #fff;
  // background-image:url('~@/assets/registerBack.png');
  padding: 0 42px;
  // box-shadow: 0px 18px 36px -2px rgba(20,64,145,0.66);
  border-radius: 6px;
  border-right: 1px solid #08b448;

  .wrapper-title {
    font-size: 32px;
    // color: #5ab74a;
    color: #666;
    line-height: 44px;
    font-weight: 600;
    padding-top: 77px;
    margin-bottom: 10px;
    text-align: center;
  }
}

.leftImg {
  // float: left;
  width: 318px;
  height: 583px;
}
.back {
  position: absolute;
  pointer-events: all !important;
  left: 20px;
  top: 20px;
  width: 46px;
  height: 46px;
  cursor: pointer;
}

// @media screen and (max-width: 992px) {
//   .wrapper {
//     z-index: 1;
//     .wrapper-content {
//       top: 40px;
//       display: block;
//       margin: 20px auto;
//       .wrapper-right {
//         max-width: 320px;
//         padding: 0 20px;
//         .wrapper-title {
//           font-size: 18px;
//           line-height: 20px;
//         }
//       }
//       .flexible {
//         margin-top: 30px;
//         display: flex;
//         flex-direction: row;
//         justify-content: center;
//         align-items: center;
//       }
//     }
//   }
// }
</style>
