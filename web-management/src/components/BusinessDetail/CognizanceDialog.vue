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
        <DescriptionList class="m-l-20">
          <Description label="房产类型">{{ dialogData.oneLevelType$FICDictName }} - {{ dialogData.twoLevelType$FICDictName }}</Description>
          <Description label="房产面积">{{dialogData.area}} m2</Description>
          <Description label="权证编号">{{dialogData.warrantNo}}</Description>
          <Description label="他项权利证书编号">{{dialogData.otherCertificateNo}}</Description>
          <Description label="认定价值">{{dialogData.identifyValue}}万元</Description>
          <Description label="认定机构">{{dialogData.identifyOrgan}}</Description>
          <Description v-if="dialogData.hasLease === 'N'" label="租赁情况">未出租</Description>
          <Description v-else label="租赁金额">{{dialogData.annualRent}} 元/年</Description>
          <Description label="租赁期限">{{dialogData.leaseTermStart}} - {{dialogData.leaseTermStart}}</Description>
          <Description label="房产地址">{{ dialogData.addressName }}{{ dialogData.detailAddress }}</Description>
        </DescriptionList>
        <el-tabs tab-position="left">
          <el-tab-pane v-for="(item,index) in firstTabPaneList" :key="index">
            <span slot="label">{{item.label}}</span>
            <ImageUploadDetail :fileList="item.fileList"></ImageUploadDetail>
          </el-tab-pane>
        </el-tabs>
        <el-divider></el-divider>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" class="wide-button" @click="dialogCancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import DescriptionList from '@/components/DescriptionList'
import ImageUploadDetail from '@/components/ImageUpload/Detail'
// 此组件暂时无用 使用文波写好的组件
export default {
  name: 'GrowInfo',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
      default() {
        return {}
      }
    },
    firstTabPaneList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    DescriptionList,
    ImageUploadDetail
  },
  data() {
    return {
      // firstTabPaneList: [
      //   { label: '抵押物照片', fileList: [{ thumbnailUrl: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' }] },
      //   { label: '权证照片', fileList: [{ thumbnailUrl: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1593106255,4245861836&fm=26&gp=0.jpg' }] },
      //   { label: '入押回执', fileList: [{ thumbnailUrl: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' }] },
      //   { label: '他项权利证书照片', fileList: [{ thumbnailUrl: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1593106255,4245861836&fm=26&gp=0.jpg' }] }
      // ],
      guaranteeImage: {}
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    dialogOpen() {
      // console.log('')
    },
    dialogCancel() {
      this.$emit('dialogCancel')
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
