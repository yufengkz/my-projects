/* 「已办」列表Tab */
<template>
  <div class="app-container">
    <!--      输入框 组件-->
    <Search :tableSearch="tableSearch" @handleSearch="handleSearch" />
    <!--      表格组件-->
    <div class="header">
      <TableList
        border
        :options="options"
        :columns="columns"
        :dataSource="dataSource"
        :operates="operates"
        :pagination="pagination"
        :dataTotal="dataTotal"
        @toggleRowSelection="toggleRowSelection"
        @handleSelectionChange="handleSelectionChange"
        @handleChangePage="handleChangePage"
        @handleChangePageSize="handleChangePageSize"
      />
    </div>
  </div>
</template>

<script>
import TableList from '@/components/Tables/TableList'
import Search from '@/components/Tables/Search'
import { getWhiteList } from '@/api/white-list'

// 搜索框数据
const tableSearch = [
  {
    label: '申请编号',
    value: 'id',
    type: 'text'
  },
  {
    label: '客户姓名',
    value: 'realName',
    type: 'text'
  },
  {
    label: '客户手机号',
    value: 'mobileNo',
    type: 'text'
  },
  {
    label: '客户身份证号',
    value: 'creditCode',
    type: 'text'
  },
  {
    label: '状态',
    value: 'status',
    type: 'select',
    children: [
      { value: 0, label: '认证成功' },
      { value: 1, label: '未认证' },
      { value: 2, label: '认证失败' }
    ]
  },
  {
    type: 'daterange',
    label: '提交时间',
    value: 'applyTime'
  },
  {
    label: '是否新客户',
    value: 'newUserFlag',
    type: 'select',
    children: [
      {
        label: '是',
        value: 'Y'
      },
      {
        label: '否',
        value: 'N'
      }
    ]
  },
  {
    type: 'input',
    label: '申请额度',
    valueLow: 'applySumSmall',
    valueHeight: 'applySumMax',
    apply: 'section',
    units: '元'
  }
]

/*
  columns  表头数据
  options  是否需要单选框 复选框  序号
  exportBut  按钮
  dataSource  表格里的数据
  operates  扩展性按钮  eg:操作框里 编辑删除
  pagination  分页
  handleSelectionChange 复选框选中项
  handleChangePage  分页触发事件
  */
// table表格 表头数据
const columns = [
  {
    prop: 'id',
    label: '申请编号',
    align: 'center'
  },
  {
    prop: 'realName',
    label: '客户姓名',
    align: 'center'
  },
  {
    prop: 'mobileNo',
    label: '客户手机号',
    align: 'center'
  },
  {
    prop: 'creditCode',
    label: '客户身份证',
    align: 'center'
  },
  {
    prop: 'statusName',
    label: '状态',
    align: 'center'
  },
  {
    prop: 'createTime',
    label: '提交时间',
    align: 'center'
  },
  {
    prop: 'applySum',
    label: '申请额度',
    align: 'center'
  }
]
const dataSource = []
export default {
  name: 'LoanApplyFinishedList',
  components: {
    Search,
    TableList
  },
  data() {
    return {
      tableSearch,
      columns,
      dataSource, // 表格里数据
      dataTotal: 0,
      // 分页
      pagination: {
        current: 1,
        pageSize: 10
      },
      //  扩展性按钮  eg:操作框里 编辑删除
      operates: [
        {
          label: '查看',
          isShow: (row, index) => true,
          method: (row, index) => {
            this.handleDetails(row, index)
          }
        }
      ],
      // 序号、单选、多选...
      options: {
        index: true,
        isShow: (row, index) => true
      },
      searchForm: {
        id: '', // 申请编号
        realName: '', // 客户姓名
        creditCode: '', // 客户身份证号
        mobileNo: '', // 客户手机号
        status: '',
        endTime: '',
        startTime: '',
        applySumMax: '', // 申请额度最大
        applySumSmall: '', // 申请额度最小
        current: 1,
        size: 10
      }
    }
  },
  computed: {},
  mounted() {
    this.getPrereviewList(1)
  },
  methods: {
    // 列表查询
    getPrereviewList(pageNum) {
      if (pageNum) {
        this.searchForm.current = pageNum
      }
      getWhiteList(this.searchForm).then(res => {
        if (res.code === 200) {
          this.dataSource = res.data.records
          this.dataTotal = res.data.total
        } else {
          this.$message.error('查询出错')
          this.dataSource = []
          this.dataTotal = 0
        }
      })
    },
    handleSearch(val) {
      this.searchForm = Object.assign({}, val)
      if (val.applyTime) {
        this.searchForm.startTime = val.applyTime[0]
        this.searchForm.endTime = val.applyTime[1]
      }
      this.getPrereviewList(1)
    },
    handleDetails(row) {
      this.$router.push('/components/detail')
    },
    toggleRowSelection(that) {
      return that.clearSelection()
    },
    // 复选框选中项
    handleSelectionChange(val) {
      console.log(val)
    },
    handleChangePage(val) {
      this.searchForm.current = val
      this.getPrereviewList(val)
    },
    handleChangePageSize(val) {
      this.searchForm.current = 1
      this.searchForm.size = val
      this.getPrereviewList(1)
    }
  }
}
</script>

<style lang="scss">
.app-container {
  .header {
    margin-top: 40px;
  }
}
</style>
