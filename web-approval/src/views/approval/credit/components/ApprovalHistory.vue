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
              :dataSource="dataSourceFirst"
              :operates="operatesFirst"
              :pagination="paginationFirst"
              :dataTotal="dataTotalFirst"
              @toggleRowSelection="toggleRowSelection"
              @handleSelectionChange="handleSelectionChange"
              @handleChangePage="handleChangePage"
              @handleChangePageSize="handleChangePageSize"
            />
          </el-tab-pane>
          <el-tab-pane label="担保审批记录" name="second">
            <Search :tableSearch="tableSearchSecond" @handleSearch="handleSearch" />
            <TableList
              border
              :columns="columnsSecond"
              :dataSource="dataSourceSecond"
              :operates="operatesSecond"
              :pagination="paginationSecond"
              :dataTotal="dataTotalSecond"
              @toggleRowSelection="toggleRowSelection"
              @handleSelectionChange="handleSelectionChange"
              @handleChangePage="handleChangePage"
              @handleChangePageSize="handleChangePageSize"
            />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { historyCreditSelect, historyEnsureSelect, getQueryApproveResult } from '@/api/approval'
import { mapGetters } from 'vuex'
const TableSearch = [
  { label: '申请编号', value: 'applyNo', type: 'text' },
  {
    label: '所属MAP',
    value: 'mapStationCode',
    type: 'select',
    children: []
  },
  { label: '申请人', value: 'applyCommiter', type: 'text' },
  { label: '终审人', value: 'submitName', type: 'text' },
  {
    label: '审批结果',
    value: 'statusType',
    type: 'select',
    children: []
  },
  {
    label: '产品',
    value: 'productName',
    type: 'select',
    children: []
  }
]
const TableSearchSecond = [
  { label: '申请编号', value: 'applyNo', type: 'text' },
  {
    label: '所属MAP',
    value: 'mapStationCode',
    type: 'select',
    children: []
  },
  { label: '申请人', value: 'applyCommiter', type: 'text' },
  { label: '终审人', value: 'submitName', type: 'text' },
  {
    label: '审批结果',
    value: 'statusType',
    type: 'select',
    children: []
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
      // 授信审批
      fromSearchFirst: {
        current: 1,
        size: 10,
        customerId: this.$route.query.customerId // 客户id
      },
      // 担保审批
      fromSearchSecond: {
        current: 1,
        size: 10,
        customerId: this.$route.query.customerId // 客户id
      },
      // 表头配置数据
      columns: [
        { prop: 'applyNo', label: '申请编号', align: 'center' },
        { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
        { prop: 'productName', label: '产品', align: 'center' },
        { prop: 'approveAmount', label: '审批金额', align: 'center', ansFormatter: true },
        { prop: 'mapStationName', label: '所属MAP', align: 'center' },
        { prop: 'updatedTime', label: '审批时间', align: 'center' },
        { prop: 'submitName', label: '终审人', align: 'center' },
        { prop: 'status', label: '审核结果', align: 'center' }
      ],
      columnsSecond: [
        { prop: 'applyNo', label: '申请编号', align: 'center' },
        { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
        { prop: 'approveAmount', label: '担保金额', align: 'center', ansFormatter: true },
        { prop: 'mapStationName', label: '所属MAP', align: 'center' },
        { prop: 'updatedTime', label: '审批时间', align: 'center' },
        { prop: 'submitName', label: '终审人', align: 'center' },
        { prop: 'status', label: '审核结果', align: 'center' }
      ],
      // 表格数据
      dataSourceFirst: [],
      dataSourceSecond: [],
      paginationFirst: {
        currentPage: 1,
        pageSize: 10
      },
      paginationSecond: {
        currentPage: 1,
        pageSize: 10
      },
      dataTotalFirst: 0,
      dataTotalSecond: 0,
      operatesFirst: [
        {
          label: '查看',
          isShow: (row, index) => true,
          method: (row, index) => this.$router.push({ path: '/approval/credit/detail', query: { applyNo: row.applyNo, isShow: '2' } })
        }
      ],
      operatesSecond: [
        {
          label: '查看',
          isShow: (row, index) => row !== 1,
          method: (row, index) => this.$router.push({ path: '/approval/natural/detail', query: { applyNo: row.applyNo, isShow: '2' } })
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['mapProducts', 'MAPList'])
  },
  async created() {
    await this.$store.dispatch('GetMAPProducts')
    await this.$store.dispatch('GetMAPList')
    this.tableSearchFirst[5].children = this.mapProducts.map(item => {
      return {
        name: item.name,
        value: item.name
      }
    })
    this.tableSearchFirst[1].children = this.MAPList
    this.tableSearchSecond[1].children = this.MAPList
    // 授信审批
    this.getHistiryCreditInfo()
    // 担保审批
    this.getHistiryEnsureInfo()
    // 下拉框数据
    this.initSelectList()
  },
  mounted() {},
  methods: {
    // 获取状态下拉框 map中心下拉框的数据
    initSelectList() {
      Promise.all([getQueryApproveResult()]).then(([resultList]) => {
        if (resultList.status === 200) {
          // 修改授信审批search select的数据
          // this.tableSearchFirst[1].children = mapList.data.map(item => {
          //   return { ...item, label: item.name, value: item.code }
          // })
          this.tableSearchFirst[4].children = Object.keys(resultList.data).map(item => {
            return { label: resultList.data[item], value: item }
          })
          // this.tableSearchFirst[5].children = productList.data.map(item => {
          //   return { ...item, label: item.productName, value: item.type }
          // })
          // 修改担保审批search select的数据
          // this.tableSearchSecond[1].children = mapList.data.map(item => {
          //   return { ...item, label: item.name, value: item.code }
          // })
          this.tableSearchSecond[4].children = Object.keys(resultList.data).map(item => {
            return { label: resultList.data[item], value: item }
          })
        }
      })
    },
    // 获取授信审批历史记录信息
    async getHistiryCreditInfo() {
      const result = await historyCreditSelect(this.fromSearchFirst)
      if (result.status === 200) {
        this.dataSourceFirst = result.data.records || []
        this.dataTotalFirst = result.data.total
      } else {
        this.$message.error(result.message || '失败了')
        this.dataSourceFirst = []
      }
    },
    // 获取担保审批历史记录信息
    async getHistiryEnsureInfo() {
      const result = await historyEnsureSelect(this.fromSearchSecond)
      if (result.status === 200) {
        this.dataSourceSecond = result.data.records || []
        this.dataTotalSecond = result.data.total
      } else {
        this.dataSourceSecond = []
        this.$message.error(result.message || '失败了')
      }
    },
    handleClick() {
      // console.log()
    },
    handleSearch(val) {
      // first 是授信审批 其他是担保审批
      if (this.activeName === 'first') {
        this.fromSearchFirst = {
          ...this.fromSearchFirst,
          applyCommiter: val.applyCommiter,
          applyNo: val.applyNo,
          mapStationCode: val.mapStationCode,
          productName: val.productName,
          statusType: val.statusType,
          submitName: val.submitName
        }
        this.getHistiryCreditInfo()
      } else {
        this.fromSearchSecond = {
          ...this.fromSearchSecond,
          applyCommiter: val.applyCommiter,
          applyNo: val.applyNo,
          mapStationCode: val.mapStationCode,
          statusType: val.statusType,
          submitName: val.submitName
        }
        this.getHistiryEnsureInfo()
      }
    },
    toggleRowSelection() {},
    handleSelectionChange() {},
    // 切换页码
    handleChangePage(page) {
      if (this.activeName === 'first') {
        this.paginationFirst = {
          ...this.paginationFirst,
          currentPage: page
        }
        this.fromSearchFirst = {
          ...this.fromSearchFirst,
          current: page
        }
        this.getHistiryCreditInfo()
      } else {
        this.paginationSecond = {
          ...this.paginationSecond,
          currentPage: page
        }
        this.fromSearchSecond = {
          ...this.fromSearchSecond,
          current: page
        }
        this.getHistiryEnsureInfo()
      }
    },
    // 切换每页显示的条数
    handleChangePageSize(pageSize) {
      if (this.activeName === 'first') {
        this.paginationFirst = {
          currentPage: 1,
          pageSize
        }
        this.fromSearchFirst = {
          ...this.fromSearchFirst,
          size: pageSize,
          current: 1
        }
        this.getHistiryCreditInfo()
      } else {
        this.paginationSecond = {
          currentPage: 1,
          pageSize
        }
        this.fromSearchSecond = {
          ...this.fromSearchSecond,
          size: pageSize,
          current: 1
        }
        this.getHistiryEnsureInfo()
      }
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
