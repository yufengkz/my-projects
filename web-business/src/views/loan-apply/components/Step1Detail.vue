<template>
  <div class="app-container">
    <v-form title="基本信息补充" :model="basicForm" tips>
      <template slot="content">
        <el-divider></el-divider>
        <DescriptionList :content="basicForm" class="m-l-20">
          <Description v-if="basicForm.loanCustomerType !== '1' && basicForm.loanCustomerTypeOne === '99'" label="客户类型">{{ basicForm.loanCustomerType$FICDictName || '--'}}</Description>
          <Description
          v-else
            label="客户类型"
          >{{basicForm.loanCustomerType$FICDictName || '--'}}&nbsp;&nbsp;{{commonEnum.loanCustomerTypeOne[basicForm.loanCustomerTypeOne] }}</Description>
          <Description label="是否首次与MAP合作">{{commonEnum.authFlag[basicForm.newMapFlag]}}</Description>
          <Description label="选择申请产品">{{basicForm.productName}}</Description>
        </DescriptionList>
      </template>
    </v-form>
    <v-form title="借款人授权" tips>
      <template slot="content">
        <el-divider></el-divider>
        <DescriptionList :content="self" class="m-l-20">
          <Description label="征信授权模式">
            {{self.authPattern$FICDictName || '--'}}&nbsp;{{self.authorizeTime}}
            <tag v-if="self.authFlag === 'Y'">已签署</tag>
            <!-- <el-tooltip v-show="self.authFlag === 'A'" class="item" effect="dark" content="拒绝原因" placement="right">
              <tag type="danger">查征审批拒绝</tag>
            </el-tooltip>-->
            <tag v-else-if="self.authFlag === 'N'" type="warning">签署失败</tag>
            <tag v-else-if="self.authFlag === null" type="info">未签署</tag>
          </Description>
          <Description label="风险等级">{{ self.riskGrade }}</Description>
          <Description label="风险评分">{{ self.riskScore }}</Description>
        </DescriptionList>
      </template>
    </v-form>
    <v-form title="共借人授权" :tips="`与借款人关系：${commonForm.relation$FICDictName || '--'}`">
      <template slot="content">
        <el-divider></el-divider>
        <DescriptionList v-if="commonForm" :content="commonForm" class="m-l-20">
          <Description label="姓名">{{commonForm.customerName}}</Description>
          <Description label="身份证号">{{commonForm.idCardNo}}</Description>
          <Description label="手机号">{{commonForm.mobile}}</Description>
          <Description label="征信授权模式">
            {{commonForm.authPattern$FICDictName || '--'}}&nbsp;{{commonForm.authorizeTime}}
            <tag v-if="commonForm.authFlag === 'Y'">已签署</tag>
            <!-- <el-tooltip
              v-else-if="commonForm.authFlag === 'A'"
              class="item"
              effect="dark"
              content="拒绝原因"
              placement="right"
            ><tag type="danger">查征审批拒绝</tag>
            </el-tooltip>-->
            <tag v-else-if="commonForm.authFlag === 'N'" type="warning">签署失败</tag>
            <tag v-else-if="commonForm.authFlag === null" type="info">未签署</tag>
          </Description>
          <Description label="风险等级">{{ commonForm.riskGrade }}</Description>
          <Description label="风险评分">{{ commonForm.riskScore }}</Description>
        </DescriptionList>
      </template>
    </v-form>
    <div v-if="guaranteeFrom && guaranteeFrom.length > 0">
      <v-form
        v-for="(item,index) in guaranteeFrom"
        :key="index"
        :title="`担保人${index===0?'一':'二'}授权`"
        :tips="`与借款人关系：${item.relation$FICDictName || '--'}`"
      >
        <template slot="content">
          <el-divider></el-divider>
          <span class="all-subtitle">担保人{{index ===0?'一':'二'}}</span>
          <DescriptionList :content="item" class="m-t-10 m-l-20">
            <Description label="姓名">{{item.customerName}}</Description>
            <Description label="身份证号">{{item.idCardNo}}</Description>
            <Description label="手机号">{{item.mobile}}</Description>
            <Description label="征信授权模式">
              {{item.authPattern$FICDictName || '--'}}&nbsp;{{item.authorizeTime}}
              <tag v-if="item.authFlag === 'Y'" size="small">已签署</tag>
              <!-- <el-tooltip
              v-show="item.authFlag === 'A'"
              class="item"
              effect="dark"
              content="拒绝原因"
              placement="right"
            >
              <tag size="small" type="danger">查征审批拒绝</tag>
              </el-tooltip>-->
              <tag v-else-if="item.authFlag === 'N'" size="small" type="warning">签署失败</tag>
              <tag v-else-if="item.authFlag === null" size="small" type="info">未签署</tag>
            </Description>
            <Description label="风险等级">{{ item.riskGrade }}</Description>
            <Description label="风险评分">{{ item.riskScore }}</Description>
          </DescriptionList>
          <span v-if="item.guaranteeSpouseOutVo" class="all-subtitle">担保人{{index ===0?'一':'二'}}配偶</span>
          <DescriptionList :content="item.guaranteeSpouseOutVo" v-if="item.guaranteeSpouseOutVo" class="m-t-10 m-l-20">
            <Description label="姓名">{{item.guaranteeSpouseOutVo.customerName}}</Description>
            <Description label="身份证号">{{item.guaranteeSpouseOutVo.idCardNo}}</Description>
            <Description label="手机号">{{item.guaranteeSpouseOutVo.mobile}}</Description>
            <Description label="征信授权模式">
              {{item.guaranteeSpouseOutVo.authPattern$FICDictName}}&nbsp;{{item.guaranteeSpouseOutVo.authorizeTime}}
              <tag v-if="item.guaranteeSpouseOutVo.authFlag === 'Y'">已签署</tag>
              <el-tooltip
                v-else-if="item.guaranteeSpouseOutVo.authFlag === 'A'"
                class="item"
                effect="dark"
                content="拒绝原因"
                placement="right"
              >
                <tag type="danger">查征审批拒绝</tag>
              </el-tooltip>
              <tag v-else-if="item.guaranteeSpouseOutVo.authFlag === 'N'" type="warning">签署失败</tag>
              <tag v-else-if="item.guaranteeSpouseOutVo.authFlag === null" type="info">未签署</tag>
            </Description>
            <Description label="风险等级">{{ item.guaranteeSpouseOutVo.riskGrade }}</Description>
            <Description label="风险评分">{{ item.guaranteeSpouseOutVo.riskScore }}</Description>
          </DescriptionList>
        </template>
      </v-form>
    </div>
    <div class="text-right" v-show="buttonFlag">
      <el-button @click="amendHandle" type="text" class="wide-button" size="mini">修改并重新风险预判</el-button>
    </div>
    <el-divider></el-divider>
    <el-row class="p-b-30">
      <el-col :span="12" class="text-right">
        <el-button
        @click="submitStep1('完善借款申请信息')"
        v-show="buttonFlag"
        type="primary"
        class="wide-button"
        size="mini"
      >去完善信息</el-button>
      <el-button
        @click="submitStep1('修改并重新风险预判')"
        v-show="!buttonFlag"
        type="primary"
        class="wide-button"
        size="mini"
      >修改并重新风险预判</el-button>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-button
          @click="submitStep1('完善借款申请信息')"
          v-show="!buttonFlag"
          type="text"
          class="wide-button"
          size="mini"
        >跳过，去完善信息</el-button>
      </el-col>
    </el-row>
    <el-footer class="el_footer m-t-20">【温馨提示】在提交贷款审批前，必须完成征信查询授权签署和风险试算，如有特殊情况，可先行跳过进行信息完善。</el-footer>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DescriptionList from '@/components/DescriptionList'
