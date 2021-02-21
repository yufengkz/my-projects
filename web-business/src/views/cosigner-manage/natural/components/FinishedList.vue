/* 「已办结」列表Tab */
<template>
  <div class="app-container LoanApplyBacklogList">
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
    <TableList
      border
      :columns="columns"
      :dataSource="tableData"
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
import { mapGetters } from 'vuex'
import { guaranteeMortgageList } from '@/api/cosigner-manage'
import { beOverCreditApply } from '@/api/common'

export default {
  name: 'FinishedList',
  components: {
    Search: () => import('@/components/Tables/Search'),
    TableList: () => import('@/components/Tables/TableList')
  },
  filters: { },
  data() {
    return {
      tableSearch: [
        {
          label: '申请编号',
          value: 'applyNo',
          type: 'text'
        },
        {
          label: '姓名',
          value: 'name',
          type: 'text'
        },
        {
          label: '手机号',
          value: 'mobile',
          type: 'text'
        },
        {
          label: '状态',
          value: 'status',
          type: 'select',
          children: [
            {
              label: '放弃展业',
              value: 10
            },
            {
              label: '审批拒绝',
              value: 11
            },
            {
              label: '审批通过',
              value: 9
            }
          ]
        },
        {
          label: '更新时间',
          value: 'doneTime',
          type: 'daterange'
        }
      ],
      columns: [
        {
          prop: 'applyNo',
          label: '申请编号',
          align: 'center'
        },
        {
          prop: 'name',
          label: '姓名',
          align: 'center'
        },
        {
          prop: 'mobile',
          label: '手机号',
          align: 'center'
        },
        {
          prop: 'idNo',
          label: '客户身份证号',
          align: 'center'
        },
        {
          prop: 'isNew',
          label: '是否是新客户',
          align: 'center',
          formatter: (row, column, cellValue) => {
            const value = this.commonEnum.newUserFlagOptions && this.commonEnum.newUserFlagOptions.find(item => row.isNew === item.value)
            return value && value.label
          }
        },
        {
          prop: 'approvalStatus',
          label: '状态',
          align: 'center',
          formatter: (row, column, cellValue) => {
            const value = this.commonEnum.creditStatusOptions && this.commonEnum.creditStatusOptions.find(item => row.approvalStatus === item.value)
            return value && value.label
          }
        },
        {
          prop: 'finishTime',
          label: '更新时间',
          align: 'center'
        }
      ],
      tableData: [],
      searchForm: {
        queryType: 'finished',
        applyNo: '', // '申请编号',
        name: '', // '姓名',
        mobile: '', // '手机号',
        status: '', // '状态',
        doneTime: '', // '办结时间'
        size: 10,
        current: 1
      },
      pagination: {
        current: 1,
        pageSize: 10,
        dataTotal: 0
      },
      operates: [
        {
          label: '去查看',
          isShow: (row, index) => true,
          method: (row, index) => {
            this.$router.push({ path: '/cosigner-manage/natural/detail', query: { applyNo: row.applyNo } })
          }
        }
      ]
    }
  },
  mounted() {
    this.getStatus()
  },
  computed: {
    ...mapGetters(['commonEnum', 'currentUser'])
  },
  created() {
    this.getPrereviewList(1)
  },
  methods: {
    // 搜索按钮
    handleSearch(val) {
      this.searchForm.applyNo = val.applyNo
      this.searchForm.name = val.name
      this.searchForm.mobile = val.mobile
      this.searchForm.status = val.status
      if (val.doneTime && val.doneTime.length) {
        this.searchForm.createTimeStart = val.doneTime[0] + ' 00:00:00'
        this.searchForm.createTimeEnd = val.doneTime[1] + ' 23:59:59'
      } else {
        this.searchForm.createTimeStart = ''
        this.searchForm.createTimeEnd = ''
      }
      this.pagination.current = 1
      this.getPrereviewList(1)
    },
    // 列表查询
    getPrereviewList(pageNum) {
      if (pageNum) {
        this.searchForm.current = pageNum
      }
      guaranteeMortgageList(this.searchForm).then(res => {
        if (res.status === 200) {
          this.pagination.dataTotal = res.data.total
          this.tableData = res.data.records
        } else {
          this.$message.error('查询出错')
          this.tableData = []
          this.pagination.dataTotal = 0
        }
      })
    },
    // 获取下拉状态
    getStatus() {
      beOverCreditApply().then(result => {
        if (result.status === 200) {
          if (result.data.length) {
            // this.tableSearch[3].children = result.data.map(item => {
            //   return {
            //     ...item,
            //     label: item.message,
            //     value: item.code
            //   }
            // })
            const arr = []
            // 过滤掉有条件通过的一项
            result.data.forEach(item => {
              if (item.code !== '8') {
                arr.push({
                  label: item.message,
                  value: item.code
                })
              }
            })
            this.tableSearch[3].children = arr
          } else {
            this.tableSearch[3].children = []
          }
        }
      })
    },
    toggleRowSelection() {},
    handleSelectionChange() {},
    handleChangePage(val) {
      this.searchForm.current = val
      this.pagination.current = val
      this.getPrereviewList(val)
    },
    handleChangePageSize(val) {
      this.searchForm.size = val
      this.pagination.pageSize = val
      this.getPrereviewList(1)
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
}
</style>
