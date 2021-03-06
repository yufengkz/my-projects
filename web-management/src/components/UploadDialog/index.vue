<template>
  <div>
    <!-- 批量上传 -->
    <el-dialog
      class="chunk-upload"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="60%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div class="chunk-upload-border"></div>
      <div>
        <div class="chunk-upload__div1" slot="title">
          <span class="chunk-upload__div1__span">批量导入</span>
          <el-button class="chunk-upload__div1__button" @click="download()" type="text">模板下载</el-button>
        </div>
        <div class="chunk-upload__div2">
          <upload-item :type="type" :buId="buId" :fileList="fileList" @changeList="changeList"></upload-item>
          <div style="line-height: 30px; color: red;" v-html="msg"></div>
          <ul class="upload_file_list_container">
            <li v-for="(f, index) in fileList" :key="f.uid">
              <div class="sigle-file-container">
                <div class="progress-container">
                  <p class="file-box">
                    <svg-icon icon-class="file" style="font-size:22px;" />
                    {{ f.name }}
                    <span class="size">{{ bytesToSize(f.size) }}</span>
                    <span v-if="f.status === 'success'" class="tip text-green">上传成功</span>
                    <span v-else-if="f.status === 'fail'" class="tip text-red">上传失败</span>
                    <i
                      v-if="f.status !== 'success'"
                      class="el-icon-circle-close tip text-red"
                      style="font-size: 18px"
                      @click="removeItem(index)"
                    ></i>
                  </p>
                  <div class="file-progress">
                    <el-progress :percentage="f.percentage" :color="'#68CF33'" :show-text="false"></el-progress>
                    <i v-if="f.status === 'success'" class="el-icon-success text-green"></i>
                    <i v-else-if="f.status === 'fail'" class="el-icon-error text-red"></i>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <div class="chunk-upload-border"></div>
        <el-button size="small" class="wide-button cancel-btn" @click="closeDialog">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getExcelTemplateUrl } from '@/api/common'
import { downloadFileByUrl, BytesToSize } from '@/utils/tool.js' //
export default {
  name: 'component_name',
  props: {
    dialogTitle: {
      type: String,
      default: '导入'
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    chunkUploadUrl: {
      type: String,
      default: '/clientplatform/billManage/batchAdd'
    },
    type: {
      type: Number,
      required: true // 上传类型 1:核心企业组织架构 2:核心企业业务员 3:核心企业业务员的融资客户 4:服务费缴费信息 5:白名单信息
    },
    buId: {
      type: Number,
      default: null
    },
    filename: {
      type: String,
      default: ''
    }
  },
  components: {
    UploadItem: () => import('./UploadItem')
  },
  data() {
    return {
      fileList: [], // 上传文件列表
      msg: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 自定义模拟下载接口
    async download() {
      const { status, data, message } = await getExcelTemplateUrl(this.filename)
      if (+status === 200) {
        downloadFileByUrl(data.url, data.filename)
      } else {
        this.$message.error('模板下载失败 ' + message)
      }
    },
    changeList(val, data) {
      this.fileList = val
      this.msg = data
      this.$forceUpdate()
    },
    // 删除上传列表文件
    removeItem(index) {
      this.fileList.splice(index, 1)
      this.msg = ''
    },
    closeDialog() {
      this.$emit('closeDialog')
      this.fileList = []
      this.msg = ''
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
