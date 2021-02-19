<template>
  <div>
    <el-upload
      :action="uploadFileUrl"
      :headers="{Authorization:token}"
      :before-upload="beforeUploadCheck"
      :on-success="(response,file,fileList)=>{handleUploadSuccess(response,file,fileList)}"
      multiple
      with-credentials
      list-type="picture-card"
      :file-list="list"
      :disabled="list.length >= 20"
    >
      <i slot="default" class="el-icon-plus"></i>
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.thumbnailUrl" alt="">
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
      <img width="100%" :src="previewImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getFilePath, uploadFile } from '@/api/common'
import { getToken } from '@/utils/auth'
// import { beforeUpload, downloadFileByUrl } from '@/utils/tool'
import { beforeUpload } from '@/utils/tool'
export default {
  props: {
    imageList: Array
  },
  computed: {
    list() {
      // fileUrl 文件实际地址
      // fileKey 文件key
      return (this.imageList && this.imageList.map(item => {
        item.thumbnailUrl = item.fileUrl // 缩略图展示用url
        return item
      })) || []
    }
  },
  data() {
    return {
      token: getToken(),
      uploadFileUrl: uploadFile(),
      previewImgUrl: '', // 预览图片URL
      previewDialogVisible: false // 预览图片弹窗是否展示
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    beforeUploadCheck(file) {
      return beforeUpload(file, {
        fileType: ['jpg', 'jpeg', 'png', 'bmp'], // 上传限制的文件类型
        max: 10240,
        error: '请上传小于10MB的jpg、jpeg、png、bmp格式文件' // 错误提示文案
      })
    },
    handleUploadSuccess(response, file, fileList) {
      file.thumbnailUrl = file.url
      this.$emit('updateImgList', this.list)
    },
    // 删除上传的附件
    handleRemove(file) {
      const index = this.list.findIndex(item => file.uid === item.uid)
      this.list.splice(index, 1)
      this.$emit('updateImgList', this.list)
    },
    // 上传附件的预览
    handlePictureCardPreview(file) {
      getFilePath({ obsKey: file.fileKey }).then(res => {
        if (res.code === 200) {
          this.previewImgUrl = res.data
          this.previewDialogVisible = true
        } else {
          this.$message.error(res.message)
        }
      })
    }
    // 上传附件的下载
    // handleDownload(file) {
    //   getFilePath({ obsKey: file.fileKey }).then(res => {
    //     if (res.code === 200) {
    //       downloadFileByUrl(res.data)
    //     } else {
    //       this.$message.error(res.message)
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-upload-list--picture-card .el-upload-list__item-thumbnail {
  width: 100%;
  height: 148px !important;
}
</style>
