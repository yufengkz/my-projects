<template>
  <!-- <div v-bind:class="[isHome ? 'activeHome' : '', 'footer']"> -->
  <div class="commonfooter">
    <div class="footer-wrap clearfix">
        <div class="footer-left">
          <ul>
            <li><span>关于我们</span> |</li>
            <li><span>联系我们</span> |</li>
            <li><span>关注微信</span> |</li>
            <li><span>免责声明</span></li>
          </ul>
          <p>COPYRIGHT &copy; 中化资本 www.ici-sc.com 沪ICP备18028530号</p>
        </div>
        <!-- <div class="footer-right">
            <dl>
              <dt><img src="@/assets/img/1_03.png" alt="erweima"></dt>
              <dd>关注微信</dd>
            </dl>
        </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonfooter',
  data () {
    return {
      isHome: false
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.path === '/') {
        this.isHome = true
      } else {
        this.isHome = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.commonfooter{
  height: 100px;
  margin-left: 223px;
  margin-top:20px;
  .footer-wrap{
    margin: 0 auto;
    .footer-left{
      float: left;
      padding-left: 10px;
      ul, p{
        color: $font-shallow;
        font-size: 14px;
      }
      li{
        display: inline;
      }
      p{
        padding-left: 20px;
      }
      ul{
        margin-top: 22px;
        margin-bottom: 22px;
        li{
          span{
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      }
    }
    .footer-right{
      float: right;
      margin-right: 30px;
      margin-top: 10px;
      dl{
        text-align: center;
        dt{
          img{
            width: 60px;
          }
        }
        dd{
          padding-top: 5px;
          color: #ddd;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
