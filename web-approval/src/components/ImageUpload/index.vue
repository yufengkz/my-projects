<template>
  <div>
    <!-- :on-success="(response,file,fileList)=>{handleUploadSuccess(response,file,fileList)}" -->
    <el-upload
      action="/"
      :http-request="httpImageUpload"
      :before-upload="beforeUploadCheck"
      list-type="picture-card"
      multiple
      with-credentials
      :file-list="list"
      :disabled="list.length >= 20"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.thumbnailUrl" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <!-- <span class="el-upload-list__item-delete" @click="handleDownload(file)">
            <i class="el-icon-download"></i>
          </span> -->
          <span class="el-upload-list__item-delete" @click="handleRemove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="previewDialogVisible" append-to-body class="img-dialog">
      <img width="100%" :src="previewImgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { getFilePath, uploadFile } from '@/api/common'
// import { uploadFileRemove } from '@/api/loan-apply'
// import { getToken } from '@/utils/auth'
import { beforeUpload, downloadFileByUrl } from '@/utils/tool'
// import zipImg from '@/assets/zip.jpeg'
// import pdfImg from '@/assets/pdf.jpeg'
import axios from 'axios'
export default {
  props: {
    imageList: Array
    // imgList: Array
    // evidenceDocument: String
  },
  computed: {
    list() {
      return (
        (this.imageList &&
          this.imageList.map(item => {
            item.thumbnailUrl = item.fileUrl || item.realFileUrl // 缩略图展示用url
            item.fileUrl = item.realFileUrl || item.fileUrl // 文件实际地址（统一通用和借款人影像两种情况）
            item.fileKey = item.realFileId || item.fileKey // 文件key（统一通用和借款人影像两种情况）
            return item
          })) ||
        []
      )
    }
  },
  data() {
    return {
      // token: getToken(),
      // uploadFileUrl: uploadFile(),
      // uploadFileList: [],
      previewImgUrl: '', // 预览图片URL
      previewDialogVisible: false // 预览图片弹窗是否展示
    }
  },
  created() {
    // 初始化证明材料列表，url用于展示图片及预览，path用于提交表单时拼接字符串
    // if (this.imageList && this.imageList.length > 0) {
    //   this.list = this.imageList.map(item => {
    //     item.thumbnailUrl = item.fileUrl || item.realFileUrl // 缩略图展示用url
    //     item.fileUrl = item.realFileUrl || item.fileUrl // 文件实际地址（统一通用和借款人影像两种情况）
    //     item.fileKey = item.realFileId || item.fileKey // 文件key（统一通用和借款人影像两种情况）
    //     return item
    //   })
    // }
    // if (this.setUrlList && this.setUrlList.length > 0) {
    //   const evidenceArr = this.evidenceDocument.split(',')
    //   for (let i = 0; i < this.setUrlList.length; i++) {
    //     this.uploadFileList.push({
    //       url: this.setUrlList[i],
    //       key: realFileId
    //     })
    //   }
    // }
  },
  mounted() {
    // console.log(this.setUrlList)
  },
  methods: {
    httpImageUpload(options) {
      const { file } = options // options有file对象、onProgress、onError等
      const url = uploadFile()
      const param = {
        file
      }
      // if (this.customInfo && this.customInfo.uploadUrl) {
      //   url = this.customInfo.uploadUrl
      //   param = {
      //     customerId: this.customInfo.customerId,
      //     orderNo: this.customInfo.orderNo,
      //     fileType: this.customInfo.fileType,
      //     files: file
      //   }
      // }
      // 请求分片上传的接口
      const formData = new FormData()
      for (const p in param) {
        if (Object.prototype.hasOwnProperty.call(param, p)) {
          formData.append(p, param[p])
        }
      }
      axios
        .post(url, formData, { timeout: 1000 * 60 * 60 * 2 })
        .then(res => {
          if (res.data.status === 200) {
            const imageObjectURL = window.URL.createObjectURL(file)
            const fileObj = {
              thumbnailUrl: imageObjectURL, // 缩略图展示用url
              fileUrl: imageObjectURL,
              fileKey: res.data.data,
              filetype: file.type
              // id: res.data.data[0]
            }
            this.list.push(fileObj)
            this.$emit('updateChild', this.list)
          } else {
            this.$message(res.data.message || '上传失败')
          }
        })
        .catch(() => {
          this.$message('上传异常')
          return false
        })
    },
    // pdf、zip使用默认缩略图，图片使用自己的url
    // getThumbnailImg(name, url) {
    //   if (name && name.includes('.zip')) {
    //     return zipImg
    //   } else if (name && name.includes('.pdf')) {
    //     return pdfImg
    //   } else {
    //     return url
    //   }
    // },
    beforeUploadCheck(file) {
      return beforeUpload(file, {
        fileType: ['jpg', 'jpeg', 'png', 'bmp'], // 上传限制的文件类型
        max: 10240,
        error: '请上传小于10MB的jpg、jpeg、png、bmp格式文件' // 错误提示文案
      })
    },
    // handleUploadSuccess(response, file, fileList) {
    // fileList.forEach(item => {
    //   item.thumbnailUrl = this.getThumbnailImg(item.name, item.url)
    // })
    // this.uploadFileList.push(fileList)
    // this.$emit('updateChild', this.uploadFileList)
    // },
    // 删除上传的附件
    handleRemove(file) {
      // if (this.customInfo && this.customInfo.uploadUrl) {
      //   const param = {
      //     customerId: this.customInfo.customerId,
      //     orderNo: this.customInfo.orderNo,
      //     fileType: this.customInfo.fileType.toString(),
      //     fileId: file.id.toString()
      //   }
      //   uploadFileRemove(param).then(res => {
      //     const index = this.list.findIndex(item => file.uid === item.uid)
      //     this.list.splice(index, 1)
      //     this.$emit('updateChild', this.list)
      //   })
      // } else {
      //   const index = this.list.findIndex(item => file.uid === item.uid)
      //   this.list.splice(index, 1)
      //   this.$emit('updateChild', this.list)
      // }
      const index = this.list.findIndex(item => file.uid === item.uid)
      this.list.splice(index, 1)
      this.$emit('updateChild', this.list)
    },
    // 上传附件的预览
    handlePictureCardPreview(file) {
      getFilePath({ objectKey: file.fileKey || file.realFileId }).then(res => {
        if (res.status === 200) {
          this.previewImgUrl = res.data
          this.previewDialogVisible = true
        } else {
          this.$message.error(res.mes)
        }
      })
    },
    // 上传附件的下载
    handleDownload(file) {
      getFilePath({ objectKey: file.fileKey }).then(res => {
        if (res.status === 200) {
          downloadFileByUrl(res.data)
        } else {
          this.$message.error(res.mes)
        }
      })
      // downloadFileByUrl(file.url, file.name)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 100%;
  height: 148px !important;
}
.img-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/ .el-dialog {
    margin: 0px auto !important;
    height: 90% !important;
    overflow-y: hidden;
    /deep/ .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: auto;
      padding: 30px 20px;
    }
  }
}
</style>
