<template>
  <div>
    <div class="date-table">
      <h3 class="fui-second-title">{{title}}</h3>
      <el-table class="fui-table" :data="fileData" border size="mini" stripe style="width: 100%;margin-top:24px;">
        <el-table-column label="序号" type="index" width="60"></el-table-column>
        <el-table-column v-for="fileTh in tableHeader" :key="fileTh.code" :prop="fileTh.code" :label="fileTh.name"></el-table-column>
        <el-table-column prop="upload" :label="fileLable">
          <template slot-scope="scope">
            <el-upload
              class="upload-demo"
              :action="fileUpload"
              :data="scope.row.uploadData"
              :headers="{Authorization:token}"
              :before-upload="beforeAvatarUpload"
              :file-list="scope.row.fileList"
              v-if="fileType === 'isBusiness'"
              :on-success="(response,file,fileList)=>{handleAvatarSuccess(scope,scope.row,response,file,fileList)}"
              :on-remove="(file,fileList)=>{handleRemove(scope,scope.row,file,fileList)}"
              :on-error="onError"
              :on-preview="file=>{onPreview(file, scope)}"
              :limit="limit"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <span>（支持扩展名：{{fileFormatLabel}}）</span>
              <!-- <span>（支持扩展名：.doc .docx .pdf）</span> -->
            </el-upload>
            <a
              v-else
              v-for="item in scope.row.fileList"
              :key="item.name"
              :href="item.dataUrl + '?attname=' + item.name"
              target="_blank"
            >{{item.name}}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from '../fetch/api'
import { beforeUpload } from '../util/tool.js'
import { getToken } from '@/utils/auth'
import { Loading } from 'fic-element-ui'
var loadingInstance
export default {
  name: 'fileUpload',
  components: {},
  props: {
    title: {
      type: String
    },
    fileData: {
      type: Array
    },
    tableHeader: {
      type: Array
    },
    fileType: {
      type: String
    },
    fiilApi: {
      type: String
    },
    maxLimit: {
      type: Number
    },
    // 文件类型：['pdf'] 或 ['doc', 'pdf', ...]
    fileFormat: {
      type: Array,
      default: () => ['doc', 'docx', 'pdf']
    }
  },
  data() {
    return {
      fileUpload: this.fiilApi || api.ctUpload(),
      isBusiness: true,
      limit: this.maxLimit || null,
      token: getToken(), // 上传时所需登录信息
      fileLable: this.fileType === 'isBusiness' ? '上传' : '下载',
      fileFormatLabel: ''
    }
  },
  methods: {
    handleRemove(scope, row, file, fileList) {
      scope.row.fileList = fileList
      this.$emit('removeSuccess', file)
      this.$emit('fileRow', row)
      this.$emit('getAllRow', scope.store.states.data)
    },
    beforeAvatarUpload(file) {
      const flag = beforeUpload(file, {
        fileType: this.fileFormat, // 上传限制的文件类型
        error: '请上传小于20MB的指定类型文件' // 错误提示文案
      })
      if (flag) {
        loadingInstance = Loading.service({
          lock: true
        })
      }
      return flag
    },
    handleAvatarSuccess(scope, row, response, file, fileList) {
      this.$nextTick(() => {
        // 以服务的方式调用的 Loading 需要异步关闭
        loadingInstance.close()
      })
      const params = { response, file, fileList, row }
      this.$emit('uploadSuccess', params)
      file.response.data.name = file.response.data.originalFilename
      row.fileList.push(file.response.data)
      this.$emit('fileRow', row)
      this.$emit('getAllRow', scope.store.states.data)
    },
    onError() {
      if (loadingInstance) {
        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close()
        })
      }
    },
    // 点击文件列表中已上传的文件时的钩子
    onPreview(file, scope) {
      if (scope.row.isPreview === '1' || scope.row.isPreview === 1 || scope.row.isPreview === true || scope.row.isPreview === 'true') {
        this.$emit('filePreview', file)
      }
    }
  },
  watch: {
    fileData(val) {
      this.$emit('getAllRow', val)
    }
  },
  mounted() {
    // fileFormatLabel格式化
    let str = ''
    this.fileFormat.forEach(item => {
      str += `.${item},`
    })
    this.fileFormatLabel = str.substr(0, str.length - 1)
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.chain_wrap {
  background: #fff;
  margin: 0 auto;
  width: 90%;
  padding: 15px;
  .date-table {
    position: relative;
    padding: 20px 30px;
    color: #333;
  }
  .footer {
    padding-top: 35px;
    overflow: hidden;
    p {
      height: 1px;
      background: #aaa;
    }
    .footer-btn {
      float: right;
      padding-top: 30px;
    }
  }
  //     button{
  //     padding:7px 15px;
  //     border-color:#fcac20;
  //     .el-button--primary{
  //       border-color:#fcac20!important
  //     }
  //     }
  // button:hover,button:visited,button:active{
  // background: #fcac20;
  // color: #fff;
  // }
}
.company_list {
  .title {
    width: 100%;
    .key {
      float: left;
      width: 10%;
      text-align: right;
      line-height: 40px;
    }
    .value {
      float: left;
      width: 70%;
    }
  }
}
</style>
