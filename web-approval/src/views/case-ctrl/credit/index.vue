/* 授信审批案件列表页面 */
<template>
  <div class="app-container caseCtrlCredit">
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
    <div class="dialog">
      <ArtificialTransferDialog :disabled="disabled" :optionData="optionData" @accepterVal="accepterVal" @showVisable="showVisable" />
    </div>
    <TableList
      border
      :columns="columns"
      :dataSource="dataSource"
      :operates="operates"
      :pagination="pagination"
      :dataTotal="pagination.dataTotal"
      :options="options"
      @handleSelectionChange="handleSelectionChange"
      @toggleRowSelection="toggleRowSelection"
      @handleChangePage="handleChangePage"
      @handleChangePageSize="handleChangePageSize"
    />
  </div>
</template>
<script>
import { getApplyDebtList, creditPersonGuarantee, getTransferResources } from '@/api/case-ctrl'
import { mapGetters } from 'vuex'

export default {
  name: 'CaseCtrlCredit',
  components: {
    Search: () => import('@/components/Tables/Search'),
    TableList: () => import('@/components/Tables/TableList'),
    ArtificialTransferDialog: () => import('@/components/ArtificialTransferDialog')
  },
  data() {
    return {
      businessType: 'C04',
      jurisdiction: [],
      mapListByRole: [],
      mapProductsOptions: [],
      tableSearch: [
        { label: '申请编号', value: 'applyNo', type: 'text' },
        { label: '客户姓名', value: 'customerName', type: 'text' },
        { label: '客户手机号', value: 'customerMobile', type: 'text' },
        { label: '状态', value: 'status', type: 'select', children: [] },
        { label: '提交时间:', value: 'commitTime', type: 'daterange' },
        { label: '更新时间:', value: 'updateTime', type: 'daterange' },
        { label: '产品', value: 'productType', type: 'select', children: [] },
        { label: '额度', apply: 'section', valueLow: 'highApplyAmount', valueHeight: 'lowApplyAmount', units: '元' },
        { label: '所属MAP', value: 'mapStationCode', type: 'select', children: [] },
        { label: '申请提交人', value: 'applyCommiter', type: 'text' },
        { label: '审批人员', value: 'checkName', type: 'text' }
      ],
      dataSource: [],
      columns: [
        { prop: 'applyNo', label: '申请编号', align: 'center' },
        { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
        { prop: 'productName', label: '产品', align: 'center' },
        { prop: 'approveAmount', label: '额度', align: 'center', ansFormatter: true },
        { prop: 'mapStationName', label: '所属MAP', align: 'center' },
        { prop: 'commitTime', label: '提交时间', align: 'center' },
        { prop: 'checkName', label: '审批人', align: 'center', formatter: this.formentSubmitName },
        { prop: 'checkLevel$FICDictName', label: '审批人等级', align: 'center' },
        { prop: 'status$FICDictName', label: '状态', align: 'center' },
        { prop: 'updatedTime', label: '更新时间', align: 'center' },
        { prop: 'customerName', label: '客户姓名', align: 'center' },
        { prop: 'customerMobile', label: '客户手机号', align: 'center' },
        { prop: 'customerCardNo', label: '客户身份证号', align: 'center' }
      ],
      searchForm: {
        current: 1, // 当前页数
        size: 10, // 每页条数
        businessType: 'C04' // 状态类型
      },
      pagination: {
        current: 1,
        pageSize: 10,
        dataTotal: 0
      },
      options: {
        selection: true
      },
      selectionArr: [],
      disabled: true,
      optionData: [],
      operates: [
        {
          label: '查看',
          method: (row, index) => {
            this.$router.push({ path: '/case-ctrl/credit/detail', query: { applyNo: row.applyNo } })
          }
        }
      ]
    }
  },
  methods: {
    // 点击人工转案事件
    showVisable() {
      const params = {
        businessType: 'C04',
        applyNo: this.selectionArr[0]
      }
      getTransferResources(params).then(result => {
        if (result.status === 200) {
          this.optionData = result.data && result.data.map(item => {
            return { ...item, key: item.id, value: item.userName }
          })
        }
      })
    },
    handleSelectionChange(v) {
      if (v.length) {
        this.selectionArr = v.map(item => item.applyNo)
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    formentSubmitName(row, column, cellValue) {
      return (row.checkName === '-1' || !row.checkName) ? 'MAP中心' : row.checkName
    },
    async getSourceData() {
      const result = await getApplyDebtList(this.searchForm)
      if (result.status === 200) {
        this.pagination.dataTotal = result.data.total
        this.dataSource = result.data.records
      } else {
        this.$message.error('查询出错 ' + result.message)
        this.dataSource = []
        this.pagination.dataTotal = 0
      }
    },
    handleSearch(val) {
      const maxVal = val.lowApplyAmount && Number(val.lowApplyAmount) // 额度最大值
      const minVal = val.highApplyAmount && Number(val.highApplyAmount) // 额度最小值
      this.searchForm = {
        ...this.searchForm,
        current: 1,
        applyNo: val.applyNo, // 申请编号
        customerName: val.customerName, // 客户姓名
        customerMobile: val.customerMobile, // 客户手机号
        mapStationCode: val.mapStationCode, // 所属MAP
        status: val.status, // 状态
        productType: val.productType, // 产品类型
        applyCommiter: val.applyCommiter, // 申请提交人
        lowApplyAmount: maxVal, // 额度最大值
        highApplyAmount: minVal, // 额度最小值
        startCommitTime: val.commitTime ? val.commitTime[0] : '', // 提交时间
        endCommitTime: val.commitTime ? val.commitTime[1] : '', // 结束时间
        startUpdatedTime: val.updateTime ? val.updateTime[0] : '', // 提交时间
        endUpdatedTime: val.updateTime ? val.updateTime[1] : '', // 结束时间
        checkName: val.checkName
      }
      // 判断额度的范围
      if (maxVal && minVal && Number(minVal) > Number(maxVal)) {
        this.$message.warning('额度 范围值设置有误')
        return
      }
      this.pagination.current = 1
      this.getSourceData()
    },
    toggleRowSelection () {},
    // 切换页码
    handleChangePage(page) {
      this.pagination = {
        ...this.pagination,
        current: page
      }
      this.searchForm = {
        ...this.searchForm,
        current: page
      }
      this.getSourceData() // 切换页数 条数 重新请求
    },
    // 切换每页显示的条数
    handleChangePageSize(pageSize) {
      this.pagination = {
        ...this.pagination,
        pageSize,
        currentPage: 1
      }
      this.searchForm = {
        ...this.searchForm,
        size: pageSize,
        current: 1
      }
      this.getSourceData() // 切换页数 条数 重新请求
    },
    // 去审批
    handleShow(row, index) {
      // console.log('查看', row, index)
    },
    accepterVal(val) {
      const parmas = this.selectionArr.map(item => {
        return {
          applyNo: item,
          id: val.id,
          transitionId: this.currentUser.id,
          transitionName: this.currentUser.userName
        }
      })
      creditPersonGuarantee(parmas).then(result => {
        if (result.status === 200) {
          this.$message.success(result.message || '成功了')
          this.getSourceData()
        } else {
          this.$message.error(result.message || '失败了')
        }
      })
    }
  },
  computed: {
    ...mapGetters(['jurisdictionStatus', 'MAPList', 'mapProducts', 'currentUser'])
  },
  async created() {
    // 获取列表数据
    this.getSourceData()
  },
  async mounted() {
    // 不同权限对应审批状态
    await this.$store.dispatch('GetJurisdictionStatus', {
      businessType: this.businessType,
      completionStatus: '4'
    })
    // 根据用户获取当前map中心
    await this.$store.dispatch('GetMAPList')
    await this.$store.dispatch('GetMAPProducts')
    this.mapListByRole = this.MAPList
    this.jurisdiction = this.jurisdictionStatus
    this.mapProductsOptions = this.mapProducts
    // 设置下拉列表
    this.tableSearch = this.tableSearch.map(item => {
      if (item.value === 'status') {
        return {
          ...item,
          children: this.jurisdiction
        }
      } else if (item.value === 'mapStationCode') {
        return {
          ...item,
          children: this.mapListByRole
        }
      } else if (item.value === 'productType') {
        return {
          ...item,
          children: this.mapProductsOptions
        }
      }
      return item
    })
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  margin: 10px 10px 10px 0;
  display: flex;
  justify-content: flex-end;
}
.caseCtrlCredit {
  /deep/ .el-form .el-col .el-form-item {
    .el-form-item__label {
      min-width: 110px;
    }
    .el-form-item__content {
      min-width: 160px;
      .halfWidth {
        width: 44.5% !important;
      }
    }
  }
}
</style>
