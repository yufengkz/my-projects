<template>
  <div class="chunk-upload-excel-item">
    <el-upload
      ref="dialogUpload"
      class="upload"
      action="/"
      :before-upload="beforeAvatarUpload"
      :http-request="httpChunks"
      :show-file-list="false"
      drag
    >
      <svg-icon icon-class="upload" style="font-size:110px;" />
      <div class="upload__text">
        点击选择或拖拽文件到这里上传
        <br />
        <span>支持.xls .xlsx格式</span>
      </div>
    </el-upload>
  </div>
</template>
<script>
import { beforeUpload } from '@/utils/tool.js'
import { post } from '@/utils/request'
// import { calculateMd5 } from '@/utils/fileUpload'
export default {
  props: {
    // checkChunkUrl: {
    //   // 分片上传-上传前的校验接口
    //   type: String,
    //   default: ''
    // },
    type: {
      type: Number,
      default: 200 // 彩金：100 福金：200 融金池:300 典金仓:400
    },
    role: {
      type: String,
      default: '' // buyer- 应付 seller-应收
    },
    chunkUploadUrl: {
      // 分片上传 上传的地址
      type: String,
      default: ''
    },
    // batchUrl: {
    //   // 批量上传地址
    //   type: String,
    //   default: ''
    // },
    // batchStatusUrl: {
    //   // 批量上传状态查询地址
    //   type: String,
    //   default: ''
    // },
    fileList: {
      // 批量上传的数据列表
      type: Array
    }
  },
  computed: {
    list() {
      return this.fileList
    }
  },
  data() {
    return {
      token: null,
      timer: null,
      uploadSettings: {
        eachSize: 20 * 1024 * 1024 // 每块文件大小
      },
      file_md5: null
    }
  },
  methods: {
    // 自定义的文件上传
    async httpChunks(options) {
      const { file } = options // options有file对象、onProgress、onError等
      await this.splitUpload(file)
    },
    // 大文件分块上传
    splitUpload(file) {
      // 上传前先md5加密 然后校验这个文件是否上传过 如果上传过，有两种状态-全部上传成功、上传到某一片
      const that = this
      file.status = 'uploading'
      // 控制fileList只有1个文件
      that.list.push(file)
      that.$emit('changeList', that.list)
      that.chunkUpload(file)
    },
    // 分片上传
    chunkUpload(file) {
      // 请求分片上传的接口
      // 串行上传 如果从未上传过此文件 则从第一片开始上传 如果上传过且没上传完毕 是由后端返回从几片开始
      const param = {
        file,
        fileName: file.name, // 文件名
        fileSize: file.size // 文件总大小
      }
      // 请求分片上传的接口
      const formData = new FormData()
      for (const p in param) {
        if (Object.prototype.hasOwnProperty.call(param, p)) {
          formData.append(p, param[p])
        }
      }
      post(this.chunkUploadUrl, formData, { timeout: 1000 * 60 * 2 })
        .then(res => {
          if (res.status === 200) {
            let id = ''
            // 上传全部完成
            this.list.forEach(item => {
              if (item.uid === file.uid) {
                item.percentage = 100
                item.status = 'success'
                item.response = {
                  status: 200,
                  message: '上传成功',
                  callback: res.callback
                }
                item.id = res.callback
                id = item.id
              }
            })
            this.$emit('changeList', this.list)
            this.$emit('afterChunk', this.list, id)
          } else {
            this.$message.error(res.message)
            this.list.forEach(item => {
              if (item.uid === file.uid) {
                item.response = {
                  status: res.status,
                  message: res.message,
                  callback: ''
                }
                item.status = 'fail'
              }
              // item.percentage = 0
            })
            this.$emit('changeList', this.list)
            return false // 如果当前片上传出错 就不再往下继续
          }
        })
        .catch(() => {
          this.list.forEach(item => {
            if (item.uid === file.uid) {
              item.response = {
                status: 500,
                message: '上传失败',
                callback: ''
              }
              item.status = 'fail'
            }
          })
          this.$emit('changeList', this.list)
          return false // 如果当前片上传出错 就不再往下继续
        })
    },
    beforeAvatarUpload: file =>
      beforeUpload(file, {
        fileType: ['xls', 'xlsx'], // 上传限制的文件类型
        unit: 'MB', // 单位 支持KB，MB
        min: 0, // 最小值 可不传递
        max: 20, // 最大值 可不传递
        error: '请上传小于20MB的XLS/XLSX文件' // 错误提示文案
      })
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
