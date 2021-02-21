<template>
  <div class="chunk-upload-item">
    <el-upload
      ref="dialogUpload"
      class="upload"
      action="/"
      :before-upload="beforeAvatarUpload"
      :http-request="httpChunks"
      :show-file-list="false"
      drag
      multiple
    >
      <svg-icon icon-class="upload" style="font-size:110px;" />
      <div class="upload__text">
        点击选择或拖拽文件到这里上传
        <br />
        <span>支持.rar .zip .pdf .jpg .png .tif格式</span>
      </div>
    </el-upload>
  </div>
</template>
<script>
import { beforeUpload } from '@/utils/tool.js'
import axios from 'axios'
import { calculateMd5 } from '@/utils/fileUpload'
export default {
  props: {
    // checkChunkUrl: {
    //   // 分片上传-上传前的校验接口
    //   type: String,
    //   default: ''
    // },
    fileType: {
      type: Number,
      default: 1 // 1发票 2 其他
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
        eachSize: 2 * 1024 * 1024 // 每块文件大小
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
      // if (that.list.length === 1) {
      //   that.list.splice(0, 1)
      // }
      that.list.push(file)
      that.$emit('changeList', that.list)
      calculateMd5(file, function(val) {
        that.file_md5 = val
        // 总片数
        const chunkCount = Math.ceil(file.size / that.uploadSettings.eachSize)
        // 文件切片
        const fileChunks = that.splitFile(file, that.uploadSettings.eachSize, chunkCount)
        // chunkNum从1开始
        that.chunkUpload(1, fileChunks, chunkCount, file, that.uploadSettings.eachSize, that.file_md5, 0)
      })
    },
    // 分片上传
    chunkUpload(chunkNum, fileChunks, chunks, file, eachSize, md5, progress) {
      const currentChunk = fileChunks[chunkNum - 1]
      // 串行上传 如果从未上传过此文件 则从第一片开始上传 如果上传过且没上传完毕 是由后端返回从几片开始
      const param = {
        chunkNum, // 第几片
        chunkCount: chunks, // 总片数
        fileMd5: md5, // 整个文件的md5
        fileName: file.name, // 文件名
        // fileName: file.name.substring(0, file.name.lastIndexOf('.')), // 文件名
        // fileSuffix: file.name.substring(file.name.lastIndexOf('.') + 1), // 文件后缀
        fileSize: file.size, // 文件总大小
        file: currentChunk,
        dataSource: this.type,
        role: this.role
      }
      // 请求分片上传的接口
      const formData = new FormData()
      for (const p in param) {
        if (Object.prototype.hasOwnProperty.call(param, p)) {
          formData.append(p, param[p])
        }
      }
      axios
        .post(this.chunkUploadUrl, formData, { timeout: 1000 * 60 * 60 * 2 })
        .then(rs => {
          const res = rs.data
          if (res.status === 200) {
            if (res.data.nextFileChunk === -1) {
              let id = ''
              // 上传全部完成
              this.list.forEach(item => {
                if (item.uid === file.uid) {
                  item.percentage = 100
                  item.status = 'success'
                  item.response = {
                    status: 200,
                    message: '上传成功',
                    data: res.data
                  }
                  item.id = res.data.id
                  id = item.id
                }
              })
              this.$emit('changeList', this.list)
              this.$emit('afterChunk', this.list, id)
            } else {
              // 上传继续
              let percent = 0
              this.list.forEach(item => {
                if (item.uid === file.uid) {
                  item.percentage = 100 - (res.data.restChunkCount / chunks) * 100
                  percent = item.percentage
                }
              })
              this.$emit('changeList', this.list)
              this.chunkUpload(res.data.nextFileChunk, fileChunks, chunks, file, eachSize, md5, percent)
            }
          } else {
            this.list.forEach(item => {
              if (item.uid === file.uid) {
                item.response = {
                  status: res.status,
                  message: res.message,
                  data: ''
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
                data: ''
              }
              item.status = 'fail'
            }
          })
          this.$emit('changeList', this.list)
          return false // 如果当前片上传出错 就不再往下继续
        })
    },
    // 文件分块，用Array.prototype.slice方法
    splitFile(file, eachSize, chunks) {
      const fileChunk = []
      for (let chunk = 0; chunks > 0; chunks--) {
        fileChunk.push(file.slice(chunk, chunk + eachSize))
        chunk += eachSize
      }
      return fileChunk
    },
    beforeAvatarUpload: file =>
      beforeUpload(file, {
        fileType: ['rar', 'zip', 'pdf', 'jpg', 'png', 'tif'], // 上传限制的文件类型
        unit: 'MB', // 单位 支持KB，MB
        length: 50,
        min: 0, // 最小值 可不传递
        max: 200, // 最大值 可不传递
        error: '请上传小于200MB的RAR/ZIP/PDF/JPG/PNG/TIF文件', // 错误提示文案
        lengthError: '上传文件名长度不能超过50个字符'
      })
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
