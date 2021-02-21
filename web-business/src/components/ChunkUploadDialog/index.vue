<template>
  <div>
    <!-- 批量上传 -->
    <el-dialog
      class="chunk-upload"
      :title="dialogTitle"
      :visible="dialogVisible"
      width="60%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close = "closeDialog"
    >
      <div class="chunk-upload-border"></div>
      <div>
        <!-- <div class="chunk-upload__div1" slot="title">
          <span class="chunk-upload__div1__span">批量导入</span>
          <el-button class="chunk-upload__div1__button" @click="download()" type="text">模板下载</el-button>
        </div>-->
        <div class="chunk-upload__div2">
          <Upload :chunkUploadUrl="chunkUploadUrl" :applyNo="applyNo" :orderNo="orderNo" :fileList="fileList" @changeList="changeList"></Upload>
          <ul class="upload_file_list_container">
            <li v-for="(f,index) in fileList" :key="f.uid">
              <div class="sigle-file-container">
                <div class="progress-container">
                  <p class="file-box">
                    <svg-icon icon-class="file" style="font-size:22px;"/>
                    {{f.name}}
                    <span class="size">{{bytesToSize(f.size)}}</span>
                    <span v-if="f.status==='success'" class="tip text-green">上传成功</span>
                    <span v-else-if="f.status==='fail'" class="tip text-red">上传失败</span>
                    <i
                      v-if="f.status !=='success'"
                      class="el-icon-circle-close tip text-red"
                      style="font-size: 18px"
                      @click="removeItem(index)"
                    ></i>
                  </p>
                  <div class="file-progress">
                    <el-progress :percentage="f.percentage" :color="'#68CF33'" :show-text="false"></el-progress>
                    <i v-if="f.status==='success'" class="el-icon-success text-green"></i>
                    <i v-else-if="f.status==='fail'" class="el-icon-error text-red"></i>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="chunk-upload-border"></div>
        <el-button size="small" class="wide-button" @click="closeDialog">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { getExcelTemplateUrl } from '@/api/common'
// import { downloadFileByUrl } from '@/utils/tool'
import { BytesToSize } from '@/utils/tool'
import { chunkUpload } from '@/api/common'
export default {
  name: 'ChunkUploadDialog',
  props: {
    dialogTitle: {
      type: String,
      default: '批量导入'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    chunkUploadUrl: {
      type: String,
      default: chunkUpload
    },
    orderNo: {
      // 订单编号
      type: String
      // required: true
    },
    applyNo: {
      type: Number
    }
  },
  components: {
    Upload: () => import('./Upload')
  },
  data() {
    return {
      fileList: [] // 上传文件列表
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    // download() {
    //   getExcelTemplateUrl({ type: this.type }).then(res => {
    //     if (res.code === 200) {
    //       downloadFileByUrl(res.data)
    //     } else {
    //       this.$message.error(res.message || '模版下载失败')
    //     }
    //   })
    // },
    changeList(val) {
      this.fileList = val
      this.$forceUpdate()
    },
    // 删除上传列表文件
    removeItem(index) {
      this.fileList.splice(index, 1)
    },
    closeDialog() {
      this.$emit('closeDialog')
      this.fileList = []
    },
    // 文件大小单位换算
    bytesToSize(bytes) {
      BytesToSize(bytes)
    }
  }
}
</script>
<style lang="scss">
.chunk-upload {
  .el-dialog__body {
    padding: 0 20px;
  }
  .chunk-upload-border {
    height: 1px;
    background-color: #ebeef5;
    margin-bottom: 10px;
  }
  &__div1 {
    &__span {
      line-height: 38px;
    }
    &__button {
      float: right;
    }
  }
  &__div2 {
    .el-row {
      padding-bottom: 20px;
    }
    .uploadType {
      background: #fafafa;
    }
    // .el-upload,
    // .el-upload-dragger {
    //   width: 100%;
    //   background-color: #f3f8fe;
    //   border-color: #96c0f7;
    //   height: 160px;
    // }
    // .el-upload-dragger .el-icon-upload {
    //   color: #96c0f7;
    // }
    // .upload__text {
    //   color: #385883;
    //   font-size: 14px;
    //   line-height: 24px;
    // }
    .upload_file_list_container {
      padding: 10px;
      height: 300px;
      // height: 30px;
      overflow: auto;
      font-size: 12px;
      li {
        padding: 0 20px;
        margin-top: 10px;
      }
      .sigle-file-container {
        display: flex;
        justify-content: space-between;
        line-height: 20px;
      }
      .progress-container {
        background: #f7faff;
        padding: 10px 10px;
        border-radius: 8px;
        width: 80%;
        margin-left: 10%;
        text-align: center;
        .file-box {
          text-align: left;
          color: #385883;
          font-size: 14px;
          font-weight: bold;
          margin: 0;
          .size {
            margin-left: 10px;
          }
          .svg-icon {
            font-size: 22px;
            margin-right: 5px;
          }
          .tip {
            float: right;
          }
        }
        .file-progress {
          .el-progress {
            display: inline-block;
            width: calc(100% - 30px);
          }
        }
      }
      .text-green {
        color: #5cba04;
      }
      .text-red {
        color: #ff6d6d;
      }
      .text-yellow {
        color: #f7a900;
      }
      .text-blue {
        color: #8fbfff;
      }
    }
  }
  .dialog-footer {
    &__jump {
      float: left;
    }
  }
}
</style>
