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
      class="mortgage-info-details-dialog"
    >
      <!-- 信息填写 -->
      <div class="content-container">
        <div class="m-t-20" v-if="outCheckSource.twoLevelType === 'house'">
          <!-- 房产 -->
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20" :col=12>
            <Description label="所属权属" >{{outCheckSource.ownerRole$FICDictName}} {{outCheckSource.ownerName}}</Description>
            <Description label="房产类型" >{{typeDetails(outCheckSource)}}</Description>
            <Description label="权证编号">{{outCheckSource.warrantNo}}</Description>
            <Description label="他项权利证书编号">{{outCheckSource.otherCertificateNo}}</Description>
            <Description label="房产面积">{{outCheckSource.area ? outCheckSource.area + 'm²' : '--'}}</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue ? outCheckSource.identifyValue + '万元' : '--'}}</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
            <Description label="租赁情况">{{outCheckSource.hasLease | newOldFilter}}</Description>
            <Description v-if="outCheckSource.hasLease == 'Y'" label="租赁金额:">{{outCheckSource.rent ? outCheckSource.rent + '万元' : '--'}}</Description>
            <Description v-if="outCheckSource.hasLease == 'Y'" label="租赁期限:">{{outCheckSource.leaseTermStart | formatDate("yyyy-MM-dd")}} 至 {{outCheckSource.leaseTermEnd | formatDate("yyyy-MM-dd")}}</Description>
            <Description label="房产地址">{{outCheckSource.addressName}}{{outCheckSource.detailAddress}}</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,key) in imageData" :key="key">
                <span slot="label">{{mortgageImage[key]}}</span>
                <Detail :fileList="item"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <!-- 建设用地使用权 -->
        <div class="m-t-20" v-else-if="outCheckSource.twoLevelType === 'build_land'">
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20" :col=12>
            <Description label="所属权属">{{outCheckSource.ownerRole$FICDictName}}{{outCheckSource.ownerName}}</Description>
            <Description label="土地类型">{{typeDetails(outCheckSource)}}</Description>
            <Description label="权证编号">{{outCheckSource.warrantNo}}</Description>
            <Description label="他项权利证书编号">{{outCheckSource.otherCertificateNo}}</Description>
            <Description label="房产面积">{{outCheckSource.area}}m²</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue ? outCheckSource.identifyValue + '万元' : '--'}}</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
            <Description label="租赁情况">{{outCheckSource.hasLease | newOldFilter}}</Description>
            <Description v-if="outCheckSource.hasLease == 'Y'" label="租赁金额:">{{outCheckSource.rent ? outCheckSource.rent + '万元' : '--'}}</Description>
            <Description v-if="outCheckSource.hasLease == 'Y'" label="租赁期限:">{{outCheckSource.leaseTermStart | formatDate("yyyy-MM-dd")}} 至 {{outCheckSource.leaseTermEnd | formatDate("yyyy-MM-dd")}}</Description>
            <Description label="房产地址">{{outCheckSource.addressName}}{{outCheckSource.detailAddress}}</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,key) in imageData" :key="key">
                <span slot="label">{{mortgageImage[key]}}</span>
                <Detail :fileList="item"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 农村地产 -->
        <div class="m-t-20" v-else-if="outCheckSource.twoLevelType === 'countryside_land'">
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20" :col=12>
            <Description label="所属权属">{{outCheckSource.ownerRole$FICDictName}}{{outCheckSource.ownerName}}</Description>
            <Description label="土地类型">{{typeDetails(outCheckSource)}}</Description>
            <Description label="权证编号">{{outCheckSource.warrantNo}}</Description>
            <Description label="他项权利证书编号">{{outCheckSource.otherCertificateNo || '--'}}</Description>
            <Description label="房产面积">{{outCheckSource.area}}m²</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue ? outCheckSource.identifyValue + '万元' : '--'}}</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
            <Description label="租赁情况">{{outCheckSource.hasLease | newOldFilter}}</Description>
            <Description v-if="outCheckSource.hasLease == 'Y'" label="租赁金额:">{{outCheckSource.rent ? outCheckSource.rent + '万元' : '--'}}</Description>
            <Description v-if="outCheckSource.hasLease == 'Y'" label="租赁期限:">{{outCheckSource.leaseTermStart | formatDate("yyyy-MM-dd")}} 至 {{outCheckSource.leaseTermEnd | formatDate("yyyy-MM-dd")}}</Description>
            <Description label="房产地址">{{outCheckSource.addressName}}{{outCheckSource.detailAddress}}</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,key) in imageData" :key="key">
                <span slot="label">{{mortgageImage[key]}}</span>
                <Detail :fileList="item"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 专用设备 -->
        <div class="m-t-20" v-else-if="outCheckSource.twoLevelType === 'special_machine'">
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20" :col=12>
            <Description label="所属权属">{{outCheckSource.ownerRole$FICDictName}}{{outCheckSource.ownerName}}</Description>
            <Description label="设备类型">{{typeDetails(outCheckSource)}}</Description>
            <Description label="权证编号">{{outCheckSource.warrantNo}}</Description>
            <Description label="购买时间">{{outCheckSource.buyTime | formatDate("yyyy-MM-dd")}}</Description>
            <Description label="购买价格">{{outCheckSource.buyPrice ? outCheckSource.buyPrice + '万元' : '--'}}</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue ? outCheckSource.identifyValue + '万元' : '--'}}</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
            <Description label="设备所在地地址">{{outCheckSource.addressName}}{{outCheckSource.detailAddress}}</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,key) in imageData" :key="key">
                <span slot="label">{{mortgageImage[key]}}</span>
                <Detail :fileList="item"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 农副产品 -->
        <div class="m-t-20" v-else-if="outCheckSource.twoLevelType === 'agriculture_product'">
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20" :col=12>
            <Description label="所属权属">{{outCheckSource.ownerRole$FICDictName}}{{outCheckSource.ownerName}}</Description>
            <Description label="产品类型">{{typeDetails(outCheckSource)}}</Description>
            <Description label="数量">{{outCheckSource.number}}</Description>
            <Description label="品质">{{outCheckSource.quality$FICDictName}}</Description>
            <Description label="单价">{{outCheckSource.unitPrice ? outCheckSource.unitPrice + '元/公斤' : '--'}}</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue ? outCheckSource.identifyValue + '万元' : '--'}}</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
            <Description label="他项权利证书编号">{{outCheckSource.otherCertificateNo || '--'}}</Description>
            <Description label="房产地址">{{outCheckSource.addressName}}{{outCheckSource.detailAddress}}</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,key) in imageData" :key="key">
                <span slot="label">{{mortgageImage[key]}}</span>
                <Detail :fileList="item"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- 机器设备 -->
        <div class="m-t-20" v-else-if="outCheckSource.twoLevelType === 'equipment'">
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20" :col=12>
            <Description label="所属权属">{{outCheckSource.ownerRole$FICDictName}}{{outCheckSource.ownerName}}</Description>
            <Description label="设备类型">{{typeDetails(outCheckSource)}}</Description>
            <Description label="发动机编号">{{outCheckSource.warrantNo}}</Description>
            <Description label="他项权利证书编号">{{outCheckSource.otherCertificateNo || '--'}}</Description>
            <Description label="购买时间">{{outCheckSource.buyTime | formatDate("yyyy-MM-dd") }}</Description>
            <Description label="购买价格">{{outCheckSource.buyPrice ? outCheckSource.buyPrice + '万元' : '--'}}</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue ? outCheckSource.identifyValue + '万元' : '--'}}</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
            <Description label="租赁情况">{{outCheckSource.hasLease | newOldFilter}}</Description>
            <Description v-if="outCheckSource.hasLease == 'Y'" label="租赁金额:">{{outCheckSource.rent ? outCheckSource.rent + '万元' : '--'}}</Description>
            <Description v-if="outCheckSource.hasLease == 'Y'" label="租赁期限:">{{outCheckSource.leaseTermStart | formatDate("yyyy-MM-dd")}} 至 {{outCheckSource.leaseTermEnd | formatDate("yyyy-MM-dd")}}</Description>
            <Description label="设备所在地">{{outCheckSource.addressName}}{{outCheckSource.detailAddress}}</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,key) in imageData" :key="key">
                <span slot="label">{{mortgageImage[key]}}</span>
                <Detail :fileList="item"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <!-- 生物资产 -->
        <div class="m-t-20" v-else-if="outCheckSource.twoLevelType === 'breed'">
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20" :col=12>
            <Description label="所属权属">{{outCheckSource.ownerRole$FICDictName}}{{outCheckSource.ownerName}}</Description>
            <Description label="资产类型">{{typeDetails(outCheckSource)}}</Description>
            <Description label="品质">{{outCheckSource.quality$FICDictName}}</Description>
            <Description label="数量">{{outCheckSource.number ? outCheckSource.number + '头' : '--'}}</Description>
            <Description label="他项权利证书编号">{{outCheckSource.otherCertificateNo || '--'}}</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue ? outCheckSource.identifyValue + '万元' : '--'}}</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
            <Description label="养殖地址">{{outCheckSource.addressName}}{{outCheckSource.detailAddress}}</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,key) in imageData" :key="key">
                <span slot="label">{{mortgageImage[key]}}</span>
                <Detail :fileList="item"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <!-- 农村土地承包经营权 -->
        <div class="m-t-20" v-else-if="outCheckSource.twoLevelType === 'land_contract'">
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20" :col=12>
            <Description label="所属权属">{{outCheckSource.ownerRole$FICDictName}}{{outCheckSource.ownerName}}</Description>
            <Description label="经营权类型">{{typeDetails(outCheckSource)}}</Description>
            <Description label="承包期限:">{{outCheckSource.contractingStart | formatDate("yyyy-MM-dd")}} 至 {{outCheckSource.contractingEnd | formatDate("yyyy-MM-dd")}}</Description>
            <Description label="权证编号">{{outCheckSource.warrantNo}}</Description>
            <Description label="他项权利证书编号">{{outCheckSource.otherCertificateNo || '--'}}</Description>
            <Description label="面积">{{outCheckSource.area ? outCheckSource.area + 'm²' : '--'}}</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue ? outCheckSource.identifyValue + '万元' : '--'}}</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
            <Description label="租赁情况">{{outCheckSource.hasLease | newOldFilter}}</Description>
            <Description v-if="outCheckSource.hasLease == 'Y'" label="租赁金额:">{{outCheckSource.rent ? outCheckSource.rent + '万元' : '--'}}</Description>
            <Description v-if="outCheckSource.hasLease == 'Y'" label="租赁期限:">{{outCheckSource.leaseTermStart | formatDate("yyyy-MM-dd")}} 至 {{outCheckSource.leaseTermEnd | formatDate("yyyy-MM-dd")}}</Description>
            <Description label="地址">{{outCheckSource.addressName}}{{outCheckSource.detailAddress}}</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,key) in imageData" :key="key">
                <span slot="label">{{mortgageImage[key]}}</span>
                <Detail :fileList="item"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <!-- 林权 -->
        <div class="m-t-20" v-else>
          <DescriptionList :content="outCheckSource" class="m-t-20 m-l-20" :col=12>
            <Description label="所属权属">{{outCheckSource.ownerRole$FICDictName}}{{outCheckSource.ownerName}}</Description>
            <Description label="经营权类型">{{typeDetails(outCheckSource)}}</Description>
            <Description label="承包期限:">{{outCheckSource.contractingStart | formatDate("yyyy-MM-dd")}} 至 {{outCheckSource.contractingEnd | formatDate("yyyy-MM-dd")}}</Description>
            <Description label="权证编号">{{outCheckSource.warrantNo}}</Description>
            <Description label="他项权利证书编号">{{outCheckSource.otherCertificateNo || '--'}}</Description>
            <Description label="面积">{{outCheckSource.area ? outCheckSource.area + 'm²' : ''}}</Description>
            <Description label="树龄">{{outCheckSource.treeAge}}</Description>
            <Description label="树种">{{outCheckSource.treeSpecies$FICDictName}}</Description>
            <Description label="认定价值">{{outCheckSource.identifyValue ? outCheckSource.identifyValue + '万元' : '--'}}</Description>
            <Description label="认定机构">{{outCheckSource.identifyOrgan}}</Description>
            <Description label="地址">{{outCheckSource.addressName}}{{outCheckSource.detailAddress}}</Description>
          </DescriptionList>
          <div class="m-t-20 m-l-20">
            <span style="font-size:12px">影像资料：</span>
            <el-tabs tab-position="left">
              <el-tab-pane v-for="(item,key) in imageData" :key="key">
                <span slot="label">{{mortgageImage[key]}}</span>
                <Detail :fileList="item"></Detail>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
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
import { saveValueRisk } from '@/api/approval'
import { mapGetters } from 'vuex'
export default {
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    Detail: () => import('@/components/ImageUpload/Detail')
  },
  filters: {
    newOldFilter(val) {
      return val === 'Y' ? '是' : '否'
    }
  },
  name: 'MortgageInfoDetailsDialog',
  props: {
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    imageData: {
      type: Object
    },
    outCheckSource: {
      type: Object
    }
  },
  mounted() {},
  data() {
    return {
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
  computed: {
    ...mapGetters(['guanranteeEnum']),
    ...mapGetters(['currentUser'])
  },
  created() {},
  methods: {
    typeDetails(val) {
      var obj = ''
      if (val.threeLevelType$FICDictName) {
        obj = val.threeLevelType$FICDictName
      }
      if (val.fourLevelType$FICDictName) {
        obj = obj + '-' + val.fourLevelType$FICDictName
      }
      if (val.fourLevelTypeOther) {
        obj = obj + '-' + val.fourLevelTypeOther
      }
      return obj
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
            createdBy: this.outCheckSource.createdBy,
            createdTime: this.outCheckSource.createdTime,
            id: '',
            pledgeNo: this.outCheckSource.id,
            pledgeType: this.outCheckSource.pledgeType,
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
    }
  }
}
</script>
<style lang="scss">
  .mortgage-info-details-dialog {
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
