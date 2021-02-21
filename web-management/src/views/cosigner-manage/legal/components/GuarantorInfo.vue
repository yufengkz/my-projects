/* [法人担保审批详情] 担保人信息组件 */
<template>
  <div class="guarantorInfo">
    <el-row>
      <el-col :span="24">
        <div class="titleCont">
          <DescriptionList class="m-l-20" :content="resultData">
            <Description label="机构名称">{{ resultData.organName }}</Description>
            <Description label="统一社会信用代码">{{ resultData.creditCode }}</Description>
            <Description label="注册资本币种">{{ resultData.registerCurrency$FICDictName }}</Description>
            <Description label="注册资本">{{ amountFormatter(resultData.registerCapital) }} 万元</Description>
            <Description label="主营业务" :style="changeBusinessWidth ? '1' : '0'">{{ resultData.mainBusiness }}</Description>
            <Description label="注册地址" :style="changeAddressWith ? '1' : '0'">{{ resultData.registerAddress }}</Description>
          </DescriptionList>
        </div>
        <div class="titleCont">
          <div class="title">法人信息</div>
          <DescriptionList class="m-l-20" :content="resultData">
            <Description label="姓名">{{ resultData.legalName }}</Description>
            <Description label="证件类型">{{ resultData.legalCertificatesType$FICDictName }}</Description>
            <Description label="证件号码">{{ resultData.legalIdNo }}</Description>
            <Description label="联系电话">{{ resultData.legalMobile }}</Description>
          </DescriptionList>
        </div>
        <div class="titleCont">
          <div class="title">实际控制人信息</div>
          <DescriptionList class="m-l-20" :content="resultData">
            <Description label="姓名">{{ resultData.controllerName }}</Description>
            <Description label="证件类型">{{ resultData.controllerCertificatesType$FICDictName }}</Description>
            <Description label="证件号码">{{ resultData.controllerIdNo }}</Description>
            <Description label="联系电话">{{ resultData.controllerMobile }}</Description>
          </DescriptionList>
        </div>
        <div class="titleCont">
          <div class="title">股东信息</div>
          <TableList border :columns="shareholderColumns" :dataSource="resultData.shareholders" :options="options" />
        </div>
        <div class="titleCont">
          <div class="title">财务信息</div>
          <TableList border :columns="financeColumns" :dataSource="resultData.finances" :options="options" />
        </div>
        <div class="titleCont">
          <div class="title">联系人信息</div>
          <TableList border :columns="linkmanColumns" :dataSource="resultData.contacts" :options="options" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ansFormatter } from '@/utils/tool.js'
export default {
  name: 'GuarantorInfo',
  props: {
    resultData: {
      type: Object
    }
  },
  components: {
    DescriptionList: () => import('@/components/DescriptionList'),
    TableList: () => import('@/components/Tables/TableList')
  },
  data() {
    return {
      changeBusinessWidth: false,
      changeAddressWith: false,
      options: {
        index: true
      },
      activeName: 'first',
      // 股东信息表头
      shareholderColumns: [
        { prop: 'type$FICDictName', label: '股东类型', align: 'center' },
        { prop: 'name', label: '姓名', align: 'center' },
        { prop: 'certificatesType$FICDictName', label: '证件类型', align: 'center' },
        { prop: 'idNo', label: '证件号码', align: 'center' },
        { prop: 'investmentForm$FICDictName', label: '出资形式', align: 'center' },
        { prop: 'shareholdRatio', label: '出资比例(%)', align: 'center' },
        { prop: 'investmentAmount', label: '出资金额（万元）', align: 'center' }
      ],
      // 股东信息表格数据
      shareholderDataSource: [
        {
          ShareholderType: 'ShareholderType',
          name: 'name',
          cardType: 'cardType',
          idCard: 'idCard',
          contributiveType: 'contributiveType',
          contributiveRatio: 'contributiveRatio',
          contributiveMoney: 'contributiveMoney'
        }
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
      // 财务信息数据
      financeDataSource: [
        {
          year: 'year',
          name: 'name',
          cardType: 'cardType',
          idCard: 'idCard',
          contributiveType: 'contributiveType',
          contributiveRatio: 'contributiveRatio',
          contributiveMoney: 'contributiveMoney'
        }
      ],
      // 联系人信息表头
      linkmanColumns: [
        { prop: 'name', label: '姓名', align: 'center' },
        { prop: 'address', label: '通信地址', align: 'center' },
        { prop: 'postcode', label: '邮编', align: 'center' },
        { prop: 'fax', label: '传真', align: 'center' }
      ],
      // 联系人信息数据
      linkmanDataSource: [
        {
          name: '张飞',
          address: '河北省保定市涿州县涿州镇123号',
          postcode: '100000',
          fax: ''
        }
      ]
    }
  },
  created() {},
  mounted() {},
  watch: {
    resultData: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal.mainBusiness && newVal.mainBusiness.length > 20) {
          this.changeBusinessWidth = true
        }
        if (newVal.registerAddress && newVal.registerAddress.length > 20) {
          this.changeAddressWith = true
        }
        if (newVal.finances) {
          let obj
          newVal.finances.map(item => {
            obj = Object.keys(item).slice(3, 9)
            obj.map(obj1 => {
              const pattern = /(?=((?!\b)\d{3})+$)/g
              const temp = item[obj1].replace(pattern, ',')
              item[obj1] = temp
            })
          })
        }
        if (newVal.shareholders) {
          newVal.shareholders.map(item => {
            const pattern = /(?=((?!\b)\d{3})+$)/g
            const temp = item.investmentAmount.replace(pattern, ',')
            item.investmentAmount = temp
          })
        }
      }
    }
  },
  computed: {},
  methods: {
    /* 金额格式化 */
    amountFormatter(v) {
      return ansFormatter(v)
    }
  }
}
</script>
<style lang="scss" scoped>
.guarantorInfo {
  .titleCont {
    .title {
      font-size: 14px;
      padding-left: 6px;
      line-height: 14px;
      border-left: 2px solid #08b448;
      color: #08b448;
      font-weight: 600;
      margin: 10px 0 15px;
    }
  }
}
</style>
