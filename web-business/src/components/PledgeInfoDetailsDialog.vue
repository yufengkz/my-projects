<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="880px"
      class="pledge-info-details-dialog"
      @open="dialogOpen"
    >
      <!-- 信息填写 -->
      <div class="content-container">
        <div class="m-t-20" v-if="outCheckSource.twoLevelType === 'receivable_account'">
          <!-- 应收账款 -->
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20">
            <Description label="所属权属">{{outCheckSource.ownerRole$FICDictName}}-{{outCheckSource.ownerName}}</Description>
            <Description label="甲方名称">{{outCheckSource.firstPartyName}}</Description>
            <Description label="乙方名称">{{outCheckSource.secondPartyName}}</Description>
            <Description label="合同金额">{{outCheckSource.contractAmount}}万元</Description>
            <Description label="应收金额">{{outCheckSource.receivableAmount}}万元</Description>
            <Description
              label="约定期限"
            >{{ outCheckSource.accountStart | formatDate("yyyy-MM-dd") }}至{{outCheckSource.accountEnd | formatDate("yyyy-MM-dd") }}</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue}}万元</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,index) in  Object.keys(fileMap)" :key="index">
                <span slot="label">{{guanranteeEnum.imageFileTypeEnum[item]}}</span>
                <Detail :fileList="fileMap[item]"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="m-t-20" v-else-if="outCheckSource.twoLevelType === 'receivable_rent'">
          <!-- 建设用地使用权 -->
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20">
            <Description label="所属权属">{{outCheckSource.ownerRole$FICDictName}}-{{outCheckSource.ownerName}}</Description>
            <Description label="甲方名称">{{outCheckSource.firstPartyName}}</Description>
            <Description label="乙方名称">{{outCheckSource.secondPartyName}}</Description>
            <Description label="合同金额">{{outCheckSource.contractAmount}}万元</Description>
            <Description label="应收金额">{{outCheckSource.receivableAmount}}万元</Description>
            <Description
              label="约定期限"
            >{{ outCheckSource.accountStart | formatDate("yyyy-MM-dd") }}至{{outCheckSource.accountEnd | formatDate("yyyy-MM-dd") }}</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue}}万元</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,index) in  Object.keys(fileMap)" :key="index">
                <span slot="label">{{guanranteeEnum.imageFileTypeEnum[item]}}</span>
                <Detail :fileList="fileMap[item]"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="m-t-20" v-else-if="outCheckSource.twoLevelType === 'legal_right'">
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20">
            <Description label="所属权属">{{outCheckSource.ownerRole$FICDictName}}-{{outCheckSource.ownerName}}</Description>
            <Description label="企业注册资本金">{{outCheckSource.registerCapital}}万元</Description>
            <Description label="企业资产总额">{{outCheckSource.totalAssets}}万元</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue}}万元</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
            <Description label="股权占比">{{outCheckSource.proportion}}%</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">股东信息：</span>
            <el-table :data="JSON.parse(outCheckSource.shareholderInfo)">
              <el-table-column prop="name" label="股东名称"></el-table-column>
              <el-table-column prop="rate" label="股权占比（%）"></el-table-column>
            </el-table>
          </div>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,index) in  Object.keys(fileMap)" :key="index">
                <span slot="label">{{guanranteeEnum.imageFileTypeEnum[item]}}</span>
                <Detail :fileList="fileMap[item]"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-row>
          <el-button size="mini" class="wide-button" @click="dialogCancel">关闭</el-button>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getGuaranteePledgeFileList } from '@/api/business-common'
import { mapGetters } from 'vuex'
export default {
  components: {
    // Demo: () => import('@/components/demo'),
    DescriptionList: () => import('@/components/DescriptionList'),
    Detail: () => import('@/components/ImageUpload/Detail')
  },
  name: 'PledgeInfoDialog',
  props: {
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    /**
     * 外部传入所有收入的对象
          {
          pledgeInfoType: 'yszk' // '应收账款'
        }, {
          pledgeInfoType: 'yszj'// '应收租金'
        }, {
          pledgeInfoType: 'frgq' //'法人股权'
        }
     */
    outCheckSource: {
      type: Object
    }
  },
  mounted() {},
  data() {
    return {
      editableTabsValue: '',
      tabIndex: 0,
      currentTabIndex: 0,
      checkedPossessionsTypes: [],
      fileMap: {},
      fileKeys: [],
      /**
       *
       * 应收账款
       * yszkForm: {
        person: '', // 所属权属
        partA: '', // 甲方
        partB: '', // 乙方
        contractAmount: '', // 合同金额
        receivableAmount: '', // 应收金额
        time: '', // 约定期限
        value: '', // 认定价值
        organization: '', // 认定机构
      },
      * 应收账款
       * yszjForm: {
        person: '', // 所属权属
        partA: '', // 甲方
        partB: '', // 乙方
        contractAmount: '', // 合同金额
        receivableAmount: '', // 应收金额
        time: '', // 约定期限
        value: '', // 认定价值
        organization: '', // 认定机构
      },
       * 法人股权
       * frgqForm: {
        person: '', // 所属权属
        registeredCapital: '', // 注册资本
        assets: '', // 资产
        value: '', // 认定价值
        organization: '', // 认定机构
      }
       */
      checkedPossessionsDatas: [],
      yszkImageData: [
        {
          code: 1,
          companyName: '合同照片'
        },
        {
          code: 2,
          companyName: '人行征信中心应收账款质押登记受理截图'
        },
        {
          code: 3,
          companyName: '他项权利证书照片'
        }
      ],
      frgqImageData: [
        {
          code: 1,
          companyName: '营业执照'
        },
        {
          code: 3,
          companyName: '入押回执'
        },
        {
          code: 4,
          companyName: '他项权利证书照片'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['guanranteeEnum'])
  },
  created() {},
  methods: {
    // 弹窗打开时赋值
    dialogOpen() {
      // outCheckSource 根据判断类型 显示的数据
      getGuaranteePledgeFileList({ pledgeId: this.outCheckSource.id }).then(res => {
        // this.outCheckSource
        if (res.status === 200 && res.data.fileMap) {
          this.fileMap = res.data.fileMap
          this.fileKeys = Object.keys(this.fileMap)
        }
      })
    },
    // 关闭弹窗触发
    dialogCancel() {
      this.$emit('dialogCancel')
    }
  }
}
</script>
<style lang="scss">
.pledge-info-details-dialog {
  // 对话框样式调整
  .el-dialog {
    border-radius: 8px;
  }
  .el-dialog__header {
    height: 0px;
  }
  .el-dialog__title {
    color: #59676f;
  }
  .el-dialog__body {
    padding: 0 20px 20px 20px;
  }
  .app-container {
    padding: 10px;
  }
  .content-container {
    padding: 30px 0px;
  }
  // .dialog-section-bar {
  //   color: $primary;
  // }
  // .dialog-section {
  //   color: black;
  // }
  // .el-row {
  //   margin-bottom: 20px;
  //   &:last-child {
  //     margin-bottom: 0;
  //   }
  // }
  // // 表单样式调整
  // .el-form-item {
  //   margin-bottom: 0;
  //   margin-left: 10px;
  // }
  // .el-form-item__label {
  //   font-size: 14px;
  //   color: #59676f;
  //   line-height: 40px;
  //   padding: 0;
  // }

  .el-checkbox-group {
    .el-checkbox {
      // margin-right: 5px;
      margin-left: 30px;
      margin-top: 30px;
      width: 200px;
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
