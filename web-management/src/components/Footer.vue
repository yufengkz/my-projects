<template>
  <div class="footer">
    <div class="footer-body">
      <!-- 相关介绍 -->
      <div class="footer-top">
        <div class="footer-top-body footer-top-body-content">
        <el-row :gutter="40">
            <el-col style="width:50%">
               <p class="title" style="text-align:right; margin-top:30px">版权所有© 中化资本有限公司</p>
             </el-col>
             <el-col style="width:50%">
               <p class="title" style="margin-top:30px">中化资本比邻星平台 | 福金</p>
             </el-col>
        </el-row>
        <el-row >
            <el-col style="width100%; text-align:center" >
                 <a href="http://www.beian.miit.gov.cn/ " class="title"> 沪ICP备18028530号-1</a>
             </el-col>
        </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonfooter',
  data() {
    return {}
  },
  methods: {
    backtoTop() {
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
  },
  watch: {}
}
</script>

<style scoped lang="scss">
// .footer-body {
//   max-width: 1200px;
//   margin: 0 auto;
// }
// @media screen and (max-width: 1800px) {
//   .footer-body {
//     max-width: 1200px;
//     margin: 0 auto;
//   }
// }
// @media screen and (min-width: 990px) and (max-width: 1300px) {
//   .footer-body {
//     max-width: 1000px;
//     margin: 0 auto;
//   }
// }
// @media screen and (min-width: 0) and (max-width: 990px) {
//   .footer-body {
//     max-width: 800px;
//     margin: 0 auto;
//   }
// }
.footer {
  width: 100%;
  position: relative;
  left: 0;
  // bottom: 0;
  z-index: 99;
  .footer-top {
    height: 134px;
    background-color: #363b46;
    position: relative;
    .footer-top-body {
      width: 1130px;
      margin: 0 auto;
      color: #fff;
      .footer-top-body-content {
        margin-top: 50px;
        text-align: center;
        .title {
          margin: 0px;
          font-size: 16px;
          font-family: PingFangHK-Regular, PingFangHK;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
          margin-bottom: 20px;
        }
        .font-style2 {
          margin: 0;
          margin-top: 2px;
          font-size: 14px;
          font-family: PingFangHK-Regular, PingFangHK;
          font-weight: 400;
          color: rgba(147, 151, 161, 1);
          line-height: 33px;
        }
      }
    }
  }
  .footer-bottom {
    height: 100px;
    background: #2c3038;
    padding-top: 31px;
    p {
      text-align: center;
      width: 663px;
      height: 25px;
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
      margin: 0 auto;
    }
     a {
      text-align: center;
      width: 663px;
      height: 25px;
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 17px;
      margin: 0 auto;
    }
  }
  .backtoTop {
    position: absolute;
    left: calc(100% - 51px - 56px);
    top: 128px;
    cursor: pointer;
  }
  .backtoTop:hover {
    transform: translateY(5%);
  }
}
</style>
