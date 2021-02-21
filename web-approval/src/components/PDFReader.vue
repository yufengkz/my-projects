<template>
  <div class="pdf-popup">
    <div class="close-img" @click="closePopup()">+</div>
    <!-- 动态高度 -->
    <iframe
      id="pdf-frame"
      class="pdf-frame"
      :style="{height:frameHeight}"
      :src="pdfFile.previewUrl"
      scrolling="no"
    >您的浏览器不支持PDF阅读，请使用谷歌、火狐或360浏览器的极速模式</iframe>
    <div class="button" @click="sign()" v-show="pdfFile.signStatus!==true">同意并签章</div>

    <!-- 输入天威密码组件 -->
    <!-- 签名相关信息signInfo: hash(接口返回的文件hash字符串)-->
    <ItrusSign
      :encryptMsgArr="formatMsgArr()"
      ref="itrus"
      @itrusEncrypted="signed"
      :type="'seal'"
      :pwdRequired="pwsRequired"
    ></ItrusSign>
  </div>
</template>
<script>
/**
 * 使用组件注意事项：（PDF文件签章用组件）
 * 1.父组件v-if控制何时展示（目前业务逻辑为上传成功时和点击链接时）
 * 2.根据上传组件的传参「pdfFile」中isPreview属性值，来判断是否调用预览（true,1,'true','1'时需要预览）
 * 3.传参：pdf文件信息（pdfFile），其中文件路径为pdfFile.previewUrl
 *        签章用加密信息（encryptMsgArr）
 * 4.关闭按钮发送「closePDFReader」事件
 * 5.文档hash字符串加密后发送「pdfSign」事件
 */
import ItrusSign from './ItrusSign'
export default {
  name: 'PDFReader',
  props: {
    pdfFile: {
      type: Object,
      required: true
    },
    pwsRequired: {
      // 辨识多文件需要签章时候是否是第一次标识位
      type: Boolean,
      default: true
    }
  },
  components: {
    ItrusSign
  },
  data() {
    return {}
  },
  methods: {
    sign() {
      // 初始化UKey，获取证书以及签名信息
      this.$refs.itrus.init()
    },
    // 成功输入UKey密码后，拿到签名后的消息数据（PDF直接取返回数组中的第一个）
    signed(encryptedMsgArr, certSerialNumber) {
      this.$emit('pdfSign', encryptedMsgArr[0], certSerialNumber, this.pdfFile)
    },
    // 关闭弹出框
    closePopup() {
      this.$emit('closePDFReader')
    },
    // 格式化需要加密的文件hash => 即放入数组中
    formatMsgArr() {
      const arr = []
      arr.push(this.pdfFile.fileHash)
      return arr
    }
  },
  computed: {
    // iframe设置动态高度，浏览器视窗减200px
    frameHeight: () => document.documentElement.offsetHeight - 100 + 'px'
  },
  mounted() {}
}
</script>
<style lang="scss" scoped>
.pdf-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #999;
  .pdf-frame {
    width: 90%;
    height: 600px;
    margin-left: 5%;
    margin-top: 20px;
  }
  .button {
    position: absolute;
    width: 9;
    line-height: 1.5;
    left: 50%;
    margin-left: -72px;
    margin-top: 20px;
    color: #fff;
    border: 1px solid $theme-color;
    background: $theme-color;
    box-shadow: 0 0.05em 0.25em rgba(0, 0, 0, 0.2);
    border-radius: 0.3em;
    cursor: pointer;
    padding: 0.3em 0.8em;
    font-size: 16px;
  }
  .button:hover {
    background: #e9d58b;
    border: #e9d58b 1px solid;
  }
  .close-img {
    width: 40px;
    height: 40px;
    font-size: 40px;
    color: #000;
    transform: rotate(45deg);
    border-radius: 50%;
    position: absolute;
    right: 0;
    background: #999;
    cursor: pointer;
  }
}
</style>
