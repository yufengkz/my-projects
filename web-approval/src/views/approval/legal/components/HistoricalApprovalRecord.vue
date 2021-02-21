/* [法人担保审批详情] 历史审批记录组件 */
<template>
  <div class="historicalApprovalRecord">
    <el-row>
      <el-col :span="24">
        <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
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
          @handleChangePageSize="handleChangePageSize"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { historyPersonSelect, getQueryApproveResult, getQueryMAP } from '@/api/approval'
const formentAmount = (row, column, cellValue) => row.approveAmount ? row.approveAmount : row.applyAmount
export default {
  name: 'HistoricalApprovalRecord',
  components: {
    Search: () => import('@/components/Tables/Search'),
    TableList: () => import('@/components/Tables/TableList')
  },
  data() {
    return {
      // 搜索数据
      tableSearch: [
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
      ],
      formSearch: {
        current: 1,
        size: 10,
        applyNo: '' // applyNo 是毕传参数
      },
      // 表头配置数据
      columns: [
        { prop: 'applyNo', label: '申请编号', align: 'center' },
        { prop: 'applyCommiter', label: '申请提交人', align: 'center' },
        { prop: 'approveAmount', label: '担保金额', align: 'center', ansFormatter: true, formatter: formentAmount },
        { prop: 'mapStationName', label: '所属MAP', align: 'center' },
        { prop: 'updatedTime', label: '审批时间', align: 'center' },
        { prop: 'submitName', label: '终审人', align: 'center' },
        { prop: 'status', label: '审核结果', align: 'center' }
      ],
      // 表格数据
      dataSource: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
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
  created() {
  },
  mounted() {},
  methods: {
    // 获取状态下拉框 map中心下拉框的数据
    initSelectList() {
      Promise.all([getQueryApproveResult(), getQueryMAP()]).then(([resultList, mapList]) => {
        if (resultList.status === 200 && mapList.status === 200) {
          this.tableSearch[1].children = mapList.data.map(item => {
            return { ...item, label: item.name, value: item.code }
          })
          this.tableSearch[4].children = Object.keys(resultList.data).map(item => {
            return { label: resultList.data[item], value: item }
          })
        }
      })
    },
    async getHistoryPersonInfo() {
      this.formSearch.applyNo = this.$route.query.applyNo
      const result = await historyPersonSelect(this.formSearch)
      if (result.status === 200) {
        this.dataSource = result.data.records || []
        this.dataSource.map(item => {
          const pattern = /(?=((?!\b)\d{3})+$)/g
          // if (!(item.status === '6' || item.status === '11')) {
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
        this.dataSource = []
        this.$message.error(result.message || '失败了')
      }
    },
    handleSearch(val) {
      this.formSearch = {
        ...this.formSearch,
        applyCommiter: val.applyCommiter,
        applyNo: val.applyNo, // applyNo 是必传参数
        mapStationCode: val.mapStationCode,
        statusType: val.statusType,
        submitName: val.submitName
      }
      this.getHistoryPersonInfo()
    },
    toggleRowSelection() {},
    handleSelectionChange() {},
    // 切换页码
    handleChangePage(page) {
      this.pagination = {
        ...this.pagination,
        currentPage: page
      }
      this.formSearch = {
        ...this.formSearch,
        current: page
      }
    },
    // 切换每页显示的条数
    handleChangePageSize(pageSize) {
      this.pagination = {
        ...this.pagination,
        pageSize
      }
      this.formSearch = {
        ...this.formSearch,
        size: pageSize,
        current: 1
      }
      this.getHistoryPersonInfo()
    },
    // 去查看
    handleShow(row, index) {
      this.$router.push({ path: '/approval/legal/detail', query: { id: row.id, isCache: true, applyNo: row.applyNo, isShow: '2' } }) // 第二个参数 为true  需要缓存
    }
  }
}
</script>
<style lang="scss" scoped>
.historicalApprovalRecord {
  /deep/ .el-col-xl-6 {
    min-width: 30%;
  }
  /deep/ .el-form {
    .el-col {
      display: flex;
      justify-content: center;
      align-items: center;
      .el-form-item {
        .el-form-item__label {
          min-width: 68px;
        }
        .el-form-item__content {
          min-width: 128px;
        }
      }
    }
  }
}
</style>
