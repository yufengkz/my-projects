<template>
  <div class="register">
    <headersNav :selected="'6'" theme="white" />
    <ContentWrapper contentTitle="注册">
      <div slot="content" class="register-content">
        <el-row type="flex" justify="center" class="register-content-header clearfix">
          <el-col style="width:22px">
            <p v-bind:class="['progressIndex','progressIndexActive']">1</p>
          </el-col>
          <el-col style="width:105px">
            <p class="register-content-header-active">手机验证</p>
          </el-col>
          <el-col style="width:25px"></el-col>
          <el-col style="width:22px">
            <p
              v-bind:class="['progressIndex',(currentStep === 'StepTwo'||currentStep ==='StepThree') ? 'progressIndexActive' : '']"
            >2</p>
          </el-col>
          <el-col style="width:105px">
            <p
              :class="(currentStep === 'StepTwo'||currentStep ==='StepThree') ? 'register-content-header-active' : ''"
            >完善信息</p>
          </el-col>
          <el-col style="width:25px"></el-col>
          <el-col style="width:22px">
            <p v-bind:class="['progressIndex',currentStep === 'StepThree' ? 'progressIndexActive' : '']">3</p>
          </el-col>
          <el-col style="width:105px">
            <p :class="currentStep ==='StepThree' ? 'register-content-header-active' : ''">完成注册</p>
          </el-col>
        </el-row>
        <div>
          <component
            v-bind:is="currentStep"
            :userId="userId"
            :version="version"
            :sinochemOwned="sinochemOwned"
            @step-one-success="handleStepOneSuccess"
            @StepTwoSuccess="handleStepTwoSuccess"
          ></component>
        </div>
      </div>
    </ContentWrapper>
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      currentStep: 'StepOne',
      userId: null,
      version: null,
      sinochemOwned: 0 // 0-否 1-是
    }
  },
  methods: {
    // 第一步提交
    handleStepOneSuccess(data) {
      const { userId, version } = data
      this.userId = userId
      this.version = version
      this.currentStep = 'StepTwo'
    },
    // 第二步注册提交
    handleStepTwoSuccess(sinochemOwned) {
      this.sinochemOwned = sinochemOwned
      this.currentStep = 'StepThree'
    }
  },
  components: {
    HeadersNav: () => import('@/components/HeadersNav.vue'),
    ContentWrapper: () => import('./components/ContentWrapper.vue'),
    Footer: () => import('@/components/Footer.vue'),
    StepOne: () => import('./components/RegisterStepOne.vue'),
    StepTwo: () => import('./components/RegisterStepTwo.vue'),
    StepThree: () => import('./components/RegisterStepThree.vue')
  }
}
</script>

<style solt-scope lang="scss">
$theme-font: #4a90e2;
$theme-font-color: #333333;
.register {
  .register-content {
    color: #333;
    position: absolute;
    top: 60px;
    left: 0px;
    right: 0px;
    margin-top: 5px;
    bottom: 90px;
    .register-content-header {
      width: 100%;
      margin: 10px auto;
      padding: 20px 0;
      display: flex;
      color: #999999;
      p {
        flex: 1;
        font-size: 16px;
        text-align: center;
        color: #d1d1d1;
        overflow: hidden;
        letter-spacing: 1.14px;
        white-space: nowrap;
        height: 20px;
        line-height: 15px;
      }
      .progressIndex {
        width: 21px;
        height: 20px;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        color: white;
        background-color: #d1d1d1;
        // border: 1px solid #e0e0e0;
        border-radius: 50%;
      }
      .progressIndexActive {
        background-color: $theme-font;
      }
      .register-content-header-active {
        color: $theme-font;
      }
    }
    .registerSuccess {
      display: table-cell;
      vertical-align: middle;
      position: absolute;
      left: 0px;
      right: 0px;
      margin-top: 60px;
      h3 {
        text-align: center;
        font-weight: normal;
        font-size: 16px;
        margin-top: 100px;
        color: rgba(51, 51, 51, 0.85);
        line-height: 24px;
      }
      .icon {
        font-size: 75px;
        margin: 0 auto;
        left: 0px;
        right: 0px;
        position: absolute;
      }
    }
  }
}
</style>
