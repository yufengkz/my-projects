<template>
  <div>
    <el-upload action="" :file-list="fileList" list-type="picture-card" class="upload-view">
      <div slot="file" slot-scope="{ file }">
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.fileKey$FICDictName || file.realFileId$FICDictName || file.fileUrl || file.thumbnailUrl || file.realFileUrl"
          alt=""
        />
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
      <img width="100%" :src="previewImgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { getFilePath } from '@/api/common'
import { downloadFileByUrl } from '@/utils/tool'
export default {
  props: {
    fileList: {
      type: Array,
      default: () => []
    }
  },
  created() {},
  data() {
    return {
      previewImgUrl: '', // 预览图片URL
      previewDialogVisible: false // 预览图片弹窗是否展示
    }
  },
  methods: {
    // 上传附件的预览
    // handlePictureCardPreview(fileList) {
    //   this.previewImgUrl = fileList.thumbnailUrl
    //   this.previewDialogVisible = true
    // },
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
    // handleDownload(fileList) {
    //   downloadFileByUrl(fileList.url, fileList.name)
    // }
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
