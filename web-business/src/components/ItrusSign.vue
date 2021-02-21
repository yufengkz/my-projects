<template>
  <div></div>
</template>
<script>
/**
 * 组件使用注意事项
 * 1.参数encryptMsgArr为需要加密的字段，数组格式为['msg1', 'msg2', ...]
 * 2.ref="itrus"便于父组件调用this.$refs.itrus.init()触发初始化以及后续逻辑
 * 3.数据加密后发送「itrusEncrypted」事件
 */
/* eslint-disable */
var certs
import { mapGetters } from 'vuex'
export default {
  name: 'ItrusSign',
  props: {
    encryptMsgArr: {
      // 需要加密消息，以字符串形式放入数组中
      type: Array,
      required: true
    },
    type: {
      // seal:签章、sign:签名
      type: String,
      required: true
    },
    pwdRequired: {
      // 是否强校验，即是否必须输入UKey密码
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      certificate: null,
      certOptions: [] // 证书列表项
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(['itrusConfigStatus', 'currentUser'])
  },
  methods: {
    init() {}
  }
}
</script>
