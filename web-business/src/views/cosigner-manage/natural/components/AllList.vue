/* 「全部」列表Tab */
<template>
  <div class="app-container LoanApplyBacklogList">
    <!-- 搜索组件 -->
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
    <!-- 列表组件 -->
    <TableList
      border
      :columns="columns"
      :dataSource="tableData"
      :operates="operates"
      :pagination="pagination"
      :dataTotal="tableData.length"
      @toggleRowSelection="toggleRowSelection"
      @handleSelectionChange="handleSelectionChange"
      @handleChangePage="handleChangePage"
    ></TableList>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { guaranteeMortgageList } from '@/api/cosigner-manage'

const columns = [
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
    prop: 'approvalStatus',
    label: '是否是新客户',
    align: 'center'
  },
  {
    prop: 'status$FICDictName',
    label: '状态',
    align: 'center'
  },
  {
    prop: 'applyTime',
    label: '申请时间',
    align: 'center'
  }
]

export default {
  name: 'AllList',
  components: {
    Search: () => import('@/components/Tables/Search'),
    TableList: () => import('@/components/Tables/TableList')
  },
  filters: {},
  data() {
    return {
      columns,
      tableSearch: [
        {
          label: '申请编号',
          value: 'applyCode',
          type: 'text'
        },
        {
          label: '姓名',
          value: 'name',
          type: 'text'
        },
        {
          label: '手机号',
          value: 'phone',
          type: 'text'
        },
        {
          label: '状态',
          value: 'status',
          type: 'select',
          children: []
        },
        {
          label: '申请时间',
          value: 'applyTime',
          type: 'daterange'
        },
        {
          label: '办结时间',
          value: 'doneTime',
          type: 'daterange'
        }
      ],
      tableData: [], // 列表数据
      searchForm: {
        queryType: 'all',
        applyNo: '', // '申请编号',
        name: '', // '姓名',
        mobile: '', // '手机号',
        status: '', // '状态',
        applyTime: '', // '申请时间'
        page: 1,
        limit: 10,
        doneTime: ''// 办结时间
      },
      pagination: {
        currentPage: 1,
        pageSize: 15,
        dataTotal: 20
      },
      //  扩展性按钮  eg:操作框里 编辑删除
      operates: [{
        label: '去处理',
        isShow: (row, index) => row.state !== 1,
        method: (row, index) => {
          this.$router.push({ path: '/cosigner-manage/natural/add', query: { applyNo: index.applyNo, status: index.status } })
        }
      }
      ]
    }
  },
  mounted() {},
  computed: {
    ...mapGetters(['commonEnum'])
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
      this.searchForm.applyTime = val.applyTime
      this.getPrereviewList(1)
    },
    // 列表查询
    getPrereviewList(pageNum) {
      if (pageNum) {
        this.searchForm.page = pageNum
      }
      guaranteeMortgageList(this.searchForm).then(res => {
        if (res.status === 200) {
          this.total = res.data.total
          this.tableData = res.data.records
        } else {
          this.$message.error('查询出错')
          this.tableData = []
          this.total = 0
        }
      })
    },
    toggleRowSelection() {},
    handleSelectionChange() {},
    handleChangePage(val) {
      this.getPrereviewList(val)
    },
    handleChangePageSize(val) {
      this.searchForm.page = 1
      this.searchForm.limit = val
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
