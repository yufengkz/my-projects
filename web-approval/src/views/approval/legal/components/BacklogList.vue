/* 「待审批」列表Tab */
<template>
  <div class="legalBacklogList">
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
    <TableList
      border
      :columns="columns"
      :dataSource="dataSource"
      :operates="operates"
      :pagination="pagination"
      :dataTotal="pagination.dataTotal"
      @toggleRowSelection="toggleRowSelection"
      @handleSelectionChange="handleSelectionChange"
      @handleChangePage="handleChangePage"
      @handleChangePageSize="handleChangePageSize"
    />
  </div>
</template>

<script>
import { legalPendingApprovalListSearch } from '@/api/approval'

// 给applyNo 字段添加一个是否显示转案标识
const formentTitle = (h, params) => {
  return h('div', [
    h(
      'span',
      Number(params.row.transitionId) === Number(params.row.checkId)
        ? { style: { padding: '0 5px', display: 'inline-block', border: '1px solid #F59A23', borderRadius: '4px', color: '#F59A23' } }
        : '',
      Number(params.row.transitionId) === Number(params.row.checkId) ? '转' : ''
    ),
    h('span', { style: { padding: '0 5px' } }, params.row.applyNo)
  ])
}
const formentSubmitName = (row, column, cellValue) => (row.submitName === '-1' || !row.submitName) ? 'MAP中心' : row.submitName
const formentAmount = (row, column, cellValue) => row.approveAmount ? row.approveAmount : row.applyAmount
// 所属MAP下拉数据
const mapStationCodeList = []

