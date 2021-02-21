/* 法人担保信息详情展示页面 */
<template>
  <div class="personEnsureDetail">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="lvsige">
          <el-tab-pane label="基本信息" name="first">
            <!-- 基本信息 -->
            <DescriptionList class="m-l-20" :content="resultData">
              <Description label="机构名称">{{resultData.organName}}</Description>
              <Description label="统一社会信用代码">{{resultData.creditCode}}</Description>
              <Description label="注册资本币种">{{resultData.registerCurrency$FICDictName}}</Description>
              <Description label="注册资本">{{resultData.registerCapital}}万元</Description>
              <Description label="主营业务">{{resultData.mainBusiness}}</Description>
              <Description label="注册地址">{{resultData.registerAddress}}</Description>
            </DescriptionList>
            <!-- 法人信息 -->
            <div class="title">法人信息</div>
            <DescriptionList class="m-l-20" :content="resultData">
              <Description label="姓名">{{resultData.legalName}}</Description>
              <Description label="证件类型">{{resultData.legalCertificatesType$FICDictName}}</Description>
              <Description label="证件号码">{{resultData.legalIdNo}}</Description>
              <Description label="联系电话">{{resultData.legalMobile}}</Description>
            </DescriptionList>
            <!-- 实际控制人信息 -->
            <div class="title">实际控制人信息</div>
            <DescriptionList class="m-l-20" :content="resultData">
              <Description label="姓名">{{resultData.controllerName}}</Description>
              <Description label="证件类型">{{resultData.controllerCertificatesType$FICDictName}}</Description>
              <Description label="证件号码">{{resultData.controllerIdNo}}</Description>
              <Description label="联系电话">{{resultData.controllerMobile}}</Description>
            </DescriptionList>
            <div class="titleCont">
              <div class="title">股东信息</div>
              <TableList border :columns="shareholderColumns" :dataSource="resultData.shareholders" :options="options" />
            </div>
            <div class="titleCont">
              <div class="title">财务信息</div>
              <!-- 表头字段需要定义 -->
              <TableList border :columns="financeColumns" :dataSource="resultData.finances" :options="options" />
            </div>
            <div class="titleCont">
              <div class="title">联系人信息</div>
              <TableList border :columns="linkmanColumns" :dataSource="resultData.contacts" :options="options" />
            </div>
            <!-- 担保额度 -->
            <div class="title">担保额度</div>
            <DescriptionList class="m-l-20" :content="lineLimitOutDTO">
              <Description label="可担保额度">{{ lineLimitOutDTO.amountCanUsing ? lineLimitOutDTO.amountCanUsing + '元' : '--' }}</Description>
              <Description label="审批担保额度">{{ lineLimitOutDTO.amount ? lineLimitOutDTO.amount + '元' : '--' }}</Description>
              <Description label="占用担保额度">{{ lineLimitOutDTO.amountOccupied ? lineLimitOutDTO.amountOccupied + '元' : '--' }}</Description>
            </DescriptionList>
          </el-tab-pane>
          <el-tab-pane label="影像资料" name="second">
            <template v-if="resultData.listMap">
              <ImageMaterial
                :fileList="resultData.listMap"
                :classifyList="classifyList"
                :classifyActive="classifyActive"
                @claaifyClick="claaifyClick"
              />
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getLegalDetail } from '@/api/approval'
export default {
  name: 'PersonEnsureDetail',
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    TableList: () => import('@/components/Tables/TableList'),
    ImageMaterial: () => import('@/components/ImageMaterial')
  },
  data() {
    return {
      resultData: {}, // 详情页面信息
      lineLimitOutDTO: {},
      activeName: 'first',
      classifyActive: 'legal_company_constitution', // 修改的下标 默认为数组的第一项
      // 股东信息表头
      shareholderColumns: [
        { prop: 'type$FICDictName', label: '股东类型', align: 'center' },
        { prop: 'name', label: '姓名', align: 'center' },
        { prop: 'certificatesType$FICDictName', label: '证件类型', align: 'center' },
        { prop: 'idNo', label: '证件号码', align: 'center' },
        { prop: 'investmentForm$FICDictName', label: '出资形式', align: 'center' },
        { prop: 'shareholdRatio', label: '出资比例', align: 'center' },
        { prop: 'investmentAmount', label: '出资金额（万元）', align: 'center' }
      ],
      // 财务信息
      financeColumns: [
        { prop: 'specificYear', label: '年份', align: 'center' },
        { prop: 'totalAssets', label: '企业总资产（万元)', align: 'center' },
        { prop: 'totalLiabilities', label: '企业总负债（万元）', align: 'center' },
        { prop: 'ownerRights', label: '所有者权益（万元）', align: 'center' },
        { prop: 'businessIncome', label: '营业收入（万元）', align: 'center' },
        { prop: 'businessCost', label: '营业成本（万元）', align: 'center' },
        { prop: 'totalProfit', label: '利润总额（万元）', align: 'center' }
      ],
      // 联系人信息表头
      linkmanColumns: [
        { prop: 'name', label: '姓名', align: 'center' },
        { prop: 'address', label: '通信地址', align: 'center' },
        { prop: 'postcode', label: '邮编', align: 'center' },
        { prop: 'fax', label: '传真', align: 'center' }
      ],
      options: {
        index: true
      },
      // tab 标头数据
      classifyList: [
        { name: '企业章程及变更决议', value: 'legal_company_constitution' },
        { name: '法人身份证', value: 'legal_id_card' },
        { name: '实际控制人身份证', value: 'legal_controller_id_card' },
        { name: '股东身份证', value: 'legal_shareholder_id_card' },
        { name: '同意担保股东/股东会（成员）决议', value: 'legal_resolution' },
        { name: '实际控制人及配偶结婚证明', value: 'legal_controller_marriage_certificate' },
        { name: '金融经理与法定代表人合影', value: 'legal_group_photo' },
        { name: '现场调查照片', value: 'legal_scene_photo' },
        { name: '企业简介', value: 'legal_company_introduction' },
        { name: '开户明细', value: 'legal_account_details' },
        { name: '借贷明细', value: 'legal_loan_details' },
        { name: '投资明细', value: 'legal_investment_details' },
        { name: '上下游交易明细', value: 'legal_trade_investment' },
        { name: '最新月度财务报表', value: 'legal_month_report' },
        { name: '最近连续两年年度报告', value: 'legal_year_report' },
        { name: '库存明细', value: 'legal_stock_details' },
        { name: '银行流水', value: 'person_bank_statement' },
        { name: '法定代表人、实际控制人征信查询授权书或《详版人行个人征信报告》', value: 'legal_credit_report' },
        { name: '企业征信查询授权书或《企业征信报告》', value: 'legal_company_credit_report' },
        { name: '企业验资报告', value: 'legal_verification_report' },
        { name: '法人及配偶结婚证明', value: 'legal_marriage_certificate' },
        { name: '担保明细', value: 'legal_guarantee_details' },
        { name: '企业征信申请书', value: 'legal_credit_apply' },
        { name: '其他', value: 'legal_other' }
      ]
    }
  },
  mounted() {
    this.getLegalPersonDetail()
  },
  methods: {
    // 获取详情页面数据
    getLegalPersonDetail() {
      getLegalDetail({ applyNo: this.$route.query.applyNo }).then(result => {
        if (result.status === 200) {
          this.resultData = result.data.data || {}
          this.lineLimitOutDTO = result.data.lineLimitOutDTO || {}
        } else {
          this.$message.error(result.data || '失败')
        }
      })
    },
    handleClick(tab, event) {},
    // 修改影像资料
    claaifyClick(val) {
      this.classifyActive = val
    }
  }
}
</script>

<style lang='scss' scoped>
.personEnsureDetail {
  .el-tabs {
    background: white;
    padding: 10px;
    /deep/ .el-table__header thead tr th {
      background: #f2f2f2;
    }
  }

  .title {
    border-left: 2px solid #08b448;
    margin-bottom: 18px;
    font-size: 14px;
    padding: 0 10px;
  }
}
</style>
