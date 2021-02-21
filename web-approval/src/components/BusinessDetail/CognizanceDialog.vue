<template>
  <div>
    <el-dialog
      title="价值风险认定"
      top="5vh"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="70%"
      class="grow-info-dialog"
      @close="clearDialog"
      @open="dialogOpen"
    >
      <el-divider></el-divider>
      <div class="m-t-20">
        <DescriptionList :content="cognizanceDialogData" class="m-l-20">
          <Description label="房产类型">
            <template v-if="cognizanceDialogData.oneLevelType$FICDictName">{{ cognizanceDialogData.oneLevelType$FICDictName }}</template>
            <template v-if="cognizanceDialogData.twoLevelType$FICDictName"> - {{ cognizanceDialogData.twoLevelType$FICDictName }}</template>
            <template v-if="cognizanceDialogData.threeLevelType$FICDictName"> - {{ cognizanceDialogData.threeLevelType$FICDictName }}</template>
            <template v-if="cognizanceDialogData.fourLevelType$FICDictName"> - {{ cognizanceDialogData.fourLevelType$FICDictName }}</template>
          </Description>
          <Description label="房产面积">{{ cognizanceDialogData.area }}</Description>
          <Description label="权证编号">{{ cognizanceDialogData.warrantNo }}</Description>
          <Description label="他项权利证书编号">{{ cognizanceDialogData.otherCertificateNo }}</Description>
          <Description label="认定价值">{{ cognizanceDialogData.identifyValue }}万元</Description>
          <Description label="认定机构">{{ cognizanceDialogData.identifyOrgan }}</Description>
          <Description label="租赁情况">{{ cognizanceDialogData.hasLease$FICDictName }}</Description> <!-- 如果是未出租，不显示租赁金额和租赁期限-->
          <Description v-if="cognizanceDialogData.hasLease === 'Y'" label="租赁金额">{{ cognizanceDialogData.rent }}元/年</Description>
          <Description v-if="cognizanceDialogData.hasLease === 'Y'" label="租赁期限">{{ splitTimeFun(cognizanceDialogData.leaseTermStart) }} - {{ splitTimeFun(cognizanceDialogData.leaseTermEnd) }}</Description>
          <Description label="房产地址">{{ cognizanceDialogData.addressName }}{{ cognizanceDialogData.detailAddress }}</Description>
        </DescriptionList>
        <el-tabs tab-position="left">
          <el-tab-pane v-for="(item,key) in imageData" :key="key">
            <span v-if="type === 'pledge'" slot="label">{{pledgeImage[key]}}</span>
            <span v-if="type === 'mortgage'" slot="label">{{mortgageImage[key]}}</span>
            <ImageUploadDetail :fileList="item"></ImageUploadDetail>
          </el-tab-pane>
        </el-tabs>
        <el-divider></el-divider>
        <el-form size="mini" ref="form" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="认定价值" prop="value">
            <el-input v-model="form.value" style="width: 200px"></el-input>万元
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" type="primary" class="wide-button" @click="submitForm('form')">保存</el-button>
        <el-button size="mini" class="wide-button" @click="dialogCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { splitTime } from '@/utils/format'
import { saveValueRisk } from '@/api/approval'
import DescriptionList from '@/components/DescriptionList'
import ImageUploadDetail from '@/components/ImageUpload/Detail'
import { mapGetters } from 'vuex'
export default {
  name: 'CognizanceDialog',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    cognizanceDialogData: {
      type: Object
    },
    imageData: {
      type: Object
    },
    type: {
      type: String
    }
  },
  components: {
    DescriptionList,
    ImageUploadDetail
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  data() {
    return {
      firstTabPaneList: [
        { label: '抵押物照片', fileList: [{ thumbnailUrl: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' }] },
        { label: '权证照片', fileList: [{ thumbnailUrl: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1593106255,4245861836&fm=26&gp=0.jpg' }] },
        { label: '入押回执', fileList: [{ thumbnailUrl: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' }] },
        { label: '他项权利证书照片', fileList: [{ thumbnailUrl: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1593106255,4245861836&fm=26&gp=0.jpg' }] }
      ],
      mortgageImage: {
        // 抵押物影像
        mortgage_file: '抵押物照片',
        mortgage_warrant: '权证照片',
        mortgage_receipt: '入押回执',
        mortgage_other_warrant: '他项权利证书照片',
        mortgage_contract_invoice: '购买合同及发票',
        mortgage_drive_license: '驾驶证照片',
        mortgage_buy_receipt: '购买凭证或自有凭证',
        mortgage_breed_insure: '生物资产投保证明'
      },
      pledgeImage: {
        // 质押物影像
        pledge_contract: '合同照片',
        pledge_receivable_receipt: '人行征信中心应收账款质押登记受理截图',
        pledge_other_warrant: '他项权利证书照片',
        pledge_license: '营业执照',
        pledge_receipt: '入押回执'
      },
      form: {
        value: ''
      },
      rules: {
        value: [
          { required: true, message: '请输入认定价值', trigger: 'blur' }
        ]
      }
    }
  },
  // watch: {
  //   cognizanceDialogData: {
  //     handler(newVal, oldVal) {
  //       this.cognizanceDialogData(newVal)
  //     },
  //     deep: true
  //   }
  // },
  created() {
  },
  mounted() {},
  methods: {
    splitTimeFun(v) {
      return splitTime(v, ' ')[0]
    },
    dialogOpen() {
      // console.log('')
    },
    dialogCancel() {
      this.form.value = ''
      this.$emit('dialogCancel', {
        operation: 2
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          saveValueRisk({
            applyNo: this.$route.query.applyNo,
            createdBy: this.cognizanceDialogData.createdBy,
            createdTime: this.cognizanceDialogData.createdTime,
            id: '',
            pledgeNo: this.cognizanceDialogData.id,
            pledgeType: this.cognizanceDialogData.pledgeType,
            updatedBy: this.currentUser.userName,
            updatedTime: '',
            value: this.form.value
          }).then(rep => {
            if (rep.status === 200) {
              this.$emit('dialogCancel', {
                value: this.form.value,
                operation: 1
              })
              this.form.value = ''
              this.$message.success(rep.message)
            } else {
              this.$message.error(rep.message)
            }
          })
        } else {
          return false
        }
      })
    },
    clearDialog() {
      // this.$refs.form.resetFields()
    }
  }
}
</script>
<style lang="scss">
.grow-info-dialog {
  // 对话框样式调整
  .el-dialog {
    border-radius: 8px;
  }
  .el-dialog__header {
    height: 0px;
  }
  .el-dialog__title {
    // padding-left: 33px; // 53 - 20
    // font-size: 18px;
    // line-height: 34px;
    color: #08b448;
  }
  .el-dialog__body {
    padding: 0 20px 20px 20px;
  }
  .el-row {
    margin-bottom: 5px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  // 多选框间距调整
  .el-checkbox-group {
    .el-checkbox {
      margin-right: 5px;
      margin-left: 0px;
    }
  }
  // 编辑表格中的月份范围选择框调整
  .plot-content {
    .el-date-editor--monthrange.el-input,
    .el-date-editor--monthrange.el-input__inner {
      width: 168px;
    }
    .el-date-editor .el-range-separator {
      width: 10%;
    }
  }

  .footer {
    margin-top: 40px;
    padding-bottom: 34px;
    button {
      width: 135px;
    }
    .el-button + .el-button {
      margin-left: 40px;
    }
  }
}
</style>
