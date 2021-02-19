<template>
  <div>
    <el-upload action="" :file-list="fileList" list-type="picture-card" class="upload-view">
      <div slot="file" slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail" :src="file.fileUrl" alt="">
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <!-- <span class="el-upload-list__item-delete" @click="handleDownload(file)">
            <i class="el-icon-download"></i>
          </span> -->
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="previewDialogVisible" append-to-body class="img-dialog">
      <img width="100%" :src="previewImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { getFilePath } from '@/api/common'
// import { downloadFileByUrl } from '@/utils/tool'
export default {
  props: {
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      previewImgUrl: '', // 预览图片URL
      previewDialogVisible: false // 预览图片弹窗是否展示
    }
  },
  methods: {
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
