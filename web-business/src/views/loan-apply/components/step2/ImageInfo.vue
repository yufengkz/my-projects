<template>
  <div>
    <el-form
      ref="basicForm"
      :model="basicForm"
      :rules="basicFormRules"
      size="mini"
      class="m-t-20 p-l-10 block-el-select"
      label-position="left"
      label-width="140px"
    >
      <span class="all-title">完善影像信息</span>
      <div class="text-right">
        <el-button size="mini" plain type="primary" icon="el-icon-upload" @click="downloadTemplate">模版下载</el-button>
        <el-button size="mini" plain type="primary" icon="el-icon-upload" @click="importExcel">批量上传</el-button>
        <el-button size="mini" plain type="primary" icon="load" @click="reloadImageData">刷新</el-button>
      </div>
      <!-- <ImageInfoTabs :customInfo="customInfo" :tabsData="tabsData" :imageData="imageData" @updateChild="updateImageData"></ImageInfoTabs> -->
      <div class="app-container">
        <el-tabs v-model="activeName" tab-position="left" @tab-click="clickTab">
          <el-tab-pane v-for="(item,index) in tabsData" :key="index" :name="item.code">
            <span slot="label">{{item.tabName}}</span>
            <!-- <ImageUpload
              @updateChild="val => {updateChild(val, item.code)}"
              :imageList="imageData[item.code]"
            ></ImageUpload> -->
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
                <div slot="file" slot-scope="{file}">
                  <img class="el-upload-list__item-thumbnail" :src="file.thumbnailUrl" alt="">
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <!-- <span class="el-upload-list__item-delete" @click="handleDownload(file)">
                      <i class="el-icon-download" v-show="typeof(file.fileKey) === 'string'"></i>
                    </span> -->
                    <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <!-- <el-dialog :visible.sync="previewDialogVisible" append-to-body>
                <img width="100%" :src="previewImgUrl" alt="">
              </el-dialog> -->
            </div>
          </el-tab-pane>
          <el-dialog :visible.sync="previewDialogVisible" append-to-body class="img-dialog">
            <img width="100%" :src="previewImgUrl" alt="">
          </el-dialog>
        </el-tabs>
      </div>
      <el-divider></el-divider>
      <span class="all-title">完善贷款信息</span>
      <el-row :gutter="20" class="m-t-30">
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="plantArea" label="申贷种植面积:" label-width="100px">
            <el-input v-model="basicForm.plantArea" placeholder="请录入">
              <template slot="append">亩</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="proposedCreditLine" label="申请额度:" label-width="80px">
            <el-input v-model="basicForm.proposedCreditLine" placeholder="请录入"  maxlength="11">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
          <el-form-item prop="dateDue" label="贷款到期日:" label-width="90px">
            <!-- <el-date-picker
              type="date"
              placeholder="请选择"
              v-model="basicForm.dateDue"
              value-format="yyyy-MM-dd"
              style="width: 100%;"
            ></el-date-picker> -->
            <el-cascader
              v-model="basicForm.dateDue"
              :options="cascaderOptions"
              clearable
              @change="handleCascaderChange">
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保存基本信息 -->
      <el-row>
        <el-col :span="24" class="text-right">
          <el-button type="primary" class="wide-button" size="small" @click="HandleImageInfo">保存影像资料和贷款信息</el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
    </el-form>
    <!-- 批量上传 -->
    <UploadDialog :orderNo="orderNo" dialogTitle="批量上传" :dialogVisible="dialogVisible" @closeDialog = 'closeDialog'></UploadDialog>
  </div>
</template>

