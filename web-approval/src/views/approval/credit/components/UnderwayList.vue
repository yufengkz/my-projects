/* 「已审批」列表Tab */
<template>
  <div class="app-container LoanApplyBacklogList">
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
import { creditAlreadyApprovalListSearch } from '@/api/approval'
import { queryJurisdictionStatus } from '@/api/base'
import { mapGetters } from 'vuex'

const formentTitle = (h, params) => {
  return h('div', [
    h(
      'span',
      Number(params.row.transitionId) === Number(params.row.checkId)
        ? {
          style: {
            padding: '0 5px',
            display: 'inline-block',
            border: '1px solid #F59A23',
            borderRadius: '4px',
            color: '#F59A23'
          }
        }
        : '',
      Number(params.row.transitionId) === Number(params.row.checkId) ? '转' : ''
    ),
    h('span', { style: { padding: '0 5px' } }, params.row.applyNo)
  ])
}
export default {
  name: 'UnderwayList',
  props: {
    activeRole: {
      type: String // 0 贷审会 1 一级 2 二级 3 三级
    },
    mapListByRole: {
      type: Array // map中心数据
    },
    mapProducts: {
      type: Array // 产品
    }
  },
  watch: {
    activeRole(newV, oldV) {
      this.initHandleData(newV)
    }
  },
  components: {
    Search: () => import('@/components/Tables/Search'),
    TableList: () => import('@/components/Tables/TableList')
  },
  filters: {},
  data() {
    return {
      TableSearchRoleBest: [
        { label: '申请编号', value: 'applyNo', type: 'text' },
        { label: '客户姓名', value: 'customerName', type: 'text' },
        { label: '客户手机号', value: 'customerMobile', type: 'text' },
        {
          label: '状态',
          value: 'statusType',
          type: 'select',
          children: []
        },
        { label: '提交时间', value: 'commitTime', type: 'daterange' },
        { label: '更新时间', value: 'updateTime', type: 'daterange' },
        {
          label: '产品',
          value: 'product',
          type: 'select',
          children: this.mapProducts
        },
        { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
        {
          label: '所属MAP',
          value: 'mapStationCode',
          type: 'select',
          children: this.mapListByRole
        },
        { label: '申请提交人', value: 'applyCommiter', type: 'text' }
      ],
      TableSearchRoleOne: [
        { label: '申请编号', value: 'applyNo', type: 'text' },
        { label: '客户姓名', value: 'customerName', type: 'text' },
        { label: '客户手机号', value: 'customerMobile', type: 'text' },
        {
          label: '状态',
          value: 'statusType',
          type: 'select',
          children: []
        },
        { label: '提交时间', value: 'commitTime', type: 'daterange' },
        { label: '更新时间', value: 'updateTime', type: 'daterange' },
        {
          label: '产品',
          value: 'productType',
          type: 'select',
          children: this.mapProducts
        },
        { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
        {
          label: '所属MAP',
          value: 'mapStationCode',
          type: 'select',
          children: this.mapListByRole
        },
        { label: '申请提交人', value: 'applyCommiter', type: 'text' }
      ],
      TableSearchRoleTwo: [
        { label: '申请编号', value: 'applyNo', type: 'text' },
        { label: '客户姓名', value: 'customerName', type: 'text' },
        { label: '客户手机号', value: 'customerMobile', type: 'text' },
        {
          label: '状态',
          value: 'statusType',
          type: 'select',
          children: []
        },
        { label: '提交时间', value: 'commitTime', type: 'daterange' },
        { label: '更新时间', value: 'updateTime', type: 'daterange' },
        {
          label: '产品',
          value: 'productType',
          type: 'select',
          children: this.mapProducts
        },
        { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
        {
          label: '所属MAP',
          value: 'mapStationCode',
          type: 'select',
          children: this.mapListByRole
        },
        { label: '申请提交人', value: 'applyCommiter', type: 'text' }
      ],
      TableSearchRoleThree: [
        { label: '申请编号', value: 'applyNo', type: 'text' },
        { label: '客户姓名', value: 'customerName', type: 'text' },
        { label: '客户手机号', value: 'customerMobile', type: 'text' },
        {
          label: '状态',
          value: 'statusType',
          type: 'select',
          children: []
        },
        { label: '提交时间', value: 'commitTime', type: 'daterange' },
        { label: '更新时间', value: 'updateTime', type: 'daterange' },
        {
          label: '产品',
          value: 'productType',
          type: 'select',
          children: this.mapProducts
        },
        { label: '额度', apply: 'section', valueLow: 'guaranteeAmountMin', valueHeight: 'guaranteeAmountMax', units: '元' },
        {
          label: '所属MAP',
          value: 'mapStationCode',
          type: 'select',
          children: this.mapListByRole
        },
        { label: '申请提交人', value: 'applyCommiter', type: 'text' }
      ],
      ColumnsBest: [
        { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
        { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
        { prop: 'productName', label: '产品', align: 'center' },
        { prop: 'approveAmount', label: '额度', align: 'center', ansFormatter: true },
        { prop: 'mapStationName', label: '所属MAP', align: 'center' },
        { prop: 'commitTime', label: '提交时间', align: 'center' },
        { prop: 'updatedTime', label: '更新时间', align: 'center' },
        { prop: 'checkLevel$FICDictName', label: '审批人等级', align: 'center' },
        { prop: 'status$FICDictName', label: '状态', align: 'center' },
        { prop: 'customerName', label: '客户姓名', align: 'center' },
        { prop: 'customerMobile', label: '客户手机号', align: 'center' },
        { prop: 'customerCardNo', label: '客户身份证号', align: 'center' }
      ],
      ColumnsOne: [
        { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
        { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
        { prop: 'productName', label: '产品', align: 'center' },
        { prop: 'approveAmount', label: '额度', align: 'center', ansFormatter: true },
        { prop: 'mapStationName', label: '所属MAP', align: 'center' },
        { prop: 'commitTime', label: '提交时间', align: 'center' },
        { prop: 'updatedTime', label: '更新时间', align: 'center' },
        { prop: 'checkLevel$FICDictName', label: '审批人等级', align: 'center' },
        { prop: 'status$FICDictName', label: '状态', align: 'center' },
        { prop: 'customerName', label: '客户姓名', align: 'center' },
        { prop: 'customerMobile', label: '客户手机号', align: 'center' },
        { prop: 'customerCardNo', label: '客户身份证号', align: 'center' }
      ],
      ColumnsTwo: [
        { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
        { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
        { prop: 'productName', label: '产品', align: 'center' },
        { prop: 'approveAmount', label: '额度', align: 'center', ansFormatter: true },
        { prop: 'mapStationName', label: '所属MAP', align: 'center' },
        { prop: 'commitTime', label: '提交时间', align: 'center' },
        { prop: 'updatedTime', label: '更新时间', align: 'center' },
        { prop: 'checkLevel$FICDictName', label: '审批人等级', align: 'center' },
        { prop: 'status$FICDictName', label: '状态', align: 'center' },
        { prop: 'customerName', label: '客户姓名', align: 'center' },
        { prop: 'customerMobile', label: '客户手机号', align: 'center' },
        { prop: 'customerCardNo', label: '客户身份证号', align: 'center' }
      ],
      ColumnsThree: [
        { prop: 'applyNo', label: '申请编号', align: 'center', render: formentTitle },
        { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
        { prop: 'productName', label: '产品', align: 'center' },
        { prop: 'approveAmount', label: '额度', align: 'center', ansFormatter: true },
        { prop: 'mapStationName', label: '所属MAP', align: 'center' },
        { prop: 'commitTime', label: '提交时间', align: 'center' },
        { prop: 'updatedTime', label: '更新时间', align: 'center' },
        { prop: 'checkLevel$FICDictName', label: '审批人等级', align: 'center' },
        { prop: 'status$FICDictName', label: '状态', align: 'center' },
        { prop: 'customerName', label: '客户姓名', align: 'center' },
        { prop: 'customerMobile', label: '客户手机号', align: 'center' },
        { prop: 'customerCardNo', label: '客户身份证号', align: 'center' }
      ],
      tableSearch: [],
      dataSource: [],
      columns: [],
      searchForm: {
        current: 1, // 当前页数
        size: 10, // 每页条数
        statusType: '', // 状态类型
        commitTimeStart: '', // 提交开始时间
        commitTimeEnd: '', // 提交结束时间
        updateTimeStart: '', // 更新开始时间
        updateTimeEnd: '' // 更新结束时间
      },
      pagination: {
        current: 1,
        pageSize: 10,
        dataTotal: 0
      },
      operates: [
        {
          label: '查看',
          isShow: (row, index) => true,
          method: (row, index) => this.$router.push({ path: '/approval/credit/detail', query: { applyNo: row.applyNo, isShow: '2' } })
        }
      ]
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters(['commonEnum'])
  },
  created() {
    this.initHandleData(this.activeRole)
    this.getSourceData()
  },
  methods: {
    // 搜索按钮
    handleSearch(val) {
      const maxVal = val.guaranteeAmountMax && Number(val.guaranteeAmountMax) // 额度最大值
      const minVal = val.guaranteeAmountMin && Number(val.guaranteeAmountMin) // 额度最小值
      this.searchForm = {
        ...this.searchForm,
        current: 1,
        applyCommiter: val.applyCommiter, // 申请提交人
        applyNo: val.applyNo, // 申请编号
        customerMobile: val.customerMobile, // 客户手机号
        customerName: val.customerName, // 客户姓名
        guaranteeAmountMax: maxVal, // 额度最大值
        guaranteeAmountMin: minVal, // 额度最小值
        mapStationCode: val.mapStationCode, // 所属MAP
        productType: val.productType, // 产品类型
        statusType: val.statusType, // 状态类型
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
        current: 1
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
        current: 1
      }
      this.searchForm = {
        ...this.searchForm,
        size: pageSize,
        current: 1
      }
      this.getSourceData() // 切换页数 条数 重新请求
    },
    // 列表查询
    async getSourceData() {
      const result = await creditAlreadyApprovalListSearch(this.searchForm)
      if (result.status === 200) {
        this.pagination.dataTotal = result.data.total
        this.dataSource = result.data.records
      } else {
        this.$message.error('查询出错')
        this.dataSource = []
        this.pagination.dataTotal = 0
      }
    },
    // 通过判断权限id 处理对应的数据
    initHandleData(index) {
      if (index === '0') {
        this.tableSearch = this.TableSearchRoleBest
        this.columns = this.ColumnsBest
      } else if (index === '1') {
        this.tableSearch = this.TableSearchRoleOne
        this.columns = this.ColumnsOne
      } else if (index === '2') {
        this.tableSearch = this.TableSearchRoleTwo
        this.columns = this.ColumnsTwo
      } else if (index === '3') {
        this.tableSearch = this.TableSearchRoleThree
        this.columns = this.ColumnsThree
      }
      // 获取状态列表
      queryJurisdictionStatus({ businessType: 'C01', completionStatus: '2' }).then(res => {
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
  }
}
</script>

<style lang="scss">
.LoanApplyBacklogList {
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
