<template>
  <div>
    <el-upload action="" :file-list="fileList" list-type="picture-card" class="upload-view">
      <div slot="file" slot-scope="{ file }">
        <img class="el-upload-list__item-thumbnail" :src="file.fileUrl || file.realFileUrl" alt="" />
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
    <el-dialog :visible.sync="previewDialogVisible" append-to-body width="70%" top="50px">
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
  data() {
    return {
      previewImgUrl: '', // 预览图片URL
      previewDialogVisible: false // 预览图片弹窗是否展示
    }
  },
  methods: {
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
    handleDownload(file) {
      getFilePath({ objectKey: file.fileKey }).then(res => {
        console.log('%c 🍤 res: ', 'font-size:20px;background-color: #33A5FF;color:#fff;', res)
        if (res.status === 200) {
          downloadFileByUrl(res.data, 'img', 'img')
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
</style>
