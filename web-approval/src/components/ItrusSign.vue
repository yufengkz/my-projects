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
// import { getEnvInfo } from '@/utils/tool.js'
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
    // if (this.itrusConfigStatus !== 1) {
    //   var config = {
    //     license: getEnvInfo('VUE_APP_ITRUS_LICENSE'),
    //     exportKeyAble: false,
    //     disableExeUrl: true
    //   }
    //   try {
    //     // eslint-disable-next-line
    //     TCA.config(config)
    //     this.$store.dispatch('SetItrusConfigStatus', 1)
    //   } catch (e) {
    //     this.$store.dispatch('SetItrusConfigStatus', -1)
    //     this.$message.error('UKey初始化失败')
    //   }
    // }
  },
  computed: {
    ...mapGetters(['itrusConfigStatus', 'currentUser'])
  },
  methods: {
    init() {
      // try {
      //   certs = CertStore.listAllCerts() // 获取所有证书
      //   let hasCert = false
      //   if (certs.size() === 0) {
      //     this.$message.error('未获取到证书，请插入UKey重试')
      //   } else {
      //     for (let i = 0; i < certs.size(); i++) {
      //       const userNo = this.currentUser.userNo
      //       const cert = certs.get(i)
      //       const sid = this.getSIDFromSubject(cert)
      //       if (sid === userNo) {
      //         hasCert = true
      //         this.certificate = cert
      //         // 如果需要强校验，则首先清空key的缓存
      //         if (this.pwdRequired === true) {
      //           this.certificate.clearPinCache() // 清除ukey的缓存，下次调用ukey加密必须输入密码
      //         }
      //         const encryptedMsgArr = []
      //         for (let i = 0; i < this.encryptMsgArr.length; i++) {
      //           // 签章和签名的加密方式不同，根据传来的参数作区分
      //           if (this.type === 'seal') {
      //             encryptedMsgArr.push(this.certificate.signB64EncodedBytesRaw(this.encryptMsgArr[i]))
      //           } else {
      //             encryptedMsgArr.push(this.certificate.signMessage(this.encryptMsgArr[i], false))
      //           }
      //         }
      //         const serialNumber = this.certificate.serialNumber()
      //         this.$emit('itrusEncrypted', encryptedMsgArr, serialNumber.toLowerCase())
      //       }
      //     }
      //     if (!hasCert) {
      //       this.$message.error('未获取到登陆用户绑定的UKey证书，请插入绑定UKey并重试')
      //     }
      //   }
      // } catch (e) {
      //   if (e instanceof TCACErr) {
      //     console.log(e.toStr())
      //   } else {
      //     console.log(e.toString().substr(7))
      //   }
      //   this.$message.error('使用UKey签名加密失败')
      // }
    }
    //获取证书的SID：用户id
    // getSIDFromSubject(cert) {
    //   try {
    //     // 只支持先行断言和先行否定断言，不支持后行断言，因此暂时去掉
    //     // 参考http://es6.ruanyifeng.com/#docs/regex#%E5%90%8E%E8%A1%8C%E6%96%AD%E8%A8%80
    //     const t = cert.subject().match(/OU=SID:.*?(?=,)/g)
    //     if (t && t[0]) {
    //       return t[0].substr(7) // 对'OU=SID:xxxx'进行截取
    //     } else {
    //       return null
    //     }
    //   } catch (e) {
    //     if (e instanceof TCACErr) {
    //       throw e
    //     } else {
    //       throw new Error('获取SID异常')
    //     }
    //   }
    // }
  }
}
</script>
