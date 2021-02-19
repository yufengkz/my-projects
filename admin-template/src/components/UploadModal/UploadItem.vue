<template>
  <div class="chunk-upload-excel-item">
    <el-upload
      ref="dialogUpload"
      class="upload"
      action="/"
      :before-upload="beforeAvatarUpload"
      :http-request="httpRequest"
      :show-file-list="false"
      drag
    >
      <svg-icon icon-class="upload" style="font-size:110px;"/>
      <div class="upload__text">点击选择或拖拽文件到这里上传
        <br>
        <span>仅支持.xls，.xlsx格式文件，同一文件最多可上传数据1000条</span>
        <!-- <span>最多可同时上传5个文件<br></span>
        <span>同一文件最多可上传数据1000条</span>-->
      </div>
    </el-upload>
  </div>
</template>
<script>
import { beforeUpload } from '@/utils/tool.js'
import { excelImport } from '@/api/common'
export default {
  props: {
    type: {
      type: Number,
      required: true // 上传类型 1:核心企业组织架构 2:核心企业业务员 3:核心企业业务员的融资客户 4:服务费缴费信息 5:白名单信息
    },
    buId: {
      type: Number,
      default: null
    },
    fileList: {
      type: Array,
      required: true
    }
  },
  computed: {
    childFileList() {
      return this.fileList
    }
  },
  data() {
    return {}
  },
  methods: {
    // 自定义的文件上传
    async httpRequest(options) {
      const { file } = options // options有file对象、onProgress、onError等
      file.status = 'uploading'
      this.childFileList.push(file)
      this.$emit('changeList', this.childFileList)
      const params = {
        file,
        type: this.type
      }
      if (this.type === 1) {
        params.buId = this.buId // type为1时必传
      }
      // 参数通过formData传输
      const formData = new FormData()
      for (const p in params) {
        if (Object.prototype.hasOwnProperty.call(params, p)) {
          formData.append(p, params[p])
        }
      }
      const res = await excelImport(formData)
      if (res.code === 200) {
        this.childFileList.map(item => {
          if (item.uid === file.uid) {
            item.percentage = 100
            item.status = 'success'
            item.response = {
              status: 200,
              message: '上传成功',
              callback: res.callback
            }
            item.id = res.callback
          }
        })
        this.$emit('changeList', this.childFileList)
      } else {
        this.$message.error(res.message || '上传失败')
        this.childFileList.map(item => {
          if (item.uid === file.uid) {
            item.response = {
              status: res.status,
              message: res.message,
              callback: ''
            }
            item.status = 'fail'
          }
        })
        this.$emit('changeList', this.childFileList)
        return false
      }
    },
    beforeAvatarUpload: file => {
      return beforeUpload(file, {
        fileType: ['xls', 'xlsx'], // 上传限制的文件类型
        unit: 'MB', // 单位 支持KB，MB
        min: 0, // 最小值 可不传递
        max: 20, // 最大值 可不传递
        error: '请上传小于20MB的XLS/XLSX文件' // 错误提示文案
      })
    }
  },
  destroyed() {}
}
</script>
<style lang="scss">
.chunk-upload-excel-item {
  .el-upload,
  .el-upload-dragger {
    width: 100%;
    background-color: #f3f8fe;
    border-color: #96c0f7;
    height: 168px;
  }
  .el-upload-dragger .el-icon-upload {
    color: #96c0f7;
  }
  .upload__text {
    color: #385883;
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
