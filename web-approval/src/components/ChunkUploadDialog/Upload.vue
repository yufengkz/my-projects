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
        <span>只支持 .zip 格式压缩包</span>
      </div>
    </el-upload>
  </div>
</template>
<script>
import axios from 'axios'
import { beforeUpload } from '@/utils/tool.js'
import { calculateMd5 } from '@/utils/fileUpload'
import { chunkUpload } from '@/api/common'
export default {
  props: {
    orderNo: { // 订单编号
      type: String,
      required: true
    },
    chunkUploadUrl: {
      // 分片上传 上传的地址
      type: String,
      default: chunkUpload
    },
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
      // timer: null,
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
      file.status = 'uploading'
      // 控制fileList只有1个文件
      // if (that.list.length === 1) {
      //   that.list.splice(0, 1)
      // }
      this.list.push(file)
      this.$emit('changeList', this.list)
      const that = this
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
        // fileSize: file.size, // 文件总大小
        file: currentChunk, // 分片对象
        customerId: this.$store.state.user.currentUser.mobileNo, // 用户id，是否必传：true
        orderNo: this.$route // 订单号，是否必传：true
      }
      // file 分片对象，是否必传：false
      // fileMd5  文件MD5，是否必传：false
      // fileName 文件名称，是否必传：false

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
        fileType: ['zip'], // 上传限制的文件类型
        unit: 'MB', // 单位 支持KB，MB
        length: 50,
        min: 0, // 最小值 可不传递
        max: 200, // 最大值 可不传递
        error: '请上传小于200MB的ZIP文件', // 错误提示文案
        lengthError: '上传文件名长度不能超过50个字符'
      })
  },
  destroyed() {
    // clearInterval(this.timer)
    // this.timer = null
  }
}
</script>
<style lang="scss">
.chunk-upload-item {
  .el-upload,
  .el-upload-dragger {
    width: 100%;
    background-color: #f3f8fe;
    border-color: $primary;
    height: 168px;
  }
  .el-upload-dragger .el-icon-upload {
    // color: #96c0f7;
    color: $primary;
  }
  .upload__text {
    color: #385883;
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
