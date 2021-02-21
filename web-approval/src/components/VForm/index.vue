<template>
  <div class="v-form">
    <el-card>
      <div class="v-form-header">
        <div class="v-form-header-title">
          <span v-if="title" class="all-main-tit all-tit-bar"></span>
          <span v-if="title" class="all-main-tit all-tit-con">{{ title }}</span>
          <span v-if="tips" class="tips" type="primary">{{ tips }}</span>
          <!-- <el-link v-if="tips" type="primary" :underline="false">{{ tips }}</el-link> -->
        </div>
        <slot name="header"></slot>
      </div>
      <div class="v-form-content" :style="{ padding: subTitle ? '0 0 0 0px' : '' }">
        <p class="v-form-sub-title" v-if="subTitle">{{ subTitle }}</p>
        <slot name="content"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    tips: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.v-form {
  margin-bottom: 20px;
  // border-bottom: 1px solid #dcdfe6;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.v-form-header {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .v-form-header-title {
    display: flex;
    align-items: center;
    line-height: 17px;
    .tips {
      margin-left: 30px;
      font-size: 12px;
      color: #08b448;
    }
    // a {
    //   margin-left: 30px;
    //   cursor: default;
    // }
  }
}
.v-form-content {
  // margin-top: 10px;
  .v-form-sub-title {
    height: 20px;
    line-height: 20px;
    color: #000;
    font-size: 14px;
    margin-top: -1px;
  }
}
</style>