<script>
import { uploadFile, getImageInfo, uploadFileRemove, improveLoans, getLoansInfo } from '@/api/loan-apply'
import { getFilePath, downloadTemplateImage } from '@/api/common'
// import { getImageInfo } from '@/api/loan-apply'
import { beforeUpload, getMonthDateCascaderOptions } from '@/utils/tool'
import axios from 'axios'
export default {
  components: {
    // ImageInfoTabs: () => import('@/components/ImageInfoTabs'),
    UploadDialog: () => import('@/components/ChunkUploadDialog/index')
  },
  data() {
    return {
      cascaderOptions: getMonthDateCascaderOptions(),
      customInfo: {
        uploadUrl: uploadFile(),
        fileType: 1
      },
      basicForm: {
        plantArea: '', // 申贷种类面积
        proposedCreditLine: '', // 申请额度
        dateDue: '', // 货款到期日
        repayMonth: '',
        repayDate: ''
      },
      basicFormRules: {
        plantArea: [{ required: true, message: '请录入', trigger: 'blur' }],
        proposedCreditLine: [{ required: true, message: '请录入', trigger: 'blur' }, { pattern: /^([1-9]\d{3,})([.]\d{1,2})?$/, message: '输入金额最小为1000,支持小数点后两位', trigger: 'blur' }],
        dateDue: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      tabsData: [
        {
          code: '1',
          tabName: '婚姻证明'
        },
        {
          code: '2',
          tabName: '户口本'
        },
        {
          code: '3',
          tabName: '银行流水'
        },
        {
          code: '4',
          tabName: '耕作土地证明'
        },
        {
          code: '5',
          tabName: '家庭资产证明'
        },
        {
          code: '6',
          tabName: '家庭收入证明'
        },
        {
          code: '7',
          tabName: '个人征信报告'
        },
        {
          code: '8',
          tabName: '现场尽调合影'
        },
        {
          code: '9',
          tabName: 'MAP技术服务合同'
        },
        {
          code: '10',
          tabName: '定金交付凭据'
        },
        {
          code: '11',
          tabName: '其他'
        }
      ],
      imageData: {},
      dialogVisible: false,
      activeName: '',
      previewImgUrl: '', // 预览图片URL
      previewDialogVisible: false, // 预览图片弹窗是否展示
      flag: true
    }
  },
  computed: {
    orderNo() {
      return this.$route.query.orderNo
    },
    list() {
      return (this.imageData[this.activeName] && this.imageData[this.activeName].map(item => {
        item.thumbnailUrl = item.fileUrl || item.realFileUrl // 缩略图展示用url
        item.fileUrl = item.realFileUrl || item.fileUrl // 文件实际地址（统一通用和借款人影像两种情况）
        item.fileKey = item.realFileId || item.fileKey // 文件key（统一通用和借款人影像两种情况）
        return item
      })) || []
    }
  },
  mounted() {
    this.activeName = this.tabsData[0] && this.tabsData[0].code
    this.getImageInfoInit()
    // 获取贷款信息
    this.getLoansInfoList()
  },
  methods: {
    // 局部刷新 影像信息
    getImageInfoInit() {
      getImageInfo({
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }).then(res => {
        if (res.status === 200) {
          this.imageData = res.data
        }
      })
    },
    reloadImageData() {
      this.getImageInfoInit()
    },
    // 关闭pii两上传弹窗触发
    closeUploadDialog() {
      this.dialogVisible = false
    },
    // 导入
    importExcel() {
      this.dialogVisible = true
    },
    updateImageData(key, val) {
      this.$set(this.imageData, key, val)
    },
    closeDialog() {
      this.dialogVisible = false
    },
    // 保存影像资料
    HandleImageInfo() {
      this.$refs.basicForm.validate(vaild => {
        if (vaild) {
          // this.$message.success('验证成功')
          // 注意： 要用真实数据的id和no
          const obj = {
            customerId: this.$route.query.customerId,
            orderNo: this.$route.query.orderNo,
            ...this.basicForm
          }
          obj.plantArea = obj.plantArea * 1
          obj.proposedCreditLine = obj.proposedCreditLine * 1
          improveLoans(obj).then(res => {
            // 注意：到时候需要传参数！！
            this.getLoansInfoList()
            if (res.status === 200) {
              this.$store.state.app.saveToastFlag && this.$message.success(res.message || '保存成功')
              !this.$store.state.app.saveToastFlag && this.$emit('applyCredit')
              this.$store.dispatch('ToggleToastFlag', true)
            } else {
              this.$message.error(res.message || '操作失败，请稍后重试')
              this.$store.dispatch('ToggleToastFlag', true)
            }
          })
        } else {
          this.$store.dispatch('ToggleToastFlag', true)
        }
      })
    },
    // 获取贷款信息
    getLoansInfoList() {
      getLoansInfo({
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }).then(res => {
        if (res.status === 200) {
          const { repayDate, repayMonth } = res.data
          const dateDue = [repayMonth, repayDate]
          this.basicForm = Object.assign({}, res.data, { dateDue })
        }
      })
    },
    // 点击tab
    clickTab(target) {
      this.activeName = target.name
      this.customInfo.fileType = target.name
      this.getImageInfoInit()
    },
    // 自定义上传
    httpImageUpload(options) {
      const { file } = options // options有file对象、onProgress、onError等
      const url = this.customInfo.uploadUrl
      const param = {
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo,
        fileType: this.customInfo.fileType,
        files: file
      }
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
              id: res.data.data[0]
            }
            this.list.push(fileObj)
            this.updateImageData(this.activeName, this.list)
          } else {
            this.$message(res.data.message || '上传失败')
          }
        })
        .catch(() => {
          this.$message('上传异常')
          return false
        })
    },
    // 上传文件之前的钩子
    beforeUploadCheck(file) {
      return beforeUpload(file, {
        fileType: ['jpg', 'jpeg', 'png', 'bmp'], // 上传限制的文件类型
        max: 10240,
        error: '请上传小于10MB的jpg、jpeg、png、bmp格式文件' // 错误提示文案
      })
    },
    // 附件预览
    handlePictureCardPreview(file) {
      if (typeof (file.fileKey) === 'string') {
        getFilePath({ objectKey: file.fileKey }).then(res => {
          if (res.status === 200) {
            this.previewImgUrl = res.data
            this.previewDialogVisible = true
          } else {
            this.$message.error(res.mes)
          }
        })
      } else {
        this.previewImgUrl = file.fileUrl
        this.previewDialogVisible = true
      }
      // this.previewImgUrl = file.fileUrl
      // this.previewDialogVisible = true
    },
    // 附件下载
    // handleDownload(file) {
    //   getFilePath({ objectKey: file.fileKey }).then(res => {
    //     if (res.status === 200) {
    //       downloadFileByUrl(res.data)
    //     } else {
    //       this.$message.error(res.mes)
    //     }
    //   })
    //   // downloadFileByUrl(file.fileUrl)
    // },
    // 附件删除
    handleRemove(file) {
      const param = {
        customerId: this.customInfo.customerId,
        orderNo: this.customInfo.orderNo,
        fileType: this.customInfo.fileType.toString(),
        fileId: file.id.toString()
      }
      uploadFileRemove(param).then(res => {
        const index = this.list.findIndex(item => file.uid === item.uid)
        this.list.splice(index, 1)
        this.updateImageData(this.activeName, this.list)
      })
    },
    handleCascaderChange(val) {
      this.basicForm.repayMonth = val[0] || ''
      this.basicForm.repayDate = val[1] || ''
    },
    downloadTemplate() {
      window.location.href = downloadTemplateImage()
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
    height: 90%;
    overflow: hidden;
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
