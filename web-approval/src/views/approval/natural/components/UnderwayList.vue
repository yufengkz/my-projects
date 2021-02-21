/* 「已审批」列表Tab */
<template>
  <div class="naturalUnderwayList">
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
import { naturalAlreadyApprovalListSearch } from '@/api/approval'
import { queryJurisdictionStatus } from '@/api/base'

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

const TableSearchRoleBest = [
  { label: '申请编号', value: 'applyNo', type: 'text' },
  { label: '客户姓名', value: 'customerName', type: 'text' },
  { label: '客户手机号', value: 'customerMobile', type: 'text' },
  {
    label: '状态',
    value: 'statusType',
    type: 'select',
    children: [
      // { label: '一级待审批', value: 1 },
      // { label: '二级待审批', value: 2 },
      // { label: '三级待审批', value: 3 },
      // { label: '待MAP中心提交', value: 5 }
    ]
  },
  { label: '提交时间', value: 'commitTime', type: 'daterange' },
  { label: '更新时间', value: 'updateTime', type: 'daterange' },
  {
    label: '所属MAP',
    value: 'mapStationCode',
    type: 'select',
    children: []
  },
  { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
  { label: '申请提交人', value: 'applyCommiter', type: 'text' }
]

const TableSearchRoleOne = [
  { label: '申请编号', value: 'applyNo', type: 'text' },
  { label: '客户姓名', value: 'customerName', type: 'text' },
  { label: '客户手机号', value: 'customerMobile', type: 'text' },
  {
    label: '状态',
    value: 'statusType',
    type: 'select',
    children: [
      // { label: '二级待审批', value: 2 },
      // { label: '三级待审批', value: 3 },
      // { label: '贷审会待审批', value: 4 },
      // { label: '待MAP中心提交', value: 5 }
    ]
  },
  { label: '提交时间', value: 'commitTime', type: 'daterange' },
  { label: '更新时间', value: 'updateTime', type: 'daterange' },
  {
    label: '所属MAP',
    value: 'mapStationCode',
    type: 'select',
    children: []
  },
  { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
  { label: '申请提交人', value: 'applyCommiter', type: 'text' }
]

const TableSearchRoleTwo = [
  { label: '申请编号', value: 'applyNo', type: 'text' },
  { label: '客户姓名', value: 'customerName', type: 'text' },
  { label: '客户手机号', value: 'customerMobile', type: 'text' },
  {
    label: '状态',
    value: 'statusType',
    type: 'select',
    children: [
      // { label: '一级待审批', value: 1 },
      // { label: '三级待审批', value: 3 },
      // { label: '贷审会待审批', value: 4 },
      // { label: '待MAP中心提交', value: 5 },
      // { label: '待MAP中心复议', value: 6 }
    ]
  },
  { label: '提交时间', value: 'commitTime', type: 'daterange' },
  { label: '更新时间', value: 'updateTime', type: 'daterange' },
  {
    label: '所属MAP',
    value: 'mapStationCode',
    type: 'select',
    children: []
  },
  { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
  { label: '申请提交人', value: 'applyCommiter', type: 'text' }
]

const TableSearchRoleThree = [
  { label: '申请编号', value: 'applyNo', type: 'text' },
  { label: '客户姓名', value: 'customerName', type: 'text' },
  { label: '客户手机号', value: 'customerMobile', type: 'text' },
  {
    label: '状态',
    value: 'statusType',
    type: 'select',
    children: [
      // { label: '一级待审批', value: 1 },
      // { label: '二级待审批', value: 2 },
      // { label: '贷审会待审批', value: 4 },
      // { label: '待MAP中心提交', value: 5 },
      // { label: '待MAP中心复议', value: 6 }
    ]
  },
  { label: '提交时间', value: 'commitTime', type: 'daterange' },
  { label: '更新时间', value: 'updateTime', type: 'daterange' },
  { label: '申请提交人', value: 'applyCommiter', type: 'text' },
  { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
  {
    label: '所属MAP',
    value: 'mapStationCode',
    type: 'select',
    children: []
  }
]

const ColumnsBest = [
  { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
  { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
  { prop: 'approveAmount', label: '额度', align: 'center', ansFormatter: true },
  { prop: 'mapStationName', label: '所属MAP', align: 'center' },
  { prop: 'commitTime', label: '提交时间', align: 'center' },
  { prop: 'checkLevel$FICDictName', label: '审批人等级', align: 'center' },
  { prop: 'updatedTime', label: '更新时间', align: 'center' },
  { prop: 'status$FICDictName', label: '状态', align: 'center' },
  { prop: 'customerName', label: '客户姓名', align: 'center' },
  { prop: 'customerMobile', label: '客户手机号', align: 'center' },
  { prop: 'customerCardNo', label: '客户身份证号', align: 'center' }
]

const ColumnsOne = [
  { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
  { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
  { prop: 'approveAmount', label: '额度', align: 'center', ansFormatter: true },
  { prop: 'mapStationName', label: '所属MAP', align: 'center' },
  { prop: 'commitTime', label: '提交时间', align: 'center' },
  { prop: 'updatedTime', label: '更新时间', align: 'center' },
  { prop: 'checkLevel$FICDictName', label: '审批人等级', align: 'center' },
  { prop: 'status$FICDictName', label: '状态', align: 'center' },
  { prop: 'customerName', label: '客户姓名', align: 'center' },
  { prop: 'customerMobile', label: '客户手机号', align: 'center' },
  { prop: 'customerCardNo', label: '客户身份证号', align: 'center' }
]

const ColumnsTwo = [
  { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
  { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
  { prop: 'approveAmount', label: '额度', align: 'center', ansFormatter: true },
  { prop: 'mapStationName', label: '所属MAP', align: 'center' },
  { prop: 'commitTime', label: '提交时间', align: 'center' },
  { prop: 'updatedTime', label: '更新时间', align: 'center' },
  { prop: 'checkLevel$FICDictName', label: '审批人等级', align: 'center' },
  { prop: 'status$FICDictName', label: '状态', align: 'center' },
  { prop: 'customerName', label: '客户姓名', align: 'center' },
  { prop: 'customerMobile', label: '客户手机号', align: 'center' },
  { prop: 'customerCardNo', label: '客户身份证号', align: 'center' }
]

const ColumnsThree = [
  { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
  { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
  { prop: 'approveAmount', label: '担保额度', align: 'center', ansFormatter: true },
  { prop: 'mapStationName', label: '所属MAP', align: 'center' },
  { prop: 'commitTime', label: '提交时间', align: 'center' },
  { prop: 'updatedTime', label: '更新时间', align: 'center' },
  { prop: 'checkLevel$FICDictName', label: '审批人等级', align: 'center' },
  { prop: 'status$FICDictName', label: '状态', align: 'center' },
  { prop: 'customerName', label: '客户姓名', align: 'center' },
  { prop: 'customerMobile', label: '客户手机号', align: 'center' },
  { prop: 'customerCardNo', label: '客户身份证号', align: 'center' }
]

export default {
  name: 'UnderwayList',
  props: {
    activeRole: {
      type: String // 0 贷审会 1 一级 2 二级 3 三级
    },
    mapListByRole: {
      type: Array
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
      dataSource: [],
      columns: [],
      searchForm: {
        current: 1, // 当前页数
        size: 10, // 每页条数
        statusType: '' // 状态类型
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        dataTotal: 0
      },
      operates: [
        {
          label: '查看',
          isShow: (row, index) => true,
          method: (row, index) => {
            this.$router.push({ path: '/approval/natural/detail', query: { applyNo: row.applyNo, isShow: '2' } })
          }
        }
      ]
    }
  },
  computed: {},
  mounted() {},
  created() {
    this.initHandleData(this.activeRole)
    this.getSourceData()
  },
  methods: {
    // 列表查询方法
    async getSourceData() {
      const result = await naturalAlreadyApprovalListSearch(this.searchForm)
      if (result.status === 200) {
        this.pagination.dataTotal = result.data.total
        this.dataSource = result.data.records
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
        customerName: val.customerName, // 客户姓名
        customerMobile: val.customerMobile, // 客户手机号
        socialCreditCode: val.socialCreditCode, // 统一信用代码
        guaranteeAmountMax: maxVal, // 额度最大值
        guaranteeAmountMin: minVal, // 额度最小值
        mapStationCode: val.mapStationCode, // 所属MAP
        submitPerson: val.submitPerson, // 审批人
        statusType: val.statusType, // 审批状态
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
      this.pagination = {
        ...this.pagination,
        currentPage: 1
      }
      // 搜索重新调用请求列表
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
    // 通过判断权限id 处理对应的数据
    async initHandleData(index) {
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
      // 获取状态列表
      queryJurisdictionStatus({ businessType: 'C02', completionStatus: '2' }).then(res => {
        if (res.status === 200) {
          this.tableSearch = this.tableSearch.map(item => {
            if (item.value === 'statusType') {
              return {
                ...item,
                children:
                  res.data &&
                  Object.keys(res.data).map(v => {
                    return {
                      label: res.data[v],
                      value: v
                    }
                  })
              }
            }
            return item
          })
        } else {
          this.$message.error(res.message)
        }
      })
    }
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
    activeRole(val) {
      if (val) {
        this.initHandleData(val)
      }
    }
  }
}
</script>

<style lang="scss">
.naturalUnderwayList {
  padding: 20px;
  background: #fff;
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
      min-width: 100px;
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