import VForm from '@/components/VForm'
import { getrReadyInfo, creditApplyListProductByProductType } from '@/api/loan-apply'

export default {
  name: 'component_name',
  components: {
    DescriptionList,
    VForm
  },
  data() {
    return {
      // 基本信息补充
      basicForm: {},
      // 借款人
      self: {
        authFlag: '',
        authPattern$FICDictName: '',
        riskGrade: '',
        riskScore: ''
      },
      // 共借人以及表单校验规则
      commonForm: {
        relation: '',
        customerName: '',
        idCardNo: '',
        mobile: '',
        authPattern: ''
      },
      // 共借人授权证明图片列表
      commonFormImageData: [],
      // 担保人一
      guaranteeFrom: [],
      // 担保人一授权证明图片列表
      guaranteeFormImageData: [],
      // 担保人一配偶授权证明图片列表
      guaranteeSpouseImageData: [],
      // 担保人二授权证明图片
      secondGuaranteeImageData: [],
      // 担保人二配偶 授权证明图片
      guaranteeSecondSpouseImageData: [],
      // 选择申请产品列表
      productList: [],
      // 担保人二
      secondGuaranteeFrom: {
        relation: '',
        customerName: '',
        idCardNo: '',
        mobile: '',
        authPattern: '',
        guaranteeSpouseOutVo: {
          customerName: '',
          idCardNo: '',
          mobile: '',
          authPattern: '',
          authorizeTime: ''
        }
      },
      buttonFlag: true
    }
  },
  created() {
    this.queryProductList()
  },
  mounted() {
    this.getInfo()
  },
  computed: {
    ...mapGetters(['commonEnum'])
  },
  methods: {
    amendHandle() {
      this.$emit('stepDetailChild', true)
    },
    submitStep1(val) {
      if (val === '完善借款申请信息') {
        this.$emit('stepDetailChild2', 1)
      } else {
        this.amendHandle()
      }
    },
    getInfo() {
      const creditApplyInfoVo = {
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }
      getrReadyInfo(creditApplyInfoVo).then(res => {
        if (res.status === 200) {
          // 反显
          // 基本信息补充
          this.basicForm = res.data
          // 借款人业务风险预判
          this.self = res.data.self || {}
          // 共借人
          this.commonForm = res.data.common || {}
          // 担保人
          this.guaranteeFrom = res.data.guarantee
          const arr = res.data.relcustomerRiskOutVos.every(item => item.authFlag === 'Y')
          if (arr) {
            this.buttonFlag = true
          } else {
            this.buttonFlag = false
          }
        }
      })
    },
    queryProductList() {
      creditApplyListProductByProductType({
        customerId: this.$route.query.customerId,
        orderNo: this.$route.query.orderNo
      }).then(res => {
        this.productList = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
