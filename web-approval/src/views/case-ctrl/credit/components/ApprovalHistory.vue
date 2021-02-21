/* [授信审批详情] 历史审批记录组件 */
<template>
  <div class="historicalApprovalRecord">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="授信审批记录" name="first">
            <Search :tableSearch="tableSearchFirst" @handleSearch="handleSearch" />
            <TableList
              border
              :columns="columns"
              :dataSource="dataSource"
              :operates="operates"
              :pagination="pagination"
              :dataTotal="dataSource.length"
              @toggleRowSelection="toggleRowSelection"
              @handleSelectionChange="handleSelectionChange"
              @handleChangePage="handleChangePage"
            />
          </el-tab-pane>
          <el-tab-pane label="担保审批记录" name="second">
            <Search :tableSearch="tableSearchSecond" @handleSearch="handleSearch" />
            <TableList
              border
              :columns="columnsSecond"
              :dataSource="dataSource"
              :operates="operates"
              :pagination="pagination"
              :dataTotal="dataSource.length"
              @toggleRowSelection="toggleRowSelection"
              @handleSelectionChange="handleSelectionChange"
              @handleChangePage="handleChangePage"
            />
          </el-tab-pane>
        </el-tabs>

      </el-col>
    </el-row>
  </div>
</template>
<script>
const TableSearch = [
  { label: '申请编号', value: 'applyCode', type: 'text' },
  {
    label: '所属MAP',
    value: 'affiliatedMAP',
    type: 'select',
    children: [
      { label: '农资贷', value: 1 },
      { label: '农地贷', value: 2 }
    ]
  },
  { label: '申请人', value: 'proposer', type: 'text' },
  { label: '终审人', value: 'finalName', type: 'text' },
  {
    label: '审批结果',
    value: 'approvalResult',
    type: 'select',
    children: [
      { label: '通过', value: 1 },
      { label: '拒绝', value: 2 }
    ]
  },
  {
    label: '产品',
    value: 'product',
    type: 'select',
    children: [
      { label: '农资贷001', value: 1 },
      { label: '农资贷002', value: 2 }
    ]
  }
]
const TableSearchSecond = [
  { label: '申请编号', value: 'applyCode', type: 'text' },
  {
    label: '所属MAP',
    value: 'affiliatedMAP',
    type: 'select',
    children: [
      { label: '农资贷', value: 1 },
      { label: '农地贷', value: 2 }
    ]
  },
  { label: '申请人', value: 'proposer', type: 'text' },
  { label: '终审人', value: 'finalName', type: 'text' },
  {
    label: '审批结果',
    value: 'approvalResult',
    type: 'select',
    children: [
      { label: '通过', value: 1 },
      { label: '拒绝', value: 2 }
    ]
  }
]

export default {
  name: 'ApprovalHistory',
  components: {
    Search: () => import('@/components/Tables/Search'),
    TableList: () => import('@/components/Tables/TableList')
  },
  data() {
    return {
      activeName: 'first',
      // 搜索数据
      tableSearchFirst: TableSearch,
      tableSearchSecond: TableSearchSecond,
      // 表头配置数据
      columns: [
        { prop: 'applyCode', label: '申请编号', align: 'center' },
        { prop: 'sqtjr', label: '申请提交人', align: 'center' },
        { prop: 'sqtjr', label: '产品', align: 'center' },
        { prop: 'dbje', label: '审批金额', align: 'center' },
        { prop: 'affiliatedMAP', label: '所属MAP', align: 'center' },
        { prop: 'approvalDate', label: '审批时间', align: 'center' },
        { prop: 'finalName', label: '终审人', align: 'center' },
        { prop: 'approvalResult', label: '审核结果', align: 'center' }
      ],
      columnsSecond: [
        { prop: 'applyCode', label: '申请编号', align: 'center' },
        { prop: 'sqtjr', label: '申请提交人', align: 'center' },
        { prop: 'dbje', label: '担保金额', align: 'center' },
        { prop: 'affiliatedMAP', label: '所属MAP', align: 'center' },
        { prop: 'approvalDate', label: '审批时间', align: 'center' },
        { prop: 'finalName', label: '终审人', align: 'center' },
        { prop: 'approvalResult', label: '审核结果', align: 'center' }
      ],
      // 表格数据
      dataSource: [
        {
          applyCode: '申请编号',
          sqtjr: '申请提交人',
          dbje: '担保金额',
          affiliatedMAP: '所属MAP',
          approvalDate: '审批时间',
          finalName: '终审人',
          approvalResult: '审核结果'
        },
        {
          applyCode: '申请编号',
          sqtjr: '申请提交人',
          dbje: '担保金额',
          affiliatedMAP: '所属MAP',
          approvalDate: '审批时间',
          finalName: '终审人',
          approvalResult: '审核结果'
        }
      ],
      pagination: {
        currentPage: 1,
        pageSize: 15,
        dataTotal: 20
      },
      operates: [
        {
          label: '查看',
          isShow: (row, index) => row !== 1,
          method: (row, index) => {
            this.handleShow(row, index)
          }
        }
      ]
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    handleClick() {
      // console.log()
    },
    handleSearch(val) {
      console.log(val)
    },
    toggleRowSelection() {},
    handleSelectionChange() {},
    handleChangePage() {},
    // 去审批
    handleShow(row, index) {
      console.log('查看', row, index)
      this.$router.push({ path: '/approval/credit/detail' })
    }
  }
}
</script>
<style lang="scss" scoped>
  .historicalApprovalRecord {
    /deep/ .el-col-xl-6 {
      min-width: 30%;
    }
    /deep/ .table-header .el-form-item .el-form-item__label {
      min-width: 65px;
    }
    /deep/ .table-header .el-form-item .el-form-item__content {
      min-width: 145px;
    }
  }
</style>