const TableSearchRoleBest = [
  { label: '申请编号', value: 'applyNo', type: 'text' },
  { label: '客户姓名', value: 'customerName', type: 'text' },
  { label: '客户手机号', value: 'customerMobile', type: 'text' },
  { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
  { label: '提交时间', value: 'commitTime', type: 'daterange' },
  { label: '更新时间', value: 'updateTime', type: 'daterange' },
  { label: '申请提交人', value: 'applyCommiter', type: 'text' },
  {
    label: '所属MAP',
    value: 'mapStationCode',
    type: 'select',
    children: mapStationCodeList
  },
  { label: '审批人', value: 'submitName', type: 'text' }
]

const TableSearchRoleOne = [
  { label: '申请编号', value: 'applyNo', type: 'text' },
  { label: '客户姓名', value: 'customerName', type: 'text' },
  { label: '客户手机号', value: 'customerMobile', type: 'text' },
  { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
  { label: '提交时间', value: 'commitTime', type: 'daterange' },
  { label: '更新时间', value: 'updateTime', type: 'daterange' },
  { label: '申请提交人', value: 'applyCommiter', type: 'text' },
  {
    label: '所属MAP',
    value: 'mapStationCode',
    type: 'select',
    children: mapStationCodeList
  },
  { label: '审批人', value: 'submitName', type: 'text' }
]

const TableSearchRoleTwo = [
  { label: '申请编号', value: 'applyNo', type: 'text' },
  { label: '客户姓名', value: 'customerName', type: 'text' },
  { label: '客户手机号', value: 'customerMobile', type: 'text' },
  { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
  { label: '提交时间', value: 'commitTime', type: 'daterange' },
  { label: '更新时间', value: 'updateTime', type: 'daterange' },
  { label: '申请提交人', value: 'applyCommiter', type: 'text' },
  {
    label: '所属MAP',
    value: 'mapStationCode',
    type: 'select',
    children: mapStationCodeList
  },
  { label: '审批人', value: 'submitName', type: 'text' }
]

const TableSearchRoleThree = [
  { label: '申请编号', value: 'applyNo', type: 'text' },
  { label: '机构名称', value: 'orgName', type: 'text' },
  { label: '统一社会信用代码', value: 'socialCreditCode', type: 'text' },
  { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
  { label: '提交时间', value: 'commitTime', type: 'daterange' },
  { label: '申请提交人', value: 'applyCommiter', type: 'text' },
  {
    label: '所属MAP',
    value: 'mapStationCode',
    type: 'select',
    children: mapStationCodeList
  }
]

const ColumnsBest = [
  { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
  { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
  { prop: 'approveAmount', label: '担保额度', align: 'center', formatter: formentAmount },
  { prop: 'mapStationName', label: '所属MAP', align: 'center' },
  { prop: 'commitTime', label: '提交时间', align: 'center' },
  { prop: 'submitName', label: '审批人', align: 'center', formatter: formentSubmitName },
  { prop: 'updatedTime', label: '更新时间', align: 'center' },
  { prop: 'orgName', label: '机构名称', align: 'center' },
  { prop: 'socialCreditCode', label: '统一社会信用代码', align: 'center' }
]

const ColumnsOne = [
  { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
  { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
  { prop: 'approveAmount', label: '担保额度', align: 'center', formatter: formentAmount },
  { prop: 'mapStationName', label: '所属MAP', align: 'center' },
  { prop: 'commitTime', label: '提交时间', align: 'center' },
  { prop: 'submitName', label: '审批人', align: 'center', formatter: formentSubmitName },
  { prop: 'updatedTime', label: '更新时间', align: 'center' },
  { prop: 'orgName', label: '机构名称', align: 'center' },
  { prop: 'socialCreditCode', label: '统一社会信用代码', align: 'center' }
]

const ColumnsTwo = [
  { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
  { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
  { prop: 'approveAmount', label: '担保额度', align: 'center', formatter: formentAmount },
  { prop: 'mapStationName', label: '所属MAP', align: 'center' },
  { prop: 'commitTime', label: '提交时间', align: 'center' },
  { prop: 'submitName', label: '审批人', align: 'center', formatter: formentSubmitName },
  { prop: 'updatedTime', label: '更新时间', align: 'center' },
  { prop: 'orgName', label: '机构名称', align: 'center' },
  { prop: 'socialCreditCode', label: '统一社会信用代码', align: 'center' }
]

const ColumnsThree = [
  { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
  { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
  { prop: 'approveAmount', label: '担保额度', align: 'center', formatter: formentAmount },
  { prop: 'mapStationName', label: '所属MAP', align: 'center' },
  { prop: 'commitTime', label: '提交时间', align: 'center' },
  { prop: 'orgName', label: '机构名称', align: 'center' },
  { prop: 'socialCreditCode', label: '统一社会信用代码', align: 'center' }
]

export default {
  name: 'BacklogList',
  props: {
    activeRole: {
      type: String // 0 贷审会 1 一级 2 二级 3 三级
    },
    mapListByRole: {
      type: Array // map中心数据
    }
  },
  components: {
    Search: () => import('@/components/Tables/Search'),
    TableList: () => import('@/components/Tables/TableList')
  },
  filters: {},
  data() {
    return {
      tableSearch: [],
      columns: [],
      dataSource: [],
      searchForm: {
        current: 1, // 当前页数
        size: 10, // 每页条数
        statusType: 11 // 状态类型
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        dataTotal: 0
      },
      operates: [
        {
          label: '去审批',
          isShow: (row, index) => row.state !== 1,
          method: (row, index) => {
            this.handleApprove(row, index)
          }
        }
      ]
    }
  },
  created() {
    this.initHandleData(this.activeRole)
    this.getSourceData()
  },
  watch: {
    mapListByRole(newVal, oldVal) {
      if (newVal) {
        this.tableSearch = this.tableSearch.map(item => {
          if (item.value === 'mapStationCode') {
            return {
              ...item,
              children: newVal || []
            }
          }
          return item
        })
      }
    },
    activeRole() {
      this.initHandleData(this.activeRole)
    }
  },
  methods: {
    // 列表查询方法
    async getSourceData() {
      const result = await legalPendingApprovalListSearch(this.searchForm)
      if (result.status === 200) {
        this.pagination.dataTotal = result.data.total
        this.dataSource = result.data.records
        this.dataSource.map(item => {
          const pattern = /(?=((?!\b)\d{3})+$)/g
          if (item.approveAmount) {
            const temp = item.approveAmount.replace(pattern, ',')
            item.approveAmount = temp
          } else {
            const temp = item.applyAmount.replace(pattern, ',')
            item.applyAmount = temp
          }
          return item
        })
      } else {
        this.$message.error('查询出错')
        this.dataSource = []
        this.pagination.dataTotal = 0
      }
    },
    handleSearch(val) {
      const maxVal = val.guaranteeAmountMax && Number(val.guaranteeAmountMax) // 额度最大值
      const minVal = val.guaranteeAmountMin && Number(val.guaranteeAmountMin) // 额度最小值

      this.searchForm = {
        ...this.searchForm,
        current: 1,
        applyCommiter: val.applyCommiter, // 申请提交人
        applyNo: val.applyNo, // 申请编号
        orgName: val.orgName, // 机构名称
        socialCreditCode: val.socialCreditCode, // 统一信用代码
        customerName: val.customerName, // 客户姓名
        customerMobile: val.customerMobile, // 客户手机号
        guaranteeAmountMax: maxVal, // 额度最大值
        guaranteeAmountMin: minVal, // 额度最小值
        mapStationCode: val.mapStationCode, // 所属MAP
        submitName: val.submitName, // 审批人
        commitTimeStart: val.commitTime ? val.commitTime[0] : '',
        commitTimeEnd: val.commitTime ? val.commitTime[1] : '',
        updateTimeStart: val.updateTime ? val.updateTime[0] : '',
        updateTimeEnd: val.updateTime ? val.updateTime[1] : ''
      }
      // 判断额度的范围
      if (maxVal && minVal && Number(minVal) > Number(maxVal)) {
        this.$message.warning('额度 范围值设置有误')
        return false
      }
      this.getSourceData()
    },
    toggleRowSelection() {},
    handleSelectionChange() {},
    // 切换页码
    handleChangePage(page) {
      this.pagination = {
        ...this.pagination,
        currentPage: page
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
    handleApprove(row, index) {
      this.$router.push({ path: '/approval/legal/detail', query: { applyNo: row.applyNo, isShow: '1' } })
    },
    // 通过判断权限id 处理对应的数据
    initHandleData(index) {
      if (index === '0') {
        this.tableSearch = TableSearchRoleBest
        this.columns = ColumnsBest
      } else if (index === '1') {
        this.tableSearch = TableSearchRoleOne
        this.columns = ColumnsOne
      } else if (index === '2') {
        this.tableSearch = TableSearchRoleTwo
        this.columns = ColumnsTwo
      } else if (index === '3') {
        this.tableSearch = TableSearchRoleThree
        this.columns = ColumnsThree
      }
    }
  }
}
</script>

<style lang="scss">
.legalBacklogList {
  background-color: #fff;
  padding: 20px;
  .header {
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  .red {
    font-size: 20px;
    color: #f5222d;
  }

  .green {
    font-size: 20px;
    color: #1890ff;
  }
  /deep/ .el-form .el-col .el-form-item {
    .el-form-item__label {
      min-width: 120px !important;
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
